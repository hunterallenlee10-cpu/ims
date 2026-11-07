import { NextResponse } from "next/server";

// Contact form endpoint (stub).
// TODO: send messages somewhere. Two easy options:
//   1. Set CONTACT_WEBHOOK_URL in Vercel (e.g. an n8n, Zapier or Make webhook) and
//      every message is POSTed there as JSON. This is already wired up below.
//   2. Replace the webhook block with an email provider (e.g. Resend) call.

type Payload = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot filled in: pretend success, drop the message.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 320) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!name || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please fill in every field." }, { status: 422 });
  }

  const entry = { name, email, message, receivedAt: new Date().toISOString(), source: "website-contact" };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] webhook failed", err);
      return NextResponse.json({ ok: false, error: "Could not deliver message." }, { status: 502 });
    }
  } else {
    // TODO: no target configured yet. Messages only reach the server log.
    console.info("[contact] new message (no CONTACT_WEBHOOK_URL set)", { name, email, length: message.length });
  }

  return NextResponse.json({ ok: true });
}
