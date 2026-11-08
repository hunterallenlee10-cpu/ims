import type { ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Boxed disclaimer used at the end of every research post and on signal examples. */
export function DisclaimerBox({ children, className, title = "Disclaimer" }: { children?: ReactNode; className?: string; title?: string }) {
  return (
    <aside
      aria-label={title}
      className={cn("frame p-6 text-sm leading-relaxed text-muted sm:p-7", className)}
    >
      <p className="mono-label mb-3 text-accent-light">{title}</p>
      {children ?? <p>{site.disclaimer}</p>}
    </aside>
  );
}
