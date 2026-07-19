/**
 * Hero visual: the iceberg, drawn for real. A house with a FOR SALE sign
 * above the waterline, the hidden record looming beneath, and a little
 * Precursor submarine reading the deep. Decorative; animates on load and
 * respects prefers-reduced-motion via the global media query.
 */

const WAVE_FRONT =
  "M-160 152 Q-140 144 -120 152 T-80 152 T-40 152 T0 152 T40 152 T80 152 T120 152 T160 152 T200 152 T240 152 T280 152 T320 152 T360 152 T400 152 T440 152 T480 152 L480 176 L-160 176 Z";
const WAVE_BACK =
  "M-180 156 Q-160 150 -140 156 T-100 156 T-60 156 T-20 156 T20 156 T60 156 T100 156 T140 156 T180 156 T220 156 T260 156 T300 156 T340 156 T380 156 T420 156 T460 156 T500 156 L500 184 L-180 184 Z";

const TAGS = [
  { x: 36, y: 204, w: 164, label: "Covenants & easements", delay: 0.4 },
  { x: 300, y: 248, w: 138, label: "Planning overlays", delay: 0.55 },
  { x: 30, y: 318, w: 158, label: "Flood & bushfire maps", delay: 0.7 },
  { x: 286, y: 362, w: 172, label: "Real sale & rent history", delay: 0.85 },
  { x: 74, y: 428, w: 118, label: "Vendor motive", delay: 1.0 },
];

export function OceanCard() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <div className="relative z-10 overflow-hidden rounded-[10px] border border-line-strong shadow-2xl shadow-ink/15">
        <svg viewBox="0 0 480 560" className="block w-full" role="img">
          <defs>
            <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f8577" />
              <stop offset="45%" stopColor="#1d4f44" />
              <stop offset="100%" stopColor="#14241e" />
            </linearGradient>
            <linearGradient id="berg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f7f4ea" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#f7f4ea" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="480" height="152" fill="#f1ecdf" />
          <circle cx="402" cy="52" r="30" fill="#e8b64c" opacity="0.16" />
          <circle cx="402" cy="52" r="20" fill="#e8b64c" />
          <path
            d="M64 54 q5 -5 10 0 M80 63 q5 -5 10 0 M48 68 q4 -4 8 0"
            stroke="#152520"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />

          {/* Sea */}
          <rect x="0" y="150" width="480" height="410" fill="url(#sea)" />

          {/* Submerged berg: the hidden bulk */}
          <polygon
            points="208,152 272,152 322,240 296,340 322,436 240,516 158,436 186,340 150,240"
            fill="url(#berg)"
            stroke="rgba(247,244,234,0.3)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />

          {/* Berg tip + house above the waterline */}
          <polygon
            points="212,150 268,150 262,124 240,112 218,126"
            fill="#fbfaf6"
            stroke="#cfc9b8"
            strokeWidth="1"
          />
          <rect x="252" y="70" width="7" height="14" fill="#152520" />
          <rect x="222" y="86" width="36" height="28" fill="#f7f4ea" stroke="#152520" strokeWidth="2" />
          <polygon points="216,88 240,66 264,88" fill="#152520" />
          <rect x="236" y="98" width="10" height="16" fill="#0f766e" />
          <rect x="226" y="92" width="8" height="8" fill="#e8b64c" stroke="#152520" strokeWidth="1" />

          {/* FOR SALE sign */}
          <g transform="translate(288,98) rotate(4)">
            <rect x="18" y="16" width="3" height="38" fill="#6b5f4a" />
            <rect x="0" y="0" width="42" height="20" rx="2" fill="#ffffff" stroke="#152520" strokeWidth="1.5" />
            <text
              x="21"
              y="13.5"
              textAnchor="middle"
              fontFamily="var(--font-source-sans), sans-serif"
              fontSize="8"
              fontWeight="900"
              letterSpacing="0.5"
              fill="#a83a30"
            >
              FOR SALE
            </text>
          </g>

          {/* Waves */}
          <g className="wave-drift-slow">
            <path d={WAVE_BACK} fill="#a5d8c9" opacity="0.35" />
          </g>
          <g className="wave-drift">
            <path d={WAVE_FRONT} fill="#7fc4b0" opacity="0.5" />
          </g>

          {/* Hidden-record tags */}
          {TAGS.map((t) => (
            <g key={t.label} className="rise-in" style={{ animationDelay: `${t.delay}s` }}>
              <rect
                x={t.x}
                y={t.y}
                width={t.w}
                height="26"
                rx="13"
                fill="rgba(16,30,25,0.72)"
                stroke="rgba(131,197,178,0.35)"
                strokeWidth="1"
              />
              <circle cx={t.x + 14} cy={t.y + 13} r="3" fill="#83c5b2" />
              <text
                x={t.x + 26}
                y={t.y + 17}
                fontFamily="var(--font-source-sans), sans-serif"
                fontSize="11"
                fontWeight="700"
                fill="#f2efe6"
              >
                {t.label}
              </text>
            </g>
          ))}

          {/* Fish */}
          <g transform="translate(376,296)">
            <g className="fish">
              <ellipse cx="0" cy="0" rx="12" ry="6" fill="#83c5b2" />
              <polygon points="-11,0 -20,-6 -20,6" fill="#83c5b2" />
              <circle cx="5" cy="-1.5" r="1.3" fill="#14241e" />
            </g>
          </g>
          <g transform="translate(96,478) scale(-1,1)">
            <g className="fish" style={{ animationDuration: "7s", animationDelay: "0.8s" }}>
              <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#5aa893" />
              <polygon points="-8,0 -15,-4.5 -15,4.5" fill="#5aa893" />
              <circle cx="4" cy="-1" r="1" fill="#14241e" />
            </g>
          </g>

          {/* Bubbles */}
          <circle className="bubble" cx="352" cy="470" r="3" fill="rgba(247,244,234,0.5)" />
          <circle className="bubble" cx="342" cy="488" r="2" fill="rgba(247,244,234,0.45)" style={{ animationDelay: "1.6s" }} />
          <circle className="bubble" cx="362" cy="494" r="2.4" fill="rgba(247,244,234,0.4)" style={{ animationDelay: "3s" }} />

          {/* The Precursor submarine, reading the deep */}
          <g transform="translate(322,452)">
            <g className="bob">
              <polygon points="4,16 -118,-26 -118,60" fill="#e8b64c" opacity="0.1" />
              <polygon points="74,6 92,-2 92,34 74,26" fill="#217e6f" />
              <rect x="30" y="-14" width="18" height="16" rx="3" fill="#217e6f" />
              <rect x="36" y="-27" width="3.5" height="14" fill="#217e6f" />
              <rect x="36" y="-27" width="11" height="3.5" rx="1.5" fill="#217e6f" />
              <rect x="0" y="0" width="78" height="32" rx="16" fill="#2fa08e" />
              <circle cx="18" cy="16" r="5" fill="#f7f4ea" stroke="#14524a" strokeWidth="1.5" />
              <circle cx="56" cy="16" r="5" fill="#f7f4ea" stroke="#14524a" strokeWidth="1.5" />
              <text
                x="39"
                y="20"
                textAnchor="middle"
                fontFamily="var(--font-garamond), Georgia, serif"
                fontSize="11"
                fontWeight="700"
                fill="#f7f4ea"
              >
                P.
              </text>
            </g>
          </g>

          {/* Caption */}
          <text
            x="240"
            y="547"
            textAnchor="middle"
            fontFamily="var(--font-garamond), Georgia, serif"
            fontStyle="italic"
            fontSize="16"
            fill="rgba(242,239,230,0.9)"
          >
            A Precursor report reads below the waterline.
          </text>
        </svg>
      </div>
      <div className="absolute -top-3 -left-3 -z-0 size-full rounded-[10px] border border-line-strong bg-cream" />
    </div>
  );
}
