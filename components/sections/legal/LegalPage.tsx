import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { legalDraftNotice, legalPages, type LegalSlug } from "@/content/legal";
import { slugify } from "@/lib/slug";
import { Glow } from "@/components/art/Glow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";

function headings(slug: LegalSlug) {
  const raw = fs.readFileSync(path.join(process.cwd(), "content/legal", `${slug}.mdx`), "utf8");
  return [...raw.matchAll(/^## (.+)$/gm)].map((m) => ({ text: m[1].trim(), id: slugify(m[1].trim()) }));
}

/** Shared layout for legal documents: DRAFT banner, title, last updated, contents, prose. */
export function LegalPage({ slug, Content }: { slug: LegalSlug; Content: ComponentType }) {
  const page = legalPages[slug];
  const toc = headings(slug);
  return (
    <article className="relative isolate overflow-x-clip pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-32 md:pt-[calc(var(--header-h)+5rem)]">
      <Glow className="left-1/2 top-0 h-[320px] w-[700px] max-w-[130vw] -translate-x-1/2" strength={0.45} />
      <div className="container-site">
        <p
          role="note"
          className="mb-10 rounded-site border border-accent-light/60 bg-accent-light/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-heading"
        >
          {legalDraftNotice}
        </p>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Contents">
              <Eyebrow className="mb-4">Contents</Eyebrow>
              <ol className="space-y-1 border-l border-line">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="-ml-px flex min-h-9 items-center border-l border-transparent pl-4 text-sm text-body transition-colors hover:border-accent-light hover:text-heading">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div>
            <Eyebrow tone="platinum" className="mb-4">Legal</Eyebrow>
            <h1 className="sheen text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08]">{page.title}</h1>
            <p className="mt-4 text-sm text-muted">Last updated: {page.updated}</p>
            <div className="rule-gradient-r my-10" aria-hidden="true" />
            <div className="prose">
              <Content />
            </div>
            <DisclaimerBox className="mt-16 max-w-[var(--measure)]" title="Summary" />
          </div>
        </div>
      </div>
    </article>
  );
}
