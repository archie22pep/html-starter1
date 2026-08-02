import Image from "next/image";
import type { HeroImage } from "@/lib/hero-images";

/**
 * Full-bleed aerial montage band under the header. Five full-screen slides
 * cross-fade on a 40s cycle with a slow Ken Burns drift. Slide delays start
 * at -2s so the first frame is already visible on first paint. The bottom
 * edge is cut by a wave in the page background colour (echoing the ocean
 * brand). Reduced-motion users get a static first frame (see globals.css).
 */
export function HeroMontage({ images }: { images: HeroImage[] }) {
  return (
    <div className="relative h-[46vh] max-h-[540px] min-h-[300px] overflow-hidden bg-ink">
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
            loading="eager"
            sizes="100vw"
            className={`object-cover ${i % 2 === 1 ? "kenburns-rev" : "kenburns"}`}
          />
        </div>
      ))}
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
