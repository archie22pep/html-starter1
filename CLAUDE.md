# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing + order-capture website for **Precursor Property**, a Victorian (Australia) property due-diligence report service. The repository now holds **two generations of the site**:

- **Repo root** — the legacy hand-authored static HTML site (still what Vercel deploys today). No build step, no framework, no test suite. Documented in the rest of this file.
- **`web/`** — the **Next.js (App Router, TypeScript, Tailwind v4) rebuild**: multi-page marketing site + `/api/order` backend (browser-side Web3Forms lead capture, checkout routing to Stripe Payment Links today or dynamic Stripe Checkout Sessions when `STRIPE_SECRET_KEY` is set). Products/pricing live in `web/src/lib/products.ts`; editorial copy in `web/src/lib/content.ts`; design tokens in `web/src/app/globals.css`. See `web/README.md` for commands, env vars, and the Vercel cut-over (set project Root Directory to `web`). Pushing `web/` does **not** change the live site until that setting is flipped. Note `web/AGENTS.md`: the installed Next.js may be newer than training data — consult `web/node_modules/next/dist/docs/` before writing framework code.

Everything below describes the **legacy root site**.

## Commands

There is no package manager script setup (`package.json` only declares the `@vercel/edge` dependency for middleware). To work locally:

```bash
npx serve .          # serve the static site (any static server works)
```

Deployment is handled by Vercel on push to the GitHub default branch (`main`). `middleware.js` runs at the edge and only injects security headers (HSTS, X-Frame-Options, etc.) — it does no routing or rewrites.

## Architecture

Two self-contained pages — **all CSS lives in inline `<style>` and all JS in inline `<script>`**. There are no external CSS/JS assets. Edits to styling, markup, and behaviour all happen inside these two files:

- **`index.html`** — the entire marketing site as one long single-page scroll (nav → hero → trust → stats → process → interactive sample viewer → testimonials → two pricing streams → signals → comparison → expert → FAQ → order form → review → legal → footer). Section navigation is anchor-based (`#purchase`, `#development`, `#process`, `#faq`, `#contact`, `#legal`, `#leave-review`, `#sample-report`, `#top`).
- **`sample-report.html`** — a standalone faux-PDF "Full Due Diligence" sample report (~19 print-style pages), linked from index for social proof. Its CTAs link back to `index.html#contact`.

### The order/checkout flow (most important behaviour)

The conversion path is driven by inline JS at the bottom of `index.html`. Understand this before touching the form or pricing cards:

1. Clicking a **pricing card** calls `selectAndGo(stream, tier)`, which pre-selects the form, scrolls to `#contact`, and highlights the card.
2. The form's two-step selector sets `selectedStream` + `selectedTier` via `selectStream()` / `selectTier()`.
3. On submit, `handleSubmit()` POSTs the lead to **Web3Forms** (`api.web3forms.com/submit`), and **only on success** redirects the browser to the matching **Stripe Payment Link** in the `stripeLinks` map. Stripe Links are the payment mechanism — there is no backend.

These four data maps at the top of the script are the single source of truth for products and must stay in sync with the visible pricing: `stripeLinks`, `tierPrices`, `tierShortNames`, `tierNames` (keys: `quick-screen`, `full-due-diligence`, `site-check`, `full-feasibility`).

### Fragile coupling — do not break these when editing markup

The JS selects DOM by **specific ids, class names, and even input placeholders**. Preserve them when restyling/rewriting:

- `handleSubmit()` reads inputs by selector: `input[placeholder="Your name"]`, `input[type="email"]`, `input[placeholder*="Example St"]`, and the single `<textarea>`. **Keep these placeholders.**
- State toggled by JS via class/id: `.reveal`/`.in`, `.stream-opt`+`#opt-purchase`/`#opt-development`+`.active`, `.tier-opt`+`.active`, `.tier-group`+`.visible`, `#tier-section`, `#tiers-purchase`/`#tiers-development`, radio `name="stream"`/`name="tier"` with the exact tier-key values above, `.price-card`+`.selected`, `#prefill-notice`, `#order-summary`(+`-detail`/`-price`), `#form-error`, `.legal-accordion`+`.open`, `#accordion-privacy`/`#accordion-terms`.
- Scroll-reveal animations rely on the `.reveal` class + IntersectionObserver; new sections need `.reveal` to animate in.

### Must-preserve integrations (no backend — these are the only live wiring)

- **Stripe Payment Links** (4 URLs in `stripeLinks`) — the checkout.
- **Web3Forms** `access_key` in `handleSubmit()` — lead delivery to email.
- **Google Analytics** gtag.js, id `G-42ZVB1XCDB` (in `index.html` `<head>` only; `sample-report.html` is untracked).
- **JSON-LD** `@graph` in `<head>` (Organization / WebSite / two Service blocks / FAQPage) — keep in sync with on-page pricing and FAQ copy.

## Design system

Current identity is "established advisory / trust & authority": warm paper canvas `#faf8f3`, deep pine ink `#152520` (dark sections, nav text, headings), single accent **teal `#0f766e`** (`#83c5b2` / `#2fa08e` as light variants on dark backgrounds), muted green `#166e4f` for success/guarantee notes, gold `#d9930d` for stars and report ratings, warm hairline borders, small radii (6–14px, no pill buttons). Typography is **EB Garamond** (headings, display numerals, prices — italic used for emphasis) over **Lato** (body/UI), both from Google Fonts. Tokens are defined as CSS variables in `:root`; icons are inline Lucide-style SVGs (no emoji icons). `sample-report.html` mirrors the same palette via its own `:root` vars (`--navy` is the pine ink, `--gold` is the teal accent). Respect `prefers-reduced-motion` and `:focus-visible` rules already present.

## Conventions & gotchas

- **Domain is inconsistent across files** — `index.html` meta/canonical/JSON-LD use `precursorproperty.com.au`, `sitemap.xml` uses `www.precursorproperty.com`, `robots.txt` uses `precursorproperty.com`. The `<head>` SEO comment says to replace the domain before launch. Align these when the production domain is finalised.
- `favicon.svg` is the new-brand icon; `favicon.ico` / `favicon.png` (and the apple-touch-icon reference) are still the **old** brand and should be regenerated from the SVG.
- `og-template.html` is a 1200×630 screenshot source for regenerating `og-image.png` — it is a tooling artifact, not a site page.
- `.claude/` is git-ignored (local skills, plans, settings) — do not commit it.
