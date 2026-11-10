import type { ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Boxed disclaimer: the required disclaimer plus the risk note, unless children are passed. */
export function DisclaimerBox({ children, className, title = "Disclaimer" }: { children?: ReactNode; className?: string; title?: string }) {
  return (
    <aside
      aria-label={title}
      className={cn("frame p-6 text-sm leading-relaxed text-muted sm:p-7", className)}
    >
      <p className="mono-label mb-3 text-accent-light">{title}</p>
      {children ?? (
        <>
          <p className="font-semibold text-heading">{site.disclaimer}</p>
          <p className="mt-2">{site.riskNote}</p>
        </>
      )}
    </aside>
  );
}
