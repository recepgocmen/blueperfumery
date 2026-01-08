"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/api";
import PerfumeCard from "@/components/PerfumeCard";
import { PREFERRED_PERFUMES } from "@/types/survey";

const images = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
  "/image-5.png",
];

const sliderContent = [
  {
    subtitle: "Kişiselleştirilmiş Parfüm Deneyimi",
    title: "Sizin İçin\nSeçildi",
  },
  {
    subtitle: "Premium Koleksiyon",
    title: "Zarafet\nBir Koku",
  },
  {
    subtitle: "Eşsiz Notalar",
    title: "Karakterinizi\nYansıtın",
  },
  {
    subtitle: "Niş Parfümler",
    title: "Fark\nYaratın",
  },
  {
    subtitle: "Blue Perfumery",
    title: "Lüks\nDeneyim",
  },
];

interface HomeClientProps {
  featuredProducts: Product[];
}

export default function HomeClient({ featuredProducts }: HomeClientProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentContent = sliderContent[currentImage];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Slider */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Blue Perfumery ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            {/* Subtitle */}
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.2em] uppercase">
                {currentContent.subtitle}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-[0.95] mb-8 animate-fade-in-up whitespace-pre-line">
              {currentContent.title}
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <Link
                href="/parfumunu-bul"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-navy font-medium rounded-full hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Parfümünü Bul
              </Link>

              <Link
                href="/satin-al"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Koleksiyonu Keşfet
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-12 left-6 lg:left-auto lg:right-12 flex items-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`transition-all duration-300 ${
                index === currentImage
                  ? "w-12 h-1 bg-gold"
                  : "w-6 h-1 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">Keşfet</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* AI Consultant Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
                  Yapay Zeka Destekli
                </span>
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-navy mb-6 leading-tight">
                Kişisel Parfüm
                <br />
                <span className="text-gradient-gold">Danışmanınız</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Bir butik mağazaya girdiğinizde sizi karşılayan uzman danışman
                deneyimini dijitale taşıdık.{" "}
                <strong className="text-navy">Mira</strong>, yapay zeka destekli
                parfüm uzmanımız, size en uygun kokuları bulmak için burada.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy mb-1">
                      7/24 Danışmanlık
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Her an yanınızda, sorularınızı anında yanıtlar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy mb-1">
                      Kişiselleştirilmiş Öneriler
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Zevkinize ve tarzınıza göre özel seçimler
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy mb-1">
                      Uzman Bilgisi
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Notalar, karakteristikler ve kullanım önerileri
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 italic">
                💡 Sağ alttaki sohbet simgesine tıklayarak Mira ile
                tanışabilirsiniz
              </p>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-navy to-navy-light rounded-3xl p-8 lg:p-12">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />

                {/* Chat Preview */}
                <div className="relative space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-amber-600/30 flex items-center justify-center flex-shrink-0 border border-gold/30">
                      <Sparkles className="w-5 h-5 text-gold" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3 max-w-[280px]">
                      <p className="text-white/90 text-sm">
                        Merhaba! ✨ Hoş geldiniz Blue Perfumery&apos;ye! Size
                        nasıl yardımcı olabilirim?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-gold rounded-2xl rounded-tr-md px-4 py-3 max-w-[240px]">
                      <p className="text-navy text-sm font-medium">
                        Kadın ve erkek için birer parfüm önerir misin?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-amber-600/30 flex items-center justify-center flex-shrink-0 border border-gold/30">
                      <Sparkles className="w-5 h-5 text-gold" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3 max-w-[280px]">
                      <p className="text-white/90 text-sm">
                        Tabii! 💫 Kadınlar için{" "}
                        <span className="text-gold">Burberry Her</span> - çilek
                        ve yasemin notalarıyla feminen ve çekici. Erkekler için{" "}
                        <span className="text-gold">Stronger With You</span> -
                        vanilya ve kestane ile sıcak ve karizmatik!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-navy">
                    Mira Çevrimiçi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parfümünü Bul CTA */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative bg-navy rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-white/80 text-sm">Kişilik Testi</span>
              </div>

              <h2 className="font-heading text-3xl lg:text-5xl font-semibold text-white mb-6 max-w-3xl mx-auto">
                Size Özel Parfümünüzü
                <br />
                <span className="text-gold">Keşfedin</span>
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
                Birkaç basit soruyla kişiliğinize, yaşam tarzınıza ve
                tercihlerinize en uygun parfümleri bulun.
              </p>

              <Link
                href="/parfumunu-bul"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300 btn-luxury text-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Teste Başla
              </Link>

              <p className="text-white/50 text-sm mt-6">
                ⏱ Sadece 2 dakika • 🎯 Kişiye özel öneriler
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - FROM API */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-800 via-slate-900 to-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
                Koleksiyon
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-4">
              Öne Çıkan Parfümler
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              En çok tercih edilen ve beğenilen Blue Perfumery imzalı kokular
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => {
                const isPreferred = PREFERRED_PERFUMES.includes(
                  product.id as (typeof PREFERRED_PERFUMES)[number]
                );
                // Determine variant based on gender/category
                const variant =
                  product.category === "niches" ||
                  product.category === "artisanal" ||
                  product.category === "exclusive"
                    ? "niche"
                    : product.gender === "female"
                    ? "female"
                    : "male";

                return (
                  <PerfumeCard
                    key={product.id}
                    perfume={product}
                    isPreferred={isPreferred}
                    variant={variant}
                  />
                );
              })
            ) : (
              // Fallback when no products
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-400">Ürünler yükleniyor...</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/satin-al"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-gold/50 transition-all duration-300"
            >
              Tüm Koleksiyonu Görüntüle
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <span className="font-heading text-2xl font-semibold tracking-[0.2em]">
                  BLUE
                </span>
                <br />
                <span className="font-heading text-sm font-light tracking-[0.15em] text-gold">
                  PERFUMERY
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Lüks ve kişiselleştirilmiş parfüm deneyimi. Karakterinize uygun
                kokuları keşfedin.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4 text-white/80">Keşfet</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/erkek-parfum"
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    Erkek Parfümleri
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kadin-parfum"
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    Kadın Parfümleri
                  </Link>
                </li>
                <li>
                  <Link
                    href="/nis-parfum"
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    Niş Koleksiyon
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium mb-4 text-white/80">Hizmetler</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/parfumunu-bul"
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    Parfümünü Bul
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hakkimizda"
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/satin-al"
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    Satın Al
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-4 text-white/80">İletişim</h4>
              <ul className="space-y-3">
                <li className="text-white/60 text-sm">
                  blueperfumerie@gmail.com
                </li>
                <li className="flex gap-4 mt-4">
                  <a
                    href="#"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2025 Blue Perfumery. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="#"
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
