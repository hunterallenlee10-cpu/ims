import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Checklist } from "@/components/ui/Checklist";

/** The two Telegram groups, and the topic list of the main group. */
export function Groups() {
  const c = howItWorks.groupsSection;
  const cards = [c.core, c.main];
  return (
    <Section id="groups" divider aria-labelledby="groups-title" className="scroll-mt-20">
      <SectionHeader id="groups-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />

      <ul className="grid gap-5 md:grid-cols-2">
        {cards.map((g, i) => (
          <li key={g.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
            <Card icon="chat" rule className="h-full">
              <p className="mono-label text-accent-light">{g.tier}</p>
              <h3 className="mt-3 text-h3">{g.name}</h3>
              <Checklist items={g.points} className="mt-6" />
            </Card>
          </li>
        ))}
      </ul>

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
