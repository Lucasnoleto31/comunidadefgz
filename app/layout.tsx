import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

// URL pública indexável. Quando o domínio próprio entrar, defina
// NEXT_PUBLIC_SITE_URL=https://comunidadefgz.com.br nas envs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://comunidadefgz.vercel.app";

const TITLE = "Comunidade FGZ · Fabricio Gonçalvez";
const DESC =
  "Entre na comunidade oficial do Fabricio Gonçalvez — 5º no Top Traders InfoMoney 2025 e sócio da Genial Investimentos. Acompanhe de perto análises, setups de mini índice e a rotina real de quem vive do mercado. Entrada gratuita pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE} | Entre e acompanhe de perto`,
    template: `%s | ${TITLE}`,
  },
  description: DESC,
  applicationName: "Comunidade FGZ",
  authors: [{ name: "Fabricio Gonçalvez" }],
  creator: "Fabricio Gonçalvez",
  publisher: "Comunidade FGZ",
  category: "finance",
  keywords: [
    "Fabricio Gonçalvez",
    "comunidade FGZ",
    "Fabricio Gonçalvez comunidade",
    "trader mini índice",
    "Alaska Square",
    "day trade",
    "Top Traders InfoMoney",
    "Genial Investimentos",
    "trader Brasil",
    "comunidade de traders WhatsApp",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: TITLE,
    description:
      "Acompanhe de perto análises, setups de mini índice e a rotina real de um dos melhores traders do Brasil. Entrada gratuita pela comunidade no WhatsApp.",
    url: SITE_URL,
    siteName: "Comunidade FGZ",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Análises, setups de mini índice e a rotina real de um dos melhores traders do Brasil. Entrada gratuita no WhatsApp.",
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
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
