import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blue Perfumery | Premium Parfüm ve Koku Koleksiyonu",
  description:
    "Lüks parfümler, niş kokular ve özel parfüm danışmanlığı sunan Blue Perfumery. Size özel koku profilinizi keşfedin.",
  keywords:
    "parfüm, blue perfumery, koku, lüks parfümler, niş parfümler, kişisel parfüm, parfüm önerisi, koku danışmanlığı",
  authors: [{ name: "Blue Perfumery" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Blue Perfumery | Premium Parfüm ve Koku Koleksiyonu",
    description:
      "Lüks parfümler, niş kokular ve özel parfüm danışmanlığı sunan Blue Perfumery. Size özel koku profilinizi keşfedin.",
    url: "https://blueperfumery.com",
    siteName: "Blue Perfumery",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Blue Perfumery - Premium Parfüm Koleksiyonu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Perfumery | Premium Parfüm ve Koku Koleksiyonu",
    description: "Lüks parfümler, niş kokular ve özel parfüm danışmanlığı.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${raleway.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <ChatBot />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
