import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function UpdateCadence() {
  const c = howItWorks.cadence;
  return (
    <Section divider aria-labelledby="cadence-title">
      <SectionHeader id="cadence-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <ul className="grid gap-5 md:grid-cols-3">
        {c.items.map((item, i) => (
          <li key={item.label} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
            <Card rule className="h-full">
              <p className="mono-label text-eyebrow">{item.label}</p>
              <p className="mt-4 font-display text-4xl text-accent-light">{item.value}</p>
              <p className="mt-3 text-body">{item.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
