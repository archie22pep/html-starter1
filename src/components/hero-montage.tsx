import Image from "next/image";
import type { HeroImage } from "@/lib/hero-images";

/**
 * Full-bleed aerial montage band under the header (reference: cinematic
 * agency-style hero). Five slides cross-fade on a 40s cycle with a slow
 * Ken Burns drift, so it reads like drone footage without shipping video.
 * Reduced-motion users get a static first frame (see globals.css). Slide
 * delays start at -2s so the first frame is already visible on first paint.
 */
export function HeroMontage({ images }: { images: HeroImage[] }) {
  return (
    <div className="relative h-[52vh] max-h-[600px] min-h-[320px] overflow-hidden border-b border-line bg-ink">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="montage-slide absolute inset-0"
          style={{ animationDelay: `${i * 8 - 2}s` }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i % 2 === 1 ? "kenburns-rev" : "kenburns"}`}
          />
        </div>
      ))}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent to-paper/90"
        aria-hidden="true"
      />
    </div>
  );
}
