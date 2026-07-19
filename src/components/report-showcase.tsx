import Link from "next/link";

/**
 * Visual showcase of the published sample report: three miniature pages,
 * fanned like a printed document, built from the real Montmorency Full DD
 * (verdict, red flags, comparable sales). Redaction bars mirror the
 * published sample, which withholds identifying details. The whole stack
 * links to the report itself.
 */

function Bar({ w, tone = "ink" }: { w: string; tone?: "ink" | "faint" | "redact" }) {
  const cls =
    tone === "redact"
      ? "bg-[#1c2b26]/85"
      : tone === "faint"
        ? "bg-[#152520]/12"
        : "bg-[#152520]/25";
  return <span className={`block h-[5px] rounded-[2px] ${cls}`} style={{ width: w }} />;
}

const PAGE =
  "absolute rounded-[6px] border border-[#d8d2c2] bg-[#fdfcf8] shadow-xl shadow-black/30 transition-transform duration-300 ease-out";

export function ReportShowcase() {
  return (
    <div>
      <Link
        href="/sample-report.html"
        aria-label="Open the full sample report"
        className="group relative mx-auto block h-[340px] w-full max-w-[400px] sm:h-[380px]"
      >
        {/* Page 3: comparable sales */}
        <div
          className={`${PAGE} top-6 left-1/2 h-[290px] w-[210px] -translate-x-[32%] rotate-[7deg] p-4 group-hover:rotate-[10deg] sm:h-[320px] sm:w-[230px] sm:-translate-x-[12%] sm:group-hover:translate-x-[-6%]`}
        >
          <p className="mb-1 text-[7px] font-bold tracking-[0.14em] text-[#0f766e] uppercase">
            14 · Comparable Sales
          </p>
          <div className="mb-2.5 flex flex-col gap-1.5">
            {[
              { w: "72%", price: "$1,400,000" },
              { w: "64%", price: "$1,280,000" },
              { w: "58%", price: "$1,225,000" },
            ].map((row) => (
              <div key={row.price} className="flex items-center justify-between gap-2">
                <Bar w={row.w} tone="faint" />
                <span className="lining shrink-0 font-serif text-[8.5px] font-semibold text-[#152520]">
                  {row.price}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-[4px] border border-[#0f766e]/25 bg-[#ecf3ef] p-2">
            <p className="text-[6.5px] font-bold tracking-[0.1em] text-[#0f766e] uppercase">
              Fair value range
            </p>
            <p className="lining font-serif text-[13px] font-semibold text-[#152520]">
              $1.28m to $1.38m
            </p>
            <div className="mt-1 h-[4px] rounded-full bg-[#152520]/10">
              <div className="ml-[35%] h-full w-[38%] rounded-full bg-[#0f766e]" />
            </div>
          </div>
          <div className="mt-2.5 flex flex-col gap-1.5">
            <Bar w="92%" tone="faint" />
            <Bar w="86%" tone="faint" />
            <Bar w="60%" tone="faint" />
          </div>
        </div>

        {/* Page 2: red flags */}
        <div
          className={`${PAGE} top-4 left-1/2 h-[290px] w-[210px] -translate-x-[66%] rotate-[-6deg] p-4 group-hover:rotate-[-9deg] sm:h-[320px] sm:w-[230px] sm:-translate-x-[78%] sm:group-hover:translate-x-[-86%]`}
        >
          <p className="mb-1.5 text-[7px] font-bold tracking-[0.14em] text-[#0f766e] uppercase">
            03 · Red Flags
          </p>
          {[
            { label: "Rate-rise exposure", redacted: false },
            { label: "Softer resale market", redacted: false },
            { label: "", redacted: true },
          ].map((flag, i) => (
            <div key={i} className="mb-2 rounded-[4px] border border-[#e8b64c]/45 bg-[#fdf6e7] p-2">
              <p className="mb-1 flex items-center gap-1.5 text-[8px] font-bold text-[#152520]">
                <span className="size-[5px] shrink-0 rounded-full bg-[#c98a1b]" />
                {flag.redacted ? <Bar w="70px" tone="redact" /> : flag.label}
              </p>
              <div className="flex flex-col gap-1">
                <Bar w="94%" tone="faint" />
                <Bar w="78%" tone="faint" />
              </div>
            </div>
          ))}
          <div className="mt-2.5 flex flex-col gap-1.5">
            <Bar w="90%" tone="faint" />
            <Bar w="84%" tone="faint" />
          </div>
        </div>

        {/* Page 1: cover / executive summary */}
        <div
          className={`${PAGE} top-0 left-1/2 h-[300px] w-[220px] -translate-x-[46%] rotate-[0.5deg] p-5 shadow-2xl group-hover:-translate-y-1.5 sm:h-[335px] sm:w-[245px]`}
        >
          <p className="mb-0.5 font-serif text-[11px] font-bold tracking-[0.02em] text-[#0f766e]">
            Precursor<span className="text-[#152520]">.</span>
          </p>
          <p className="mb-3 text-[6.5px] font-bold tracking-[0.16em] text-[#152520]/55 uppercase">
            Property Due Diligence Report
          </p>
          <h3 className="mb-1 font-serif text-[15px] leading-snug font-semibold text-[#152520]">
            Full Due Diligence
          </h3>
          <p className="mb-3 flex flex-wrap items-center gap-1 text-[8.5px] text-[#152520]/70">
            <Bar w="34px" tone="redact" /> <Bar w="52px" tone="redact" /> Montmorency VIC
          </p>
          <div className="mb-3 rounded-[4px] border border-[#c98a1b]/40 bg-[#fdf6e7] px-2.5 py-2">
            <p className="text-[6.5px] font-bold tracking-[0.12em] text-[#152520]/60 uppercase">
              Verdict
            </p>
            <p className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#152520]">
              <span className="size-[7px] rounded-full bg-[#c98a1b]" />
              AMBER · Proceed with caution
            </p>
          </div>
          <p className="mb-1 text-[7px] font-bold tracking-[0.14em] text-[#0f766e] uppercase">
            01 · Executive Summary
          </p>
          <div className="flex flex-col gap-1.5">
            <Bar w="96%" />
            <Bar w="90%" />
            <Bar w="94%" />
            <Bar w="68%" />
            <Bar w="92%" tone="faint" />
            <Bar w="85%" tone="faint" />
            <Bar w="40%" tone="faint" />
          </div>
          <p className="absolute bottom-3 left-5 text-[6.5px] text-[#152520]/45">
            Republished with client permission · identifying details withheld
          </p>
        </div>
      </Link>
      <p className="mt-5 text-center text-[12.5px] text-cream/55">
        A real client report, June 2026. This one ran to 23 sections, shaped to their brief.
      </p>
    </div>
  );
}
