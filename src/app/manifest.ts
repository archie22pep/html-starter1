import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Precursor Property",
    short_name: "Precursor",
    description:
      "Independent property due diligence reports for buyers and small developers across Victoria.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f3",
    theme_color: "#152520",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
    ],
  };
}
