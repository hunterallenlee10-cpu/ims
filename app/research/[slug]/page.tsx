import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { research } from "@/content/research";
import { site } from "@/content/site";
import { formatDate, getAllSlugs, loadPost } from "@/lib/research";
import { pageMetadata } from "@/lib/metadata";
import { DataWave } from "@/components/art/DataWave";
import { Glow } from "@/components/art/Glow";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/shared/CtaBand";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadPost(slug);
  if (!loaded) return {};
  const base = pageMetadata({ title: loaded.post.title, description: loaded.post.summary, path: `/research/${slug}` });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: loaded.post.date, tags: loaded.post.tags },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const loaded = await loadPost(slug);
  if (!loaded) notFound();
  const { post, Content } = loaded;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/research/${post.slug}`,
  };

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden pb-12 pt-[calc(var(--header-h)+4rem)] md:pb-16 md:pt-[calc(var(--header-h)+6rem)]">
          <DataWave seed={5.1} lines={7} opacity={0.28} className="-right-[35%] -top-[20%] h-[400px] w-[900px] max-w-none" />
          <Glow className="left-1/2 top-1/3 h-[320px] w-[640px] max-w-[130vw] -translate-x-1/2" strength={0.5} />
          <div className="container-site">
            <div className="mx-auto max-w-[var(--measure)]">
              <Link href="/research" className="inline-flex min-h-11 items-center gap-2 text-sm text-accent-light hover:text-accent-lighter">
                <Icon name="arrowRight" size={16} className="rotate-180" />
                All research
              </Link>
              <h1 className="sheen mt-6 text-[clamp(2.1rem,5.5vw,3.6rem)] leading-[1.08]">{post.title}</h1>
              <p className="mt-5 text-lg text-body">{post.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
                <span aria-hidden="true">·</span>
                <ul className="flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((t) => (
                    <li key={t}>
                      <Link
                        href={`/research?tag=${encodeURIComponent(t)}`}
                        className="inline-flex min-h-8 items-center rounded-site-sm border border-line px-2 text-xs uppercase tracking-[0.15em] text-eyebrow hover:border-accent-light/70"
                      >
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <div className="container-site pb-20 md:pb-28">
          <div className="mx-auto max-w-[var(--measure)]">
            <div className="rule-gradient-r mb-12" aria-hidden="true" />
            <div className="prose">
              <Content />
            </div>
            <DisclaimerBox className="mt-16">
              <p>{research.disclaimer}</p>
            </DisclaimerBox>
          </div>
        </div>
      </article>
      <CtaBand title={research.articleCta.title} text={research.articleCta.text} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
