import Link from "next/link";
import { BUSINESS } from "@/lib/products";
import { Container, Wordmark } from "./ui";

const COLS = [
  {
    heading: "Reports",
    links: [
      { href: "/reports/purchase", label: "Purchase Intelligence" },
      { href: "/reports/development", label: "Development Intelligence" },
      { href: "/pricing", label: "Pricing" },
      { href: "/sample-report.html", label: "Sample Report", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/method", label: "Our Method" },
      { href: "/faq", label: "FAQ" },
      { href: "/order", label: "Order a Report" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink pt-14 pb-8 text-cream/60">
      <Container>
        <div className="mb-10 flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-xs">
            <Wordmark dark />
            <p className="mt-3 text-[13px] leading-relaxed text-cream/55">
              Independent property due diligence reports for investors and developers across
              Victoria.
            </p>
            <div className="mt-4 flex gap-2.5">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Precursor Property on Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-cream/15 transition-colors hover:border-primary-light hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={BUSINESS.googleProfile}
                target="_blank"
                rel="noopener"
                aria-label="Precursor Property Google business profile"
                className="flex size-10 items-center justify-center rounded-full border border-cream/15 transition-colors hover:border-primary-light hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-3.5 text-[11px] font-bold tracking-[0.16em] text-cream/40 uppercase">
                {col.heading}
              </h3>
              {col.links.map((l) =>
                "external" in l && l.external ? (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="mb-2.5 block text-[13.5px] transition-colors hover:text-primary-light"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="mb-2.5 block text-[13.5px] transition-colors hover:text-primary-light"
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 pt-5 text-[12.5px] text-cream/45">
          © {new Date().getFullYear()} {BUSINESS.name}. Reports are for informational purposes
          only and do not constitute financial or investment advice. ·{" "}
          <a href={`mailto:${BUSINESS.email}`} className="hover:text-primary-light">
            {BUSINESS.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
