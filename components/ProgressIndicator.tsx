const TYPICAL_MAX_QUESTIONS = 7;

export default function ProgressIndicator({ questionNumber }: { questionNumber: number }) {
  const dots = Array.from({ length: TYPICAL_MAX_QUESTIONS }, (_, i) => i < questionNumber);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">Question {questionNumber}</span>
      <div className="flex gap-1">
        {dots.map((filled, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              filled ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
