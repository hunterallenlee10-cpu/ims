import type { Metadata } from "next";
import { btcOffer, signals } from "@/content/signals";
import { pageMetadata } from "@/lib/metadata";
import { btcAddress } from "@/lib/btc";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StepPath } from "@/components/sections/shared/StepPath";
import { CopyAddress } from "./CopyAddress";

// Not a checkout: this page only shows where to send BTC. Access is granted by hand once the payment confirms.
export const metadata: Metadata = {
  ...pageMetadata({ ...signals.btc.meta, path: "/join/btc" }),
  robots: { index: false, follow: true },
};

export default function JoinBtcPage() {
  const c = signals.btc;
  const address = btcAddress();
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <Section aria-labelledby="btc-details-title" className="!pt-4 md:!pt-8">
        <div className="frame frame-accent mx-auto max-w-3xl p-7 [--cut:22px] [--fill:var(--bg-lift-2)] sm:p-8">
          <h2 id="btc-details-title" className="text-h3">
            {c.details.title}
          </h2>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-[clamp(2.4rem,5vw,3rem)] leading-none text-heading">{btcOffer.price}</span>
            <span className="text-sm text-muted">{btcOffer.period}</span>
          </p>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {c.details.rows.map((row) => (
              <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="eyebrow pt-1 text-accent-light">{row.label}</dt>
                <dd className="text-body">
                  {row.label === "Address" ? (
                    address ? (
                      <>
                        <code className="block break-all font-mono text-[1.05rem] text-heading">{address}</code>
                        <CopyAddress address={address} label={c.details.copy} copiedLabel={c.details.copied} />
                      </>
                    ) : (
                      c.details.closed
                    )
                  ) : (
                    row.text
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted">{c.details.warning}</p>
        </div>
      </Section>

      <Section divider glow="left" aria-labelledby="btc-steps-title">
        <SectionHeader id="btc-steps-title" eyebrow={c.eyebrow} title={c.steps.title} />
        <StepPath items={c.steps.items} />
        <div className="mt-12 text-center">
          <Button href={c.steps.cta.href} size="lg">
            {c.steps.cta.label}
          </Button>
        </div>
      </Section>

      <Section tone="raised" divider aria-labelledby="btc-rules-title">
        <SectionHeader id="btc-rules-title" eyebrow={c.eyebrow} title={c.rules.title} />
        <dl className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {c.rules.items.map((item) => (
            <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
              <dt className="eyebrow pt-1 text-accent-light">{item.label}</dt>
              <dd className="text-body">{item.text}</dd>
            </div>
          ))}
        </dl>
        <div className="mx-auto mt-10 max-w-3xl">
          <DisclaimerBox />
        </div>
      </Section>
    </>
  );
}
