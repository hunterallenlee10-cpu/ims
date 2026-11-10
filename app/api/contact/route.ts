import { NextResponse } from "next/server";

// Contact form endpoint. Every message is POSTed as JSON to CONTACT_WEBHOOK_URL
// (e.g. an n8n webhook). Without it the endpoint returns 503 so nothing is lost silently.

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
    // No delivery target configured. Fail loudly instead of telling the visitor the
    // message arrived when nobody will see it. [TODO: set CONTACT_WEBHOOK_URL in Vercel]
    console.error("[contact] CONTACT_WEBHOOK_URL is not set; message not delivered", { length: message.length });
    return NextResponse.json({ ok: false, error: "Contact form is not connected yet." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
