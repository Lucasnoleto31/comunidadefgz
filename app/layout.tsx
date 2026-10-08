import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// URL pública indexável. Quando o domínio próprio apontar para a Vercel,
// defina NEXT_PUBLIC_SITE_URL nas envs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://comunidadefgz.vercel.app";

const TITLE = "Canal do Fabricio Gonçalvez no WhatsApp | Comunidade FGZ";
const DESC =
  "Análises, setups de mini índice e a rotina real do 5º colocado no Top Traders InfoMoney 2025. Entre grátis no canal do Fabricio Gonçalvez no WhatsApp.";
const SHARE_TITLE = "Fabricio Gonçalvez no seu WhatsApp";
const SHARE_DESC =
  "20 anos de mercado, 5º no Top Traders InfoMoney 2025. Análises e setups de mini índice no canal gratuito da Comunidade FGZ.";

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
  themeColor: "#f3eee4",
  colorScheme: "light",
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
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
