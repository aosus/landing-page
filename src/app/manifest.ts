import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aosus Community",
    short_name: "Aosus",
    description:
      "The largest Arabic community for free and open source software.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/brand/logo-symbol.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/logo-symbol-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
