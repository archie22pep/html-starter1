import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container, SectionHead } from "@/components/ui";
import { PriceCard, GuaranteeNote } from "@/components/price-card";
import { Reveal } from "@/components/motion-bits";
import { BUSINESS, STREAMS, tiersFor } from "@/lib/products";

export const metadata: Metadata = {
  title: "Pricing: fixed-fee reports, no subscription",
  description:
    "Fixed-price property due diligence from A$99. Purchase reports and development feasibility with a money-back guarantee on your first order.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-16 text-center lg:py-20">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            Pricing
          </p>
          <h1 className="mx-auto mb-5 max-w-2xl font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.08] font-semibold text-ink">
            Fixed fees. No subscription. Priced against the mistake it prevents.
          </h1>
          <p className="mx-auto max-w-xl text-[1.08rem] leading-relaxed text-muted-foreground">
            A buyer&rsquo;s agent costs 1 to 3 percent of the purchase price. A wrong purchase
            costs far more. Every Precursor report is a one-off fixed fee, delivered in 24 to 72
            hours.
          </p>
        </Container>
      </section>

      {Object.values(STREAMS).map((stream, i) => (
        <section
          key={stream.key}
          className={`py-18 lg:py-20 ${i % 2 === 1 ? "border-y border-line bg-surface" : ""}`}
        >
          <Container>
            <SectionHead
              index={`0${i + 1}`}
              eyebrow={stream.audience}
              title={stream.name}
              lead={stream.description}
            />
            <div className="mx-auto grid max-w-4xl items-start gap-5 pt-3 sm:grid-cols-2">
              {tiersFor(stream.key).map((t, j) => (
                <Reveal key={t.key} delay={j * 0.08}>
                  <PriceCard tier={t} />
                </Reveal>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-4xl">
              <GuaranteeNote />
            </div>
          </Container>
        </section>
      ))}

      {/* GUARANTEE + UPGRADE PATH */}
      <section className="py-18 lg:py-20">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[10px] border border-line-strong bg-cream p-8">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                First-order guarantee
              </p>
              <h2 className="mb-2 font-serif text-[1.5rem] font-semibold text-ink">
                Revised free, or refunded in full.
              </h2>
              <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                {BUSINESS.guarantee}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[10px] border border-line-strong bg-white p-8">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                Start small, upgrade later
              </p>
              <h2 className="mb-2 font-serif text-[1.5rem] font-semibold text-ink">
                Your entry report counts as credit.
              </h2>
              <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                Order a Quick Screen or Site Check first. If you decide to go deeper within 30
                days, the full amount you paid comes off the larger report on the same property.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink py-16 text-cream">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="mb-2 font-serif text-[1.8rem] font-semibold">
              Not sure which report fits?
            </h2>
            <p className="text-[14.5px] text-cream/60">
              Email the property address to {BUSINESS.email} and we&rsquo;ll recommend one
              honestly, including &ldquo;you don&rsquo;t need us for this.&rdquo;
            </p>
          </div>
          <div className="flex gap-3">
            <ButtonLink href="/order">
              Start an order <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
