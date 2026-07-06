import type { Metadata } from "next";
import { StreamPage } from "@/components/stream-page";

export const metadata: Metadata = {
  title: "Purchase Intelligence: buyer due diligence reports",
  description:
    "Desktop due diligence for Victorian property buyers: title and encumbrances, zoning and overlays, comparable sales, rental yield, growth signals, and negotiation strategy. From A$99.",
  alternates: { canonical: "/reports/purchase" },
};

export default function PurchasePage() {
  return (
    <StreamPage
      stream="purchase"
      heroKicker="Purchase Intelligence · For buyers & investors"
      heroTitle={
        <>
          The research behind the property, <em className="text-primary italic">before</em> the
          offer.
        </>
      }
      heroLead="You've found a property. Before you commit hundreds of thousands of dollars, we spend the hours you can't: pulling title records, planning overlays, comparable sales and growth data, then writing you a clear conclusion. Strong, risky, or doesn't stack up."
      covered={[
        {
          label: "Title & encumbrances",
          desc: "Easements, covenants, rights-of-way, and title history anomalies that restrict what you can do with the property.",
        },
        {
          label: "Zoning & overlays",
          desc: "Residential zone rules plus flood, heritage, bushfire, and landscape overlays, confirmed against VicPlan rather than the listing.",
        },
        {
          label: "Comparable sales",
          desc: "Matched recent sales and a fair-value range, so you know what the evidence supports before you negotiate.",
        },
        {
          label: "Capital growth signals",
          desc: "Ten-year suburb trends, demand indicators, and the infrastructure pipeline that moves prices.",
        },
        {
          label: "Rental & yield data",
          desc: "Vacancy rates, rental benchmarks, and gross yield modelling for the property as an investment.",
        },
        {
          label: "Vendor intelligence",
          desc: "Days on market, price history, and motivation signals that give you leverage in negotiation.",
        },
      ]}
      fitFor={[
        "You've shortlisted a property and want the risks surfaced before you offer or bid",
        "You're buying an investment and need yield and growth evidence, not agent sentiment",
        "You have an auction coming and need certainty on a deadline",
        "You want a second, independent opinion on a buyer's agent's recommendation",
      ]}
      notFor={[
        "You need a physical building or pest inspection. That requires a licensed inspector on site",
        "You want someone to search and shortlist properties for you. That's a buyer's agent",
        "You need formal legal advice on the contract of sale. That's your conveyancer",
      ]}
    />
  );
}
