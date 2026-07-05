import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://precursorproperty.com.au";

/**
 * Allow all standard search crawlers and explicitly welcome the major AI
 * crawlers (GEO / answer-engine visibility). API routes and the post-order
 * thank-you page are kept out of the index. See public/llms.txt for the
 * AI-readable site map.
 */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/order/thanks"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
