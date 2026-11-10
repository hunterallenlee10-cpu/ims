# Investing Mastery Signals — Build Plan

> **Historical.** This is the original build plan. The site has since moved to three monthly tiers (Core, Pro, Champion) delivered in Telegram, and the public research section was removed. Current copy lives in `content/`, open items in `PLACEHOLDERS.md`, payments in `STRIPE.md`.

Status: **approved and built (Phases 1–5 complete).** Decisions: branch `claude/busy-fermi-5nsujj`, two tiers, delivery channel and cadence kept as placeholders.

## 0. Source of the design system

- No sibling LEUnet checkout was available in this session, and attaching the LEUnet repo was not permitted, so its `app/globals.css` and components could not be read directly.
- The plan instead follows the LEU website-design system (same architecture the LEUnet site uses): 1140px container, fluid section rhythm, eyebrow → headline → subhead section headers, hairline cards whose border lifts on hover, IntersectionObserver reveal, count-up stats, mega footer. Everything is re-skinned in the IMS navy / purple brand below.
- If you want a 1:1 match with LEUnet's file structure, attach the LEUnet repo to a session (or drop its `app/` + `components/` into a sibling folder) and I'll align names before Phase 1.

## 1. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.x (App Router, Turbopack default), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme inline` mapping CSS variables on `:root`) |
| Fonts | `next/font/google`: Cinzel (display), Inter (body/UI), Cormorant Garamond italic (accent). `display: swap` + `adjustFontFallback` to avoid layout shift |
| MDX | `@next/mdx` + `@mdx-js/loader`; each post exports a typed `meta` object (title, date, tags, summary). Reading time computed at build from the raw file |
| Motion | CSS transitions/keyframes + `useReveal` (IntersectionObserver) + `useCountUp`. No Framer Motion planned |
| Lint | ESLint 9 flat config with `eslint-config-next` (Next 16 removed `next lint`; `npm run lint` = `eslint .`) |
| Deploy | Vercel, zero config |

## 2. Sitemap

```
/                     Home
/how-it-works         Methodology
/signals              Membership (tiers, terms, FAQ, CTA)
/research             Research index (tags filter)
/research/[slug]      Article template (MDX)
/about                Founder timeline + bios + principles
/faq                  Full FAQ accordion
/contact              Form + contact details
/disclaimer           Legal (DRAFT)
/risk-disclosure      Legal (DRAFT)
/terms                Legal (DRAFT)
/privacy              Legal (DRAFT)
/api/contact          POST stub (TODO: email/webhook target)
/sitemap.xml          app/sitemap.ts
/robots.txt           app/robots.ts
/opengraph-image      app/opengraph-image.tsx (brand-style OG)
```

Nav: wordmark · How It Works · Signals · Research · About · FAQ · **Join Signals** (primary). Contact lives in the footer.

## 3. Sections per page

### `/` Home
1. **Hero**: animated SVG data-wave corners (or muted `public/media/hero.mp4` if the file exists, poster fallback), eyebrow "SYSTEMATIC INVESTMENT RESEARCH", H1 "Investing Mastery Signals" (platinum sheen), italic tagline "The science of wealth multiplication." `[CONFIRM]`, one plain sentence on what members get, Join Signals + See how it works, trust line.
2. **Signal console**: stylized dashboard card: trend state chip, Z-score valuation dial (SVG gauge), risk/leverage gate status, last-updated stamp. Persistent **EXAMPLE DATA** badge + caption "Illustrative only. Not a real or current signal."
3. **Stat strip**: 3–4 `[NUMBER]` stats. The section renders only when at least one stat has a real value (a `null` value hides that stat; all null hides the section).
4. **Their way vs our way**: "Guessing, hype and influencer calls" (muted) VS "Rules, data and a written process" (purple border).
5. **What members get**: program grid of 5 signal types with line icons `[CONFIRM list]`.
6. **3-step path**: Join → Receive the signal → Execute with your own plan.
7. **Feature checklists**: 3 cards × 3 checkmarked bullets `[CONFIRM]`.
8. **Founders teaser**: Hunter + Aaron photo slots, one line each, link to /about.
9. **FAQ preview**: 4 questions, link to /faq.
10. **Two paths CTA**: "Keep guessing" vs "Follow a system", one big Join Signals button + trust line.

### `/how-it-works` (each section an independent, reorderable component)
1. Page hero (H1, short intro, CTA)
2. Why systematic beats discretionary (rules vs. discretion, side-by-side points; no performance claims)
3. The three inputs: valuation, trend, risk; how they combine (simple diagram: three inputs → one signal state)
4. Update cadence `[CADENCE]`
5. How members receive signals: `[DISCORD/TELEGRAM/EMAIL]`
6. Anatomy of a signal post: annotated EXAMPLE card with numbered callouts
7. What a signal is not (not personalized, not advice, same for every member)
8. CTA band

### `/signals`
1. Page hero + 18+ notice
2. Tier cards (2 cards planned: `[TIER NAME]`, `[PRICE]`, `[BILLING PERIOD]`, included list, `[JOIN LINK]`) `[CONFIRM tier count]`
3. What's included (full checklist)
4. Cancellation and billing terms `[CONFIRM]`
5. FAQ (shared list, membership subset)
6. Two paths CTA
No countdowns, no "spots left", no strikethrough prices.

### `/research`
- Index: header, tag filter (client-side, URL `?tag=`), post cards (title, date, tags, reading time, summary).
- Article template: title, meta row, prose styles, tag list, **disclaimer box** at the end, back link, "Join Signals" CTA band.
- 2 sample posts with placeholder outlines: `why-rules-beat-predictions.mdx`, `reading-a-valuation-z-score.mdx`.

### `/about`
1. Hero
2. Year-by-year timeline (big Cinzel years, short paragraph, photo slot), all `[YEAR]` / `[MILESTONE]`
3. Founder bios: Hunter Lee, Aaron Wathen (photo slots, `[BIO]`)
4. Principles we operate by (4–6 cards: rules over opinions, same signal for everyone, no hype, written process, risk first, transparency)
5. CTA band

### `/faq`
Accordion (native `<details>`/`<summary>` styled, keyboard accessible) grouped: Basics · Signals · Membership & billing. Includes: Is this financial advice? (No.) Do you guarantee returns? (No.) Is the signal personalized? (No, same for every member.) How do I receive signals? How do I cancel? What markets do you cover? Unknowns = `[ANSWER]`.

### `/contact`
Form (name, email, message, visible labels, honeypot field, inline validation + success/error states) → `POST /api/contact` (validates, returns 200, `TODO` for email/webhook target). Sidebar: `[EMAIL]`, social links `[X URL]` `[YOUTUBE URL]` `[INSTAGRAM URL]` `[DISCORD/TELEGRAM URL]`.

### Legal (`/disclaimer`, `/risk-disclosure`, `/terms`, `/privacy`)
Shared `LegalPage` layout: "DRAFT: have an attorney review before launch." banner at the top, last-updated date, table of contents, prose. Starter drafts covering impersonal publisher position, no advice, risk of loss, hypothetical/backtest language, subscription/cancellation, IP, limitation of liability, governing law `[STATE]`, data collected, cookies/analytics, contact.

### Footer (every page)
Wordmark; columns Signals · Company · Research · Legal · Social; persistent disclaimer (exact text from the brief); 18+ notice; © year Investing Mastery Signals `[LEGAL ENTITY NAME]`.

## 4. Component list

```
components/
  layout/   SiteHeader (sticky, transparent → solid+blur on scroll), MobileMenu (focus-trapped dialog),
            SiteFooter, SkipLink
  brand/    Wordmark (text version; swaps to /brand/logo.svg if present), GradientRule
  ui/       Container, Section (spacing + optional glow/grain), Button (primary/secondary, <a> or <button>),
            Eyebrow, SectionHeader (eyebrow + headline with <Accent> word + subhead), Accent, TrustLine,
            Card, Stat (count-up), Checklist, Badge (EXAMPLE DATA), Accordion/FaqItem, Icon set (inline SVG line icons),
            PlaceholderImage (labeled photo slot), Prose, DisclaimerBox, FormField
  art/      DataWave (SVG, slow CSS animation, paused off-screen + reduced motion), Glow, Grain
  sections/
    shared/ PageHero, VsCompare, StepPath, ProgramGrid, FeatureChecklists, FaqList, TwoPathsCta, CtaBand,
            StatStrip, FoundersTeaser
    home/   HomeHero, SignalConsole (TrendChip, ZScoreGauge, RiskGate, UpdatedStamp)
    how/    WhySystematic, ThreeInputs, UpdateCadence, Delivery, SignalAnatomy, WhatItIsNot
    signals/TierCards, IncludedList, BillingTerms
    about/  Timeline, FounderBios, Principles
    research/ PostCard, TagFilter, ArticleLayout
    legal/  LegalPage
hooks/      useReveal, useCountUp, usePrefersReducedMotion, useScrolled
lib/        site config, research loader (meta + reading time), jsonLd (Organization), metadata helper
content/    site.ts (nav, footer, trust lines, disclaimer), home.ts, how-it-works.ts, signals.ts, about.ts,
            faq.ts, contact.ts, legal/*.mdx, research/*.mdx
```

All copy lives in `content/`; components only receive props.

## 5. Design tokens (`app/globals.css` → `:root`, mapped to Tailwind via `@theme inline`)

```css
/* Color */
--bg: #060E16;            --bg-lift-1: #0C1928;   --bg-lift-2: #12273B;
--surface: #0D1724;       --border: #1A2738;
--text-heading: #F9F9FB;  --text-body: #C5CEDE;   --text-muted: #9CA2AB;  --text-eyebrow: #B7BFD3;
--accent: #8A1EF1;        /* buttons, large text only */
--accent-light: #B946FB;  /* hover, rules, icons, small purple text */
--accent-glow: rgba(138,30,241,0.35);
--cyan: #2FF0FE;          --blue-mid: #1697F4;     /* gradients, charts, waves, logo mark only */
--gradient-signature: linear-gradient(90deg, #2FF0FE, #8A1EF1);
--gradient-wave: linear-gradient(90deg, #2FF0FE, #1697F4, #8A1EF1);
--sheen-platinum: linear-gradient(180deg, #F9F9FB 0%, #C5CEDE 55%, #9CA2AB 100%); /* H1 only */

/* Type */
--font-display: Cinzel;  --font-body: Inter;  --font-accent: Cormorant Garamond (italic);
--h1: clamp(2.5rem, 7vw, 5.25rem);   --h2: clamp(1.9rem, 4vw, 3rem);   --h3: clamp(1.25rem, 2.2vw, 1.6rem);
--stat: clamp(2.75rem, 7vw, 5rem);   --body: 1.0625rem (17px) → 1.125rem (18px) ≥768px;
--small: 0.875rem;  --eyebrow-tracking: 0.3em;  --leading-body: 1.65;  --leading-display: 1.05;
--measure: 66ch;

/* Layout */
--max: 1140px;  --gutter: clamp(1.25rem, 4vw, 2rem);
--section-y: clamp(4rem, 10vw, 8.75rem);  --gap: clamp(1.25rem, 3vw, 2rem);

/* Shape & motion */
--radius: 6px;  --radius-sm: 4px;  --tap: 44px (min button height 48px);
--ease: cubic-bezier(.2,.7,.2,1);  --dur: 600ms;
```

Contrast rules baked into components: small purple text always uses `--accent-light`; `--accent` appears only as button background or ≥24px text; body text never darker than `--text-body`. Focus ring: 2px `--accent-light`, 3px offset. `prefers-reduced-motion` disables reveal, waves, count-up and marquee.

Background depth: body gets a fixed radial lift toward `--bg-lift-1/2` in the corners, a CSS-only SVG grain overlay at ~5% opacity, and section-level purple glows behind hero, console and closing CTA only.

## 6. Placeholder list (initial)

| Placeholder | Where |
|---|---|
| Tagline "The science of wealth multiplication." `[CONFIRM]` | content/home.ts |
| Hero sentence on what members get `[CONFIRM]` | content/home.ts |
| Trust line claims: "Rules-based · Same signal for every member · Cancel anytime" (`Cancel anytime` `[CONFIRM]`) | content/site.ts |
| Stats `[NUMBER]` × 4 + labels | content/home.ts |
| Signal types list `[CONFIRM list]` | content/home.ts |
| Membership inclusions (3 cards × 3) `[CONFIRM]` | content/home.ts, content/signals.ts |
| Founder one-liners, bios `[BIO]`, photos (`public/team/hunter.jpg`, `public/team/aaron.jpg`) | content/about.ts |
| Timeline `[YEAR]` / `[MILESTONE]` | content/about.ts |
| Delivery channel `[DISCORD/TELEGRAM/EMAIL]` | content/how-it-works.ts, content/faq.ts |
| Update cadence `[CADENCE]` | content/how-it-works.ts |
| Markets covered `[MARKETS]` | content/faq.ts |
| Tier names, `[PRICE]`, `[BILLING PERIOD]`, `[JOIN LINK]` | content/signals.ts |
| Cancellation / refund terms `[CONFIRM]` | content/signals.ts, legal drafts |
| FAQ `[ANSWER]` items | content/faq.ts |
| `[EMAIL]`, social URLs | content/site.ts |
| `[LEGAL ENTITY NAME]`, `[STATE]` governing law, `[ADDRESS]` | content/site.ts, legal drafts |
| Production domain `[DOMAIN]` (sitemap, OG, JSON-LD) | content/site.ts |
| Logo SVG slot | public/brand/logo.svg |
| Optional hero video | public/media/hero.mp4 (+ hero-poster.jpg) |
| Contact form target `TODO` | app/api/contact/route.ts |
| Research post bodies | content/research/*.mdx |

The final, exhaustive version ships as `PLACEHOLDERS.md` in Phase 5.

## 7. Compliance guardrails (enforced in copy review each phase)

No guarantees, income claims, "get rich" language, testimonials, invented stats or performance numbers, and no performance section. Signals are described as impersonal, general research published identically to every member. No references to other services, communities or educators. 18+ notice in footer and on /signals. No urgency or scarcity devices. Every unconfirmed claim is marked `[CONFIRM]`.

## 8. Phased build order

| Phase | Scope | Gate |
|---|---|---|
| 1 | Scaffold (Next 16, TS, Tailwind v4, ESLint flat), tokens, fonts, root layout, background depth, SiteHeader + MobileMenu, SiteFooter, Wordmark, all `ui/` + `art/` primitives, hooks, `content/site.ts` | build + lint pass, 375px check |
| 2 | Home page, all 10 sections, SignalConsole | build + lint, 375px, reduced-motion check |
| 3 | How It Works (independent sections) + Signals | build + lint |
| 4 | Research (MDX index, tags, article template, 2 posts) + About + FAQ + Contact (+ API stub) | build + lint |
| 5 | Legal drafts, per-page metadata, OG image, sitemap, robots, Organization JSON-LD, a11y + performance pass (Playwright at 375px, Lighthouse mobile), PLACEHOLDERS.md | build + lint, Lighthouse ≥90 mobile |

Each phase ends with one commit, e.g. `feat(phase-1): scaffold, tokens, layout, nav, footer, primitives`.

## 9. Open questions

1. **Branch**: this session can only push to `claude/busy-fermi-5nsujj`. Use that branch (with a PR into `main` later), or should I also create `feat/initial-site`?
2. **Tiers**: one membership tier or two (e.g. monthly / annual)? The plan assumes two placeholder cards.
3. **Delivery channel and cadence**: known yet, or keep placeholders?
