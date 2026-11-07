import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { Timeline } from "@/components/sections/about/Timeline";
import { FounderBios } from "@/components/sections/about/FounderBios";
import { Principles } from "@/components/sections/about/Principles";

export const metadata = pageMetadata({ ...about.meta, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.hero.eyebrow} title={about.hero.title} intro={about.hero.intro} />
      <Timeline />
      <FounderBios />
      <Principles />
      <CtaBand />
    </>
  );
}
