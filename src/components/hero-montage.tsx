import Image from "next/image";
import type { HeroImage } from "@/lib/hero-images";

/**
 * Full-bleed aerial montage band under the header: a continuously scrolling
 * right-to-left film strip. The image set is rendered twice and the track
 * translates -50% on a linear loop, so the wrap is seamless. The bottom edge
 * is cut by a wave in the page background colour (echoing the ocean brand)
 * instead of a gradient fade. Reduced-motion users get a static strip.
 */
export function HeroMontage({ images }: { images: HeroImage[] }) {
  const slides = [...images, ...images];
  return (
    <div className="relative h-[46vh] max-h-[540px] min-h-[300px] overflow-hidden bg-ink">
      <div className="montage-track flex h-full w-max">
        {slides.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative h-full w-screen flex-none overflow-hidden border-r-[3px] border-paper"
          >
            <Image
              src={img.src}
              alt={i < images.length ? img.alt : ""}
              fill
              priority={i === 0}
              loading="eager"
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* Wave-cut bottom edge in the page background colour */}
      <svg
        viewBox="0 0 1440 42"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-[26px] w-full sm:h-[38px]"
      >
        <path
          className="fill-paper"
          d="M0 22 C120 40 240 6 360 20 C480 34 600 4 720 18 C840 32 960 6 1080 20 C1200 34 1320 8 1440 22 L1440 42 L0 42 Z"
        />
      </svg>
    </div>
  );
}
