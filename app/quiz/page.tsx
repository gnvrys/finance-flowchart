"use client";

import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { getNode, hasNode, isQuestionNode, isResultNode, START_NODE_ID } from "@/lib/flowchart/engine";
import QuestionCard from "@/components/QuestionCard";
import ProgressIndicator from "@/components/ProgressIndicator";
import BackButton from "@/components/BackButton";
import RestartButton from "@/components/RestartButton";

const STORAGE_KEY = "quiz-progress";

type Progress = {
  currentNodeId: string;
  history: string[];
};

type QuizState = Progress & { hydrated: boolean };

type QuizAction =
  | { type: "answer"; nextNodeId: string }
  | { type: "back" }
  | { type: "restart" }
  | { type: "restore"; progress: Progress }
  | { type: "hydrate" };

const initialState: QuizState = { currentNodeId: START_NODE_ID, history: [], hydrated: false };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "answer":
      return {
        ...state,
        currentNodeId: action.nextNodeId,
        history: [...state.history, state.currentNodeId],
      };
    case "back": {
      if (state.history.length === 0) return state;
      const history = state.history.slice(0, -1);
      const currentNodeId = state.history[state.history.length - 1];
      return { ...state, currentNodeId, history };
    }
    case "restart":
      return { ...initialState, hydrated: true };
    case "restore":
      return { ...action.progress, hydrated: true };
    case "hydrate":
      return { ...state, hydrated: true };
  }
}

function loadStoredProgress(): Progress | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Progress> | null;
    if (
      !parsed ||
      typeof parsed.currentNodeId !== "string" ||
      !Array.isArray(parsed.history) ||
      !parsed.history.every((id) => typeof id === "string")
    ) {
      return null;
    }
    if (![...parsed.history, parsed.currentNodeId].every(hasNode)) return null;
    return { currentNodeId: parsed.currentNodeId, history: parsed.history };
  } catch {
    return null;
  }
}

function saveStoredProgress(progress: Progress) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // sessionStorage may be unavailable (e.g. private browsing) — safe to skip
  }
}

export default function QuizPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const node = getNode(state.currentNodeId);

  // Restore progress after mount so the server-rendered HTML and the first
  // client render always agree; a forced restart skips the restore.
  useEffect(() => {
    const forceRestart = new URLSearchParams(window.location.search).get("restart") === "1";
    if (forceRestart) {
      window.history.replaceState(null, "", window.location.pathname);
      dispatch({ type: "hydrate" });
      return;
    }
    const progress = loadStoredProgress();
    dispatch(progress ? { type: "restore", progress } : { type: "hydrate" });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    if (isQuestionNode(node)) saveStoredProgress({ currentNodeId: state.currentNodeId, history: state.history });
  }, [state, node]);

  if (isResultNode(node)) {
    router.push(`/result/${node.id}`);
    return null;
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="flex items-center justify-between">
        <ProgressIndicator questionNumber={state.history.length + 1} />
        <div className="flex items-center gap-4">
          {state.history.length > 0 && <BackButton onClick={() => dispatch({ type: "back" })} />}
          <RestartButton onClick={() => dispatch({ type: "restart" })} />
        </div>
      </div>
      <QuestionCard node={node} onSelect={(nextNodeId) => dispatch({ type: "answer", nextNodeId })} />
    </main>
  );
}
