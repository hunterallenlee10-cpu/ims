import Image from "next/image";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * Shows the real image when `src` is set, otherwise a labeled slot
 * (e.g. "[PHOTO: Hunter Lee]") so missing media is obvious.
 */
export function PlaceholderImage({
  src,
  alt,
  label,
  className,
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority,
}: {
  src?: string | null;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden border border-panel-line bg-panel", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(18,39,59,.9), rgba(13,23,36,1) 70%)",
          }}
        >
          <Icon name="user" size={40} className="text-accent-light/70" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{label}</span>
        </div>
      )}
    </div>
  );
}
