import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Comunidade FGZ · Fabricio Gonçalvez",
    short_name: "Comunidade FGZ",
    description:
      "Canal gratuito do Fabricio Gonçalvez no WhatsApp: análises e setups de mini índice.",
    start_url: "/comunidade",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#1c1c1c",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
