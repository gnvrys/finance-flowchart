import Disclaimer from "@/components/Disclaimer";

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">About this quiz</h1>
      <p className="text-zinc-700 dark:text-zinc-300">
        The order of priorities behind this quiz, building a small cushion, capturing an employer
        match, paying down high-interest debt, saving a full emergency fund, and using
        tax-advantaged accounts, is adapted from ideas widely discussed in personal finance
        communities like r/personalfinance. The wording and structure here are original.
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">
        This quiz gives you a general starting point, not a full financial plan. It doesn't know
        your full situation, your tax details, or your goals, and it isn't a substitute for advice
        from a qualified professional.
      </p>
      <Disclaimer />
    </main>
  );
}
