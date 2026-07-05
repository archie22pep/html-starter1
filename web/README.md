# Precursor Property — website

Next.js (App Router) rebuild of precursorproperty.com.au. Marketing pages are
statically rendered; `/api/order` handles order intake and checkout routing.

Built with reputable public libraries: [shadcn/ui](https://ui.shadcn.com)
components (Base UI primitives) themed to the brand, [Motion](https://motion.dev)
for animation, [Lucide](https://lucide.dev) icons, and Google Fonts
(EB Garamond + Source Sans 3) self-hosted through `next/font`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Deploy (Vercel)

The repository root still contains the legacy static site, so pushing this
folder does **not** change the live site until you flip the switch:

1. Vercel → Project → Settings → **Root Directory** → set to `web`.
2. Framework preset will be detected as Next.js automatically.
3. Add environment variables from `.env.example` (at minimum
   `NEXT_PUBLIC_SITE_URL`; add `STRIPE_SECRET_KEY` to enable dynamic checkout).

## Where things live

| What | Where |
|---|---|
| Products, tiers, prices, Stripe links | `src/lib/products.ts` (single source of truth) |
| Editorial copy (FAQ, testimonials, stats) | `src/lib/content.ts` |
| Design tokens (colours, fonts) | `src/app/globals.css` |
| Order intake + checkout routing | `src/app/api/order/route.ts` |
| Faux-PDF sample report | `public/sample-report.html` (self-contained page) |

## Checkout behaviour

- **No `STRIPE_SECRET_KEY`** (today): every tier redirects to its live Stripe
  Payment Link after the brief is captured.
- **With `STRIPE_SECRET_KEY`**: orders create a Stripe Checkout Session with
  the brief in its metadata; prices come from `products.ts`, so changing a
  price is a one-line edit (plus updating the matching Payment Link if you
  keep the fallback).

Lead capture uses Web3Forms from the browser (their free plan rejects
server-origin calls; the submission-only key is public by design, as on the
old site). If you upgrade to Web3Forms Pro, set `WEB3FORMS_ACCESS_KEY` and
the API route will retry failed captures server-side as a backstop. If the
lead email fails and no Stripe session can be created, the order is rejected
with a friendly retry message so no brief is ever lost.

## Before launch

- Replace the placeholder testimonials and the 300+/48hr/$25k/5yr stats in
  `src/lib/content.ts` with real, substantiated numbers. Fabricated reviews
  breach Australian Consumer Law and, worse, destroy trust if a visitor
  checks the Google profile.
- Generate `public/og-image.png` (1200x630) from the brand template.
