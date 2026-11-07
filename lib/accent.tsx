import { Fragment, type ReactNode } from "react";

/**
 * Turns "Rules, not *opinions*" into text with the starred word in the accent.
 * Content files use *asterisks* to mark the one key word in a headline.
 * `tone="light"` uses the lighter purple, for small or mid-size text.
 */
export function renderAccent(text: string, tone: "strong" | "light" = "strong"): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className={tone === "strong" ? "text-accent" : "text-accent-light"}>
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Plain-text version (for metadata, aria labels). */
export function stripAccent(text: string): string {
  return text.replace(/\*/g, "");
}
