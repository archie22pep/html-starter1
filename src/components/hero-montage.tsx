import Image from "next/image";
import type { HeroImage } from "@/lib/hero-images";

/**
 * Full-bleed aerial montage band under the header. A horizontal film strip
 * slides one frame at a time (hold ~7s, slide ~1s), so both photos are
 * visible mid-transition. The first slide is duplicated at the end of the
 * track and the 40s loop lands exactly on it, making the wrap seamless.
 * Keyframes assume 5 source images (6 track slides); getHeroImages returns 5.
 * Reduced-motion users get a static first frame (see globals.css).
 */
export function HeroMontage({ images }: { images: HeroImage[] }) {
  const slides = [...images, images[0]];
  return (
    <div className="relative h-[52vh] max-h-[600px] min-h-[320px] overflow-hidden border-b border-line bg-ink">
      <div className="montage-track flex h-full" style={{ width: `${slides.length * 100}%` }}>
        {slides.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative h-full overflow-hidden"
            style={{ width: `${100 / slides.length}%` }}
          >
            <Image
              src={img.src}
              alt={i === slides.length - 1 ? "" : img.alt}
              fill
              priority={i === 0}
              loading="eager"
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent to-paper/90"
        aria-hidden="true"
      />
    </div>
  );
}
