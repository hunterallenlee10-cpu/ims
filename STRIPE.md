# Stripe subscription checkout

Status: **Live and selling (Core, Pro).** Checkout tested from the live site on 2026-11-10. New members are invited to Telegram by hand for now (Option 1); webhook automation (Phase 5) is optional future work.

Stripe account: `acct_1Ua6qPRj5B5P2Oab` (IMS, owned by Hunter). Verified with `GET /v1/account` on 2026-11-10: live mode, `charges_enabled: true`.

### Changes to the original plan (Hunter, 2026-11-10)

- **Live first.** Hunter asked for Stripe to be set up straight in live mode, skipping the sandbox. Consequence: renewals, failed payments and portal changes have not been exercised with test clocks. The first real occurrence of each is its first test, so watch the first month closely (§9).
- **Champion retired (2026-11-13).** Hunter replaced the $399/month Champion tier with a one-year Pro option paid once in Bitcoin ($199, `/join/btc`). That option is not a Stripe product: members send BTC to `NEXT_PUBLIC_BTC_ADDRESS`, send their TXID, email and Telegram username through the contact form, and are invited by hand. The Champion price and product are archived in Stripe (Stripe doesn't allow deleting a price). It had no subscribers. `CHAMPION_CHECKOUT_ENABLED` is no longer read and can be removed from Vercel.
- **Recommendations accepted:** n8n for webhooks (D1), manual Telegram invites first and the bot later (D2), Stripe's default proration (D5).

Rules that still apply:

- No secret keys, webhook secrets or bot tokens in code, this file, issues, commits or logs.
- The browser sends only a tier id (`core`, `pro`); the server maps it to a Stripe Price by `lookup_key`.
- Access is granted from webhooks (or by an admin), never from the success page.

---

## 1. Decisions

| # | Decision | Status |
|---|---|---|
| D1 | Webhook destination | **n8n** (recommended, accepted). Needs your n8n URL (https) |
| D2 | Telegram delivery | **Option 1 manual first**, Option 2 bot after |
| D3 | Checkout field label | Your exact label fits (Stripe allows 100 characters): "Telegram username (so we can approve your join request)" |
| D4 | Members without a Telegram username | Mismatches go to the admins |
| D5 | Proration on Core ↔ Pro | `create_prorations`: an upgrade takes effect immediately and the prorated difference goes on the next invoice. Change by re-running the setup script with `PRORATION=none` or `always_invoice` (then update the site copy) |
| D6 | After all payment retries fail | Cancel the subscription (Billing settings done by Hunter) |
| D7 | Upgrade Core → Pro: remove from Core group? | **Yes**, once they have joined the main group |
| D8 | Invite link lifetime (Option 2) | 72 hours, re-sent by the daily sweep |
| D9 | Member email sender | Manual invites for now, sent by Hunter or Aaron. Support address: ceo@leeenterprisesunlimited.com. Invites promised within 12 hours |
| D10 | Admin alerts | Telegram DM to both admins, email as backup |

---

## 2. Before the first real sale (Hunter)

1. **Stripe → Settings → Business → Public details:** set Terms of service URL `https://www.investingmasterysignals.com/terms` and Privacy policy URL `https://www.investingmasterysignals.com/privacy`. Without the Terms URL, Stripe refuses to create Checkout sessions (verified).
2. **Vercel → Settings → Environment Variables → Production:** add `STRIPE_SECRET_KEY` = a live secret key (`sk_live_…`), type Sensitive. Use a key made for the website, not the setup key below.
3. **Merge this branch to `main`** so production deploys the checkout. Then redeploy so Vercel picks up the new variables.
4. **Fulfilment until the n8n workflow is live:** Stripe → Settings → Personal details → Communication preferences: turn on email for **successful payments**. Each payment shows the buyer's email and Telegram username in the Dashboard. Send the invite link by hand.
5. **Delete the "Claude setup" Stripe key** when setup is finished (Developers → API keys).

---

## 3. Where each credential comes from

| Credential | Where | Where it lives |
|---|---|---|
| Live secret key for the website | Stripe (live) → Developers → API keys → Create secret key | Vercel Production `STRIPE_SECRET_KEY` only |
| Live setup key ("Claude setup") | Same place | Saved as a network secret on the `ims` cloud environment (injected by the proxy; nobody sees the value). Delete after setup |
| Webhook signing secret `whsec_…` | Created with the webhook endpoint (or by n8n's Stripe Trigger) | n8n Stripe credential |
| Customer portal login link | Returned by the setup script | Vercel `NEXT_PUBLIC_STRIPE_PORTAL_URL` (set) |
| Telegram bot token (Option 2) | @BotFather | n8n Telegram credential |

---

## 4. Environment variables

`.env.example` lists every variable with placeholders.

| Variable | Production value | Status |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.investingmasterysignals.com` | Set in Vercel (Production) |
| `NEXT_PUBLIC_STRIPE_PORTAL_URL` | `https://billing.stripe.com/p/login/bJe28t2PSdC19VQdPH8so00` | Set in Vercel (Production, Preview) |
| `STRIPE_MANAGED_PAYMENTS` | `true` | Set in Vercel (Production, Preview) |
| `STRIPE_SECRET_KEY` | `sk_live_…` | **Hunter adds it** (§2) |
| `NEXT_PUBLIC_BTC_ADDRESS` | The IMS Bitcoin address for the BTC year | **Hunter adds it.** The BTC button stays closed until set |
| `CONTACT_WEBHOOK_URL` | n8n workflow "IMS - Website contact form to email" → ceo@leeenterprisesunlimited.com | Set in Vercel (Production, Sensitive) |

---

## 5. Products and prices (LIVE)

Created by `scripts/stripe-setup.mts`. It's idempotent: prices are found by `lookup_key`, so a second run creates nothing (verified). Tax code on every product: `txcd_10701411` (Electronically Delivered Information Services - Personal Use), which Managed Payments requires.

| Product | Description | Price | `lookup_key` | Product ID | Price ID |
|---|---|---|---|---|---|
| IMS Core | The Portfolio Signal only, in the read-only "Core Members - SIGNAL ONLY" Telegram group. | $20.00 / month | `ims_core_monthly` | `prod_VbKNJCHQYGbJqg` | `price_1Ub6EPRj5B5P2OabewSN5uz2` |
| IMS Pro | All IMS signals (Portfolio Signal, IMS Signals, BTC DCA Signal, Trend Probability), a weekly research note, a macro and liquidity briefing, method notes, and full access to the main "Investing Mastery Signals" Telegram group. | $25.00 / month | `ims_pro_monthly` | `prod_VbKNU4iJNqFG5p` | `price_1Ub6EQRj5B5P2Oabgp1DACwM` |
| IMS Pro (yearly) | Same product as IMS Pro. | $249.00 / year | `ims_pro_yearly` | `prod_VbKNU4iJNqFG5p` | `price_1Ub6IIRj5B5P2OabqoZgYRtM` |

Customer portal configuration: `bpc_1Ua7irRj5B5P2OabBz6cKtBZ`.

Price history: on 2026-11-13 Champion ($399/month, `ims_champion_monthly`, product `prod_VbKNqZs5VvVvc8`, price `price_1Ua7irRj5B5P2OabVfNyjMdL`) was archived with no subscribers. On 2026-11-12 Core went from $25 to $20 and Pro from $50 to $25. The old prices (`price_1Ua7ipRj5B5P2OabVBxlHkN3`, `price_1Ua7iqRj5B5P2OabEHqlT3U1`) are archived. There were no subscribers at the time. The same day, a yearly Pro price ($249/year, `ims_pro_yearly`) was added; members can switch Pro between monthly and yearly in the customer portal (quantity changes are off).

To change a price, edit `amount` in `scripts/stripe-setup.mts` (and the site copy in `content/signals.ts`, `content/home.ts`, `content/faq.ts`) and re-run the script. Stripe prices can't be edited, so the script creates a new price on the same product, moves the `lookup_key` to it, archives the old price and points the customer portal at the new one. Existing subscriptions stay on the old price until moved.

Re-run (e.g. to change proration):

```bash
NODE_USE_ENV_PROXY=1 STRIPE_SECRET_KEY=<key or proxy placeholder> SITE_URL=https://www.investingmasterysignals.com node scripts/stripe-setup.mts --dry-run
```

---

## 6. Checkout

| File | What it does |
|---|---|
| `lib/tiers.ts` | Tier ids and lookup keys |
| `lib/btc.ts`, `app/join/btc` | The BTC address check and the Pay with Bitcoin page |
| `lib/stripe.ts` | Server-only Stripe client (fetch-based) and cached price lookup by `lookup_key` |
| `lib/rate-limit.ts` | 5 requests per minute per IP, per server instance |
| `app/api/checkout/route.ts` | `POST { tier, billing?, attempt }` → `{ url }`. `billing` is `monthly` (default) or `yearly` (Pro only) |
| `components/sections/signals/CheckoutButton.tsx` | Sends only the tier; disables itself while working; one attempt id per click, so double clicks reuse one session |
| `app/join/success/page.tsx` | "Payment received" page. Grants nothing; `noindex` |
| `scripts/stripe-setup.mts` | Products, prices, tax codes, customer portal |

Session settings: `mode: subscription`; required text field "Telegram username (so we can approve your join request)" (5 to 33 characters); `consent_collection.terms_of_service: required`; `metadata` and `subscription_data.metadata` = `{ tier, billing }`; success URL `/join/success?session_id={CHECKOUT_SESSION_ID}`; cancel URL `/signals?canceled=1#pricing`; promotion codes off; idempotency key `checkout:<tier>:<billing>:<attempt>`.

**Managed Payments** (Stripe as merchant of record) is on by default for this account (confirmed: sessions report `managed_payments.enabled: true`). It doesn't allow Checkout's `custom_text`, so the "invite by email" note lives on the success page.

**Eligibility: confirmed.** Hunter checked with Stripe that IMS does not owe the tax under Managed Payments (2026-11-10). Background: Stripe's eligibility page says Managed Payments is for "fully automated digital product[s]" and that a service with "human intervention (such as live 1-1 coaching)" doesn't qualify. Pro's live calls and Ask the Founders may fall outside that. If Stripe rules a product ineligible, IMS becomes responsible for its sales tax/VAT. Options: confirm with Stripe support, or set `STRIPE_MANAGED_PAYMENTS=false` and use Stripe Tax instead.

---

## 7. Webhooks and access (Phase 5, next)

Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`. Destination: n8n (D1). Verify signatures, dedupe on `event.id` (n8n Data Table), fulfil only when `payment_status === "paid"`, log every event, daily reconciliation sweep. Member mapping on Stripe Customer metadata: `telegram_username`, `telegram_user_id`, `tier`.

| Event | Action |
|---|---|
| `checkout.session.completed` (paid) | Save Telegram username and tier to customer metadata; deliver the right group invite; alert both admins |
| Subscription updated, Core → Pro | Invite to the main group. Remove from Core: `[TODO: confirm]` |
| Subscription updated, Pro → Core (at period end) | Remove from main group; invite to Core group |
| `invoice.payment_failed` | Notify member and admins; keep access while retries run |
| `customer.subscription.deleted` | Remove from all groups; alert admins |

Option 1 (manual, now): admins get "New Pro member: @username, email, tier" and send the invite by hand. Option 2 (bot): unique `createChatInviteLink` per member (`creates_join_request: true`, short expiry, name = subscription id); approve join requests only when the link maps to an active subscription and the username matches (case-insensitive); save `telegram_user_id`; revoke the link; remove with `banChatMember` then `unbanChatMember`.

Needed from Hunter for Phase 5: n8n URL (https); in n8n, a Stripe credential (live key + webhook signing secret) and, for Option 2, a Telegram bot credential; the bot added as admin (invite + ban rights) to both groups; the email sender (D9).

---

## 8. Customer portal and Billing settings

Set through the API (done): cancel at period end, update payment method, invoice history, update email, switch between Core and Pro only, downgrades at period end, proration `create_prorations`, login link on, Terms and Privacy links.

Dashboard only (Hunter):

- Settings → Billing → Revenue recovery: **Smart Retries** on; after the final retry: cancel the subscription (D6, default)
- Settings → Billing → Customer emails: failed payments, expiring cards, successful-payment receipts
- Settings → Business → Public details: support email, statement descriptor, Terms and Privacy URLs (§2)

---

## 9. Verification (live)

| # | Check | Result |
|---|---|---|
| V1 | Key belongs to `acct_1Ua6qPRj5B5P2Oab`, live mode | Pass (2026-11-10) |
| V2 | Setup script run twice | Pass: second run created nothing |
| V3 | Bad tier, tampered body (`price`, `amount`), bad JSON | Pass: 400 |
| V4 | Champion with the flag off | Pass: 403 (Champion retired 2026-11-13; the tier id is now rejected with 400) |
| V5 | 6 requests in a minute from one IP | Pass: 6th gets 429 with `Retry-After: 60` |
| V6 | Double click (same attempt id) | Pass: same response returned |
| V7 | Live session with the real settings | Created `cs_live_…` with Managed Payments on, $25.00 USD, Telegram field; expired immediately. With `consent_collection` it is refused until the Terms URL is set (§2.1) |
| V8 | `/join/success` | Pass: `noindex, nofollow`, grants nothing |
| V9 | Join Core on the live site opens Stripe Checkout | Pass (2026-11-10, live session with Telegram field and Terms checkbox) |
| V10 | First renewal, first failed payment, first upgrade/downgrade/cancel | Not tested (live-first). Watch the first month |

---

## 10. Go-live checklist (Hunter)

1. Stripe business verification complete (charges are enabled).
2. Public details: support email, statement descriptor, Terms and Privacy URLs.
3. Live products, prices, portal: **done** (§5).
4. Billing settings: Smart Retries, customer emails (§8).
5. Webhook endpoint and signing secret in n8n (Phase 5).
6. `STRIPE_SECRET_KEY` in Vercel Production; merge to `main`; redeploy.
7. One real low-cost purchase (Core), check the invite and join flow, then refund it.

---

## 11. Implementation checklist

- [x] Plan written; Hunter approved going live directly with the recommended options
- [x] Live key verified against `acct_1Ua6qPRj5B5P2Oab`
- [x] `scripts/stripe-setup.mts` written, run twice, IDs recorded (§5)
- [x] Tax codes set for Managed Payments
- [x] `stripe` installed; `/api/checkout`, `CheckoutButton`, `/join/success`; all three CTAs wired; Champion gated by flag
- [x] `.env.example` committed
- [x] Portal configured; login link set in Vercel
- [x] Public Vercel variables set
- [x] Terms URL in Stripe public details (Hunter)
- [x] `STRIPE_SECRET_KEY` in Vercel; merge; redeploy
- [x] Billing settings in Dashboard (Hunter, via another chat)
- [x] Champion description added on the site and in Stripe; `CHAMPION_CHECKOUT_ENABLED=true`; live Champion session verified
- [ ] Phase 5: n8n webhook workflow, admin alerts, daily sweep
- [ ] Phase 5: Telegram bot (Option 2)
- [x] V9 live checkout opens from the site
- [x] Contact form connected (n8n → ceo@leeenterprisesunlimited.com)
