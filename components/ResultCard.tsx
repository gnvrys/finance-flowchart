import Link from "next/link";
import type { ResultNode } from "@/lib/flowchart/types";

export default function ResultCard({
  node,
  relatedResults,
}: {
  node: ResultNode;
  relatedResults: { id: string; title: string }[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {node.title}
      </h1>

      <p className="text-lg text-zinc-800 dark:text-zinc-200">{node.recommendation}</p>

      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Why</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{node.rationale}</p>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Next steps</h2>
        <ul className="list-disc space-y-1 pl-5 text-zinc-800 dark:text-zinc-200">
          {node.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      {relatedResults.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Related outcomes
          </h2>
          <ul className="space-y-1">
            {relatedResults.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/result/${related.id}`}
                  className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/quiz"
        className="inline-flex w-fit items-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Take the quiz again
      </Link>
    </div>
  );
}
