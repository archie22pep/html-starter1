import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container, SectionHead } from "@/components/ui";
import { PriceCard, GuaranteeNote } from "@/components/price-card";
import { Reveal } from "@/components/motion-bits";
import { BUSINESS, REPORT_PRICE, REPORT_TIER, STREAMS } from "@/lib/products";
import { SITE_URL, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing: one report, A$49 flat, no subscription",
  description:
    "Full property due diligence for A$49 flat. One complete report per property, delivered in about 48 hours, with a money-back guarantee on your first order. Development feasibility quoted by enquiry.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/pricing#report`,
    name: `${STREAMS.purchase.name}: ${REPORT_TIER.name}`,
    description: REPORT_TIER.tagline,
    brand: { "@id": `${SITE_URL}/#business` },
    category: "Property due diligence report",
    offers: {
      "@type": "Offer",
      price: (REPORT_TIER.price / 100).toString(),
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/order`,
      seller: { "@id": `${SITE_URL}/#business` },
    },
  };

  return (
    <>
      <script
        {...jsonLdScript([
          offerJsonLd,
          breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }]),
        ])}
      />
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-16 text-center lg:py-20">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            Pricing
          </p>
          <h1 className="mx-auto mb-5 max-w-2xl font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.08] font-semibold text-ink">
            One report. {REPORT_PRICE} flat. No subscription.
          </h1>
          <p className="mx-auto max-w-xl text-[1.08rem] leading-relaxed text-muted-foreground">
            A buyer&rsquo;s agent costs 1 to 3 percent of the purchase price. A wrong purchase
            costs far more. A Precursor report costs less than the building inspector&rsquo;s
            call-out fee.
          </p>
        </Container>
      </section>

      {/* THE REPORT */}
      <section className="py-18 lg:py-20">
        <Container>
          <SectionHead
            index="01"
            eyebrow={STREAMS.purchase.audience}
            title={STREAMS.purchase.name}
            lead={STREAMS.purchase.description}
          />
          <div className="mx-auto max-w-md pt-3">
            <Reveal>
              <PriceCard tier={REPORT_TIER} badge="Flat fee" />
            </Reveal>
          </div>
          <div className="mx-auto mt-6 max-w-md">
            <GuaranteeNote />
          </div>
        </Container>
      </section>

      {/* HOW IS IT $49 + DEVELOPMENT */}
      <section className="border-y border-line bg-surface py-18 lg:py-20">
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[10px] border border-line-strong bg-white p-8">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                How is it only {REPORT_PRICE}?
              </p>
              <h2 className="mb-2 font-serif text-[1.5rem] font-semibold text-ink">
                Automation gathers. A human checks everything.
              </h2>
              <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                We&rsquo;ve built a research pipeline that pulls the public record automatically:
                planning schemes, overlays, sales evidence, market data. Our analyst then reviews
                every finding, resolves the conflicts, and writes the conclusions. You get the
                depth of a long research job at the price of the checking, not the digging.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[10px] border border-line-strong bg-white p-8">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                {STREAMS.development.audience}
              </p>
              <h2 className="mb-2 font-serif text-[1.5rem] font-semibold text-ink">
                Development Intelligence: quoted by enquiry.
              </h2>
              <p className="mb-5 text-[14.5px] leading-relaxed text-muted-foreground">
                Development sites vary too much for a fixed menu. Tell us about the site and
                we&rsquo;ll reply within one business day with what we can research and a fixed
                quote. Free to ask, no obligation.
              </p>
              <ButtonLink href="/order?stream=development" variant="secondary">
                Make an enquiry <ArrowIcon />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* GUARANTEE */}
      <section className="py-18 lg:py-20">
        <Container className="mx-auto max-w-3xl">
          <Reveal>
            <div className="rounded-[10px] border border-line-strong bg-cream p-8 text-center">
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
        </Container>
      </section>

      <section className="bg-ink py-16 text-cream">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="mb-2 font-serif text-[1.8rem] font-semibold">
              Not sure it&rsquo;s worth it for your property?
            </h2>
            <p className="text-[14.5px] text-cream/60">
              Email the property address to {BUSINESS.email} and we&rsquo;ll tell you honestly,
              including &ldquo;you don&rsquo;t need us for this.&rdquo;
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
