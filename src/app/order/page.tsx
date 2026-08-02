import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { OrderForm } from "./order-form";

export const metadata: Metadata = {
  title: "Order a report",
  description:
    "Commission a Precursor Property due diligence report for A$49, or make a development enquiry. Fixed fee, about 48 hour turnaround, money-back guarantee on your first order.",
  alternates: { canonical: "/order" },
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; stream?: string }>;
}) {
  const { stream } = await searchParams;
  const enquiry = stream === "development";

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-12 lg:py-16">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            {enquiry ? "Development enquiry" : "Order a report"}
          </p>
          <h1 className="mb-4 max-w-2xl font-serif text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.08] font-semibold text-ink">
            {enquiry ? "Tell us about the site." : "Ready to know before you sign?"}
          </h1>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            {enquiry
              ? "Two short steps, no payment. We reply within one business day with what we can research for your site and a fixed quote."
              : "Two short steps. Payment comes last, and your turnaround clock starts the moment it's made."}
          </p>
        </Container>
      </section>
      <section className="py-12 lg:py-16">
        <Container>
          <OrderForm mode={enquiry ? "enquiry" : "order"} />
        </Container>
      </section>
    </>
  );
}
