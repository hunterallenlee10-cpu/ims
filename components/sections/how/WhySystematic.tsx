import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VsCompare } from "@/components/sections/shared/VsCompare";

export function WhySystematic() {
  const c = howItWorks.why;
  return (
    <Section aria-labelledby="why-title">
      <SectionHeader id="why-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      <VsCompare
        theirs={c.discretionary}
        ours={c.systematic}
        labels={{ theirs: c.discretionary.title, ours: c.systematic.title }}
      />
      <p data-reveal className="measure mx-auto mt-12 text-center text-lg font-semibold text-heading">
        {c.note}
      </p>
    </Section>
  );
}
