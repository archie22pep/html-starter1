import type { NextConfig } from "next";

// Security headers previously applied by the static site's edge middleware.
const securityHeaders = [
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Hero montage images served live from the Unsplash CDN when
    // UNSPLASH_ACCESS_KEY is configured; committed /public/hero files otherwise.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // AVIF first (roughly 30% smaller than WebP), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Optimised images were being served max-age=0, must-revalidate, so repeat
    // visitors and crawlers refetched them every time. 31 days.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // The hero stills are immutable committed assets. Without this they
        // are served max-age=0, must-revalidate, and /_next/image inherits
        // that from the upstream file, so every visit refetches them.
        source: "/hero/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
