import { cn } from "@/lib/cn";

/** Numbered square badges, title and short text under each. Three per row on desktop. */
export function StepPath({ items }: { items: { title: string; text: string }[] }) {
  // The connecting line only makes sense when every step sits on one row.
  const oneRow = items.length === 3;
  return (
    <ol className={cn("relative grid gap-12 md:grid-cols-3 md:gap-8", !oneRow && "sm:grid-cols-2 md:gap-y-14")}>
      {oneRow ? (
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-6 hidden h-px md:block"
          style={{ background: "linear-gradient(90deg, rgba(185,70,251,0), rgba(185,70,251,.55) 15%, rgba(185,70,251,.55) 85%, rgba(185,70,251,0))" }}
        />
      ) : null}
      {items.map((step, i) => (
        <li key={step.title} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 110}ms` }} className="relative text-center">
          <span className="relative mx-auto flex h-12 w-12 items-center justify-center border-2 border-accent-light bg-accent font-mono text-sm font-semibold text-heading shadow-[inset_0_0_0_2px_var(--bg)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 text-h3">{step.title}</h3>
          <p className="mx-auto mt-3 max-w-xs text-body">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
