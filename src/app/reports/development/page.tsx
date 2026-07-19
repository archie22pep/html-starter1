import type { Metadata } from "next";
import { StreamPage } from "@/components/stream-page";

export const metadata: Metadata = {
  title: "Development Intelligence: feasibility reports",
  description:
    "Desktop feasibility for Victorian sites: zoning and residential code, subdivision potential, permit pathway, margin modelling, and council approval probability. From A$149.",
  alternates: { canonical: "/reports/development" },
};

export default function DevelopmentPage() {
  return (
    <StreamPage
      stream="development"
      heroKicker="Development Intelligence · For owners & small developers"
      heroTitle={
        <>
          What the site can <em className="text-primary italic">actually</em> do, before you
          spend on consultants.
        </>
      }
      heroLead="Subdivision, dual occupancy, knock-down rebuild: the difference between a good project and an expensive lesson is usually visible in the planning data. We assess the site's real potential and the approval pathway before you engage a town planner or architect."
      covered={[
        {
          label: "Zoning & residential code",
          desc: "The zone schedule, minimum lot sizes, and ResCode implications for what can be built.",
        },
        {
          label: "Subdivision potential",
          desc: "Lot dimensions, frontage, orientation, and realistic yield for the site.",
        },
        {
          label: "Overlay constraints",
          desc: "Vegetation, landscape, heritage, and environmental overlays that shape a permit, or sink it.",
        },
        {
          label: "Permit pathway",
          desc: "The likely approval route, referral triggers, objection risk, and council track record on similar applications.",
        },
        {
          label: "Feasibility modelling",
          desc: "End values from comparable outcomes, construction cost benchmarks, and margin under multiple scenarios.",
        },
        {
          label: "Servicing & access",
          desc: "Sewer, stormwater, easements, and crossover constraints that affect buildability and cost.",
        },
      ]}
      fitFor={[
        "You own (or are buying) a block and want to know if subdivision or units stack up",
        "You need a business case you can take to a lender, partner, or the family",
        "You want your assumptions stress-tested before committing consultant fees",
        "You're comparing two or three candidate sites and need a like-for-like read",
      ]}
      notFor={[
        "You need drawings or a planning permit application prepared. That's a town planner or architect",
        "You need a certified land survey. That's a licensed surveyor",
        "Your project is a large multi-storey development. Our focus is small residential projects",
      ]}
    />
  );
}
