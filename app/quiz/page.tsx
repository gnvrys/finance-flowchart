"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { getNode, isResultNode, START_NODE_ID } from "@/lib/flowchart/engine";
import QuestionCard from "@/components/QuestionCard";
import ProgressIndicator from "@/components/ProgressIndicator";
import BackButton from "@/components/BackButton";
import RestartButton from "@/components/RestartButton";

type QuizState = {
  currentNodeId: string;
  history: string[];
};

type QuizAction =
  | { type: "answer"; nextNodeId: string }
  | { type: "back" }
  | { type: "restart" };

const initialState: QuizState = { currentNodeId: START_NODE_ID, history: [] };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "answer":
      return {
        currentNodeId: action.nextNodeId,
        history: [...state.history, state.currentNodeId],
      };
    case "back": {
      if (state.history.length === 0) return state;
      const history = state.history.slice(0, -1);
      const currentNodeId = state.history[state.history.length - 1];
      return { currentNodeId, history };
    }
    case "restart":
      return initialState;
  }
}

export default function QuizPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const node = getNode(state.currentNodeId);

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
