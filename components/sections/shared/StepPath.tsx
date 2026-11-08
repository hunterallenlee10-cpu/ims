/** Numbered square badges joined by a thin line, title and short text under each. */
export function StepPath({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-6 hidden h-px md:block"
        style={{ background: "linear-gradient(90deg, rgba(185,70,251,0), rgba(185,70,251,.55) 15%, rgba(185,70,251,.55) 85%, rgba(185,70,251,0))" }}
      />
      {items.map((step, i) => (
        <li key={step.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 110}ms` }} className="relative text-center">
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
