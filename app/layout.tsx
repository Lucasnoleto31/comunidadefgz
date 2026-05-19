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

const SITE_URL = "https://comunidadefgz.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Comunidade FGZ · Fabricio Gonçalvez | Entre e acompanhe de perto",
  description:
    "Entre na comunidade oficial do Fabricio Gonçalvez, 5º lugar no Top Traders InfoMoney 2025 e sócio da Genial Investimentos. Acompanhe de perto análises, setups e a rotina real de quem vive do mercado.",
  keywords: [
    "Fabricio Gonçalvez",
    "comunidade FGZ",
    "trader mini índice",
    "Alaska Square",
    "day trade",
    "Top Traders InfoMoney",
  ],
  openGraph: {
    title: "Comunidade FGZ · Fabricio Gonçalvez",
    description:
      "Acompanhe de perto análises, setups e a rotina real de um dos melhores traders do Brasil. Entrada gratuita pela comunidade no WhatsApp.",
    url: SITE_URL,
    siteName: "Comunidade FGZ",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comunidade FGZ · Fabricio Gonçalvez",
    description:
      "Acompanhe de perto análises, setups e a rotina real de um dos melhores traders do Brasil.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
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
