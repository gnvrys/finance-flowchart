export default function OptionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-left text-base font-medium text-zinc-900 transition-colors hover:border-emerald-500 hover:bg-emerald-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-emerald-500 dark:hover:bg-emerald-950"
    >
      {label}
    </button>
  );
}
