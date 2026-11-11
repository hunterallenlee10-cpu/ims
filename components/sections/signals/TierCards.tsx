import { Suspense } from "react";
import Link from "next/link";
import { signals, tiers } from "@/content/signals";
import { site } from "@/content/site";
import { renderAccent } from "@/lib/accent";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Checklist } from "@/components/ui/Checklist";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { championCheckoutEnabled } from "@/lib/tiers";
import { CheckoutCanceledNote } from "./CheckoutCanceledNote";
import { CheckoutButton } from "./CheckoutButton";

/**
 * Pricing table: Core, Pro and Champion side by side (stacked on mobile).
 * No "most popular", no strikethrough, no countdown.
 */
export function TierCards({
  eyebrow = signals.pricing.eyebrow,
  title = signals.pricing.title,
  subhead,
}: {
  eyebrow?: string;
  title?: string;
  subhead?: string;
}) {
  const c = signals.pricing;
  return (
    <Section id="pricing" glow="center" aria-labelledby="pricing-title">
      <div className="mb-12 text-center" data-reveal>
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 id="pricing-title" className="text-h2">
          {renderAccent(title)}
        </h2>
        {subhead ? <p className="measure mx-auto mt-6 text-lg text-muted">{subhead}</p> : null}
      </div>

      <Suspense fallback={null}>
        <CheckoutCanceledNote text={c.canceled} />
      </Suspense>

      <ul className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <li key={tier.id} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
            <article
              aria-labelledby={`tier-${tier.id}`}
              className="frame frame-hover flex h-full flex-col p-7 [--cut:22px] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-7 top-0 h-px sm:inset-x-8"
                style={{ background: "linear-gradient(90deg, var(--accent-light), rgba(185,70,251,0))" }}
              />
              <h3 id={`tier-${tier.id}`} className="text-h3">
                {tier.name}
              </h3>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[clamp(2.8rem,6vw,3.6rem)] leading-none text-heading">{tier.price}</span>
                <span className="text-sm text-muted">{tier.period}</span>
              </p>

              {tier.inherits ? (
                <p className="mono-label mt-6 text-accent-light">{tier.inherits}</p>
              ) : null}

              <div className="my-6 h-px bg-panel-line" />

              <div className="flex-1">
                {tier.rows.length ? (
                  <dl className="space-y-5">
                    {tier.rows.map((row) => (
                      <div key={row.label}>
                        <dt className="mono-label mb-2 text-eyebrow">{row.label}</dt>
                        <dd>
                          <Checklist items={row.items} className="space-y-2 text-[0.97rem]" />
                        </dd>
                      </div>
                    ))}
                    {tier.whoFor ? (
                      <div>
                        <dt className="mono-label mb-2 text-eyebrow">Who it&apos;s for</dt>
                        <dd className="text-body">{tier.whoFor}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
                {tier.pending ? <p className="text-body">{tier.pending}</p> : null}
                {tier.note ? <p className="mt-5 text-sm text-muted">{tier.note}</p> : null}
              </div>

              {tier.id === "champion" && !championCheckoutEnabled() ? (
                <Button size="lg" className="mt-8 w-full" disabled>
                  {c.championClosed}
                </Button>
              ) : (
                <CheckoutButton
                  tier={tier.id}
                  label={tier.cta.label}
                  busyLabel={c.redirecting}
                  errorText={c.error}
                  className="mt-8"
                />
              )}
            </article>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-3xl space-y-6" data-reveal>
        <p className="text-center text-sm text-muted">
          {c.agree}{" "}
          <Link href="/terms" className="text-accent-light underline underline-offset-4 hover:text-accent-lighter">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-accent-light underline underline-offset-4 hover:text-accent-lighter">
            Privacy Policy
          </Link>
          .
        </p>
        <DisclaimerBox />
        <p className="text-center text-sm text-muted">{c.footnote}</p>
        <p className="text-center text-sm text-muted">
          <span className="mr-2 inline-flex items-center rounded-site-sm border border-line px-1.5 py-0.5 text-xs font-semibold text-eyebrow">18+</span>
          {site.ageNotice}
        </p>
      </div>
    </Section>
  );
}
