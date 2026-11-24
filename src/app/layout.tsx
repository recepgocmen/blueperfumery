import type { Metadata } from "next";
import { Libre_Bodoni, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import RevealObserver from "@/components/RevealObserver";
import { SITE_URL } from "@/lib/catalog";

const display = Libre_Bodoni({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
});

const title = "Blue Parfüm | Sevdiğin kokuların 50 ml yorumları";
const description =
  "Bilinen parfümlerin Blue Parfüm yorumları, 50 ml şişelerde. Kokuya göre seç, beş soruluk testle sana uyanı bul ya da danışmanımız Mira'ya sor.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords:
    "parfüm, blue parfüm, parfüm yorumu, 50 ml parfüm, niş parfüm, kadın parfüm, erkek parfüm, parfüm testi, parfüm önerisi",
  authors: [{ name: "Blue Parfüm" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Blue Parfüm",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Blue Parfüm",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="tr" className={`${display.variable} ${jost.variable}`}>
    <body>
      <noscript>
        {/* Without JS the header cannot turn solid on scroll, so it scrolls away with the hero. */}
        <style>{"header.hero-scrim{position:absolute}"}</style>
      </noscript>
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatBot />
      <RevealObserver />
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
