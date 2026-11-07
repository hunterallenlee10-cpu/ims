import { howItWorks } from "@/content/how-it-works";
import { pageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/shared/PageHero";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { WhySystematic } from "@/components/sections/how/WhySystematic";
import { ThreeInputs } from "@/components/sections/how/ThreeInputs";
import { UpdateCadence } from "@/components/sections/how/UpdateCadence";
import { Delivery } from "@/components/sections/how/Delivery";
import { SignalAnatomy } from "@/components/sections/how/SignalAnatomy";
import { WhatItIsNot } from "@/components/sections/how/WhatItIsNot";

export const metadata = pageMetadata({ ...howItWorks.meta, path: "/how-it-works" });

// Each section is self-contained. Reorder by moving lines.
export default function HowItWorksPage() {
  const { hero, cta } = howItWorks;
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/signals" size="lg">
            Join Signals
          </Button>
          <Button href="#signal-anatomy" size="lg" variant="secondary">
            See an example signal
          </Button>
        </div>
      </PageHero>
      <WhySystematic />
      <ThreeInputs />
      <UpdateCadence />
      <Delivery />
      <SignalAnatomy />
      <WhatItIsNot />
      <CtaBand title={cta.title} text={cta.text} />
    </>
  );
}
