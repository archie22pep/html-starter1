import Link from "next/link";
import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/motion-bits";
import { POSTS } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://precursorproperty.com.au";

export const metadata: Metadata = {
  title: "Insights: property due diligence guides for Victoria",
  description:
    "Plain-English guides on zoning, overlays, Section 32 contracts, capital growth and property tax for Victorian buyers and developers, from Precursor Property.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Precursor Insights",
    description: "Property due diligence guides for Victorian buyers and developers.",
    url: `${SITE_URL}/blog`,
    inLanguage: "en-AU",
    publisher: { "@id": `${SITE_URL}/#business` },
    blogPost: POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.dateISO,
      author: { "@type": "Organization", name: "Precursor Property" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <section className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="py-16 text-center lg:py-20">
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.18em] text-primary uppercase">
            Precursor Insights
          </p>
          <h1 className="mx-auto mb-4 max-w-2xl font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.08] font-semibold text-ink">
            Buy Victorian property with your eyes open.
          </h1>
          <p className="mx-auto max-w-xl text-[1.08rem] leading-relaxed text-muted-foreground">
            Plain-English guides on zoning, overlays, contracts and capital growth, from the team
            that researches due diligence for a living.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-[10px] border border-line-strong bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg"
                >
                  <span className="mb-4 inline-block self-start rounded-md bg-primary-weak px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-primary uppercase">
                    {post.category}
                  </span>
                  <h2 className="mb-2.5 font-serif text-[1.4rem] leading-tight font-semibold text-ink">
                    {post.title}
                  </h2>
                  <p className="mb-5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                    <span className="text-[12.5px] text-muted-foreground">
                      {post.readMin} min read · {post.dateLabel}
                    </span>
                    <span className="text-[13.5px] font-bold text-primary group-hover:text-primary-hover">
                      Read guide →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[10px] bg-ink p-9 text-cream">
            <div>
              <h2 className="mb-2 font-serif text-[1.7rem] font-semibold">
                Know exactly what you&rsquo;re buying.
              </h2>
              <p className="text-[14.5px] text-cream/65">
                Independent due diligence reports on any Victorian property, in 24 to 72 hours.
              </p>
            </div>
            <ButtonLink href="/order">
              Order a Report <ArrowIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
