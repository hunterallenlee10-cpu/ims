import type { ReactNode } from "react";
import { howItWorks } from "@/content/how-it-works";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

/** A hidden value: a solid bar with a screen-reader label, so no number can pass for a live reading. */
function Redacted({ w = "w-24" }: { w?: string }) {
  return (
    <span className={cn("inline-block h-[1em] translate-y-[0.15em] bg-panel-line align-baseline", w)} role="img" aria-label="hidden value" />
  );
}

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
 * The structure of a signal post with every value hidden.
 * Labeled "Example format, not a real signal." wherever it appears.
 */
export function SignalPostExample({ numbered = false, className }: { numbered?: boolean; className?: string }) {
  const a = howItWorks.anatomy;
  const p = a.post;
  return (
    <figure className={className} aria-label={`Signal post structure. ${a.label}`}>
      <div
        className={cn("frame space-y-6 p-6 [--cut:22px] sm:p-8", numbered && "pl-7 sm:pl-10")}
        style={{ boxShadow: "0 30px 100px -40px rgba(138,30,241,0.5)" }}
      >
        <Block n={1} numbered={numbered}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="mono-label text-eyebrow">{p.signalLabel}</p>
              <p className="mt-1 font-semibold text-heading">{p.signalName}</p>
              <p className="mt-1 text-sm text-muted">
                {p.postedLabel}: <Redacted w="w-28" />
              </p>
            </div>
            <Badge>Example format</Badge>
          </div>
        </Block>

        <Block n={2} numbered={numbered}>
          <p className="mono-label text-eyebrow">{p.readingLabel}</p>
          <p className="mt-2 text-2xl font-semibold text-heading">
            <Redacted w="w-32" />
          </p>
        </Block>

        <Block n={3} numbered={numbered}>
          <p className="mono-label text-eyebrow">{p.changeLabel}</p>
          <p className="mt-2 border-l-2 border-accent-light pl-4 font-medium text-heading">
            {p.changeText} <Redacted w="w-16" /> {p.changeJoin} <Redacted w="w-16" />
          </p>
        </Block>

        <Block n={4} numbered={numbered}>
          <p className="mono-label text-eyebrow">{p.reasoningLabel}</p>
          <p className="mt-2 text-body">{p.reasoningText}</p>
          <p className="mt-3 space-y-2" aria-hidden="true">
            <span className="block h-2.5 w-full bg-panel-line/70" />
            <span className="block h-2.5 w-4/5 bg-panel-line/70" />
          </p>
        </Block>

        <p className="border-t border-line pt-4 text-xs text-muted">{p.footer}</p>
      </div>
      <figcaption className="mt-4 text-center text-sm font-semibold text-accent-light">{a.label}</figcaption>
    </figure>
  );
}
