import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Short line of true claims under a main CTA. */
export function TrustLine({
  items = site.trustLine,
  className,
  align = "center",
}: {
  items?: readonly string[];
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
      aria-label="What to expect"
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 ? (
            <span aria-hidden="true" className="text-accent-light">
              ·
            </span>
          ) : null}
          {item}
        </li>
      ))}
    </ul>
  );
}
