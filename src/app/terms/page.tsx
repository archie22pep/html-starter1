import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Service & Disclaimer",
  description:
    "Terms of service for Precursor Property due diligence reports, including the nature of our service, liability, and refunds.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "Nature of our service",
    body: (
      <p>
        Precursor Property provides desktop research reports based on publicly available data,
        planning information, and comparable sales data. Our reports are intended to assist you
        in forming your own view of a property. They are not a substitute for independent
        professional advice from a licensed financial adviser, conveyancer, town planner, or
        building inspector.
      </p>
    ),
  },
  {
    h: "No liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by law, Precursor Property and its operators accept no
          liability for any loss, damage, or expense (including consequential loss) suffered by
          any person arising from reliance on information contained in our reports. This
          includes but is not limited to:
        </p>
        <ul className="mt-2 list-disc pl-5">
          <li>Any decision to purchase, sell, or develop a property</li>
          <li>Any inaccuracy in third-party data sources used in our research</li>
          <li>
            Any changes to planning controls, zoning, or overlay information after the report
            date
          </li>
          <li>Any financial loss resulting from a property transaction</li>
        </ul>
      </>
    ),
  },
  {
    h: "Not financial or investment advice",
    body: (
      <p>
        Precursor Property is not a licensed financial adviser under the Corporations Act 2001
        (Cth). Nothing we provide should be interpreted as a recommendation to buy, sell, or
        hold any property or asset. You should seek advice from a licensed professional before
        making any investment decision.
      </p>
    ),
  },
  {
    h: "Data accuracy",
    body: (
      <p>
        While we take care to use reliable data sources, we cannot guarantee the accuracy,
        completeness, or currency of all information. Data is sourced from publicly available
        records, council databases, and property portals which may contain errors or be subject
        to change.
      </p>
    ),
  },
  {
    h: "Refunds",
    body: (
      <p>
        If a delivered report does not address the brief you provided, we will revise it free of
        charge. If you remain unsatisfied with your first order after revision, we will refund
        it in full. Beyond the first-order guarantee, reports that have been delivered are
        non-refundable; if there is a significant error in a delivered report attributable to
        us, we will provide a corrected report at no charge.
      </p>
    ),
  },
  {
    h: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of Victoria, Australia. Any disputes will be
        subject to the exclusive jurisdiction of the courts of Victoria.
      </p>
    ),
  },
  {
    h: "Contact",
    body: <p>For any questions about these terms, contact us at hello@precursorproperty.com.au.</p>,
  },
];

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-20">
      <Container className="max-w-3xl">
        <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
          Legal
        </p>
        <h1 className="mb-3 font-serif text-4xl font-semibold text-ink">
          Terms of Service &amp; Disclaimer
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">Last updated: April 2026</p>

        <div className="mb-8 rounded-md border border-primary/25 bg-primary-weak p-4 text-[14px] font-semibold text-ink">
          Important: Precursor Property reports are for informational purposes only. Nothing in
          our reports constitutes financial, investment, legal, or professional advice.
        </div>

        <div className="flex flex-col gap-6 text-[14.5px] leading-relaxed text-body">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="mb-2 text-xs font-bold tracking-[0.09em] text-ink uppercase">{s.h}</h2>
              {s.body}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
