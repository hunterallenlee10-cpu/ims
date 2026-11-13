import type { CSSProperties } from "react";
import { home, type ExamplePost, type PostLine, type PostMedia } from "@/content/home";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Gauge = Extract<PostMedia, { kind: "tpi" }>["gauges"][number];

/**
 * Home-page card: example Telegram posts in the real formats (Portfolio Signal, SDCA, TPI and two
 * Investing Analysis posts), with every value invented. The "example values, not live signals" line
 * is stated once, at the top. Each post fades in on scroll ([data-reveal], off under reduced motion).
 */
export function SignalFeedExample({ className }: { className?: string }) {
  const c = home.sample.card;
  return (
    <figure className={className} aria-labelledby="example-notice">
      <div className="frame p-4 [--cut:22px] sm:p-7" style={{ boxShadow: "0 30px 100px -40px rgba(138,30,241,0.5)" }}>
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 sm:px-0">
          <p className="mono-label text-sm text-heading sm:text-base">{c.heading}</p>
          {/* Sized up so nobody mistakes these for real posts. */}
          <Badge size="lg" className="bg-accent/10">
            Example format
          </Badge>
        </div>
        <figcaption id="example-notice" className="mt-3 px-1 text-sm font-semibold text-accent-lighter sm:px-0">
          {home.sample.notice}
        </figcaption>

        <p className="mt-5 flex gap-2.5 border border-panel-line bg-bg/40 px-3 py-2.5 text-xs leading-relaxed text-body sm:text-[0.8125rem]">
          <span aria-hidden="true">📌</span>
          <span>
            <span className="font-semibold text-heading">{c.pinned.label}:</span> {c.pinned.text}
          </span>
        </p>

        <ol className="mt-2 divide-y divide-line border-b border-line">
          {c.posts.map((post, i) => (
            <li key={`${post.topic}-${i}`} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}>
              <Post post={post} n={i + 1} />
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

function Post({ post, n }: { post: ExamplePost; n: number }) {
  const c = home.sample.card;
  const id = `example-post-${n}`;
  return (
    <article aria-labelledby={id} className="py-5">
      {/* Phones: tier pill sits under the topic. 640px+: pill on the right. */}
      <header className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-2 px-1 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:px-0">
        <span aria-hidden="true" className="font-mono text-xs text-accent-light">
          {String(n).padStart(2, "0")}
        </span>
        <div>
          <p className="mono-label text-eyebrow">{c.topicLabel}</p>
          <h3 id={id} className="mt-1 font-sans text-base font-semibold normal-case tracking-normal text-heading">
            {post.topic}
          </h3>
        </div>
        <div className="col-start-2 justify-self-start sm:col-start-3 sm:justify-self-end sm:text-right">
          <p className="inline-block rounded-full border border-accent-light/50 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.6875rem] text-accent-lighter">
            <span className="sr-only">{c.tiersLabel}: </span>
            {post.tiers}
          </p>
          {post.tierNote ? <p className="mt-1 text-xs text-muted">{post.tierNote}</p> : null}
        </div>
      </header>

      {/* Telegram-style message: avatar, then the bubble. */}
      <div className="mt-3 flex items-start gap-2.5 sm:gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.5625rem] font-bold tracking-wider text-heading ring-1 ring-accent-light/60 sm:h-9 sm:w-9 sm:text-[0.6875rem]"
        >
          {c.avatar}
        </span>

        <div className="frame min-w-0 flex-1 p-3.5 [--cut:10px] sm:p-4" style={{ "--fill": "var(--bg-lift-2)" } as CSSProperties}>
          <p className="text-sm font-semibold leading-snug text-accent-lighter">{c.sender}</p>
          {post.media ? <Media media={post.media} /> : null}
          <div className="mt-2 text-[0.8125rem] leading-relaxed text-body sm:text-sm">
            {post.lines.map((line, i) => (
              <Line key={i} line={line} />
            ))}
          </div>
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

function Line({ line }: { line: PostLine }) {
  switch (line.kind) {
    case "title":
      return <p className="font-semibold text-heading">{line.text}</p>;
    case "bullet":
      return <p className="pl-1">• {line.text}</p>;
    case "note":
      return <p className="italic text-muted">{line.text}</p>;
    case "divider":
      return (
        <p aria-hidden="true" className="my-1 whitespace-nowrap text-muted">
          ───── ⋆⋅☆⋅⋆ ─────
        </p>
      );
    case "space":
      return <div aria-hidden="true" className="h-2" />;
    default:
      return <p>{line.text}</p>;
  }
}

function Media({ media }: { media: PostMedia }) {
  if (media.kind === "tpi") {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2 border border-panel-line bg-bg p-2 sm:gap-3 sm:p-3">
        {media.gauges.map((g) => (
          <Dial key={g.short} gauge={g} />
        ))}
      </div>
    );
  }
  return <Chart title={media.title} series={media.series} />;
}

/** Half-circle dial on a -1.00 to +1.00 scale, drawn in SVG. Fixed aspect ratio, so no layout shift. */
function Dial({ gauge }: { gauge: Gauge }) {
  const { value } = gauge;
  const cx = 60;
  const cy = 58;
  const r = 44;
  const angle = Math.PI * (1 - (value + 1) / 2);
  const nx = cx + (r - 8) * Math.cos(angle);
  const ny = cy - (r - 8) * Math.sin(angle);
  const positive = value >= 0;
  const number = `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;
  return (
    <div
      role="img"
      aria-label={`${gauge.title} (${gauge.short}), example value ${number}, ${gauge.state}, ${gauge.roc}`}
      className="min-w-0 text-center"
    >
      <p className="min-h-[2.5em] text-[0.625rem] font-semibold leading-tight text-heading sm:min-h-0 sm:text-[0.6875rem]">
        {gauge.title}
      </p>
      <svg aria-hidden="true" viewBox="0 0 120 70" className="mx-auto mt-1 block w-full max-w-[150px]">
        {/* Negative half (left) and positive half (right). */}
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`} fill="none" stroke="var(--down)" strokeOpacity="0.45" strokeWidth="8" />
        <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--up)" strokeOpacity="0.45" strokeWidth="8" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--fg-heading)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill="var(--accent-light)" />
        <text x={cx - r} y={cy + 10} textAnchor="middle" fontSize="8" fill="var(--fg-muted)">
          {gauge.low}
        </text>
        <text x={cx + r} y={cy + 10} textAnchor="middle" fontSize="8" fill="var(--fg-muted)">
          {gauge.high}
        </text>
      </svg>
      <p className={cn("font-mono text-sm font-semibold leading-none", positive ? "text-up" : "text-down")}>{number}</p>
      <p className="mt-1 text-[0.625rem] leading-tight text-body sm:text-[0.6875rem]">{gauge.state}</p>
      <p className="mt-1 inline-block border border-panel-line px-1.5 font-mono text-[0.5625rem] leading-relaxed text-muted sm:text-[0.625rem]">
        {gauge.roc}
      </p>
    </div>
  );
}

// Decorative example lines (not data).
const SERIES = {
  supply: {
    a: "M0 104 L32 102 L64 98 L96 99 L128 90 L160 84 L192 76 L224 70 L256 58 L288 50 L320 44",
    b: "M0 70 L32 74 L64 66 L96 72 L128 68 L160 74 L192 66 L224 70 L256 68 L288 72 L320 66",
  },
  zscore: {
    a: "M0 96 L32 108 L64 100 L96 82 L128 60 L160 40 L192 52 L224 74 L256 84 L288 70 L320 62",
    b: "M0 70 L320 70",
  },
} as const;

function Chart({ title, series }: { title: string; series: keyof typeof SERIES }) {
  const s = SERIES[series];
  return (
    <div role="img" aria-label={title} className="relative mt-3 aspect-[16/7] overflow-hidden border border-panel-line bg-bg">
      <svg aria-hidden="true" viewBox="0 0 320 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {[35, 70, 105].map((y) => (
          <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--panel-line)" strokeWidth="1" />
        ))}
        <path
          d={s.b}
          fill="none"
          stroke={series === "zscore" ? "var(--fg-muted)" : "var(--cyan)"}
          strokeWidth={series === "zscore" ? 1.5 : 2.5}
          strokeDasharray={series === "zscore" ? "4 4" : undefined}
        />
        <path d={s.a} fill="none" stroke="var(--accent-light)" strokeWidth="3" />
      </svg>
      <span className="absolute left-2 top-1.5 inline-flex items-center gap-1 font-mono text-[0.625rem] text-muted">
        <Icon name="trend" size={12} />
        Example chart
      </span>
    </div>
  );
}
