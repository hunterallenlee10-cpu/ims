import Link from "next/link";
import { formatDate, type Post } from "@/lib/research-shared";
import { Icon } from "@/components/ui/Icon";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex h-full flex-col rounded-site border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent-light/70 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="clock" size={15} className="text-accent-light" />
          {post.readingMinutes} min read
        </span>
      </div>
      <h2 className="mt-4 text-h3">
        <Link href={`/research/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-body">{post.summary}</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {post.tags.map((t) => (
            <li key={t} className="rounded-site-sm border border-line px-2 py-0.5 text-xs uppercase tracking-[0.15em] text-eyebrow">
              {t}
            </li>
          ))}
        </ul>
        <Icon name="arrowRight" size={20} className="shrink-0 text-accent-light transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </article>
  );
}
