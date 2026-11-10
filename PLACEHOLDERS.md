# Missing information ([TODO] placeholders)

Every `[TODO: ...]` on the site, grouped by what Hunter needs to supply. Copy lives in `content/`; edit the file listed, save and redeploy.

How placeholders behave on the site:

- `[TODO: ...]` text shows on the page as-is, so gaps are easy to spot.
- A button or link whose URL is still a `[TODO]` renders **disabled**. It never sends visitors to a broken page.
- Stats stay **hidden** until a real value replaces `null`. Social links stay hidden until a real URL is set.
- Photos show a labeled slot until a file is added and its path is set.
- FAQ answers that still contain a `[TODO]` are left out of the FAQ structured data.

Find them all: `git grep -n "\[TODO:"`

## Compliance flag (resolve first)

| Placeholder | Where |
|---|---|
| `[TODO: CHAMPION DESCRIPTION — pending legal/compliance wording from Hunter]` | `content/signals.ts` (Champion tier `pending`), `content/legal/terms.mdx` §4 |
| `[TODO: Champion CTA — contact/apply until compliance is cleared]` | `content/signals.ts` (Champion `cta.href`) |
| `[TODO: Champion answer, pending legal/compliance wording from Hunter]` | `content/faq.ts` (`manage-money`) |
| `[TODO: how members move to or from Champion]` | `content/signals.ts` (`switching`), `content/faq.ts` (`upgrade`), `content/legal/terms.mdx` §7 |

## Checkout and Stripe settings

| Placeholder | Where |
|---|---|
| `[TODO: checkout route, pending STRIPE.md approval]` (Core, Pro CTAs) | `content/signals.ts` (`tiers[].cta.href`). Replaced by the checkout button in Phase 3 |
| `[TODO: Stripe customer portal login link]` | Vercel env `NEXT_PUBLIC_STRIPE_PORTAL_URL` (fallback in `content/site.ts`) |
| `[TODO: whether sales tax or VAT is added at checkout or included in the price]` | `content/signals.ts` (`pricing.footnote`), `content/legal/terms.mdx` §6 |
| `[TODO: if Stripe Managed Payments is approved, name Stripe as merchant of record here.]` | `content/legal/terms.mdx` §6 |
| `[TODO: set CONTACT_WEBHOOK_URL in Vercel]` | `app/api/contact/route.ts` (the form returns an error until set) |

## Posting cadence

| Placeholder | Where |
|---|---|
| `[TODO: cadence]` ×3, `[TODO: posting cadence for each signal]`, `[TODO: day it goes out]`, `[TODO: posting cadence]`, `[TODO: live call schedule]` | `content/how-it-works.ts` (`cadence`) |
| `[TODO: posting cadence for signals, research notes, briefings and live calls]` | `content/faq.ts` (`cadence`) |

## Billing and refund terms

| Placeholder | Where |
|---|---|
| `[TODO: refund policy]` | `content/signals.ts` (`terms`), `content/faq.ts` (`refunds`), `content/legal/terms.mdx` §8 |
| `[TODO: retry window]`, `[TODO: cancel subscription vs. mark unpaid — default cancel]` | `content/signals.ts` (`terms`), `content/faq.ts` (`payment-failed`), `content/legal/terms.mdx` §6 |
| `[TODO: price change policy and notice period]`, `[TODO: notice period]` | `content/signals.ts` (`terms`), `content/legal/terms.mdx` §9 |

## Upgrade mechanics

| Placeholder | Where |
|---|---|
| `[TODO: prorate immediately vs. switch at next renewal]` | `content/signals.ts` (`switching`), `content/faq.ts` (`upgrade`), `content/legal/terms.mdx` §7 |
| `[TODO: confirm]` (does an upgrading Core member leave the Core group?) | `content/signals.ts` (`switching`) |

## Signals, topics and markets

| Placeholder | Where |
|---|---|
| `[TODO: one-line description of what the Portfolio Signal measures]` | `content/signals.ts` (`signalCatalog`) |
| `[TODO: confirm which models are posted here]` (IMS Signals) | `content/signals.ts` (`signalCatalog`) |
| `[TODO: confirm description]` ×2 (BTC DCA Signal, Trend Probability) | `content/signals.ts` (`signalCatalog`) |
| `[TODO: confirm what is posted here]` (IA - Investing Analysis topic) | `content/how-it-works.ts` (`groupsSection.topics`) |
| `[TODO: full list of assets covered]`, `[TODO: list the specific assets and markets the signals cover.]` | `content/faq.ts` (`markets`), `content/legal/risk-disclosure.mdx` |

## Exchange

| Placeholder | Where |
|---|---|
| `[TODO: which exchange or exchanges members need, if any]` | `content/faq.ts` (`exchange`) |

## Joining and support contact

| Placeholder | Where |
|---|---|
| `[TODO: delivery time]` (invite email) | `content/signals.ts` (`joining`), `content/faq.ts` (`telegram`) |
| `[TODO: support email]` | `content/site.ts` (`email`), legal pages |
| `[TODO: support Telegram handle]` | `content/site.ts` (`supportTelegram`) |
| `[TODO: response time, e.g. within 2 business days]` | `content/contact.ts` |
| `[TODO: X URL]`, `[TODO: YouTube URL]`, `[TODO: Instagram URL]` | `content/site.ts` (`socials`). Hidden until set; delete any you don't use |

## Founder bios and photos

| Placeholder | Where |
|---|---|
| `[TODO: one-line bio for ...]`, `[TODO: bio for ...]` | `content/about.ts` (`founders`) |
| `[TODO: photo of Hunter Lee]`, `[TODO: photo of Aaron Wathen]` | Add `public/team/hunter.jpg` and `aaron.jpg`, then set `photo` in `content/about.ts` |
| `[TODO: year]` ×5, `[TODO: milestone]` ×4, `[TODO: what happened and why it mattered]` ×4, `[TODO: launch details]`, chapter photos | `content/about.ts` (`timeline`) |
| `[TODO: stat label ...]` ×4 | `content/home.ts` (`stats`). Hidden until a real, verifiable value is set. No performance numbers |

## OG image

The share image is generated from the brand styles in `app/opengraph-image.tsx` (no real logo yet). When a logo exists, put it at `public/brand/logo.svg` and set `logoSrc` in `content/site.ts`.

## Legal pages (all marked "DRAFT — needs legal review.")

| Placeholder | Where |
|---|---|
| `[TODO: legal entity name]`, `[TODO: business address]` | `content/site.ts`, `content/legal/terms.mdx`, `privacy.mdx` |
| `[TODO: date]` ×4 (last updated) | `content/legal.ts` |
| Regulatory status, founder positions | `content/legal/disclaimer.mdx` |
| Excluded countries, liability cap `[TODO: number]`, governing law `[TODO: state or country]`, dispute resolution, `[TODO: attorney review]` | `content/legal/terms.mdx` |
| Analytics, email and automation providers, cookies, retention, countries, `[TODO: attorney review]` | `content/legal/privacy.mdx` |

## Telegram delivery choices

Decided in `STRIPE.md` (webhook destination and Telegram Option 1 vs. Option 2). Sender address for member emails: `[TODO: sender address, ideally a domain email]`.
