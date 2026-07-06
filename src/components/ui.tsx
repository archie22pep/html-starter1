import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ---------- Icons (lucide-react) ---------- */

export function CheckIcon({ className = "size-4" }: { className?: string }) {
  return <Check className={className} strokeWidth={2.4} aria-hidden="true" />;
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return <ArrowRight className={className} strokeWidth={2.2} aria-hidden="true" />;
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  const inkFill = dark ? "#f7f4ea" : "#152520";
  const dotFill = dark ? "#83c5b2" : "#0f766e";
  return (
    <svg viewBox="0 0 158 32" className="h-8 w-auto" role="img" aria-label="Precursor">
      <rect x="1" y="4" width="24" height="24" rx="5" fill={dark ? "#0f766e" : "#152520"} />
      <rect x="6.5" y="16" width="3.4" height="7" rx="1.2" fill={dark ? "#f7f4ea" : "#83c5b2"} fillOpacity="0.55" />
      <rect x="11.3" y="12" width="3.4" height="11" rx="1.2" fill={dark ? "#f7f4ea" : "#83c5b2"} fillOpacity="0.8" />
      <rect x="16.1" y="8" width="3.4" height="15" rx="1.2" fill={dark ? "#f7f4ea" : "#2fa08e"} />
      <text
        x="34"
        y="23"
        fontFamily="var(--font-garamond), Georgia, serif"
        fontSize="21"
        fontWeight="600"
        fill={inkFill}
      >
        Precursor<tspan fill={dotFill}>.</tspan>
      </text>
    </svg>
  );
}

/* ---------- Buttons (shadcn/ui buttonVariants, CTA-sized) ---------- */

const ctaSize = "min-h-12 gap-2 rounded-md px-6 py-3 text-[15px] font-bold";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "on-dark";
  className?: string;
}) {
  const styles = {
    primary: cn(buttonVariants({ variant: "default" }), ctaSize, "hover:bg-primary-hover"),
    secondary: cn(
      buttonVariants({ variant: "outline" }),
      ctaSize,
      "border-line-strong bg-white text-ink hover:border-ink hover:bg-white",
    ),
    "on-dark": cn(
      buttonVariants({ variant: "outline" }),
      ctaSize,
      "border-cream/30 bg-white/5 text-cream hover:border-cream/60 hover:bg-white/10 hover:text-cream",
    ),
  }[variant];
  return (
    <Link href={href} className={cn(styles, className)}>
      {children}
    </Link>
  );
}

/* ---------- Section primitives (dossier motif) ---------- */

export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  center = false,
  dark = false,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        className={`mb-4 flex items-baseline gap-3 text-[11.5px] font-bold tracking-[0.18em] uppercase ${
          center ? "justify-center" : ""
        } ${dark ? "text-primary-light" : "text-primary"}`}
      >
        {index && (
          <span className={`lining ${dark ? "text-cream/40" : "text-line-strong"}`}>
            {index}
          </span>
        )}
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] font-semibold ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-[1.06rem] leading-relaxed ${
            dark ? "text-cream/60" : "text-muted-foreground"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}
