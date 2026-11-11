import { home } from "@/content/home";
import { founders } from "@/content/about";
import { signalCatalog } from "@/content/signals";
import { pickFaqs } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { StatStrip } from "@/components/sections/shared/StatStrip";
import { VsCompare } from "@/components/sections/shared/VsCompare";
import { SignalRows } from "@/components/sections/home/SignalRows";
import { SignalFeedExample } from "@/components/sections/shared/SignalFeedExample";
import { TierCards } from "@/components/sections/signals/TierCards";
import { StepPath } from "@/components/sections/shared/StepPath";
import { FoundersTeaser } from "@/components/sections/shared/FoundersTeaser";
import { FaqList } from "@/components/sections/shared/FaqList";
import { PathsCompare } from "@/components/sections/home/PathsCompare";
import { GrowthChart } from "@/components/sections/home/GrowthChart";
import { trackRecord } from "@/content/track-record";

export const metadata = pageMetadata({
  title: `Investing Mastery Signals | ${home.meta.title}`,
  description: home.meta.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section glow="right" aria-labelledby="track-title">
        <SectionHeader id="track-title" eyebrow={trackRecord.eyebrow} title={trackRecord.title} subhead={trackRecord.subhead} />
        <div data-reveal className="mx-auto max-w-6xl">
          <GrowthChart />
        </div>
      </Section>

      <Section glow="center" aria-labelledby="sample-title">
        <SectionHeader id="sample-title" eyebrow={home.sample.eyebrow} title={home.sample.title} subhead={home.sample.subhead} />
        <div data-reveal className="mx-auto max-w-2xl">
          <SignalFeedExample />
        </div>
        <div className="mt-10 text-center" data-reveal>
          <Button href={home.sample.link.href} variant="secondary" arrow>
            {home.sample.link.label}
          </Button>
        </div>
      </Section>

      <StatStrip eyebrow={home.stats.eyebrow} items={home.stats.items} />

      <Section tone="band" aria-labelledby="vs-title">
        <SectionHeader id="vs-title" eyebrow={home.vs.eyebrow} title={home.vs.title} subhead={home.vs.subhead} />
        <VsCompare theirs={home.vs.theirs} ours={home.vs.ours} />
      </Section>

      <Section aria-labelledby="program-title">
        <SectionHeader id="program-title" eyebrow={home.program.eyebrow} title={home.program.title} subhead={home.program.subhead} />
        <SignalRows items={signalCatalog} />
      </Section>

      <TierCards eyebrow={home.pricing.eyebrow} title={home.pricing.title} subhead={home.pricing.subhead} />

      <Section divider aria-labelledby="steps-title" glow="left">
        <SectionHeader id="steps-title" eyebrow={home.steps.eyebrow} title={home.steps.title} subhead={home.steps.subhead} />
        <StepPath items={home.steps.items} />
        <div className="mt-12 text-center" data-reveal>
          <Button href={home.steps.link.href} variant="secondary" arrow>
            {home.steps.link.label}
          </Button>
        </div>
      </Section>

      <Section aria-labelledby="founders-title" glow="right">
        <SectionHeader id="founders-title" eyebrow={home.founders.eyebrow} title={home.founders.title} subhead={home.founders.subhead} />
        <FoundersTeaser founders={founders} />
        <div className="mt-12 text-center" data-reveal>
          <Button href={home.founders.link.href} variant="secondary" arrow>
            {home.founders.link.label}
          </Button>
        </div>
      </Section>

      <Section divider aria-labelledby="faq-title">
        <SectionHeader id="faq-title" eyebrow={home.faq.eyebrow} title={home.faq.title} />
        <FaqList items={pickFaqs(home.faq.ids)} />
        <div className="mt-12 text-center" data-reveal>
          <Button href={home.faq.link.href} variant="secondary" arrow>
            {home.faq.link.label}
          </Button>
        </div>
      </Section>

      <PathsCompare />
    </>
  );
}
