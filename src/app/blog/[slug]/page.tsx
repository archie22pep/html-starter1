import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowIcon, ButtonLink, CheckIcon, Container } from "@/components/ui";
import {
  POSTS,
  getPost,
  getPostBody,
  getTakeaways,
  relatedPosts,
} from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.precursorproperty.com";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.dateISO,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const body = getPostBody(slug);
  if (!post || !body) notFound();

  const takeaways = getTakeaways(slug);
  const related = relatedPosts(slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug}#article`,
      headline: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.dateISO,
      dateModified: post.dateISO,
      inLanguage: "en-AU",
      author: { "@type": "Organization", name: "Precursor Property" },
      publisher: { "@id": `${SITE_URL}/#business` },
      articleSection: post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="border-b border-line bg-gradient-to-b from-paper to-surface">
        <Container className="max-w-3xl py-14 lg:py-16">
          <nav className="mb-6 text-[12.5px] text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>{" "}
            &rsaquo;{" "}
            <Link href="/blog" className="hover:text-primary">
              Guides
            </Link>{" "}
            &rsaquo; <span className="text-body">{post.category}</span>
          </nav>
          <p className="mb-4 text-[11.5px] font-bold tracking-[0.16em] text-primary uppercase">
            {post.category}
          </p>
          <h1 className="mb-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-semibold text-ink">
            {post.title}
          </h1>
          <p className="text-[13.5px] text-muted-foreground">
            By Precursor Property · {post.readMin} min read · Updated {post.dateLabel}
          </p>
        </Container>
      </article>

      <Container className="max-w-3xl py-12 lg:py-16">
        <div className="post-prose" dangerouslySetInnerHTML={{ __html: body }} />

        {takeaways.length > 0 && (
          <div className="mt-10 rounded-[10px] border border-line-strong bg-cream p-7">
            <h2 className="mb-4 font-serif text-xl font-semibold text-ink">Key takeaways</h2>
            <ul className="flex flex-col gap-2.5">
              {takeaways.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-body">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-[10px] bg-ink p-8 text-cream">
          <div>
            <h2 className="mb-1.5 font-serif text-[1.5rem] font-semibold">
              Know exactly what you&rsquo;re buying.
            </h2>
            <p className="text-[14px] text-cream/65">
              We pressure-test the planning, zoning, overlays and value behind a Victorian
              property in a clear report. A$49 flat, in about 48 hours.
            </p>
          </div>
          <ButtonLink href="/order">
            Order a Report <ArrowIcon />
          </ButtonLink>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-ink">Keep reading</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-[10px] border border-line bg-white p-5 transition-colors hover:border-primary"
              >
                <span className="text-[11px] font-bold tracking-[0.08em] text-primary uppercase">
                  {r.category}
                </span>
                <p className="mt-1.5 font-serif text-[1.05rem] leading-snug font-semibold text-ink group-hover:text-primary-hover">
                  {r.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-[12px] leading-relaxed text-muted-foreground">
          General information only, current as at {post.dateLabel}, and not legal or financial
          advice. Always have contracts and title reviewed by a qualified conveyancer or
          solicitor for your specific purchase.
        </p>
      </Container>
    </>
  );
}
