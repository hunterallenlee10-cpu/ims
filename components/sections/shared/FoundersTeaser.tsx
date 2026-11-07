import type { Founder } from "@/content/about";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

/** Two founder cards with photo slots and a one-line intro each. */
export function FoundersTeaser({ founders }: { founders: Founder[] }) {
  return (
    <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      {founders.map((f, i) => (
        <li key={f.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
          <article className="group h-full rounded-site border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent-light/70">
            <PlaceholderImage
              src={f.photo}
              alt={`Portrait of ${f.name}`}
              label={`[PHOTO: ${f.name}]`}
              className="aspect-[4/5]"
              sizes="(min-width: 640px) 420px, 100vw"
            />
            <div className="px-2 pb-3 pt-6">
              <p className="eyebrow text-accent-light">{f.role}</p>
              <h3 className="mt-2 text-h3">{f.name}</h3>
              <p className="mt-2 text-body">{f.oneLiner}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
