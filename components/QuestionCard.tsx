import type { QuestionNode } from "@/lib/flowchart/types";
import OptionButton from "./OptionButton";

export default function QuestionCard({
  node,
  onSelect,
}: {
  node: QuestionNode;
  onSelect: (nextNodeId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          {node.question}
        </h1>
        {node.helperText && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{node.helperText}</p>
        )}
        {node.notSureHelp && (
          <details className="text-sm text-zinc-500 dark:text-zinc-400">
            <summary className="cursor-pointer font-medium hover:text-zinc-800 dark:hover:text-zinc-100">
              Not sure how to answer?
            </summary>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{node.notSureHelp}</p>
          </details>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {node.options.map((option) => (
          <OptionButton
            key={option.label}
            label={option.label}
            onClick={() => onSelect(option.nextNodeId)}
          />
        ))}
      </div>
    </div>
  );
}
