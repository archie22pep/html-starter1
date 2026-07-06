import { BLOG_HTML, BLOG_TAKEAWAYS } from "./blog-content";

/**
 * Blog posts ported from the previous static site. Body HTML and key
 * takeaways live in blog-content.ts (generated); metadata and card copy
 * live here. URLs match the old site (/blog/<slug>) so SEO is preserved.
 */

export interface BlogPost {
  slug: string;
  title: string;
  /** SEO meta description (preserved from the original article). */
  description: string;
  /** Card summary shown on the index. */
  excerpt: string;
  category: string;
  readMin: number;
  dateISO: string;
  dateLabel: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "victorian-property-tax-changes-2026",
    title: "Property tax & budget changes for Victorian investors in 2026",
    description:
      "The 2026 budget and tax changes that affect Victorian property investors — negative gearing (proposed), the foreign-buyer ban, land tax, VRLT, short-stay levy and the ESVF levy.",
    excerpt:
      "Negative gearing (proposed), the foreign-buyer ban, land tax, VRLT, and the short-stay and ESVF levies. What is law, and what is not.",
    category: "Tax & budget",
    readMin: 10,
    dateISO: "2026-06-02",
    dateLabel: "June 2026",
  },
  {
    slug: "victoria-rental-reforms-2026",
    title: "Victoria's 2026 rental reforms: what property investors need to know",
    description:
      "Victoria's 2025–26 rental reforms changed the rules for landlords: no-fault evictions abolished, 90-day rent-increase notice, minimum standards, portable bonds and a proposed rent freeze.",
    excerpt:
      "No-fault evictions abolished, 90-day rent notices, minimum standards, portable bonds, and a proposed rent freeze.",
    category: "Policy",
    readMin: 9,
    dateISO: "2026-06-02",
    dateLabel: "June 2026",
  },
  {
    slug: "victoria-capital-growth-2026",
    title: "Victorian property capital growth in 2026: where the numbers actually point",
    description:
      "Melbourne and regional Victoria capital growth in 2026 — current medians, divergent bank forecasts, and the corridors actually growing 6–10%. What the data means before you buy.",
    excerpt:
      "Current medians, why bank forecasts disagree by nearly nine points, and the corridors running 6 to 10 percent while the average sits near 2.",
    category: "Capital growth",
    readMin: 9,
    dateISO: "2026-06-02",
    dateLabel: "June 2026",
  },
  {
    slug: "zoning-explained-for-victorian-buyers",
    title: "Zoning explained: what Victorian buyers can (and can't) do with a block",
    description:
      "A plain-English guide to Victoria's residential zones (GRZ, NRZ, RGZ), the 2025 planning reforms, and how zoning decides what you can build or subdivide — before you sign.",
    excerpt:
      "NRZ, GRZ, RGZ, the 2025 reforms, and the rules that decide whether you can build or subdivide, before you sign.",
    category: "Zoning",
    readMin: 9,
    dateISO: "2026-06-02",
    dateLabel: "June 2026",
  },
  {
    slug: "planning-overlays-victoria-explained",
    title: "Planning overlays in Victoria: the hidden rules that can block your build",
    description:
      "Flood, bushfire and heritage overlays can restrict or block what you build in Victoria — even in a good zone. A 2026 plain-English guide to the overlays buyers miss.",
    excerpt:
      "Flood, bushfire (changed in 2026) and heritage overlays can restrict your plans even in a good zone. Here is how they work.",
    category: "Overlays",
    readMin: 8,
    dateISO: "2026-06-02",
    dateLabel: "June 2026",
  },
  {
    slug: "section-32-red-flags-victoria",
    title: "Section 32 red flags: what to check in a Victorian vendor statement",
    description:
      "The Section 32 vendor statement is where Victorian property deal-breakers hide. A 2026 guide to the red flags — easements, covenants, OC debts, illegal works and charges.",
    excerpt:
      "Easements, owners-corporation debts, unpermitted works and outstanding charges. The deal-breakers most buyers skim past.",
    category: "Contracts",
    readMin: 8,
    dateISO: "2026-06-02",
    dateLabel: "June 2026",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostBody(slug: string): string | undefined {
  return BLOG_HTML[slug];
}

export function getTakeaways(slug: string): string[] {
  return BLOG_TAKEAWAYS[slug] ?? [];
}

/** Two other posts to surface as "keep reading". */
export function relatedPosts(slug: string, count = 2): BlogPost[] {
  return POSTS.filter((p) => p.slug !== slug).slice(0, count);
}
