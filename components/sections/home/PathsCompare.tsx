import { home } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { TrustLine } from "@/components/ui/TrustLine";
import { CtaArrows } from "@/components/ui/CtaArrows";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Closing CTA. Left: where money usually sits and its typical yearly return.
 * Right: the IMS result, shown only once a real figure is set in content/home.ts.
 */
export function PathsCompare() {
  const { eyebrow, title, left, right, cta } = home.twoPaths;
  const r = right.result;
  const hasResult = r.value !== null;

  return (
    <Section glow="center" aria-labelledby="two-paths-title" className="overflow-hidden">
      <SectionHeader id="two-paths-title" eyebrow={eyebrow} title={title} />

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        {/* Path one: the default */}
        <div data-reveal className="frame flex flex-col p-7 [--fill:var(--bg)] sm:p-10">
          <p className="mono-label mb-4 flex items-center gap-2 text-muted">
            <span className="flex h-6 w-6 items-center justify-center border border-panel-line font-mono text-[0.7rem]">A</span>
            {left.tag}
          </p>
          <h3 className="text-h3 text-body">{left.title}</h3>
          <p className="mt-3 text-muted">{left.text}</p>

          <ul className="mt-8 flex-1 space-y-6">
            {left.rows.map((row) => (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-semibold text-body">{row.label}</p>
                    <p className="text-sm text-muted">{row.note}</p>
                  </div>
                  <p
                    className={cn(
                      "shrink-0 font-display text-3xl leading-none tabular-nums",
                      row.negative ? "text-red-400/80" : "text-body",
                    )}
                  >
                    {row.value}
                  </p>
                </div>
                <div aria-hidden="true" className="mt-2.5 h-2 w-full bg-panel-line/50">
                  <div className={cn("h-full", row.negative ? "bg-red-400/50" : "bg-muted/60")} style={{ width: `${row.bar}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-panel-line pt-4 text-xs text-muted">{left.footnote}</p>
        </div>

        {/* Path two: the system. Art sits at the base layer; content is lifted above it. */}
        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="frame frame-accent flex flex-col overflow-hidden p-7 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(138,30,241,0.4), rgba(138,30,241,0))" }}
          />
          {/* Decorative rising line, not data */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-px bottom-px h-1/2 w-[calc(100%-2px)] opacity-45"
          >
            <defs>
              <linearGradient id="paths-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#2FF0FE" />
                <stop offset="0.5" stopColor="#1697F4" />
                <stop offset="1" stopColor="#B946FB" />
              </linearGradient>
              <linearGradient id="paths-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#8A1EF1" stopOpacity="0.35" />
                <stop offset="1" stopColor="#8A1EF1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 190 C 60 185, 90 170, 130 160 S 200 150, 240 110 S 320 60, 400 10 L 400 200 L 0 200 Z" fill="url(#paths-fill)" />
            <path
              d="M0 190 C 60 185, 90 170, 130 160 S 200 150, 240 110 S 320 60, 400 10"
              fill="none"
              stroke="url(#paths-line)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="relative flex flex-1 flex-col">
            <p className="mono-label mb-4 flex items-center gap-2 text-accent-light">
              <span className="flex h-6 w-6 items-center justify-center bg-accent font-mono text-[0.7rem] text-heading">B</span>
              {right.tag}
            </p>
            <h3 className="text-h3">{right.title}</h3>
            <p className="mt-3 text-body">{right.text}</p>

            <div className="mt-10 flex-1">
              <p
                className={cn(
                  "font-display text-[clamp(4.5rem,11vw,8.5rem)] leading-[0.85] tabular-nums",
                  hasResult
                    ? "bg-gradient-to-r from-[#2FF0FE] via-[#1697F4] to-[#B946FB] bg-clip-text text-transparent"
                    : "text-heading/40",
                )}
              >
                {r.value ?? r.placeholder}
              </p>
              <p className="mt-4 flex items-center gap-2 font-semibold text-heading">
                <Icon name="trend" size={18} className="shrink-0 text-accent-light" />
                {r.period}
              </p>
              <p className="mt-1 text-sm text-muted">{r.basis}</p>
            </div>

            <p className="mt-8 border-t border-accent-light/30 pt-4 text-xs text-muted">{right.disclosure}</p>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center gap-6" data-reveal>
        <CtaArrows>
          <Button href={cta.href} size="lg" className="sm:min-w-72">
            {cta.label}
            <Icon name="arrowRight" size={18} />
          </Button>
        </CtaArrows>
        <TrustLine />
      </div>
    </Section>
  );
}
