import { Suspense } from "react";
import { research } from "@/content/research";
import { getAllPosts } from "@/lib/research";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { PostCard } from "@/components/sections/research/PostCard";
import { ResearchIndex } from "@/components/sections/research/ResearchIndex";

export const metadata = pageMetadata({ ...research.meta, path: "/research" });

export default async function ResearchPage() {
  const posts = await getAllPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  return (
    <>
      <PageHero eyebrow={research.hero.eyebrow} title={research.hero.title} intro={research.hero.intro} />
      <Section className="!pt-4 md:!pt-8" aria-label="Research notes">
        <Suspense
          fallback={
            <ul className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          }
        >
          <ResearchIndex posts={posts} tags={tags} />
        </Suspense>
      </Section>
      <CtaBand title={research.articleCta.title} text={research.articleCta.text} />
    </>
  );
}
