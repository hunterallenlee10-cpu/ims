import { howItWorks } from "@/content/how-it-works";
import { isPlaceholder } from "@/content/site";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function UpdateCadence() {
  const c = howItWorks.cadence;
  return (
    <Section id="cadence" tone="raised" divider aria-labelledby="cadence-title" className="scroll-mt-20">
      <SectionHeader id="cadence-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <ul className={cn("grid gap-5 sm:grid-cols-2", c.items.length > 2 ? "lg:grid-cols-4" : "mx-auto max-w-4xl")}>
        {c.items.map((item, i) => (
          <li key={item.label} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
            <Card rule className="h-full">
              <p className="mono-label text-eyebrow">{item.label}</p>
              <p className={cn("mt-4 text-accent-light", isPlaceholder(item.value) ? "text-base font-semibold" : "font-display text-4xl")}>
                {item.value}
              </p>
              <p className="mt-3 text-body">{item.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
