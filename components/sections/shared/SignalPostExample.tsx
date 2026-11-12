import type { CSSProperties, ReactNode } from "react";
import { home, type ExamplePost } from "@/content/home";
import { howItWorks } from "@/content/how-it-works";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { tiersFor } from "./SignalFeedExample";

type ReadingPost = Extract<ExamplePost, { kind: "reading" }>;

function Marker({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center bg-accent font-mono text-xs font-semibold text-heading ring-4 ring-panel sm:-left-4 sm:h-7 sm:w-7"
    >
      {n}
    </span>
  );
}

function Block({ n, numbered, children }: { n: number; numbered: boolean; children: ReactNode }) {
  if (!numbered) return <div>{children}</div>;
  return (
    <div className="relative pl-6 sm:pl-7">
      <Marker n={n} />
      <span className="sr-only">Callout {n}. </span>
      {children}
    </div>
  );
}

/**
 * One example post, written the way it appears in Telegram, with optional numbered
 * callouts (1 name and time, 2 reading, 3 what changed, 4 reasoning).
 * Uses the same illustrative BTC DCA post as the home page card. Labeled as an example.
 */
export function SignalPostExample({ numbered = false, className }: { numbered?: boolean; className?: string }) {
  const a = howItWorks.anatomy;
  const p = a.post;
  const c = home.sample.card;
  const post = c.posts.find((x): x is ReadingPost => x.kind === "reading" && x.name === p.signalName);
  if (!post) return null;
  const { from, to, dir } = post.change;
  const up = dir === "up";

  return (
    <figure className={className} aria-label={`Signal post structure. ${a.label}`}>
      <article
        aria-labelledby="anatomy-post-name"
        className={cn("frame space-y-6 p-5 [--cut:22px] sm:p-8", numbered && "pl-7 sm:pl-10")}
        style={{ boxShadow: "0 30px 100px -40px rgba(138,30,241,0.5)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="mono-label text-sm text-heading sm:text-base">{c.heading.replace("posts", "post")}</p>
          <Badge size="lg" className="bg-accent/10">
            Example format
          </Badge>
        </div>

        <Block n={1} numbered={numbered}>
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.625rem] font-bold tracking-wider text-heading ring-1 ring-accent-light/60"
            >
              {c.avatar}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-2 text-sm leading-snug">
                <span className="font-semibold text-accent-lighter">{c.sender}</span>
                <span className="font-mono text-xs text-accent-lighter/90">{post.tag}</span>
              </p>
              <p className="mt-2 mono-label text-eyebrow">{p.signalLabel}</p>
              <p id="anatomy-post-name" className="mt-1 font-semibold text-heading">
                {p.signalName}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
                <span>
                  {p.postedLabel}:{" "}
                  <time dateTime={post.time.datetime} className="font-mono text-body">
                    {post.time.label}
                  </time>
                </span>
                <span className="rounded-full border border-accent-light/50 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.6875rem] text-accent-lighter">
                  <span className="sr-only">{c.tiersLabel}: </span>
                  {tiersFor(post.match).join(" · ")}
                </span>
              </p>
            </div>
          </div>
        </Block>

        <div
          className="frame space-y-6 p-4 [--cut:12px] sm:p-5"
          style={{ "--fill": "var(--bg-lift-2)" } as CSSProperties}
        >
          <Block n={2} numbered={numbered}>
            <p className="mono-label text-eyebrow">{p.readingLabel}</p>
            <p className="mt-2 font-mono text-xl font-semibold text-heading sm:text-2xl">{post.reading}</p>
          </Block>

          <Block n={3} numbered={numbered}>
            <p className="mono-label text-eyebrow">{p.changeLabel}</p>
            <p className="mt-2 border-l-2 border-accent-light pl-4 font-mono text-sm text-heading sm:text-base">
              <span className="text-muted">{from}</span>{" "}
              <span aria-hidden="true" className="text-muted">
                →
              </span>
              <span className="sr-only">to</span>{" "}
              <span className={cn("whitespace-nowrap font-semibold", up ? "text-up" : "text-down")}>
                <span aria-hidden="true">{up ? "↑" : "↓"}</span>
                <span className="sr-only">{up ? "(up)" : "(down)"}</span> {to}
              </span>
            </p>
          </Block>

          <Block n={4} numbered={numbered}>
            <p className="mono-label text-eyebrow">{p.reasoningLabel}</p>
            <p className="mt-2 text-body">{post.body}</p>
          </Block>
        </div>

        <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">{c.footer}</p>
      </article>
      <figcaption className="mt-4 text-center text-sm font-semibold text-accent-light">{a.label}</figcaption>
    </figure>
  );
}
