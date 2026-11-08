import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/** Short line of true claims under a main CTA, each with a check. */
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
        "flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-body",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
      aria-label="What to expect"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Icon name="check" size={16} className="text-accent-light" />
          {item}
        </li>
      ))}
    </ul>
  );
}
