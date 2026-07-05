import { ImageResponse } from "next/og";

export const alt = "Precursor Property — independent property due diligence for Victoria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand OG card. Uses the default sans font for build reliability (no remote
// font fetch); layout is flexbox only, as required by ImageResponse.
export default function Image() {
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
        </div>

        {/* Headline */}
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
            Property due diligence · Victoria
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 900 }}>
            Know what you&rsquo;re buying before you sign.
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(242,239,230,0.72)", marginTop: 24, maxWidth: 820, lineHeight: 1.4 }}>
            Independent reports on the title, zoning, sales evidence and yield the listing leaves out.
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 22, fontWeight: 700, color: "rgba(242,239,230,0.85)" }}>
          <div style={{ display: "flex" }}>Delivered in 24 to 72 hours</div>
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
            From A$99
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
