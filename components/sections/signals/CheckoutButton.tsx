"use client";

import { useEffect, useRef, useState } from "react";
import type { TierId } from "@/lib/tiers";
import { Button } from "@/components/ui/Button";

/**
 * Starts Stripe Checkout for one tier. Sends only the tier id; the server picks the price.
 * One attempt id per click sequence, so a double click reuses the same Checkout Session.
 */
export function CheckoutButton({
  tier,
  label,
  busyLabel,
  errorText,
  className,
}: {
  tier: TierId;
  label: string;
  busyLabel: string;
  errorText: string;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlight = useRef(false);

  // Coming back with the browser's Back button can restore a disabled button. Reset it.
  useEffect(() => {
    const reset = () => {
      inFlight.current = false;
      setBusy(false);
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  async function start() {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, attempt: crypto.randomUUID() }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || errorText);
      window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : errorText);
      inFlight.current = false;
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <Button size="lg" className="w-full" onClick={start} disabled={busy} busy={busy}>
        {busy ? busyLabel : label}
      </Button>
      <p role="alert" className="mt-3 min-h-0 text-sm text-accent-lighter empty:hidden">
        {error}
      </p>
    </div>
  );
}
