import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Ficha padrão: uma família só. Bold em título e número, Regular no
// corpo, Light no subtítulo ao lado do título.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// URL pública indexável. Quando o domínio próprio apontar para a Vercel,
// defina NEXT_PUBLIC_SITE_URL nas envs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://comunidadefgz.vercel.app";

const TITLE = "Canal do Fabricio Gonçalvez no WhatsApp | Comunidade FGZ";
const DESC =
  "Canal gratuito do Fabricio Gonçalvez no WhatsApp: análises e setups de mini índice de quem ficou em 5º no Top Traders InfoMoney 2025, com 20 anos de mercado.";
const SHARE_TITLE = "Fabricio Gonçalvez no seu WhatsApp";
const SHARE_DESC =
  "5º no Top Traders InfoMoney 2025 e 20 anos de mercado. Análises e setups de mini índice, de graça, no WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Comunidade FGZ",
  },
  description: DESC,
  applicationName: "Comunidade FGZ",
  authors: [{ name: "Fabricio Gonçalvez" }],
  creator: "Fabricio Gonçalvez",
  publisher: "Comunidade FGZ",
  category: "finance",
  keywords: [
    "Fabricio Gonçalvez",
    "Comunidade FGZ",
    "canal WhatsApp trader",
    "mini índice",
    "day trade",
    "Alaska Square",
    "Top Traders InfoMoney",
    "Genial Investimentos",
  ],
  alternates: { canonical: "/comunidade" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: SHARE_TITLE,
    description: SHARE_DESC,
    url: `${SITE_URL}/comunidade`,
    siteName: "Comunidade FGZ",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1c1c",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={poppins.variable}
    >
      <body>{children}</body>
    </html>
  );
}
