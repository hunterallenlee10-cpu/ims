import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SignalPostExample } from "@/components/sections/shared/SignalPostExample";

/** The signal post structure with numbered callouts. Values are hidden. */
export function SignalAnatomy() {
  const c = howItWorks.anatomy;
  return (
    <Section id="signal-anatomy" divider glow="right" aria-labelledby="anatomy-title" className="scroll-mt-20">
      <SectionHeader id="anatomy-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div data-reveal>
          <SignalPostExample numbered />
        </div>

        <ol className="space-y-6 self-center" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          {c.callouts.map((item) => (
            <li key={item.n} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-accent-light bg-accent font-mono text-xs font-semibold text-heading shadow-[inset_0_0_0_2px_var(--bg)]">
                {item.n}
              </span>
              <div>
                <h3 className="font-sans text-base font-semibold text-heading">{item.title}</h3>
                <p className="mt-1 text-body">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
