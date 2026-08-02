/**
 * Single source of truth for products, pricing, and checkout routing.
 *
 * Prices are in AUD cents. Every tier maps to a live Stripe Payment Link,
 * so checkout works with no server configuration. When STRIPE_SECRET_KEY
 * is set, /api/order creates dynamic Checkout Sessions instead (the brief
 * travels in session metadata) and the links below are ignored.
 */

export type StreamKey = "purchase" | "development";

export interface Tier {
  key: string;
  stream: StreamKey;
  name: string;
  /** AUD, in cents */
  price: number;
  turnaround: string;
  tagline: string;
  features: string[];
  popular?: boolean;
  /** Live Stripe Payment Link (fixed price). */
  stripeLink: string;
}

export interface Stream {
  key: StreamKey;
  name: string;
  shortName: string;
  audience: string;
  description: string;
  href: string;
  /** No online payment: prospects submit a brief and get a scoped quote. */
  enquiryOnly?: boolean;
}

/**
 * Web3Forms access key. On the free plan Web3Forms only accepts submissions
 * from the browser, so this key ships to the client (it did on the old site
 * too; the key is submission-only and rate-limited by Web3Forms).
 */
export const WEB3FORMS_KEY = "2b99e400-beb1-462a-bbcd-f9485957f24c";

export const BUSINESS = {
  name: "Precursor Property",
  legalName: "Precursor Property",
  email: "hello@precursorproperty.com.au",
  region: "Victoria, Australia",
  instagram: "https://www.instagram.com/precursor.property/",
  googleProfile:
    "https://www.google.com/search?q=Precursor%20Property&stick=H4sIAAAAAAAAAONgU1I1qDBLTDEzMU5NNUxJSkyySLS0MqhISjFMMjEyNUtMTE1NSkm1XMQqFFCUmlxaVJxfpBBQlF-QWlRSCQAzFChTPgAAAA",
  guarantee:
    "If your report doesn't address what you asked, we revise it free of charge. Still not satisfied with your first order? Full refund. No forms, no friction.",
} as const;

export const STREAMS: Record<StreamKey, Stream> = {
  purchase: {
    key: "purchase",
    name: "Purchase Intelligence",
    shortName: "Purchase",
    audience: "Buyers and investors",
    description:
      "For buyers focused on capital growth and rental yield. We dig into the data behind a property so you can make your offer with confidence.",
    href: "/reports/purchase",
  },
  development: {
    key: "development",
    name: "Development Intelligence",
    shortName: "Development",
    audience: "Owners and small developers",
    description:
      "For owners and developers exploring subdivision, renovation, or redevelopment. Scoped by enquiry: tell us about the site and we'll come back with what's possible and a fixed quote.",
    href: "/reports/development",
    enquiryOnly: true,
  },
};

export const TIERS: Tier[] = [
  {
    key: "full-due-diligence",
    stream: "purchase",
    name: "Full Due Diligence",
    price: 4900,
    turnaround: "~48 hours",
    tagline:
      "The complete purchase report, from title to negotiation strategy, shaped to the property and your brief.",
    features: [
      "Title & encumbrance check",
      "Zoning, overlays & risk flags (flood, bushfire)",
      "Investor scorecard with plain-English ratings",
      "Price check & underquoting review",
      "Plain-English Section 32 & title review",
      "Comparable sales & fair-value range",
      "Rental yield & all-in cash-flow modelling",
      "Interest-rate stress test",
      "Suburb growth, demographics & crime data",
      "Vendor intelligence & negotiation talking points",
      "10-year projection, next steps & glossary",
    ],
    // Payment Link edited in Stripe to A$49 (verified 2026-08-02).
    stripeLink: "https://buy.stripe.com/8x200j8Sg0fL0le4S73Je02",
  },
];

/** The single purchasable report. */
export const REPORT_TIER = TIERS[0];

export function tiersFor(stream: StreamKey): Tier[] {
  return TIERS.filter((t) => t.stream === stream);
}

export function getTier(key: string): Tier | undefined {
  return TIERS.find((t) => t.key === key);
}

export function formatAud(cents: number): string {
  return `A$${(cents / 100) % 1 === 0 ? (cents / 100).toLocaleString("en-AU") : (cents / 100).toFixed(2)}`;
}

export const REPORT_PRICE = formatAud(REPORT_TIER.price);
