import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";

type StatItem = { value: string | null; label: string };

/** One navy panel split into columns of big numbers. Hidden until a real value exists. */
export function StatStrip({ eyebrow, items }: { eyebrow?: string; items: StatItem[] }) {
  const filled = items.filter((s): s is { value: string; label: string } => Boolean(s.value));
  if (filled.length === 0) return null;
  const cols = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[
    Math.min(filled.length, 4) as 1 | 2 | 3 | 4
  ];
  return (
    <Section className="!py-12 md:!py-16" aria-label={eyebrow ?? "By the numbers"}>
      <div data-reveal className={`frame grid grid-cols-1 divide-y divide-panel-line sm:divide-y-0 sm:divide-x ${cols}`}>
        {filled.map((s) => (
          <div key={s.label} className="px-6 py-10">
            <Stat value={s.value} label={s.label} />
          </div>
        ))}
      </div>
    </Section>
  );
}
