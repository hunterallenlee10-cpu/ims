import { signals } from "@/content/signals";
import { pickFaqs } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FaqList } from "@/components/sections/shared/FaqList";
import { TwoPathsCta } from "@/components/sections/shared/TwoPathsCta";
import { TierCards } from "@/components/sections/signals/TierCards";
import { IncludedList } from "@/components/sections/signals/IncludedList";
import { BillingTerms } from "@/components/sections/signals/BillingTerms";

export const metadata = pageMetadata({ ...signals.meta, path: "/signals" });

export default function SignalsPage() {
  const { hero, faq } = signals;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />
      <TierCards />
      <IncludedList />
      <BillingTerms />
      <Section tone="raised" divider aria-labelledby="signals-faq-title">
        <SectionHeader id="signals-faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <FaqList items={pickFaqs(faq.ids)} />
        <DisclaimerBox className="mx-auto mt-12 max-w-3xl" />
      </Section>
      <TwoPathsCta {...signals.twoPaths} />
    </>
  );
}
