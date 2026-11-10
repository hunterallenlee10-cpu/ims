import { Fragment, type ReactNode } from "react";

/**
 * Headline formatting used by content files:
 *   *words*  → accent color (the highlighted line or word)
 *   \n       → line break (headlines are written as two short lines)
 * `tone="light"` uses #B946FB, `tone="strong"` uses #8A1EF1 (large text only).
 */
export function renderAccent(text: string, tone: "strong" | "light" = "light"): ReactNode {
  const lines = text.split("\n");
  return lines.map((line, li) => (
    <Fragment key={li}>
      {li > 0 ? <br /> : null}
      {line
        .split(/(\*[^*]+\*)/g)
        .filter(Boolean)
        .map((part, i) =>
          part.startsWith("*") && part.endsWith("*") ? (
            <span key={i} className={tone === "strong" ? "text-accent" : "text-accent-light"}>
              {part.slice(1, -1)}
            </span>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        )}
    </Fragment>
  ));
}

/** Body copy formatting: **words** become bold platinum emphasis. */
export function renderRich(text: string): ReactNode {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-heading">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

/** Plain-text version (for metadata, aria labels). */
export function stripAccent(text: string): string {
  return text.replace(/\*/g, "").replace(/\n/g, " ");
}

/** Plain-text version of body copy (for structured data): drops ** and * markers and line breaks. */
export function plainText(text: string): string {
  return text.replace(/\*+/g, "").replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim();
}
