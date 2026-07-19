import { ArrowIcon, ButtonLink, CheckIcon, Container, SectionHead } from "@/components/ui";
import { PriceCard, GuaranteeNote } from "@/components/price-card";
import { BUSINESS, STREAMS, tiersFor, type StreamKey } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://precursorproperty.com.au";

interface StreamPageProps {
  stream: StreamKey;
  heroKicker: string;
  heroTitle: React.ReactNode;
  heroLead: string;
  covered: { label: string; desc: string }[];
  fitFor: string[];
  notFor: string[];
}

export function StreamPage({
  stream,
  heroKicker,
  heroTitle,
  heroLead,
  covered,
  fitFor,
  notFor,
}: StreamPageProps) {
  const meta = STREAMS[stream];
  const tiers = tiersFor(stream);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${meta.href}#service`,
    name: meta.name,
    serviceType: meta.name,
    description: meta.description,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: BUSINESS.region },
    offers: tiers.map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: (t.price / 100).toString(),
      priceCurrency: "AUD",
      url: `${SITE_URL}/order?tier=${t.key}`,
      description: t.tagline,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: meta.name, item: `${SITE_URL}${meta.href}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, breadcrumbJsonLd]) }}
      />
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-16 lg:py-20">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            {heroKicker}
          </p>
          <h1 className="mb-5 max-w-3xl font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.08] font-semibold text-ink">
            {heroTitle}
          </h1>
          <p className="mb-8 max-w-2xl text-[1.1rem] leading-relaxed text-muted-foreground">{heroLead}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`/order?stream=${stream}`}>
              Order {meta.shortName} report <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/sample-report.html" variant="secondary">
              Read a sample first
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* WHAT WE ANALYSE */}
      <section className="py-18 lg:py-22">
        <Container>
          <SectionHead
            index="01"
            eyebrow="Scope of research"
            title="What your analyst examines"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {covered.map((c) => (
              <div key={c.label} className="rounded-[10px] border border-line bg-white p-6">
                <h3 className="mb-1.5 font-serif text-lg font-semibold text-ink">{c.label}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PRICING */}
      <section className="border-y border-line bg-surface py-18 lg:py-22" id="pricing">
        <Container>
          <SectionHead
            index="02"
            eyebrow="Choose your depth"
            title={`${meta.name} pricing`}
            lead="Fixed prices, no subscription. Click a report to start your order. Payment is the last step."
          />
          <div className="mx-auto grid max-w-4xl items-start gap-5 pt-3 sm:grid-cols-2">
            {tiers.map((t) => (
              <PriceCard key={t.key} tier={t} />
            ))}
          </div>
          <div className="mt-6">
            <GuaranteeNote />
          </div>
        </Container>
      </section>

      {/* FIT */}
      <section className="py-18 lg:py-22">
        <Container>
          <SectionHead index="03" eyebrow="Is this the right report?" title="A candid fit check" />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[10px] border border-success/25 bg-success-weak p-7">
              <p className="mb-4 text-[11px] font-bold tracking-[0.16em] text-success uppercase">
                Order this if
              </p>
              <ul className="flex flex-col gap-3">
                {fitFor.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-body">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[10px] border border-line bg-white p-7">
              <p className="mb-4 text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                Look elsewhere if
              </p>
              <ul className="flex flex-col gap-3">
                {notFor.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-line-strong" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-cream">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="mb-2 font-serif text-[1.8rem] font-semibold">
              Ready when you are, usually within 48 hours.
            </h2>
            <p className="text-[14.5px] text-cream/60">
              Not sure which depth you need? Email the address to hello@precursorproperty.com.au
              and we&rsquo;ll recommend one, no obligation.
            </p>
          </div>
          <ButtonLink href={`/order?stream=${stream}`}>
            Start your order <ArrowIcon />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
