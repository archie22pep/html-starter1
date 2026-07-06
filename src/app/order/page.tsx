import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { OrderForm } from "./order-form";

export const metadata: Metadata = {
  title: "Order a report",
  description:
    "Commission a Precursor Property due diligence or feasibility report. Fixed fee, 24–72 hour turnaround, money-back guarantee on your first order.",
  alternates: { canonical: "/order" },
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; stream?: string }>;
}) {
  const { tier, stream } = await searchParams;

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-12 lg:py-16">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            Order a report
          </p>
          <h1 className="mb-4 max-w-2xl font-serif text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.08] font-semibold text-ink">
            Ready to know before you sign?
          </h1>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
            Three short steps. Payment comes last, and your turnaround clock starts the moment
            it&rsquo;s made.
          </p>
        </Container>
      </section>
      <section className="py-12 lg:py-16">
        <Container>
          <OrderForm initialStream={stream} initialTier={tier} />
        </Container>
      </section>
    </>
  );
}
