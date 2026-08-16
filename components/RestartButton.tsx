export default function RestartButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
    >
      Restart
    </button>
  );
}
