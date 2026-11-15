import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Checklist } from "@/components/ui/Checklist";

/** The member Telegram group, and its topic list. */
export function Groups() {
  const c = howItWorks.groupsSection;
  const g = c.main;
  return (
    <Section id="groups" divider aria-labelledby="groups-title">
      <SectionHeader id="groups-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />

      <div data-reveal className="mx-auto max-w-2xl">
        <Card icon="chat" rule>
          <p className="mono-label text-accent-light">{g.tier}</p>
          <h3 className="mt-3 text-h3">{g.name}</h3>
          <Checklist items={g.points} className="mt-6" />
        </Card>
      </div>

      <div data-reveal className="mx-auto mt-16 max-w-3xl">
        <h3 className="text-center text-h3">{c.topicsTitle}</h3>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {c.topics.map((t) => (
            <div key={t.name} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
              <dt className="font-semibold text-heading">{t.name}</dt>
              <dd className="text-body">{t.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
