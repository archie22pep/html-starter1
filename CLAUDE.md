# CLAUDE.md

Guidance for Claude Code when working in this repository.

> **Framework version:** the installed Next.js may be newer than training data.
> See `AGENTS.md` and consult `node_modules/next/dist/docs/` before writing
> framework code.

## What this is

Marketing + order-capture website for **Precursor Property**, an independent
property due-diligence report service for Victoria, Australia. It is a
**Next.js (App Router, TypeScript, Tailwind v4) app at the repository root**,
deployed on **Vercel** on push to `main`. (Earlier generations of this site
were hand-authored static HTML at the root and, briefly, a Next.js app under
`web/`; both have been retired — the app now lives at the root.)

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Architecture

- **Pages** (`src/app`): home (`page.tsx`), `reports/purchase`,
  `reports/development`, `pricing`, `method`, `faq`, `order` (+ `order/thanks`),
  `blog` (+ `blog/[slug]`), `privacy`, `terms`. Marketing pages are static;
  `order`, `order/thanks`, and `api/order` are dynamic.
- **Products & pricing** — `src/lib/products.ts` is the single source of truth
  for streams, tiers, prices (in cents), and Stripe Payment Links. Two streams
  (Purchase / Development), two tiers each. `formatAud`, `tiersFor`, `getTier`
  helpers. Reports are dynamic per property/brief — **do not** hard-code a fixed
  section or page count in marketing copy.
- **Editorial copy** — `src/lib/content.ts` (FAQ, testimonials, stats,
  process, comparison).
- **Blog** — `src/lib/blog.ts` (metadata + card copy) and
  `src/lib/blog-content.ts` (generated body HTML + takeaways, ported from the
  old static blog). URLs are `/blog/<slug>`, matching the old site for SEO.
  Article bodies are rendered via `dangerouslySetInnerHTML` into `.post-prose`;
  special blocks use `data-lead` / `data-flag` / `data-callout` styled in
  `globals.css`.
- **Design tokens** — `src/app/globals.css`. Brand palette is mapped onto the
  shadcn/ui semantic variables, so `--primary` is the teal accent and
  `--accent` is the pale mint surface. Use `--primary` for teal UI.
- **Components** — shadcn/ui (Base UI primitives) in `src/components/ui/`;
  bespoke chrome (header, footer, price cards, ocean hero, motion helpers) in
  `src/components/`. Icons from `lucide-react`. Animation via `motion`.
- **Fonts** — EB Garamond (serif, `--font-garamond`) + Source Sans 3
  (`--font-source-sans`) via `next/font`.

## The order / checkout flow

`src/app/order/order-form.tsx` (client) → `src/app/api/order/route.ts` (server).

1. The browser submits the brief to **Web3Forms** directly (their free plan
   rejects server-origin calls; the submission-only key in `products.ts` is
   public by design) and reports success as `leadOk`.
2. `/api/order` routes checkout: if `STRIPE_SECRET_KEY` is set it creates a
   dynamic **Stripe Checkout Session** (brief in metadata); otherwise it
   returns the tier's live **Stripe Payment Link**. If lead capture failed and
   no Stripe session can be made, the order is rejected so no brief is lost.

## Must-preserve integrations

- **Stripe Payment Links** (per tier in `products.ts`) — checkout today.
- **Web3Forms** key in `products.ts` — lead delivery.
- **Google Analytics** gtag id `G-42ZVB1XCDB` (in `layout.tsx`).
- **JSON-LD** — Organization + WebSite in `layout.tsx`; Service + Breadcrumb on
  report pages; FAQPage on `/faq`; Blog + BlogPosting on blog pages. Keep in
  sync with visible pricing and copy.

## SEO / AI access

- `src/app/sitemap.ts`, `src/app/robots.ts` (allows major AI crawlers),
  `src/app/manifest.ts`, `src/app/opengraph-image.tsx` (generated OG image),
  `public/llms.txt` (AI-readable site map). `NEXT_PUBLIC_SITE_URL` drives
  canonical/sitemap/OG URLs; defaults to `https://precursorproperty.com.au`.

## Conventions

- **No em dashes in marketing copy** (an AI-tell to avoid). Ported blog article
  bodies still contain them; sweep only if asked.
- Avoid unverifiable claims. The testimonials and headline stats in
  `content.ts` are placeholders — replace with real, substantiated figures
  before launch (fabricated reviews breach Australian Consumer Law).
- `.claude/` is git-ignored (local skills, plans, settings).
- `public/sample-report.html` is a self-contained real client report,
  republished with redactions; confirm client permission before it is public.
