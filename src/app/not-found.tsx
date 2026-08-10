import Link from "next/link";
import type { Metadata } from "next";
import { ArrowIcon, ButtonLink, Container } from "@/components/ui";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Branded 404. A dead end wastes the visit and the crawl, so this recirculates
 * to the main pages and the newest guides instead.
 */
export default function NotFound() {
  const recent = POSTS.slice(0, 3);

  return (
    <section className="py-20 lg:py-28">
      <Container className="max-w-2xl text-center">
        <p className="lining mb-4 font-serif text-[clamp(3.5rem,9vw,6rem)] leading-none font-semibold text-line-strong">
          404
        </p>
        <h1 className="mb-4 font-serif text-[clamp(1.9rem,4vw,2.6rem)] leading-tight font-semibold text-ink">
          That page isn&rsquo;t here.
        </h1>
        <p className="mx-auto mb-8 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground">
          The link may be out of date, or the address may have a typo. Everything below still
          works.
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            Back to home <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/blog" variant="secondary">
            Browse the guides
          </ButtonLink>
        </div>

        <div className="rounded-[10px] border border-line bg-white p-7 text-left">
          <p className="mb-4 text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
            Latest guides
          </p>
          <ul className="flex flex-col gap-3">
            {recent.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="font-serif text-[1.05rem] leading-snug font-semibold text-ink hover:text-primary"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
