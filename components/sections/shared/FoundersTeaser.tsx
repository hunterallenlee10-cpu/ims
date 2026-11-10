import type { Founder } from "@/content/about";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

/** Two founder panels with photo slots and a one-line intro each. */
export function FoundersTeaser({ founders }: { founders: Founder[] }) {
  return (
    <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      {founders.map((f, i) => (
        <li key={f.name} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
          <article className="frame frame-hover h-full p-4">
            <PlaceholderImage
              src={f.photo}
              alt={`Portrait of ${f.name}`}
              label={`[TODO: photo of ${f.name}]`}
              className="aspect-[4/5]"
              sizes="(min-width: 640px) 420px, 100vw"
            />
            <div className="px-2 pb-3 pt-6">
              <p className="mono-label text-accent-light">{f.role}</p>
              <h3 className="mt-3 text-h3">{f.name}</h3>
              <p className="mt-2 text-body">{f.oneLiner}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
