import Link from "next/link";
import { formatAud, type Tier } from "@/lib/products";
import { CheckIcon } from "./ui";

export function PriceCard({
  tier,
  compact = false,
  badge,
}: {
  tier: Tier;
  compact?: boolean;
  badge?: string;
}) {
  const highlighted = tier.popular || !!badge;
  return (
    <Link
      href={`/order?tier=${tier.key}`}
      className={`group relative flex flex-col rounded-[10px] border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        highlighted ? "border-2 border-primary" : "border-line-strong hover:border-primary"
      }`}
    >
      {(badge ?? (tier.popular ? "Most popular" : null)) && (
        <span className="absolute -top-3 left-6 rounded-md bg-primary px-3 py-1 text-[10.5px] font-bold tracking-[0.1em] text-white uppercase">
          {badge ?? "Most popular"}
        </span>
      )}
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-[12px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
            {tier.name}
          </p>
          <p className="lining font-serif text-[2.3rem] leading-none font-semibold text-ink">
            {formatAud(tier.price)}
          </p>
        </div>
        <span
          className={`rounded-md border px-2.5 py-1 text-[10.5px] font-bold tracking-[0.06em] whitespace-nowrap uppercase ${
            tier.popular
              ? "border-transparent bg-primary-weak text-primary"
              : "border-line bg-surface text-body"
          }`}
        >
          {tier.turnaround}
        </span>
      </div>
      <p className="text-[13.5px] leading-relaxed text-muted-foreground">{tier.tagline}</p>
      {!compact && (
        <ul className="mt-4 flex flex-col gap-1.5">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-body">
              <CheckIcon className="mt-0.5 size-[15px] shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-4 border-t border-line pt-3 text-[12.5px] font-bold text-primary transition-colors group-hover:text-primary-hover">
        Select this report →
      </span>
    </Link>
  );
}

export function GuaranteeNote() {
  return (
    <p className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
      <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-success" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Money-back guarantee on your first order
    </p>
  );
}
