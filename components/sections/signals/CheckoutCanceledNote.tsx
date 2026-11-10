"use client";

import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

/** Friendly note shown when Stripe Checkout sends someone back with ?canceled=1. */
export function CheckoutCanceledNote({ text }: { text: string }) {
  const params = useSearchParams();
  if (params.get("canceled") !== "1") return null;
  return (
    <p
      role="status"
      className="mx-auto mb-10 flex max-w-3xl items-start gap-3 border border-accent-light/60 bg-accent-light/10 px-5 py-4 text-heading"
    >
      <Icon name="check" size={20} className="mt-0.5 shrink-0 text-accent-light" />
      {text}
    </p>
  );
}
