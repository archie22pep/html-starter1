import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, CheckIcon, Container, SectionHead } from "@/components/ui";
import { METHOD_SOURCES } from "@/lib/content";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Method: primary sources, human analysis",
  description:
    "How Precursor reports are researched: Victorian planning portal, Landata title searches, council records, and licensed sales data, analysed and written by a person rather than an algorithm.",
  alternates: { canonical: "/method" },
};

const PRINCIPLES = [
  {
    title: "Primary sources only",
    body: "Conclusions are drawn from VicPlan, Landata, council planning schemes, and licensed sales platforms. Never from listing copy or agent claims. Portals tell you sentiment; records tell you facts.",
  },
  {
    title: "Written by a person",
    body: "Every report is researched and written by your analyst, end to end. No templated scores, no automated verdicts. If something in the data is ambiguous, we say so and tell you how to resolve it.",
  },
  {
    title: "No conflict of interest",
    body: "We don't sell property, take referral fees, or earn commission when you buy. The report is the product, which means it's just as valuable to us when it tells you to walk away.",
  },
  {
    title: "A conclusion, not a data dump",
    body: "Each report opens with a plain-English rating (strong, proceed with caution, or doesn't stack up) followed by the evidence. You should know where we landed within one page.",
  },
];

export default function MethodPage() {
  return (
    <>
      <script {...jsonLdScript(breadcrumbJsonLd([{ name: "Our Method", path: "/method" }]))} />
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-16 lg:py-20">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            Our method
          </p>
          <h1 className="mb-5 max-w-3xl font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.08] font-semibold text-ink">
            Data from primary sources. Conclusions written by a person.
          </h1>
          <p className="max-w-2xl text-[1.1rem] leading-relaxed text-muted-foreground">
            Every Precursor report is researched and written by an analyst with five years in
            Victorian planning and property data, across 300+ properties assessed. Here is
            exactly how the work is done.
          </p>
        </Container>
      </section>

      {/* ORIGIN */}
      <section className="py-18 lg:py-22">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHead
              index="01"
              eyebrow="Why Precursor exists"
              title="Built after watching too many buyers learn the hard way."
            />
            <div className="flex max-w-xl flex-col gap-5 text-[15.5px] leading-relaxed text-body">
              <p>
                Before Precursor, I worked in real estate. I sat on the industry&rsquo;s side of
                the table, and I kept watching the same stories play out.
              </p>
              <p>
                Buyers who paid top dollar expecting strong rental returns, only to discover the
                yield was never there in the suburb&rsquo;s numbers to begin with. Families who
                bought in areas they had never researched and then spent months struggling to
                find good tenants. Buyers from overseas with no local context at all, sold into
                locations that locals knew had underperformed for a decade.
              </p>
              <p>
                None of these people were careless. They were making the largest purchase of
                their lives with far less information than the person selling to them. The agent
                knows the street. The vendor knows the property. The buyer gets a brochure and a
                fifteen-minute open home.
              </p>
              <p>
                Precursor exists to close that gap. Every report is the research I wished those
                buyers had seen before they signed: the real yield picture, the planning
                constraints, what the suburb has actually done over ten years, and a plain
                conclusion about whether the deal stacks up.
              </p>
            </div>
          </div>
          <aside className="rounded-[10px] border border-line-strong bg-cream p-7 lg:sticky lg:top-24">
            <p className="mb-5 text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
              What I kept seeing
            </p>
            <ul className="flex flex-col">
              {[
                {
                  head: "Yield that was never there",
                  body: "Rental returns taken from the listing pitch, not from the suburb's actual rental history and vacancy data.",
                },
                {
                  head: "No local context",
                  body: "Suburbs chosen on price and photos. The tenant demand, demographics, and planning picture were never checked.",
                },
                {
                  head: "Overseas buyers flying blind",
                  body: "No way to judge a location from another country, and nobody in the transaction paid to tell them the truth.",
                },
              ].map((item, i) => (
                <li key={item.head} className="border-b border-line py-4 last:border-0 last:pb-0 first:pt-0">
                  <p className="mb-1 flex items-baseline gap-3 font-serif text-lg font-semibold text-ink">
                    <span className="lining text-base text-line-strong">0{i + 1}</span>
                    {item.head}
                  </p>
                  <p className="pl-8 text-[13.5px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-18 lg:py-22">
        <Container>
          <SectionHead index="02" eyebrow="Principles" title="Four rules every report follows" />
          <div className="grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="rounded-[10px] border border-line bg-white p-7">
                <p className="lining mb-3 font-serif text-2xl font-semibold text-line-strong">
                  0{i + 1}
                </p>
                <h2 className="mb-2 font-serif text-xl font-semibold text-ink">{p.title}</h2>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-18 lg:py-22">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              index="03"
              eyebrow="Sources"
              title="Where the data comes from"
              lead="Each report cites its sources. These are the records your analyst works through for every property:"
            />
            <ul className="flex flex-col">
              {METHOD_SOURCES.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 border-b border-line py-3.5 text-[15px] font-semibold text-body last:border-0"
                >
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[10px] bg-ink p-9 text-cream">
            <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-primary-light uppercase">
              An honest boundary
            </p>
            <h2 className="mb-4 font-serif text-[1.5rem] leading-snug font-semibold">
              Desktop research, deliberately.
            </h2>
            <p className="mb-4 text-[14.5px] leading-relaxed text-cream/75">
              We don&rsquo;t visit the property, and we don&rsquo;t pretend to. Everything we
              analyse (title, zoning, overlays, sales evidence, council records) is documentary,
              which is what keeps reports fast and affordable.
            </p>
            <p className="text-[14.5px] leading-relaxed text-cream/75">
              What we can&rsquo;t see from records, we flag: every report tells you when a
              building inspector, surveyor, or conveyancer should take over, and what to ask
              them.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="mb-2 font-serif text-[1.8rem] font-semibold text-ink">
              Judge the method by its output.
            </h2>
            <p className="text-[14.5px] text-muted-foreground">
              A complete, real client report is public. Read it before you spend anything.
            </p>
          </div>
          <div className="flex gap-3">
            <ButtonLink href="/sample-report.html" variant="secondary">
              Read the sample
            </ButtonLink>
            <ButtonLink href="/order">
              Order a report <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
