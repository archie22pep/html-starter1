import Link from "next/link";
import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, CheckIcon, Container, SectionHead } from "@/components/ui";
import { GuaranteeNote } from "@/components/price-card";
import { OceanCard } from "@/components/ocean-card";
import { CountUp, Reveal } from "@/components/motion-bits";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BUSINESS, FROM_PRICE, STREAMS, tiersFor } from "@/lib/products";
import {
  COMPARISON,
  DATA_SOURCES,
  FAQS,
  PROCESS_STEPS,
  STATS,
  TESTIMONIALS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Precursor | Property Due Diligence Reports | Victoria",
  description:
    "Know what you're buying before you sign. Independent due diligence reports for Victorian buyers and developers: zoning, comparable sales, growth signals, feasibility. From A$99, delivered in 24 to 72 hours.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = TESTIMONIALS.find((t) => t.featured)!;
  const rest = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-gradient-to-b from-paper from-55% to-surface">
        <Container className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-md border border-line-strong px-3.5 py-1.5 text-[11.5px] font-bold tracking-[0.13em] text-primary uppercase">
              <span className="size-1.5 rounded-full bg-primary" />
              Independent · Victoria-wide · From {FROM_PRICE}
            </p>
            <h1 className="mt-6 mb-5 font-serif text-[clamp(2.7rem,5.2vw,4.3rem)] leading-[1.05] font-semibold text-ink">
              Know what you&rsquo;re buying{" "}
              <em className="text-primary italic">before you sign.</em>
            </h1>
            <p className="mb-8 max-w-md text-[1.14rem] leading-relaxed text-muted-foreground">
              We surface what the listing leaves out, before you sign or bid.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/order">
                Order a Report <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/sample-report.html" variant="secondary">
                Read a real sample
              </ButtonLink>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-semibold text-body">
              {["48-hr average delivery", "Money-back guarantee", "No subscription"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckIcon className="size-[15px] text-primary" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full">
            <OceanCard />
          </div>
        </Container>
      </section>

      {/* TRUST STRIP */}
      <div className="border-b border-line bg-surface py-4.5">
        <Container className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <a
            href={BUSINESS.googleProfile}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-white px-3.5 py-1.5 text-[13.5px] font-bold text-ink transition-colors hover:border-primary"
          >
            <span className="text-[13px] tracking-widest text-gold" aria-hidden="true">
              ★★★★★
            </span>
            Read our Google reviews
          </a>
          <span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
            Data sourced from
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DATA_SOURCES.map((s) => (
              <span
                key={s}
                className="rounded-md border border-line bg-white px-3 py-1 text-xs font-bold tracking-wide text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* STATS */}
      <section className="py-14">
        <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="mb-2 font-serif text-[clamp(2.2rem,3.6vw,3rem)] leading-none font-semibold text-ink">
                <CountUp value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
              </p>
              <p className="text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* PROCESS */}
      <section className="border-y border-line bg-surface py-20 lg:py-24" id="process">
        <Container>
          <SectionHead
            index="01"
            eyebrow="How it works"
            title="From brief to report in as little as 24 hours"
            center
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.07}>
                <div className="h-full rounded-[10px] border border-line bg-white p-6 transition-shadow duration-200 hover:shadow-md">
                  <p className="lining mb-3 font-serif text-3xl font-semibold text-line-strong">
                    {step.num}
                  </p>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  <span className="rounded-md border border-success/25 bg-success-weak px-2.5 py-1 text-[10.5px] font-bold tracking-[0.08em] text-success uppercase">
                    {step.time}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* STREAMS */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHead
            index="02"
            eyebrow="Two report streams"
            title="Buying a property, or building on one?"
            lead="Every report is researched from primary sources and written by an analyst. Pick the stream that matches your decision."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {Object.values(STREAMS).map((stream, i) => {
              const tiers = tiersFor(stream.key);
              const from = Math.min(...tiers.map((t) => t.price));
              return (
                <Reveal key={stream.key} delay={i * 0.08}>
                  <Link
                    href={stream.href}
                    className="group block h-full rounded-[10px] border border-line-strong bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
                  >
                    <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
                      {stream.audience}
                    </p>
                    <h3 className="mb-3 font-serif text-[1.7rem] leading-tight font-semibold text-ink">
                      {stream.name}
                    </h3>
                    <p className="mb-5 text-[15px] leading-relaxed text-muted-foreground">
                      {stream.description}
                    </p>
                    <ul className="mb-6 flex flex-col">
                      {tiers.map((t) => (
                        <li
                          key={t.key}
                          className="flex items-center justify-between border-b border-line py-2 text-sm"
                        >
                          <span className="font-semibold text-body">{t.name}</span>
                          <span className="lining font-serif text-base font-semibold text-ink">
                            {`A$${t.price / 100}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <span className="text-[13.5px] font-bold text-primary transition-colors group-hover:text-primary-hover">
                      Explore {stream.shortName} reports from A${from / 100} →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-6">
            <GuaranteeNote />
          </div>
        </Container>
      </section>

      {/* SAMPLE REPORT BAND */}
      <section className="bg-ink py-20 text-cream lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              index="03"
              eyebrow="See it before you order"
              title="Read a complete report, not a brochure"
              lead="We publish a real Full Due Diligence report, delivered to a client in June 2026 and republished with their permission (identifying details withheld). Red flags, comparable sales, a rate stress test, negotiation strategy, and an honest verdict. Every report is shaped to the property and your brief; judge the work before you spend a dollar."
              dark
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/sample-report.html" variant="on-dark">
                Open the sample report <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/order">Order yours</ButtonLink>
            </div>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {[
              "Executive summary with a clear rating",
              "Red flags, itemised and explained",
              "Comparable sales & fair-value range",
              "10-year growth projection",
              "Finance & cash-flow snapshot",
              "Negotiation talking points",
            ].map((f, i) => (
              <Reveal key={f} delay={i * 0.05}>
                <li className="flex items-start gap-2.5 rounded-md border border-cream/12 bg-white/[0.03] px-4 py-3 text-sm text-cream/85">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary-light" />
                  {f}
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHead
            index="04"
            eyebrow="What clients say"
            title="Trusted before the biggest decisions"
            center
          />
          <div className="grid items-start gap-5 lg:grid-cols-[1.05fr_1fr]">
            <Reveal>
              <figure className="flex h-full flex-col gap-5 rounded-[10px] bg-ink p-10 text-cream">
                <p className="text-sm tracking-[2px] text-gold" aria-hidden="true">
                  ★★★★★
                </p>
                <blockquote className="flex-1 font-serif text-[1.4rem] leading-normal">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary-light/15 text-[13px] font-black text-primary-light">
                    {featured.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{featured.name}</span>
                    <span className="block text-[12.5px] text-cream/55">{featured.context}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            <div className="flex flex-col gap-5">
              {rest.map((t, i) => (
                <Reveal key={t.initials} delay={0.08 + i * 0.08}>
                  <figure className="rounded-[10px] border border-line bg-white p-7">
                    <p className="mb-3 text-sm tracking-[2px] text-gold" aria-hidden="true">
                      ★★★★★
                    </p>
                    <blockquote className="mb-4 font-serif text-[1.08rem] leading-relaxed text-body">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary-weak text-[13px] font-black text-primary">
                        {t.initials}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-ink">{t.name}</span>
                        <span className="block text-[12.5px] text-muted-foreground">
                          {t.context}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FOUNDER NOTE */}
      <section className="border-t border-line py-14">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
              From the founder
            </p>
            <p className="mb-5 font-serif text-[clamp(1.5rem,2.8vw,2.1rem)] leading-snug font-semibold text-ink">
              &ldquo;I worked in real estate and watched too many buyers learn the hard way.
              Precursor is the research I wished they&rsquo;d seen before they signed.&rdquo;
            </p>
            <Link
              href="/method"
              className="text-sm font-bold text-primary hover:text-primary-hover"
            >
              Read why Precursor exists →
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* COMPARISON */}
      <section className="border-y border-line bg-surface py-20 lg:py-24">
        <Container>
          <SectionHead
            index="05"
            eyebrow="Why Precursor"
            title="Why not a buyers agent, or a data platform?"
            lead="Both have their place. Neither does what Precursor does."
          />
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col gap-4">
              {COMPARISON.alternatives.map((alt, i) => (
                <Reveal key={alt.label} delay={i * 0.08}>
                  <div className="rounded-[10px] border border-line bg-white p-7">
                    <p className="mb-2.5 text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                      {alt.label}
                    </p>
                    <p className="lining mb-2.5 font-serif text-[1.7rem] font-semibold text-ink">
                      {alt.fact}
                    </p>
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">{alt.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.12}>
              <div className="flex h-full flex-col rounded-[10px] bg-ink p-9 text-cream">
                <p className="mb-2 text-[11px] font-bold tracking-[0.18em] text-primary-light uppercase">
                  Precursor
                </p>
                <p className="lining mb-6 font-serif text-[2.1rem] font-semibold">
                  From {FROM_PRICE} per report
                </p>
                <ul className="mb-7 flex flex-col gap-3.5">
                  {COMPARISON.precursor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-cream/85"
                    >
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary-light" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/order" className="self-start">
                  Order a Report <ArrowIcon />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ TEASER + GUARANTEE */}
      <section className="py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead index="06" eyebrow="Before you order" title="Common questions" />
            <Accordion className="rounded-[10px] border border-line bg-white px-6">
              {FAQS.slice(0, 3).map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="py-4 font-serif text-[1.1rem] font-semibold text-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-[14px] leading-relaxed text-body">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link
              href="/faq"
              className="mt-5 inline-block text-sm font-bold text-primary hover:text-primary-hover"
            >
              All questions answered →
            </Link>
          </div>
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-[10px] border border-line-strong bg-cream p-9">
              <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                The Precursor guarantee
              </p>
              <p className="mb-4 font-serif text-[1.6rem] leading-snug font-semibold text-ink">
                Revised free if it misses the brief. Refunded in full if you&rsquo;re still not
                satisfied.
              </p>
              <p className="mb-7 text-[14.5px] leading-relaxed text-muted-foreground">
                {BUSINESS.guarantee}
              </p>
              <ButtonLink href="/order" className="self-start">
                Start your order <ArrowIcon />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
