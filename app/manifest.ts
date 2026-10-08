import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Comunidade FGZ · Fabricio Gonçalvez",
    short_name: "Comunidade FGZ",
    description:
      "Canal gratuito do Fabricio Gonçalvez no WhatsApp: análises e setups de mini índice.",
    start_url: "/comunidade",
    display: "standalone",
    background_color: "#f3eee4",
    theme_color: "#f3eee4",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
