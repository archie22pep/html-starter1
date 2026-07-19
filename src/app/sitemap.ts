import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.precursorproperty.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const core: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/reports/purchase", priority: 0.9, freq: "monthly" },
    { path: "/reports/development", priority: 0.9, freq: "monthly" },
    { path: "/pricing", priority: 0.8, freq: "monthly" },
    { path: "/method", priority: 0.7, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/sample-report.html", priority: 0.6, freq: "yearly" },
    { path: "/order", priority: 0.6, freq: "monthly" },
  ];

  const coreEntries = core.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
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
