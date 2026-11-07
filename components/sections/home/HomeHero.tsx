import fs from "node:fs";
import path from "node:path";
import { home } from "@/content/home";
import { DataWave } from "@/components/art/DataWave";
import { Glow } from "@/components/art/Glow";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TrustLine } from "@/components/ui/TrustLine";
import { HeroVideo } from "./HeroVideo";

// Uses public/media/hero.mp4 automatically if the file exists at build time.
const hasVideo = fs.existsSync(path.join(process.cwd(), "public/media/hero.mp4"));
const hasPoster = fs.existsSync(path.join(process.cwd(), "public/media/hero-poster.jpg"));

export function HomeHero() {
  const { hero } = home;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden pb-24 pt-[calc(var(--header-h)+3rem)] md:min-h-[94svh]"
    >
      {hasVideo ? (
        <>
          <HeroVideo src="/media/hero.mp4" poster={hasPoster ? "/media/hero-poster.jpg" : undefined} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/60 via-bg/70 to-bg" />
        </>
      ) : null}

      {/* Data-wave line art in the corners */}
      <DataWave
        seed={0.6}
        lines={11}
        opacity={0.55}
        duration={56}
        className="-right-[45%] -top-[8%] h-[520px] w-[1100px] max-w-none sm:-right-[25%] lg:-right-[12%] lg:-top-[14%]"
      />
      <DataWave
        seed={3.3}
        lines={9}
        opacity={0.4}
        duration={64}
        reverse
        className="-bottom-[10%] -left-[50%] h-[460px] w-[1000px] max-w-none sm:-left-[30%] lg:-left-[16%]"
      />
      <Glow className="left-1/2 top-[42%] h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2" strength={0.75} />

      <div className="container-site relative text-center">
        <Eyebrow tone="platinum" className="mb-6 sm:mb-8">
          {hero.eyebrow}
        </Eyebrow>
        <h1 id="hero-title" className="sheen mx-auto max-w-5xl text-[clamp(2.6rem,8.2vw,6.25rem)] leading-[1.02]">
          {hero.title}
        </h1>
        <p className="mt-5 font-accent text-[clamp(1.45rem,3vw,2.1rem)] italic leading-snug text-accent-light">
          {hero.tagline}
        </p>
        <p className="measure mx-auto mt-6 text-lg text-body md:text-xl">{hero.sentence}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href={hero.primary.href} size="lg" className="sm:min-w-52">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} size="lg" variant="secondary" className="sm:min-w-52">
            {hero.secondary.label}
          </Button>
        </div>
        <TrustLine className="mt-6" />
      </div>
    </section>
  );
}
