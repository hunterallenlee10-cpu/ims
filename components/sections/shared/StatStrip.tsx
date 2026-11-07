import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stat } from "@/components/ui/Stat";

type StatItem = { value: string | null; label: string };

/** Row of big numbers. Hidden entirely until at least one real value exists. */
export function StatStrip({ eyebrow, items }: { eyebrow?: string; items: StatItem[] }) {
  const filled = items.filter((s): s is { value: string; label: string } => Boolean(s.value));
  if (filled.length === 0) return null;
  const cols = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[
    Math.min(filled.length, 4) as 1 | 2 | 3 | 4
  ];
  return (
    <Section divider className="!py-16 md:!py-20" aria-labelledby="stats-title">
      {eyebrow ? (
        <Eyebrow className="mb-10 text-center">
          <span id="stats-title">{eyebrow}</span>
        </Eyebrow>
      ) : null}
      <div className={`grid grid-cols-1 gap-12 ${cols}`}>
        {filled.map((s) => (
          <div key={s.label} data-reveal>
            <Stat value={s.value} label={s.label} />
          </div>
        ))}
      </div>
    </Section>
  );
}
