import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold sm:text-4xl">
        What should you do with your money next?
      </h1>
      <p className="text-lg text-zinc-700 dark:text-zinc-300">
        Answer a few quick questions about your situation and get one clear priority to focus on,
        along with the reasoning behind it. No reading required, no account needed.
      </p>
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
