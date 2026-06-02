# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing + order-capture website for **Precursor Property**, a Victorian (Australia) property due-diligence report service. It began life as the Vercel "HTML Starter" template and is deployed on **Vercel** (static hosting + Edge Middleware). There is **no build step, no framework, and no test suite** — it is hand-authored static HTML.

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

Current identity is "clean modern fintech": white canvas, ink `#0b1a2b`, single accent **blue `#2563eb`**, emerald `#059669` for success/checks, amber `#f59e0b` reserved for ratings, gold only for review stars. Typography is **Inter** (loaded from Google Fonts) throughout. Tokens are defined as CSS variables in `:root`; icons are inline Lucide-style SVGs (no emoji icons). `sample-report.html` mirrors the same tokens. Respect `prefers-reduced-motion` and `:focus-visible` rules already present.

## Conventions & gotchas

- **Domain is inconsistent across files** — `index.html` meta/canonical/JSON-LD use `precursorproperty.com.au`, `sitemap.xml` uses `www.precursorproperty.com`, `robots.txt` uses `precursorproperty.com`. The `<head>` SEO comment says to replace the domain before launch. Align these when the production domain is finalised.
- `favicon.svg` is the new-brand icon; `favicon.ico` / `favicon.png` (and the apple-touch-icon reference) are still the **old** brand and should be regenerated from the SVG.
- `og-template.html` is a 1200×630 screenshot source for regenerating `og-image.png` — it is a tooling artifact, not a site page.
- `.claude/` is git-ignored (local skills, plans, settings) — do not commit it.
