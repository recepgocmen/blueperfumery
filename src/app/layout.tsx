import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { SITE_URL } from "@/lib/catalog";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
});

const title = "Blue Perfumery | Sevdiğin kokuların 50 ml yorumları";
const description =
  "Bilinen parfümlerin Blue Perfumery yorumları, 50 ml şişelerde. Kokuya göre seç, beş soruluk testle sana uyanı bul ya da danışmanımız Mira'ya sor.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords:
    "parfüm, blue perfumery, parfüm yorumu, 50 ml parfüm, niş parfüm, kadın parfüm, erkek parfüm, parfüm testi, parfüm önerisi",
  authors: [{ name: "Blue Perfumery" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Blue Perfumery",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Blue Perfumery",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="tr" className={`${bodoni.variable} ${jost.variable}`}>
    <body>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatBot />
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
