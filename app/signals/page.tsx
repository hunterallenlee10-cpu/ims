import { signals, tiers } from "@/content/signals";
import { pickFaqs } from "@/content/faq";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StepPath } from "@/components/sections/shared/StepPath";
import { FaqList } from "@/components/sections/shared/FaqList";
import { TwoPathsCta } from "@/components/sections/shared/TwoPathsCta";
import { TierCards } from "@/components/sections/signals/TierCards";
import { TermsList } from "@/components/sections/signals/TermsList";

export const metadata = pageMetadata({ ...signals.meta, path: "/signals" });

/** Product/Offer structured data for the three monthly tiers. Facts only. */
function offersJsonLd() {
  const descriptions: Record<string, string> = {
    core: "The Portfolio Signal only, in the read-only Core Members - SIGNAL ONLY Telegram group.",
    pro: "All signals (Portfolio Signal, IMS Signals, BTC DCA Signal, Trend Probability), a weekly research note, a macro and liquidity briefing, method notes, and full access to the main Investing Mastery Signals Telegram group.",
    champion: "Everything in Pro",
  };
  return {
    "@context": "https://schema.org",
    "@graph": tiers.map((t) => ({
      "@type": "Product",
      name: `${site.name} ${t.name}`,
      description: descriptions[t.id],
      brand: { "@type": "Brand", name: site.name },
      offers: {
        "@type": "Offer",
        price: t.amount.toFixed(2),
        priceCurrency: "USD",
        url: `${site.url}/signals#pricing`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: t.amount.toFixed(2),
          priceCurrency: "USD",
          unitCode: "MON",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      },
    })),
  };
}

export default function SignalsPage() {
  const { hero, joining, switching, terms, faq } = signals;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />
      <TierCards />

      <Section id="joining" divider glow="left" aria-labelledby="joining-title" className="scroll-mt-20">
        <SectionHeader id="joining-title" eyebrow={joining.eyebrow} title={joining.title} subhead={joining.subhead} />
        <StepPath items={joining.steps} />
      </Section>

      <TermsList id="switching" tone="raised" {...switching} manage />
      <TermsList id="billing" {...terms} manage />

      <Section tone="raised" divider aria-labelledby="signals-faq-title">
        <SectionHeader id="signals-faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <FaqList items={pickFaqs(faq.ids)} />
      </Section>

      <TwoPathsCta {...signals.twoPaths} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd()) }} />
    </>
  );
}
