import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

import type { Post, PostMeta } from "./research-shared";

export type { Post, PostMeta } from "./research-shared";
export { formatDate } from "./research-shared";

const DIR = path.join(process.cwd(), "content/research");

function slugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readingMinutes(slug: string): number {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
  const body = raw.replace(/export const meta = \{[\s\S]*?\n\};/, "");
  const words = body.replace(/[#>*|`\-[\]]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function loadPost(slug: string): Promise<{ post: Post; Content: ComponentType } | null> {
  if (!slugs().includes(slug)) return null;
  const mod = (await import(`@/content/research/${slug}.mdx`)) as { default: ComponentType; meta: PostMeta };
  return { post: { ...mod.meta, slug, readingMinutes: readingMinutes(slug) }, Content: mod.default };
}

export async function getAllPosts(): Promise<Post[]> {
  const loaded = await Promise.all(slugs().map((s) => loadPost(s)));
  return loaded
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => p.post)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllSlugs(): string[] {
  return slugs();
}
