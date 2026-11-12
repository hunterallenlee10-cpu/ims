import { about, founders, type Founder } from "@/content/about";
import { isPlaceholder } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Monogram } from "@/components/ui/Monogram";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

/** Bio text that's been filled in (drops "[TODO: ...]" placeholders). */
const realBio = (f: Founder) => f.bio.filter((p) => !isPlaceholder(p));

/**
 * The founders. Once every founder has a photo, each gets a portrait row.
 * Until then it shows two cards with initials tiles, so the page never needs a picture.
 */
export function FounderBios() {
  const c = about.founders;
  const withPhotos = founders.every((f) => f.photo);
  return (
    <Section id="founders" tone="raised" divider glow="left" aria-labelledby="founders-title">
      <SectionHeader id="founders-title" eyebrow={c.eyebrow} title={c.title} subhead={c.subhead} />
      {withPhotos ? <PhotoRows /> : <Cards />}
    </Section>
  );
}

function Cards() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
      {founders.map((f, i) => {
        const bio = realBio(f);
        return (
          <article
            key={f.name}
            aria-labelledby={`founder-${i}`}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
            className="frame frame-hover p-7 [--cut:22px] sm:p-9"
          >
            <Monogram name={f.name} className="h-20 w-20 text-3xl [--cut:14px] sm:h-24 sm:w-24 sm:text-4xl" />
            <p className="mono-label mt-7 text-accent-light">{f.role}</p>
            <h3 id={`founder-${i}`} className="mt-3 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[0.95]">
              {f.name}
            </h3>
            {isPlaceholder(f.oneLiner) ? null : (
              <p className="mt-5 text-lg font-semibold leading-snug text-heading">{f.oneLiner}</p>
            )}
            {bio.length ? (
              <div className="mt-5 space-y-4 text-body">
                {bio.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function PhotoRows() {
  return (
    <div className="space-y-16 md:space-y-24">
      {founders.map((f, i) => (
        <article key={f.name} aria-labelledby={`founder-${i}`} className="grid items-center gap-8 md:grid-cols-[5fr_7fr] md:gap-14">
          <div data-reveal className={i % 2 === 1 ? "md:order-2" : undefined}>
            <PlaceholderImage
              src={f.photo}
              alt={`Portrait of ${f.name}`}
              label={`[TODO: photo of ${f.name}]`}
              className="mx-auto aspect-[4/5] max-w-md"
              sizes="(min-width: 768px) 440px, 100vw"
            />
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
            <p className="mono-label text-accent-light">{f.role}</p>
            <h3 id={`founder-${i}`} className="mt-3 text-h2">
              {f.name}
            </h3>
            {isPlaceholder(f.oneLiner) ? null : (
              <p className="mt-5 text-xl font-semibold leading-snug text-heading">{f.oneLiner}</p>
            )}
            <div className="measure mt-6 space-y-4 text-body">
              {realBio(f).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
