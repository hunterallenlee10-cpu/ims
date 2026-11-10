# Stripe subscription checkout: plan

Status: **Phase 1 (plan). Waiting for Hunter's approval before any Stripe code is written.**

Stripe account: `acct_1Ua6qPRj5B5P2Oab` (IMS, owned by Hunter). All work below happens in **test mode (sandbox)**. Going live is Hunter's job (Phase 7).

Rules that apply everywhere:

- No secret keys, webhook secrets or bot tokens in code, this file, issues, commits or logs. They live only in `.env.local` (gitignored), Vercel env vars, and n8n credentials.
- The browser never sends a price or amount. It sends only a tier id (`core`, `pro`, `champion`); the server maps it to a Stripe Price by `lookup_key`.
- Access is granted from webhooks, never from the success page.
- Champion stays blocked until `CHAMPION_CHECKOUT_ENABLED=true`, which only Hunter sets.

---

## 1. Decisions needed from Hunter

| # | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | Webhook destination | (a) Stripe → n8n directly · (b) Next.js route `/api/stripe/webhook` | **(a) n8n.** See §6. |
| D2 | Telegram delivery | Option 1 manual · Option 2 bot | **Ship Option 1 first, then Option 2.** See §7. |
| D3 | Checkout field label | Stripe limits a custom field label to 50 characters; the requested label is 55 | Label `Telegram username (for your join request)` (41) plus a line above the Pay button: "We use your Telegram username to approve your request to join the group." |
| D4 | Members without a Telegram username | Telegram usernames are optional, and the approval check needs one | Copy tells buyers to set one first (Telegram → Settings → Username). Mismatches go to the admins. |
| D5 | Proration on Core ↔ Pro | Prorate immediately · switch at next renewal | `[TODO: prorate immediately vs. switch at next renewal — Hunter decides]` |
| D6 | After all payment retries fail | Cancel subscription · mark unpaid | `[TODO: cancel subscription vs. mark unpaid — default cancel]` |
| D7 | Upgrade Core → Pro: remove from Core group? | Yes · No | `[TODO: confirm]` |
| D8 | Invite link lifetime (Option 2) | e.g. 24 h, 72 h, 7 days | 72 hours, re-sent by the daily sweep if unused |
| D9 | Member email sender | Domain email via an email provider | `[TODO: sender address, ideally a domain email]` |
| D10 | Admin alerts channel | Telegram DM from the bot · email · both | Telegram DM to both admins (fast), email as backup |

---

## 2. Where each credential comes from

| Credential | Where in Stripe (or elsewhere) | Who handles it |
|---|---|---|
| Test secret key `sk_test_…` | Dashboard → switch to sandbox → Developers → API keys | Hunter enters it in the secure credential form (it is never pasted in chat), in `.env.local`, and in Vercel Preview |
| Live secret key `sk_live_…` | Dashboard (live) → Developers → API keys | Hunter only, in Vercel Production. Never in this session |
| Webhook signing secret `whsec_…` | Created with the webhook endpoint (Developers → Webhooks → endpoint → Signing secret), or by n8n's Stripe Trigger node | Hunter, into the n8n Stripe credential (option a) or Vercel (option b) |
| Customer portal login link `https://billing.stripe.com/p/login/…` | Settings → Billing → Customer portal → "Login link" (also returned by the API when the portal configuration enables `login_page`) | Public URL, safe in env (`NEXT_PUBLIC_STRIPE_PORTAL_URL`) |
| Telegram bot token (Option 2) | Telegram → @BotFather → /newbot | Hunter, into the n8n Telegram credential (or Vercel, option b) |
| Email provider key | The chosen email provider, or n8n's Gmail/SMTP credential | Hunter |

**Account check before anything else:** with the test key, call `GET /v1/account` and confirm `id = acct_1Ua6qPRj5B5P2Oab`. Note: Stripe's newer *sandboxes* can report their own account id, separate from the live account. If the id doesn't match, I stop and ask before doing anything.

---

## 3. Environment variables

`.env.example` (committed, placeholders only) lists every variable.

| Variable | Test (Preview / `.env.local`) | Live (Production) | Used by |
|---|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` | `sk_live_…` | Server only: `/api/checkout`, setup script, webhook route (option b) |
| `STRIPE_WEBHOOK_SECRET` | test endpoint `whsec_…` | live endpoint `whsec_…` | Option (b) only. With option (a) it lives in n8n |
| `NEXT_PUBLIC_STRIPE_PORTAL_URL` | test portal login link | live portal login link | Manage membership links |
| `NEXT_PUBLIC_SITE_URL` | preview URL | `https://<domain>` | success/cancel URLs, canonical URLs |
| `CHAMPION_CHECKOUT_ENABLED` | `false` | `false` until Hunter clears it | `/api/checkout` |
| `TELEGRAM_BOT_TOKEN` | test bot token | live bot token | Option 2, option (b) only |
| `TELEGRAM_CORE_CHAT_ID`, `TELEGRAM_MAIN_CHAT_ID` | test group ids | real group ids | Option 2, option (b) only |
| `TELEGRAM_ADMIN_CHAT_IDS` | Hunter's and Aaron's chat ids | same | admin alerts, option (b) only |
| `CONTACT_WEBHOOK_URL` | n8n test webhook | n8n production webhook | contact form |

No publishable key is needed: Checkout runs as a server-side redirect.

---

## 4. Products and prices (test mode)

Created by `scripts/stripe-setup.ts`. It is idempotent: it looks each price up by `lookup_key` first and only creates what's missing, so running it twice creates nothing new. Moving to live means re-running the script with the live key. No code changes.

| Product | Description (facts only) | Price | `lookup_key` | Metadata |
|---|---|---|---|---|
| IMS Core | The Portfolio Signal only, in the read-only "Core Members - SIGNAL ONLY" Telegram group. | $25.00 USD / month | `ims_core_monthly` | `tier=core` |
| IMS Pro | All IMS signals (Portfolio Signal, IMS Signals, BTC DCA Signal, Trend Probability), a weekly research note, a macro and liquidity briefing, method notes, and full access to the main "Investing Mastery Signals" Telegram group. | $50.00 USD / month | `ims_pro_monthly` | `tier=pro` |
| IMS Champion | Everything in Pro | $399.00 USD / month | `ims_champion_monthly` | `tier=champion` |

- Tax code: `[TODO: Stripe product tax code for a digital subscription; required if Managed Payments is approved]`.
- Recorded IDs (test mode; filled in during Phase 2):

| Product | Product ID | Price ID |
|---|---|---|
| IMS Core | – | – |
| IMS Pro | – | – |
| IMS Champion | – | – |

---

## 5. Routes and files

| File | Change |
|---|---|
| `package.json` | add `stripe` (server only) |
| `.env.example` | new: every variable above, placeholder values |
| `scripts/stripe-setup.ts` | new: idempotent products, prices and customer portal configuration. Runs with `node scripts/stripe-setup.ts` (Node 22.18+ runs TypeScript directly) |
| `lib/stripe.ts` | new: `server-only` Stripe client, `tierToLookupKey`, `priceForTier()` (cached lookup by `lookup_key`) |
| `lib/rate-limit.ts` | new: simple per-IP fixed-window limit (in memory, per server instance; good enough to stop double-clicks and casual abuse) |
| `app/api/checkout/route.ts` | new: `POST { tier }` → `{ url }` |
| `components/sections/signals/CheckoutButton.tsx` | new: client button; posts the tier, disables itself while in flight, redirects to `url`, shows an inline error |
| `content/signals.ts` | Core/Pro CTAs switch from the `[TODO]` href to the checkout button |
| `app/join/success/page.tsx` | new: "payment received" page (does not grant access), `noindex` |
| `app/api/stripe/webhook/route.ts` | new, **only with option (b)** |
| `app/api/cron/reconcile/route.ts` + `vercel.json` cron | new, **only with option (b)** |
| `STRIPE.md` | kept up to date: IDs, test results, checklist |

### `POST /api/checkout`

1. Rate limit per IP: 5 requests/minute. Over the limit → `429` with `Retry-After`.
2. Parse `{ tier, attempt }`. `tier` must be `core | pro | champion`, otherwise `400`. `attempt` is a random id the button generates once per click sequence.
3. `champion` → `403` unless `CHAMPION_CHECKOUT_ENABLED === "true"`.
4. Resolve the price with `stripe.prices.list({ lookup_keys: [key], active: true })`.
5. Create the session with idempotency key `checkout:${tier}:${attempt}`, so a double click returns the same session:
   - `mode: "subscription"`, `line_items: [{ price, quantity: 1 }]`
   - `custom_fields: [{ key: "telegram_username", type: "text", optional: false, label: { type: "custom", custom: "Telegram username (for your join request)" }, text: { minimum_length: 5, maximum_length: 33 } }]` (see D3)
   - `custom_text.submit.message`: "We use your Telegram username to approve your request to join the group."
   - `consent_collection: { terms_of_service: "required" }`. This needs the Terms URL in Stripe's public business settings: `[TODO: set ToS URL in Stripe settings → /terms]`
   - `metadata: { tier }`, `subscription_data: { metadata: { tier } }`
   - `success_url: ${SITE_URL}/join/success?session_id={CHECKOUT_SESSION_ID}`
   - `cancel_url: ${SITE_URL}/signals?canceled=1#pricing`
   - `allow_promotion_codes: false`
   - Managed Payments: `[TODO: if Stripe approves Managed Payments, confirm in Stripe's docs whether Checkout needs a parameter to use it]`
6. Return `{ url }`. Errors return a generic message; details go to the server log without customer data.

### `/join/success`

"Payment received. Your private invite link arrives by email within `[TODO: delivery time]`. Check Telegram, request to join, and read Start Here first." Plus the support contact. It reads nothing from Stripe and grants nothing.

---

## 6. Webhook design

**Events:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`.

### Option (a) Stripe → n8n (recommended)

Why: it's your usual setup, and n8n already has the pieces this needs: a Stripe Trigger (verifies signatures), a Telegram Trigger (receives `chat_join_request` for Option 2), a Schedule Trigger (daily sweep), Data Tables (event log and dedupe), and Gmail/SMTP (member emails). The n8n connector is available in this session, so I can build and test the workflows directly in your n8n.

Needs: n8n on **https**; the test-mode Stripe key and webhook signing secret saved in n8n's Stripe credential (by you, in n8n).

### Option (b) Next.js route

`/api/stripe/webhook` reads the raw body (`await req.text()`), verifies it with `stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)`, and returns `200` fast. Without a database, dedupe and the event log would need somewhere to live (Stripe customer metadata for state, Vercel logs for the event log), and the daily sweep runs as a Vercel Cron job. Workable, but more to build than (a).

### Either way

- **Verify signatures.** Reject anything that fails.
- **Dedupe on `event.id`** (n8n Data Table, or a `processed_events` check in option b) so a resent event does exactly one thing.
- **Fulfil only when `payment_status === "paid"`** on `checkout.session.completed`.
- **Log every event** (id, type, customer, tier, action taken). No card data.
- **Daily reconciliation sweep:** list active subscriptions; for any with no `telegram_user_id` and no invite sent in the last 72 hours, re-send the invite and alert the admins. Also flag group members whose subscription is no longer active.

**Member mapping lives on the Stripe Customer's metadata** (no database): `telegram_username` (lowercased, without `@`), `telegram_user_id` (after approval), `tier`, `invite_link` (Option 2), `invited_at`.

---

## 7. Access lifecycle

| Event | Action |
|---|---|
| `checkout.session.completed` (paid) | Save `telegram_username` and `tier` to customer metadata. Deliver the invite for the right group (Core → Core group; Pro/Champion → main group). Notify both admins. |
| `customer.subscription.updated`, Core → Pro (`items.price.lookup_key` changed) | Invite to the main group. Remove from the Core group: `[TODO: confirm]` |
| `customer.subscription.updated`, Pro → Core (scheduled; Stripe applies it at period end) | When the change takes effect: remove from the main group, invite to the Core group. |
| `customer.subscription.updated` with `cancel_at_period_end: true` | No access change yet. Log it. |
| `invoice.paid` | Renewal OK: no access change. If the member had been flagged by a failed payment, clear the flag. |
| `invoice.payment_failed` | Notify the member and the admins. **Do not remove access**; retries are still running. |
| `customer.subscription.deleted` | Remove from all IMS groups. Notify the admins. |

### Telegram Option 1: manual (ship first)

The webhook sends the admins an alert: "New Pro member: @username, email, tier". Hunter or Aaron sends the invite link and handles removals by hand. The member email says the invite comes from an admin.

### Telegram Option 2: bot

A bot that is an admin in both groups, with permission to invite and ban users.

- **On payment:** `createChatInviteLink` with `creates_join_request: true`, a short `expire_date` (D8), and `name` = the Stripe subscription id. Email that link to the member.
- **On `chat_join_request`:** approve only if the link's `name` maps to an active subscription **and** `from.username` matches `telegram_username` (case-insensitive). Then save `telegram_user_id` to customer metadata and `revokeChatInviteLink`. Otherwise decline and alert the admins.
- Telegram doesn't allow `member_limit` together with `creates_join_request`, so "single-use" means a unique link per member that is revoked after approval.
- **On removal:** `banChatMember` followed by `unbanChatMember` (`only_if_banned: true`). This removes the member without a permanent ban.
- The bot token lives only in env (or the n8n credential).

Member emails are sent from `[TODO: sender address, ideally a domain email]`.

---

## 8. Customer portal and Billing settings (test mode)

Set by the setup script through the API (`billing_portal.configurations`):

- Cancel at the end of the billing period (`subscription_cancel.mode = at_period_end`)
- Update payment method
- View invoices
- Switch between Core and Pro only (`subscription_update.products` = Core and Pro prices; Champion is not listed)
- Downgrades wait until period end (`schedule_at_period_end.conditions = [decreasing_item_amount]`)
- Proration: `[TODO: prorate immediately vs. switch at next renewal — Hunter decides]` (D5)
- `login_page.enabled = true` → the no-code login link for **Manage membership**
- Business profile: Terms and Privacy URLs

Dashboard only (no API for these). Hunter clicks them, or I walk through them:

- Settings → Billing → Revenue recovery: **Smart Retries** on; after all retries fail: `[TODO: cancel subscription vs. mark unpaid — default cancel]` (D6)
- Settings → Billing → Customer emails: failed payments, expiring cards, and receipts for successful payments
- Settings → Business → Public details: support email, statement descriptor, Terms URL `[TODO: set ToS URL in Stripe settings → /terms]`, Privacy URL

---

## 9. Test plan (sandbox). Results recorded here in Phase 6.

| # | Test | Expected | Result |
|---|---|---|---|
| T1 | Subscribe to Core with `4242 4242 4242 4242` | Paid session; webhook saves username + tier; Core invite delivered; admins alerted | – |
| T2 | Subscribe to Pro with `4242 4242 4242 4242` | Same, main-group invite | – |
| T3 | Subscribe with 3D Secure card `4000 0025 0000 3155` | Challenge shown; fulfilment only after it's completed | – |
| T4 | Cancel from Checkout | Back on `/signals?canceled=1#pricing` with the canceled note | – |
| T5 | Double-click a CTA | One Checkout Session (same idempotency key) | – |
| T6 | `POST /api/checkout {tier:"champion"}` with the flag off | `403`, no session | – |
| T7 | Tampered body (`price`, `amount`, unknown tier) | `400`; only the tier is read | – |
| T8 | Rate limit (6 requests in a minute) | 6th gets `429` + `Retry-After` | – |
| T9 | Test clock +1 month, card OK | `invoice.paid`; access unchanged | – |
| T10 | Test clock renewal with `4000 0000 0000 0341` | `invoice.payment_failed`; member + admins notified; access kept during retries; removed after the final failure (`customer.subscription.deleted`) | – |
| T11 | Portal upgrade Core → Pro | Main-group invite | – |
| T12 | Portal downgrade Pro → Core | Scheduled for period end; at period end: removed from main, invited to Core | – |
| T13 | Portal cancel | Access until period end; then removed | – |
| T14 | Resend the same webhook event | Exactly one action | – |
| T15 | `/join/success` without paying | Page shows; nothing is granted | – |

Test clocks: Checkout can't attach a test clock, so T9, T10, T12 and T13 use a customer created with a test clock and a subscription created through the API with the same prices.

---

## 10. Go-live checklist (Hunter's job; not done in this session)

1. Complete business verification in Stripe.
2. Set branding, statement descriptor, support email, and the public Terms and Privacy URLs (after legal review).
3. Switch to live mode and re-run `node scripts/stripe-setup.ts` with the live key.
4. Configure the live customer portal (the script does most of it) and the Billing settings in §8.
5. Add the live webhook endpoint (n8n production URL or `/api/stripe/webhook`) and its signing secret.
6. Set the live keys and the live portal link in Vercel **Production**, then redeploy.
7. Make one real low-cost purchase, check the invite arrives and the group join works, then refund it.

---

## 11. Implementation checklist

- [x] Phase 1: STRIPE.md written
- [ ] Phase 1: Hunter approves the plan and decides D1–D10
- [ ] Test key entered through the secure form; `GET /v1/account` id matches `acct_1Ua6qPRj5B5P2Oab`
- [ ] Phase 2: `scripts/stripe-setup.ts` written and run twice (second run creates nothing); IDs recorded in §4
- [ ] Phase 3: `stripe` installed; `/api/checkout`, `CheckoutButton`, `/join/success`; Core and Pro CTAs wired; Champion blocked
- [ ] Phase 3: `.env.example` committed
- [ ] Phase 4: portal configured; login link set as `NEXT_PUBLIC_STRIPE_PORTAL_URL`; dashboard Billing settings done
- [ ] Phase 5: webhook destination built (D1); dedupe, logging, `paid` check, daily sweep
- [ ] Phase 5: Telegram delivery (D2)
- [ ] Phase 6: T1–T15 run and recorded
- [ ] Phase 7: go-live checklist handed to Hunter
