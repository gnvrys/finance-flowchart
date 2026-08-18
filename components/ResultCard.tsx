import Link from "next/link";
import type { ResultNode } from "@/lib/flowchart/types";
import { extractYouTubeVideoId } from "@/lib/flowchart/youtube";
import YouTubeEmbed from "./YouTubeEmbed";

export default function ResultCard({
  node,
  relatedResults,
}: {
  node: ResultNode;
  relatedResults: { id: string; title: string }[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/quiz"
        className="inline-flex w-fit items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        &larr; Back to last question
      </Link>

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
          {relatedResults.length > 0 && (
            <li>
              Once this is handled, your next priority is typically{" "}
              <Link
                href={`/result/${relatedResults[0].id}`}
                className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                {relatedResults[0].title}
              </Link>
              .
            </li>
          )}
        </ul>
      </div>

      {((node.watchAndFollow && node.watchAndFollow.length > 0) ||
        (node.learnMore && node.learnMore.length > 0)) && (
        <div>
          <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Watch &amp; learn more</h2>

          {node.watchAndFollow?.map((entry) => {
            const videoId = extractYouTubeVideoId(entry.url);
            return (
              <div key={entry.title} className="mb-4">
                {videoId ? (
                  <>
                    <YouTubeEmbed videoId={videoId} title={entry.title} />
                    <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
                      {entry.duration && <>{entry.duration} &middot; </>}
                      {entry.title} &mdash; {entry.creator}
                    </p>
                  </>
                ) : (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-36 flex-col gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm transition-colors hover:border-emerald-500 hover:bg-emerald-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950"
                  >
                    <span className="text-lg" aria-hidden="true">
                      ▶️
                    </span>
                    {entry.duration && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{entry.duration}</span>
                    )}
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{entry.title}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{entry.creator}</span>
                  </a>
                )}
              </div>
            );
          })}

          {node.learnMore && node.learnMore.length > 0 && (
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {node.learnMore.map((entry) => (
                <li key={entry.title}>
                  <span aria-hidden="true">{entry.author ? "📖" : "💬"} </span>
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      {entry.title}
                    </a>
                  ) : (
                    <span className="text-zinc-800 dark:text-zinc-200">{entry.title}</span>
                  )}
                  {entry.author && <span> — {entry.author}</span>}
                </li>
              ))}
            </ul>
          )}

          {node.followAuthor?.url && (
            <a
              href={node.followAuthor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center gap-1 rounded-full border border-emerald-300 px-3 py-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
            >
              Follow {node.followAuthor.name} &rarr;
            </a>
          )}
        </div>
      )}

      <Link
        href="/quiz?restart=1"
        className="inline-flex w-fit items-center rounded-full bg-zinc-900 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Restart the quiz
      </Link>
    </div>
  );
}
