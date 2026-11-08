import { cn } from "@/lib/cn";
import { renderAccent, renderRich } from "@/lib/accent";
import type { IconName } from "./Icon";
import { Chip } from "./Chip";

/**
 * Label → two-line condensed headline (second line in purple) → muted subhead.
 * Pass `chip` to show a boxed label chip instead of the plain spaced label.
 * Title formatting: "First line.\n*Second line.*"   Subhead: **bold** for emphasis.
 */
export function SectionHeader({
  eyebrow,
  title,
  subhead,
  align = "center",
  id,
  as: Tag = "h2",
  chip,
  chipIcon,
  className,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  align?: "center" | "left";
  id?: string;
  as?: "h1" | "h2";
  chip?: { tag?: string; variant?: "split" | "icon" };
  chipIcon?: IconName;
  className?: string;
}) {
  return (
    <header
      data-reveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        chip ? (
          <Chip className="mb-6" label={eyebrow} tag={chip.tag} variant={chip.variant ?? "split"} icon={chipIcon} />
        ) : (
          <p className="eyebrow mb-5 tracking-[0.4em] text-accent-light">{eyebrow}</p>
        )
      ) : null}
      <Tag id={id} className={Tag === "h1" ? "text-h1" : "text-h2"}>
        {renderAccent(title)}
      </Tag>
      {subhead ? (
        <p className={cn("measure mt-6 text-lg text-muted", align === "center" && "mx-auto")}>{renderRich(subhead)}</p>
      ) : null}
    </header>
  );
}
