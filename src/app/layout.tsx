import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
