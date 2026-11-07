import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function WhatItIsNot() {
  const c = howItWorks.isNot;
  return (
    <Section tone="raised" divider aria-labelledby="isnot-title">
      <SectionHeader id="isnot-title" eyebrow={c.eyebrow} title={c.title} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((item, i) => (
          <li key={item.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
            <Card icon="ban" className="h-full">
              <h3 className="font-sans text-lg font-semibold text-heading">{item.title}</h3>
              <p className="mt-2 text-body">{item.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
