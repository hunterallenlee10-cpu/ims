import { foundersPhoto, type Founder } from "@/content/about";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

/** One wide panel: a shared photo of both founders, then each founder's name and one-line intro. */
export function FoundersTeaser({ founders }: { founders: Founder[] }) {
  const names = founders.map((f) => f.name).join(" and ");
  return (
    <article data-reveal className="frame frame-hover mx-auto max-w-5xl p-4 sm:p-5">
      <PlaceholderImage
        src={foundersPhoto}
        alt={`${names}, co-founders of Investing Mastery Signals`}
        label={`[TODO: photo of ${names}]`}
        className="aspect-[4/3] sm:aspect-[16/9]"
        sizes="(min-width: 1024px) 1000px, 100vw"
      />
      <ul className="grid gap-8 px-2 pb-3 pt-7 sm:grid-cols-2 sm:gap-10 sm:px-4">
        {founders.map((f) => (
          <li key={f.name}>
            <p className="mono-label text-accent-light">{f.role}</p>
            <h3 className="mt-3 text-h3">{f.name}</h3>
            <p className="mt-2 text-body">{f.oneLiner}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
