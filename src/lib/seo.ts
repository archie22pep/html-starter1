/** Shared structured-data helpers, so schema objects are written once. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.precursorproperty.com";

/**
 * BreadcrumbList for a page below the home page. Pass the trail after Home,
 * e.g. breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }]).
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      ...trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    ],
  };
}

/** Renders one or more JSON-LD objects into a single script tag. */
export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
