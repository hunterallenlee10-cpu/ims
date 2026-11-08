import type { ReactNode } from "react";
import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";

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

function Block({ n, children, className }: { n: number; children: ReactNode; className?: string }) {
  return (
    <div className={`relative pl-6 sm:pl-7 ${className ?? ""}`}>
      <Marker n={n} />
      <span className="sr-only">Callout {n}. </span>
      {children}
    </div>
  );
}

/** Annotated EXAMPLE signal post with numbered callouts. */
export function SignalAnatomy() {
  const c = howItWorks.anatomy;
  const p = c.post;
  return (
    <Section id="signal-anatomy" divider glow="right" aria-labelledby="anatomy-title">
      <SectionHeader id="anatomy-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <figure data-reveal aria-label="Example signal post. All values are made up.">
          <div
            className="frame space-y-6 p-6 pl-7 [--cut:22px] sm:p-8 sm:pl-10"
            style={{ boxShadow: "0 30px 100px -40px rgba(138,30,241,0.5)" }}
          >
            <Block n={1}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-heading">{p.header}</p>
                  <p className="text-sm text-muted">{p.timestamp}</p>
                </div>
                <Badge>{p.badge}</Badge>
              </div>
            </Block>

            <Block n={2}>
              <p className="border-l-2 border-accent-light pl-4 font-medium text-heading">{p.change}</p>
            </Block>

            <Block n={3}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] text-left text-sm">
                  <caption className="sr-only">Example inputs</caption>
                  <thead>
                    <tr className="border-b border-line text-eyebrow">
                      <th scope="col" className="py-2 pr-3 font-medium">Input</th>
                      <th scope="col" className="py-2 pr-3 font-medium">Value</th>
                      <th scope="col" className="py-2 font-medium">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.rows.map((r) => (
                      <tr key={r.input} className="border-b border-line/70 align-top">
                        <td className="py-2.5 pr-3 text-body">{r.input}</td>
                        <td className="py-2.5 pr-3 font-semibold text-heading tabular-nums">{r.value}</td>
                        <td className="py-2.5 text-muted">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Block>

            <Block n={4}>
              <p className="inline-flex rounded-site-sm border border-accent-light/60 bg-accent-light/10 px-3 py-2 text-sm font-semibold text-heading">
                {p.composite}
              </p>
            </Block>

            <Block n={5}>
              <p className="text-body">{p.reasoning}</p>
            </Block>

            <Block n={6}>
              <p className="text-body">{p.watching}</p>
            </Block>

            <p className="border-t border-line pt-4 text-xs text-muted">{p.disclaimer}</p>
          </div>
          <figcaption className="mt-4 text-center text-sm text-muted">
            <span className="mr-2 font-semibold uppercase tracking-[0.2em] text-accent-light">Example data.</span>
            Not a real or current signal.
          </figcaption>
        </figure>

        <ol className="space-y-6 self-center" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          {c.callouts.map((item) => (
            <li key={item.n} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-accent-light bg-accent font-mono text-xs font-semibold text-heading shadow-[inset_0_0_0_2px_var(--bg)]">
                {item.n}
              </span>
              <div>
                <h3 className="font-sans text-base font-semibold text-heading">{item.title}</h3>
                <p className="mt-1 text-body">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
