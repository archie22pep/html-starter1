import type { Metadata } from "next";
import { ButtonLink, CheckIcon, Container } from "@/components/ui";
import { BUSINESS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false },
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const paid = mode === "paid";

  const steps = paid
    ? [
        "Your payment is confirmed and your brief is with your analyst.",
        "Research starts from primary sources: VicPlan, Landata, council records, licensed sales data.",
        "Your report arrives by email within the stated turnaround for your tier.",
      ]
    : [
        "Your brief has been received and reviewed by your analyst.",
        "We'll email you a secure Stripe payment link, usually within a few business hours.",
        "Your turnaround clock starts the moment payment is made.",
      ];

  return (
    <section className="py-20 lg:py-28">
      <Container className="max-w-xl text-center">
        <span className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-primary-weak text-primary">
          <CheckIcon className="size-7" />
        </span>
        <p className="mb-3 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
          {paid ? "Payment received" : "Brief received"}
        </p>
        <h1 className="mb-4 font-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight font-semibold text-ink">
          {paid ? "Your report is underway." : "One more step: payment."}
        </h1>
        <ol className="mx-auto mb-8 flex max-w-md flex-col gap-3 text-left">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-body">
              <span className="lining mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-[11px] font-bold text-muted-foreground">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mb-8 text-[13.5px] text-muted-foreground">
          Questions in the meantime? Email{" "}
          <a href={`mailto:${BUSINESS.email}`} className="font-semibold text-primary underline">
            {BUSINESS.email}
          </a>{" "}
          and a reply usually lands the same business day.
        </p>
        <ButtonLink href="/" variant="secondary">
          Back to the site
        </ButtonLink>
      </Container>
    </section>
  );
}
