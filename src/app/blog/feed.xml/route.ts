import { POSTS } from "@/lib/blog";
import { BUSINESS } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.precursorproperty.com";

/** Escape the five XML predefined entities so titles cannot break the feed. */
function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed for the guides. Helps syndication, feed readers and AI
 * ingestion pipelines discover new posts without re-crawling the index.
 */
export async function GET() {
  const items = POSTS.map((p) =>
    [
      "    <item>",
      `      <title>${xml(p.title)}</title>`,
      `      <link>${SITE_URL}/blog/${p.slug}</link>`,
      `      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>`,
      `      <description>${xml(p.description)}</description>`,
      `      <category>${xml(p.category)}</category>`,
      `      <pubDate>${new Date(p.dateISO).toUTCString()}</pubDate>`,
      "    </item>",
    ].join("\n"),
  ).join("\n");

  const latest = POSTS[0] ? new Date(POSTS[0].dateISO).toUTCString() : new Date(0).toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(BUSINESS.name)} Guides</title>
    <link>${SITE_URL}/blog</link>
    <description>Plain-English property due diligence guides for Victorian buyers and developers.</description>
    <language>en-AU</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
