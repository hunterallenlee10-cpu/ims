import { NextResponse } from "next/server";
import { stripe, priceIdFor } from "@/lib/stripe";
import { isBilling, isTierId, lookupKeyFor } from "@/lib/tiers";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ATTEMPT = /^[A-Za-z0-9-]{8,64}$/;
const TELEGRAM_LABEL = "Telegram username (so we can approve your join request)";

function siteOrigin(request: Request): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, "");
}

/**
 * POST { tier, billing?, attempt } → { url }
 * The browser sends only a tier id and a billing period ("monthly" by default, or "yearly" where
 * offered). The server maps them to a Stripe Price by lookup_key.
 * Access is granted later from webhooks, never from this route or the success page.
 */
export async function POST(request: Request) {
  const limited = rateLimit(`checkout:${clientIp(request)}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let body: { tier?: unknown; billing?: unknown; attempt?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { tier, attempt } = body;
  const billing = body.billing ?? "monthly";
  if (!isTierId(tier)) return NextResponse.json({ error: "Unknown membership tier." }, { status: 400 });
  if (!isBilling(billing) || !lookupKeyFor(tier, billing)) {
    return NextResponse.json({ error: "That billing option isn't available for this tier." }, { status: 400 });
  }
  if (typeof attempt !== "string" || !ATTEMPT.test(attempt)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const origin = siteOrigin(request);
  try {
    const price = await priceIdFor(tier, billing);
    const session = await stripe().checkout.sessions.create(
      {
        mode: "subscription",
        line_items: [{ price, quantity: 1 }],
        custom_fields: [
          {
            key: "telegram_username",
            type: "text",
            optional: false,
            label: { type: "custom", custom: TELEGRAM_LABEL },
            text: { minimum_length: 5, maximum_length: 33 },
          },
        ],
        consent_collection: { terms_of_service: "required" },
        metadata: { tier, billing },
        subscription_data: { metadata: { tier, billing } },
        success_url: `${origin}/join/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/signals?canceled=1#pricing`,
        allow_promotion_codes: false,
        // Managed Payments (Stripe as merchant of record) is on by default for this account.
        // It doesn't allow custom_text, so the invite note lives on the success page instead.
        // Set STRIPE_MANAGED_PAYMENTS=false to turn it off for checkout (then IMS owes sales tax/VAT itself).
        ...(process.env.STRIPE_MANAGED_PAYMENTS === "false" ? { managed_payments: { enabled: false } } : {}),
      },
      { idempotencyKey: `checkout:${tier}:${billing}:${attempt}` },
    );
    if (!session.url) throw new Error("Checkout session has no URL");
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const e = err as { type?: string; code?: string; message?: string };
    console.error("[checkout] failed", { tier, billing, type: e.type, code: e.code, message: e.message });
    return NextResponse.json(
      { error: "Checkout is unavailable right now. Please try again, or contact support." },
      { status: 502 },
    );
  }
}
