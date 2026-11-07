import { Card } from "@/components/ui/Card";

/** Numbered step cards joined by a thin gradient rule on desktop. */
export function StepPath({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-3 md:gap-6">
      <span
        aria-hidden="true"
        className="absolute left-[16%] right-[16%] top-[3.25rem] hidden h-px md:block"
        style={{ background: "linear-gradient(90deg, rgba(47,240,254,.0), rgba(47,240,254,.45), rgba(138,30,241,.7), rgba(138,30,241,0))" }}
      />
      {items.map((step, i) => (
        <li key={step.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}>
          <Card className="h-full text-center" rule>
            <span className="relative mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent-light/70 bg-bg font-display text-lg font-semibold text-heading">
              {i + 1}
            </span>
            <h3 className="text-h3">{step.title}</h3>
            <p className="mt-3 text-body">{step.text}</p>
          </Card>
        </li>
      ))}
    </ol>
  );
}
