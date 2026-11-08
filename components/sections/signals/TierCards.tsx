import { signals } from "@/content/signals";
import { site } from "@/content/site";
import { renderAccent } from "@/lib/accent";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Checklist } from "@/components/ui/Checklist";
import { TrustLine } from "@/components/ui/TrustLine";

/** Two equal tier cards. No "most popular", no strikethrough, no countdown. */
export function TierCards() {
  const c = signals.tiers;
  return (
    <Section id="tiers" glow="center" aria-labelledby="tiers-title" className="!pt-4 md:!pt-8">
      <div className="mb-12 text-center" data-reveal>
        <Eyebrow className="mb-4">{c.eyebrow}</Eyebrow>
        <h2 id="tiers-title" className="text-h2">
          {renderAccent(c.title)}
        </h2>
      </div>
      <ul className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {c.items.map((tier, i) => (
          <li key={tier.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
            <article
              aria-labelledby={`tier-${i}`}
              className="frame frame-hover flex h-full flex-col p-7 [--cut:22px] sm:p-9"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-7 top-0 h-px sm:inset-x-9"
                style={{ background: "linear-gradient(90deg, var(--accent-light), rgba(185,70,251,0))" }}
              />
              <h3 id={`tier-${i}`} className="text-h3">
                {tier.name}
              </h3>
              <p className="mt-2 text-muted">{tier.blurb}</p>
              <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[clamp(2.8rem,6vw,3.8rem)] leading-none text-heading">{tier.price}</span>
                <span className="text-muted">{tier.period}</span>
              </p>
              {tier.note ? <p className="mt-3 text-sm text-muted">{tier.note}</p> : null}
              <div className="my-7 h-px bg-panel-line" />
              <Checklist items={tier.includes} className="flex-1" />
              <Button href={tier.joinHref} size="lg" className="mt-9 w-full">
                Join {tier.name}
              </Button>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-10 space-y-4 text-center" data-reveal>
        <TrustLine />
        <p className="text-sm text-muted">{c.footnote}</p>
        <p className="text-sm text-muted">
          <span className="mr-2 inline-flex items-center rounded-site-sm border border-line px-1.5 py-0.5 text-xs font-semibold text-eyebrow">18+</span>
          {site.ageNotice}
        </p>
      </div>
    </Section>
  );
}
