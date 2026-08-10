import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.precursorproperty.com";

/**
 * lastModified must be stable. Using `new Date()` stamped every static page
 * with the build time, so every deploy claimed the whole site had changed and
 * search engines learn to ignore the signal. Static pages carry the date their
 * content last actually changed; posts carry their own publish date.
 */
const STATIC_CONTENT_UPDATED = new Date("2026-08-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const core: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/reports/purchase", priority: 0.9, freq: "monthly" },
    { path: "/reports/development", priority: 0.9, freq: "monthly" },
    { path: "/pricing", priority: 0.8, freq: "monthly" },
    { path: "/method", priority: 0.7, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/sample-report.html", priority: 0.6, freq: "yearly" },
    { path: "/order", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ];

  const coreEntries = core.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: STATIC_CONTENT_UPDATED,
    changeFrequency: freq,
    priority,
  }));

  const blogEntries = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.dateISO),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...coreEntries, ...blogEntries];
}
