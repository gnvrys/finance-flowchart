export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${className}`}>
      Educational information only, not personalized financial advice.
    </p>
  );
}
