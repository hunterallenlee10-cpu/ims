import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { home } from "@/content/home";
import { renderAccent, renderRich } from "@/lib/accent";
import { DataWave } from "@/components/art/DataWave";
import { LogoMark } from "@/components/brand/Wordmark";
import { Glow } from "@/components/art/Glow";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CtaArrows } from "@/components/ui/CtaArrows";
import { Icon } from "@/components/ui/Icon";
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
      className="relative isolate flex min-h-[calc(92svh-var(--header-h))] items-center overflow-hidden border-b border-panel-line pb-20 pt-14"
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
        opacity={0.5}
        duration={56}
        className="-right-[45%] -top-[8%] h-[520px] w-[1100px] max-w-none sm:-right-[25%] lg:-right-[12%] lg:-top-[14%]"
      />
      <DataWave
        seed={3.3}
        lines={9}
        opacity={0.38}
        duration={64}
        reverse
        className="-bottom-[10%] -left-[50%] h-[460px] w-[1000px] max-w-none sm:-left-[30%] lg:-left-[16%]"
      />
      <Glow className="left-1/2 top-[40%] h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2" strength={0.7} />

      <div className="container-site relative text-center">
        <LogoMark
          priority
          className="mx-auto mb-8 h-16 drop-shadow-[0_0_28px_rgba(138,30,241,0.45)] sm:h-20"
        />
        <Chip tag={hero.chipTag} label={hero.eyebrow} className="mb-8" />
        <h1 id="hero-title" className="sheen mx-auto max-w-6xl text-[clamp(3.2rem,9.6vw,7.6rem)] leading-[0.92]">
          {renderAccent(hero.title)}
        </h1>
        <p className="measure mx-auto mt-8 text-xl leading-relaxed text-body md:text-[1.4rem]">{renderRich(hero.sentence)}</p>
        <div className="mt-10 flex justify-center">
          <CtaArrows>
            <Button href={hero.primary.href} size="lg" className="sm:min-w-52">
              {hero.primary.label}
            </Button>
          </CtaArrows>
        </div>
        <TrustLine className="mt-7" />
        <Link
          href={hero.secondary.href}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-light hover:text-accent-lighter"
        >
          {hero.secondary.label}
          <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </section>
  );
}
