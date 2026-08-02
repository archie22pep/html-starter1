/**
 * Hero montage imagery.
 *
 * With UNSPLASH_ACCESS_KEY set (server-side only, never shipped to the
 * browser), we pull fresh Melbourne aerials from the Unsplash API once a day
 * (fetch cache `revalidate`). Without the key, or on any API failure, the
 * committed fallback set in /public/hero is used, so the banner never breaks.
 * Unsplash photos are free for commercial use under the Unsplash Licence.
 */

export interface HeroImage {
  src: string;
  alt: string;
}

export const FALLBACK_HERO_IMAGES: HeroImage[] = [
  { src: "/hero/aerial-1.jpg", alt: "Aerial view of the Melbourne CBD skyline at sunrise" },
  { src: "/hero/aerial-2.jpg", alt: "Drone view over inner Melbourne, city towers and parkland" },
  { src: "/hero/aerial-3.jpg", alt: "Top-down aerial of an Australian suburban neighbourhood" },
  { src: "/hero/aerial-4.jpg", alt: "Aerial view along the Yarra River and Flinders Street, Melbourne" },
  { src: "/hero/aerial-5.jpg", alt: "Bird's-eye view of suburban homes and streets" },
];

interface UnsplashPhoto {
  urls?: { raw?: string };
  alt_description?: string | null;
}

export async function getHeroImages(): Promise<HeroImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return FALLBACK_HERO_IMAGES;

  try {
    const params = new URLSearchParams({
      query: "melbourne australia aerial",
      orientation: "landscape",
      content_filter: "high",
      per_page: "5",
    });
    const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
      headers: { Authorization: `Client-ID ${key}` },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return FALLBACK_HERO_IMAGES;
    const data = (await res.json()) as { results?: UnsplashPhoto[] };
    const images = (data.results ?? [])
      .filter((p) => p.urls?.raw)
      .map((p) => ({
        src: `${p.urls!.raw}&w=1920&q=62&fm=jpg&fit=crop`,
        alt: p.alt_description ?? "Aerial view of Melbourne, Australia",
      }));
    return images.length >= 3 ? images : FALLBACK_HERO_IMAGES;
  } catch {
    return FALLBACK_HERO_IMAGES;
  }
}
