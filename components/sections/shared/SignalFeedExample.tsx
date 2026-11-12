import type { CSSProperties, ReactNode } from "react";
import { home, type ExamplePost } from "@/content/home";
import { tiers } from "@/content/signals";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Home-page card: one example Telegram post per signal, stacked top to bottom
 * (Portfolio, BTC DCA, TPI, Investing Analysis). Values are illustrative.
 * Each post fades in on scroll with a short stagger ([data-reveal], off under reduced motion).
 */
export function SignalFeedExample({ className }: { className?: string }) {
  const c = home.sample.card;
  return (
    <figure className={className} aria-label={`Example signal posts. ${c.caption}`}>
      <div
        className="frame p-4 [--cut:22px] sm:p-8"
        style={{ boxShadow: "0 30px 100px -40px rgba(138,30,241,0.5)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 sm:px-0">
          {/* Sized up so nobody mistakes these for real posts. */}
          <p className="mono-label text-sm text-heading sm:text-base">{c.heading}</p>
          <Badge size="lg" className="bg-accent/10">Example format</Badge>
        </div>

        <ol className="mt-5 divide-y divide-line border-y border-line">
          {c.posts.map((post, i) => (
            <li
              key={post.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
            >
              <Post post={post} n={i + 1} />
            </li>
          ))}
        </ol>

        <p className="px-1 pt-4 text-xs leading-relaxed text-muted sm:px-0">{c.footer}</p>
      </div>
      <figcaption className="mt-4 text-center text-sm font-semibold text-accent-light">{c.caption}</figcaption>
    </figure>
  );
}

/** Tier names whose pricing card lists this signal under "Signals" (content/signals.ts). */
export function tiersFor(match: string) {
  return tiers
    .filter((t) => t.rows.some((r) => r.label === "Signals" && r.items.some((item) => item.includes(match))))
    .map((t) => t.name);
}

function Post({ post, n }: { post: ExamplePost; n: number }) {
  const c = home.sample.card;
  const id = `example-post-${n}`;
  return (
    <article aria-labelledby={id} className="py-5">
      {/* Phones: tier pill sits under the name. 640px+: pill on the right. */}
      <header className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-2 px-1 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:px-0">
        <span aria-hidden="true" className="self-baseline font-mono text-xs text-accent-light sm:self-start sm:pt-0.5">
          {String(n).padStart(2, "0")}
        </span>
        <div>
          <p className="mono-label text-eyebrow">{post.label}</p>
          <h3 id={id} className="mt-1 font-sans text-base font-semibold normal-case tracking-normal text-heading">
            {post.name}
          </h3>
        </div>
        <p className="col-start-2 justify-self-start rounded-full border border-accent-light/50 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.6875rem] text-accent-lighter sm:col-start-3">
          <span className="sr-only">{c.tiersLabel}: </span>
          {tiersFor(post.match).join(" · ")}
        </p>
      </header>

      {/* Telegram-style message: avatar, then the bubble. */}
      <div className="mt-3 flex items-start gap-2.5 sm:gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.5625rem] font-bold tracking-wider text-heading ring-1 ring-accent-light/60 sm:h-9 sm:w-9 sm:text-[0.6875rem]"
        >
          {c.avatar}
        </span>

        <div
          className="frame min-w-0 flex-1 p-3.5 [--cut:10px] sm:p-4"
          style={{ "--fill": "var(--bg-lift-2)" } as CSSProperties}
        >
          <p className="flex flex-wrap items-baseline gap-x-2 text-sm leading-snug">
            <span className="font-semibold text-accent-lighter">{c.sender}</span>
            <span className="font-mono text-xs text-accent-lighter/90">{post.tag}</span>
          </p>

          {post.kind === "reading" ? <ReadingBody post={post} /> : <AnalysisBody post={post} />}

          <p className="mt-2 text-right leading-none">
            <time dateTime={post.time.datetime} className="font-mono text-[0.6875rem] text-muted">
              {post.time.label}
            </time>
          </p>
        </div>
      </div>
    </article>
  );
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="mono-label text-[0.6875rem] text-eyebrow">{label}</dt>
      <dd className="mt-1 font-mono text-[0.8125rem] leading-snug text-heading sm:text-sm">{children}</dd>
    </div>
  );
}

function ReadingBody({ post }: { post: Extract<ExamplePost, { kind: "reading" }> }) {
  const c = home.sample.card;
  const { from, to, dir } = post.change;
  const up = dir === "up";
  return (
    <>
      {/* Side by side from 640px; stacked rows on phones. */}
      <dl className="mt-3 grid gap-3 border-y border-panel-line/70 py-3 sm:grid-cols-2 sm:gap-0">
        <Field label={c.readingLabel} className="sm:pr-4">
          {post.reading}
        </Field>
        <Field label={c.changeLabel} className="sm:border-l sm:border-panel-line/70 sm:pl-4">
          <span className="text-muted">{from}</span>{" "}
          <span aria-hidden="true" className="text-muted">
            →
          </span>
          <span className="sr-only">to</span>{" "}
          <span className={cn("whitespace-nowrap font-semibold", up ? "text-up" : "text-down")}>
            <span aria-hidden="true">{up ? "↑" : "↓"}</span>
            <span className="sr-only">{up ? "(up)" : "(down)"}</span> {to}
          </span>
        </Field>
      </dl>

      <p className="mt-3 text-sm leading-relaxed text-body">{post.body}</p>

      {post.gauge ? <Gauge value={post.gauge.value} label={post.gauge.label} reading={post.reading} /> : null}
    </>
  );
}

/** Horizontal -1 to +1 gauge with a purple marker. Fixed height, so no layout shift. */
function Gauge({ value, label, reading }: { value: number; label: string; reading: string }) {
  const pos = ((value + 1) / 2) * 100;
  const left = Math.min(pos, 50);
  const width = Math.abs(pos - 50);
  return (
    <div className="mt-4">
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={-1}
        aria-valuemax={1}
        aria-valuenow={value}
        aria-valuetext={reading}
        className="relative h-1.5 bg-panel-line"
      >
        <span aria-hidden="true" className="absolute inset-y-0 bg-accent/70" style={{ left: `${left}%`, width: `${width}%` }} />
        <span aria-hidden="true" className="absolute -top-1 left-1/2 h-3.5 w-px -translate-x-1/2 bg-muted/60" />
        <span
          aria-hidden="true"
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-accent-lighter bg-accent shadow-[0_0_12px_var(--accent-glow)]"
          style={{ left: `${pos}%` }}
        />
      </div>
      <div aria-hidden="true" className="mt-2 flex justify-between font-mono text-[0.6875rem] text-muted">
        <span>-1</span>
        <span>0</span>
        <span>+1</span>
      </div>
    </div>
  );
}

// Decorative chart lines for the locked thumbnail (blurred, not data).
const LIQUIDITY = "M0 112 L40 116 L80 108 L120 110 L160 96 L200 84 L240 70 L280 52 L320 38";
const BTC = "M0 122 L40 118 L80 124 L120 114 L160 112 L200 100 L240 92 L280 72 L320 58";

function AnalysisBody({ post }: { post: Extract<ExamplePost, { kind: "analysis" }> }) {
  const c = home.sample.card;
  return (
    <>
      <div className="mt-3 border-y border-panel-line/70 py-3">
        <p className="mono-label text-[0.6875rem] text-eyebrow">{c.topicLabel}</p>
        <p className="mt-1 text-sm font-semibold leading-snug text-heading">{post.topic}</p>
      </div>

      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-body">
        {post.lines.map((line) => {
          const [head, ...rest] = line.split(": ");
          return (
            <li key={line}>
              {rest.length ? (
                <>
                  <span className="font-semibold text-heading">{head}:</span> {rest.join(": ")}
                </>
              ) : (
                line
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-sm font-semibold text-accent-lighter">{post.more}</p>

      {/* Locked chart teaser: fixed aspect ratio, inline SVG, no image request. */}
      <div className="relative mt-4 aspect-[16/7] overflow-hidden border border-panel-line bg-bg">
        <svg
          aria-hidden="true"
          viewBox="0 0 320 140"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-70 blur-[3px]"
        >
          {[35, 70, 105].map((y) => (
            <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--panel-line)" strokeWidth="1" />
          ))}
          <path d={LIQUIDITY} fill="none" stroke="var(--cyan)" strokeWidth="3" />
          <path d={BTC} fill="none" stroke="var(--accent-light)" strokeWidth="3" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center bg-bg/30">
          <span className="inline-flex items-center gap-2 border border-accent-light/60 bg-panel/90 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-lighter">
            <Icon name="lock" size={14} />
            {post.locked}
          </span>
        </div>
      </div>
    </>
  );
}
