import { home } from "@/content/home";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { Redacted } from "./SignalPostExample";

/**
 * Home-page card: one example post per signal, stacked top to bottom
 * (Portfolio, BTC DCA, TPI, Investing Analysis). Every value is hidden.
 */
export function SignalFeedExample({ className }: { className?: string }) {
  const c = home.sample.card;
  return (
    <figure className={className} aria-label={`Example signal posts. ${c.caption}`}>
      <div
        className="frame p-6 [--cut:22px] sm:p-8"
        style={{ boxShadow: "0 30px 100px -40px rgba(138,30,241,0.5)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="mono-label text-eyebrow">{c.heading}</p>
          <Badge>Example format</Badge>
        </div>

        <ol className="mt-5 divide-y divide-line border-y border-line">
          {c.posts.map((post, i) => (
            <li key={post.name} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="font-mono text-xs text-accent-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="mono-label text-eyebrow">{post.label}</p>
                    <p className="mt-1 font-semibold text-heading">{post.name}</p>
                  </div>
                </div>
                <p className="text-sm text-muted">
                  {c.postedLabel}: <Redacted w="w-20" />
                </p>
              </div>

              <div className="mt-3 pl-7 text-sm">
                {post.kind === "reading" ? (
                  <p className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    <span className="text-muted">
                      {c.readingLabel}: <Redacted w="w-16" />
                    </span>
                    <span className="border-l-2 border-accent-light pl-3 font-medium text-heading">
                      {c.changeText} <Redacted w="w-12" /> {c.changeJoin} <Redacted w="w-12" />
                    </span>
                  </p>
                ) : (
                  <p className="text-muted">
                    {c.topicLabel}: <Redacted w="w-40" />
                  </p>
                )}
                <span aria-hidden="true" className="mt-3 block space-y-1.5">
                  <span className="block h-2 w-full bg-panel-line/70" />
                  <span className={cn("block h-2 bg-panel-line/70", post.kind === "analysis" ? "w-11/12" : "w-3/4")} />
                  {post.kind === "analysis" ? <span className="block h-2 w-2/3 bg-panel-line/70" /> : null}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <p className="pt-4 text-xs text-muted">{c.footer}</p>
      </div>
      <figcaption className="mt-4 text-center text-sm font-semibold text-accent-light">{c.caption}</figcaption>
    </figure>
  );
}
