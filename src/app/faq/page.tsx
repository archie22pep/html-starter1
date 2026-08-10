import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/content";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ: before you order",
  description:
    "Answers to common questions about Precursor Property due diligence reports: turnaround, data sources, guarantees, confidentiality, and how we differ from inspectors and conveyancers.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        {...jsonLdScript([faqJsonLd, breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }])])}
      />
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-16 text-center lg:py-20">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            Common questions
          </p>
          <h1 className="mx-auto mb-4 max-w-2xl font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.08] font-semibold text-ink">
            Before you order
          </h1>
          <p className="mx-auto max-w-xl text-[1.08rem] leading-relaxed text-muted-foreground">
            Short, straight answers to what prospective clients usually ask before commissioning
            their first report.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <Accordion className="rounded-[10px] border border-line bg-white px-6">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="py-4.5 font-serif text-[1.15rem] font-semibold text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[14.5px] leading-relaxed text-body">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-[10px] border border-line-strong bg-cream p-7">
            <div>
              <p className="mb-1 font-serif text-xl font-semibold text-ink">
                Something we haven&rsquo;t covered?
              </p>
              <p className="text-sm text-muted-foreground">
                Email hello@precursorproperty.com.au. Replies usually land the same business day.
              </p>
            </div>
            <ButtonLink href="/order">
              Order a report <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
