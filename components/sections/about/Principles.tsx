import { about } from "@/content/about";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function Principles() {
  const c = about.principles;
  return (
    <Section id="principles" divider aria-labelledby="principles-title">
      <SectionHeader id="principles-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((p, i) => (
          <li key={p.title} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}>
            <Card icon={p.icon} className="h-full">
              <h3 className="font-sans text-lg font-semibold text-heading">{p.title}</h3>
              <p className="mt-2 text-body">{p.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
