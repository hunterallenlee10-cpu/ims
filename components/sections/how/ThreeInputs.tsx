import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export function ThreeInputs() {
  const c = howItWorks.inputs;
  return (
    <Section tone="raised" divider glow="center" aria-labelledby="inputs-title">
      <SectionHeader id="inputs-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />

      <ul className="grid gap-5 md:grid-cols-3">
        {c.items.map((item, i) => (
          <li key={item.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
            <Card icon={item.icon} className="h-full">
              <h3 className="text-h3">{item.name}</h3>
              <p className="mt-3 text-lg font-semibold leading-snug text-heading">{item.question}</p>
              <p className="mt-4 text-body">{item.how}</p>
            </Card>
          </li>
        ))}
      </ul>

      {/* Converging diagram: three inputs → one composite state */}
      <div data-reveal className="mx-auto mt-16 max-w-3xl">
        <h3 className="text-center text-h3">{c.combine.title}</h3>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {c.items.map((item) => (
            <div key={item.name} className="flex min-h-12 items-center justify-center gap-2 border border-panel-line bg-panel px-2 text-sm font-semibold text-heading">
              <Icon name={item.icon} size={18} className="hidden text-accent-light sm:block" />
              {item.name}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 600 90" preserveAspectRatio="none" className="h-16 w-full sm:h-20" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="converge" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#2FF0FE" stopOpacity="0.7" />
              <stop offset="1" stopColor="#8A1EF1" />
            </linearGradient>
          </defs>
          {[100, 300, 500].map((x) => (
            <path key={x} d={`M${x} 0 C ${x} 50, 300 40, 300 90`} fill="none" stroke="url(#converge)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div
          className="frame frame-accent mx-auto max-w-sm px-6 py-5 text-center"
          style={{ boxShadow: "0 0 50px -12px rgba(138,30,241,0.55)" }}
        >
          <p className="mono-label text-accent-light">{c.combine.output}</p>
          <p className="mt-2 text-sm text-body">{c.combine.outputNote}</p>
        </div>
        <ol className="mx-auto mt-10 max-w-xl space-y-3">
          {c.combine.steps.map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="font-mono text-sm text-accent-light">{String(i + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
