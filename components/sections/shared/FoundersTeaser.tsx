import { foundersPhoto, type Founder } from "@/content/about";
import { home } from "@/content/home";
import { isPlaceholder } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * One wide panel with each founder's name and role.
 * With `foundersPhoto` set it leads with the shared photo; without one it uses
 * initials tiles instead, so the section never needs a picture.
 */
export function FoundersTeaser({ founders }: { founders: Founder[] }) {
  const names = founders.map((f) => f.name).join(" and ");
  const c = home.founders;
  return (
    <article data-reveal className="frame frame-hover mx-auto max-w-5xl p-4 sm:p-5">
      {foundersPhoto ? (
        <PlaceholderImage
          src={foundersPhoto}
          alt={`${names}, co-founders of Investing Mastery Signals`}
          label={`[TODO: photo of ${names}]`}
          className="aspect-[4/3] sm:aspect-[16/9]"
          sizes="(min-width: 1024px) 1000px, 100vw"
        />
      ) : null}

      <ul className="grid gap-8 px-2 pb-3 pt-7 sm:grid-cols-2 sm:gap-10 sm:px-4">
        {founders.map((f) => (
          <li key={f.name} className="flex items-start gap-5">
            {foundersPhoto ? null : (
              <span
                aria-hidden="true"
                className="chamfer flex h-16 w-16 shrink-0 items-center justify-center bg-accent font-display text-2xl tracking-wide text-heading [--cut:12px] sm:h-20 sm:w-20 sm:text-3xl"
                style={{ backgroundImage: "linear-gradient(135deg, var(--accent) 0%, #5a12a8 100%)", boxShadow: "0 0 32px var(--accent-glow)" }}
              >
                {initials(f.name)}
              </span>
            )}
            <div className="min-w-0">
              <p className="mono-label text-accent-light">{f.role}</p>
              <h3 className="mt-3 text-h3">{f.name}</h3>
              {isPlaceholder(f.oneLiner) ? null : <p className="mt-2 text-body">{f.oneLiner}</p>}
            </div>
          </li>
        ))}
      </ul>

      <ul className="mx-2 mb-3 mt-4 grid gap-3 border-t border-panel-line pt-6 text-body sm:mx-4 sm:grid-cols-2 sm:gap-10">
        {c.facts.map((fact) => (
          <li key={fact} className="flex gap-3">
            <Icon name="check" size={20} className="mt-[0.2em] shrink-0 text-accent-light" />
            {fact}
          </li>
        ))}
      </ul>
    </article>
  );
}
