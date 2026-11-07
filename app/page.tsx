import { home } from "@/content/home";
import { founders } from "@/content/about";
import { pickFaqs } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { SignalConsole } from "@/components/sections/home/SignalConsole";
import { StatStrip } from "@/components/sections/shared/StatStrip";
import { VsCompare } from "@/components/sections/shared/VsCompare";
import { ProgramGrid } from "@/components/sections/shared/ProgramGrid";
import { StepPath } from "@/components/sections/shared/StepPath";
import { FeatureChecklists } from "@/components/sections/shared/FeatureChecklists";
import { FoundersTeaser } from "@/components/sections/shared/FoundersTeaser";
import { FaqList } from "@/components/sections/shared/FaqList";
import { TwoPathsCta } from "@/components/sections/shared/TwoPathsCta";

export const metadata = pageMetadata({ ...home.meta, path: "/" });

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <SignalConsole />
      <StatStrip eyebrow={home.stats.eyebrow} items={home.stats.items} />

      <Section divider aria-labelledby="vs-title">
        <SectionHeader id="vs-title" eyebrow={home.vs.eyebrow} title={home.vs.title} subhead={home.vs.subhead} />
        <VsCompare theirs={home.vs.theirs} ours={home.vs.ours} />
      </Section>

      <Section tone="raised" divider aria-labelledby="program-title">
        <SectionHeader id="program-title" eyebrow={home.program.eyebrow} title={home.program.title} subhead={home.program.subhead} />
        <ProgramGrid items={home.program.items} />
      </Section>

      <Section divider aria-labelledby="steps-title" glow="left">
        <SectionHeader id="steps-title" eyebrow={home.steps.eyebrow} title={home.steps.title} subhead={home.steps.subhead} />
        <StepPath items={home.steps.items} />
      </Section>

      <Section tone="raised" divider aria-labelledby="features-title">
        <SectionHeader id="features-title" eyebrow={home.features.eyebrow} title={home.features.title} subhead={home.features.subhead} />
        <FeatureChecklists cards={home.features.cards} />
        <div className="mt-12 text-center" data-reveal>
          <Button href="/signals" variant="secondary" arrow>
            See membership options
          </Button>
        </div>
      </Section>

      <Section divider aria-labelledby="founders-title" glow="right">
        <SectionHeader id="founders-title" eyebrow={home.founders.eyebrow} title={home.founders.title} subhead={home.founders.subhead} />
        <FoundersTeaser founders={founders} />
        <div className="mt-12 text-center" data-reveal>
          <Button href={home.founders.link.href} variant="secondary" arrow>
            {home.founders.link.label}
          </Button>
        </div>
      </Section>

      <Section tone="raised" divider aria-labelledby="faq-title">
        <SectionHeader id="faq-title" eyebrow={home.faq.eyebrow} title={home.faq.title} />
        <FaqList items={pickFaqs(home.faq.ids)} />
        <div className="mt-12 text-center" data-reveal>
          <Button href={home.faq.link.href} variant="secondary" arrow>
            {home.faq.link.label}
          </Button>
        </div>
      </Section>

      <TwoPathsCta {...home.twoPaths} />
    </>
  );
}
