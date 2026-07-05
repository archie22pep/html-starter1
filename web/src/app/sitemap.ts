import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://precursorproperty.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/reports/purchase", priority: 0.9, freq: "monthly" },
    { path: "/reports/development", priority: 0.9, freq: "monthly" },
    { path: "/pricing", priority: 0.8, freq: "monthly" },
    { path: "/method", priority: 0.7, freq: "monthly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/sample-report.html", priority: 0.6, freq: "yearly" },
    { path: "/order", priority: 0.6, freq: "monthly" },
  ];
  return entries.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));
}
