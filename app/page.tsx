import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";

const REASONS = [
  {
    title: "Order matters",
    body: "Paying off debt before you have a cushion, or skipping an employer match to save cash, can cost you more than the mistake you're trying to avoid.",
  },
  {
    title: "One clear next step",
    body: "Not a full plan, just the single priority that matters most for your situation right now.",
  },
  {
    title: "Two minutes, no signup",
    body: "A handful of yes/no questions. No account, no numbers to enter, no data stored anywhere but your browser.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          What should you do with your money next?
        </h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-300">
          Personal finance has a rough order of operations, build a cushion, capture your employer
          match, kill high-interest debt, then build savings further. Doing things out of order is
          the easiest way to leave money on the table. This quiz figures out where you are in that
          order and tells you what&apos;s next.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {REASONS.map((reason) => (
          <li key={reason.title} className="flex flex-col gap-1">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{reason.title}</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{reason.body}</span>
          </li>
        ))}
      </ul>

      <div>
        <Link
          href="/quiz"
          className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Start the quiz
        </Link>
      </div>
      <Disclaimer />
    </main>
  );
}
