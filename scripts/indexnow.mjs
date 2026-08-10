#!/usr/bin/env node
/**
 * Ping IndexNow so Bing (and therefore ChatGPT search, which is Bing-backed)
 * picks up new or changed pages within minutes instead of waiting for a crawl.
 * Google does not participate, so this supplements the sitemap, it does not
 * replace it.
 *
 * Usage:
 *   node scripts/indexnow.mjs                       # submit every sitemap URL
 *   node scripts/indexnow.mjs /blog/some-slug ...   # submit specific paths
 *
 * The key must stay reachable at /<key>.txt containing exactly the key.
 */

const KEY = "fde32808b4f2a026c0d24febe0330e3a";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.precursorproperty.com";
const host = new URL(SITE_URL).host;

async function collectUrls() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`));
  }
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not read sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = await collectUrls();
if (urlList.length === 0) {
  console.error("No URLs to submit.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList }),
});

// IndexNow returns 200 or 202 on success; 4xx means the key or host is wrong.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
