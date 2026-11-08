import { Icon } from "@/components/ui/Icon";

type Side = { title: string; points: string[] };

/** "Their way vs our way": plain outlined column, square VS badge, purple-bordered panel. */
export function VsCompare({
  theirs,
  ours,
  labels = { theirs: "Their way", ours: "Our way" },
}: {
  theirs: Side;
  ours: Side;
  labels?: { theirs: string; ours: string };
}) {
  return (
    <div className="relative grid gap-5 md:grid-cols-2 md:gap-8">
      <div data-reveal className="frame p-7 [--fill:var(--bg)] sm:p-9">
        <p className="mono-label mb-5 text-muted">{labels.theirs}</p>
        <h3 className="text-h3 text-body">{theirs.title}</h3>
        <ul className="mt-7 space-y-4">
          {theirs.points.map((p) => (
            <li key={p} className="flex gap-3 text-muted">
              <Icon name="close" size={18} className="mt-[0.25em] shrink-0 text-muted/70" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden="true"
        className="relative z-10 mx-auto -my-9 flex h-14 w-14 items-center justify-center border-2 border-accent-light bg-bg font-display text-xl text-heading md:absolute md:left-1/2 md:top-1/2 md:my-0 md:-translate-x-1/2 md:-translate-y-1/2"
        style={{ boxShadow: "0 0 32px rgba(138,30,241,0.45)" }}
      >
        VS
      </div>

      <div
        data-reveal
        style={{ ["--reveal-delay" as string]: "120ms" }}
        className="frame frame-accent p-7 [--fill:var(--bg-lift-2)] sm:p-9"
      >
        <p className="mono-label mb-5 text-accent-light">{labels.ours}</p>
        <h3 className="text-h3">{ours.title}</h3>
        <ul className="mt-7 space-y-4">
          {ours.points.map((p) => (
            <li key={p} className="flex gap-3 text-body">
              <Icon name="check" size={20} className="mt-[0.2em] shrink-0 text-accent-light" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
