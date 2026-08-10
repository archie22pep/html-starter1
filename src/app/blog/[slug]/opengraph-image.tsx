import { ImageResponse } from "next/og";
import { POSTS, getPost } from "@/lib/blog";

export const alt = "Precursor Property guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-article OG card, so every guide gets its own social/AI preview instead
 * of sharing the generic site card. Matches the brand chrome in
 * src/app/opengraph-image.tsx. Default sans font only (no remote fetch) and
 * flexbox only, as ImageResponse requires.
 */
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  const category = post?.category ?? "Guide";
  const title = post?.title ?? "Property due diligence guides for Victoria";
  const readLine = post ? `${post.readMin} min read · ${post.dateLabel}` : "Precursor Property";
  // Long headlines need to step down a size or they overflow the card.
  const titleSize = title.length > 78 ? 54 : title.length > 52 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f7f4ea",
          background:
            "radial-gradient(900px 520px at 82% -10%, #1d332b, transparent 60%), linear-gradient(160deg, #152520, #1a2d26)",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 5,
              width: 54,
              height: 54,
              padding: 12,
              background: "#0f766e",
              borderRadius: 12,
            }}
          >
            <div style={{ width: 8, height: 16, borderRadius: 3, background: "#f7f4ea", opacity: 0.55 }} />
            <div style={{ width: 8, height: 26, borderRadius: 3, background: "#f7f4ea", opacity: 0.8 }} />
            <div style={{ width: 8, height: 34, borderRadius: 3, background: "#f7f4ea" }} />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            Precursor<span style={{ color: "#83c5b2" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 20,
              fontWeight: 700,
              color: "rgba(242,239,230,0.6)",
            }}
          >
            {readLine}
          </div>
        </div>

        {/* Category + headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#83c5b2",
              border: "1px solid rgba(131,197,178,0.4)",
              borderRadius: 8,
              padding: "8px 18px",
              marginBottom: 28,
            }}
          >
            {category}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 700,
            color: "rgba(242,239,230,0.85)",
          }}
        >
          <div style={{ display: "flex" }}>precursorproperty.com</div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              background: "#0f766e",
              color: "#ffffff",
              padding: "12px 26px",
              borderRadius: 10,
            }}
          >
            Read the guide
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
