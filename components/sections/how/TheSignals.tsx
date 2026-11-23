import { howItWorks } from "@/content/how-it-works";
import { signalCatalog } from "@/content/signals";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

/** The four signals, each with the tiers that include it. */
export function TheSignals() {
  const c = howItWorks.signalsList;
  return (
    <Section id="signals" tone="raised" divider glow="center" aria-labelledby="signals-title">
      <SectionHeader id="signals-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <ul className="grid gap-5 md:grid-cols-2">
        {signalCatalog.map((item, i) => (
          <li key={item.name} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 100}ms` }}>
            <Card icon={item.icon} className="flex h-full flex-col">
              <h3 className="text-h3">{item.name}</h3>
              <p className="mt-2 font-semibold text-accent-lighter">{item.tagline}</p>
              <p className="mt-3 flex-1 text-body">{item.text}</p>
              <p className="mono-label mt-6 border-t border-panel-line pt-4 text-muted">Included in {item.tiers}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
