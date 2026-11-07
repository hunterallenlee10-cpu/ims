"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Post } from "@/lib/research-shared";
import { cn } from "@/lib/cn";
import { PostCard } from "./PostCard";

/** Tag filter driven by ?tag= so filtered views can be linked to. */
export function ResearchIndex({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const params = useSearchParams();
  const active = params.get("tag");
  const visible = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  const chip = (label: string, href: string, on: boolean) => (
    <Link
      key={label}
      href={href}
      scroll={false}
      aria-current={on ? "true" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center rounded-site-sm border px-4 text-sm capitalize transition-colors",
        on ? "border-accent-light bg-accent-light/10 text-heading" : "border-line text-body hover:border-accent-light/70 hover:text-heading",
      )}
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav aria-label="Filter by tag" className="mb-10 flex flex-wrap gap-2">
        {chip("All", "/research", !active)}
        {tags.map((t) => chip(t, `/research?tag=${encodeURIComponent(t)}`, active === t))}
      </nav>
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "note" : "notes"} shown
      </p>
      {visible.length ? (
        <ul className="grid gap-5 md:grid-cols-2">
          {visible.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No notes with this tag yet.</p>
      )}
    </>
  );
}
