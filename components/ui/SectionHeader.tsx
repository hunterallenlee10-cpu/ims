import { cn } from "@/lib/cn";
import { renderAccent } from "@/lib/accent";
import { Eyebrow } from "./Eyebrow";

/**
 * Eyebrow → Cinzel headline (key word in *asterisks* turns purple) → one-line muted subhead.
 */
export function SectionHeader({
  eyebrow,
  title,
  subhead,
  align = "center",
  id,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  align?: "center" | "left";
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <header
      data-reveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={Tag === "h1" ? "text-h1" : "text-h2"}>
        {renderAccent(title)}
      </Tag>
      {subhead ? (
        <p className={cn("mt-5 text-muted", align === "center" && "mx-auto", "measure")}>{subhead}</p>
      ) : null}
    </header>
  );
}
