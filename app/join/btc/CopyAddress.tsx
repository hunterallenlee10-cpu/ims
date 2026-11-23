"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** Copies the BTC address to the clipboard. The address itself is always visible as text too. */
export function CopyAddress({ address, label, copiedLabel }: { address: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="secondary"
      className="mt-4"
      onClick={() => {
        navigator.clipboard?.writeText(address).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          },
          () => setCopied(false),
        );
      }}
    >
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </Button>
  );
}
