import { signals } from "@/content/signals";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Checklist } from "@/components/ui/Checklist";

export function IncludedList() {
  const c = signals.included;
  return (
    <Section tone="raised" divider aria-labelledby="included-title">
      <SectionHeader id="included-title" eyebrow={c.eyebrow} title={c.title} />
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        {c.groups.map((g, i) => (
          <div key={g.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
            <Card rule className="h-full">
              <h3 className="text-h3">{g.title}</h3>
              <Checklist items={g.items} className="mt-6" />
            </Card>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted">{c.note}</p>
    </Section>
  );
}
