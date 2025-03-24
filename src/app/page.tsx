"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = ["/image-1.jpg", "/image-2.jpg", "/image-3.jpg", "/image-4.jpg"];

// Content for each slider image
const sliderContent = [
  {
    title: "Kendine Özel Parfüm Deneyimi",
    description:
      "Blue Perfumery ile kişiliğinize ve tarzınıza uygun parfümleri keşfedin.",
  },
  {
    title: "Sizin Karakteriniz, Sizin Kokunuz",
    description:
      "Karakterinizi ve yaşam tarzınızı yansıtan özel parfümler dünyasına adım atın.",
  },
  {
    title: "Lüks ve Zarafet Bir Arada",
    description:
      "Premium parfüm koleksiyonumuzla benzersiz ve kalıcı kokulara sahip olun.",
  },
  {
    title: "Siz Olmanın En Güzel Hali",
    description:
      "Kokular dünyasında kendinizi ifade etmenin en özel yolu Blue Perfumery'de.",
  },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Her 5 saniyede bir değişecek

    return () => clearInterval(timer);
  }, []);

  // Get current slider content
  const currentContent = sliderContent[currentImage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Slider */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Slider image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-indigo-900/70 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg transition-opacity duration-700">
            {currentContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-10 drop-shadow transition-opacity duration-700">
            {currentContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 relative">
            <Link
              href="/parfumunu-bul"
              className="relative group inline-flex items-center justify-center px-8 py-5 text-lg font-semibold rounded-xl text-blue-700 bg-white border-2 border-blue-300 hover:border-blue-400 backdrop-blur-sm transform transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <span className="relative flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="absolute -right-1 -top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-blue-700 text-lg">Parfümünü Bul</span>
                  <span className="text-blue-500 text-xs font-normal">
                    Kişilik testini yap, sana özel öneriler al
                  </span>
                </div>
              </span>
            </Link>

            <Link
              href="https://www.shopier.com/blueperfumery"
              className="inline-flex items-center justify-center px-8 py-5 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <span className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white text-lg">Hemen Satın Al</span>
                  <span className="text-white/80 text-xs font-normal">
                    Özel indirimlerle sınırlı süre
                  </span>
                </div>
              </span>
            </Link>
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Opening Offer Banner */}
      <div className="relative -mt-16 z-10 mb-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-xl overflow-hidden">
            <div className="relative px-6 py-4 flex flex-col md:flex-row items-center justify-between">
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 w-16 h-16 bg-yellow-300 rounded-full opacity-20"></div>
              <div className="absolute right-10 bottom-2 w-8 h-8 bg-orange-300 rounded-full opacity-20"></div>

              {/* Badge content */}
              <div className="flex items-center space-x-3 mb-3 md:mb-0">
                <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                  <span
                    className="text-2xl"
                    role="img"
                    aria-label="celebration"
                  >
                    🎉
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Açılışa Özel Fırsat!
                  </h3>
                  <p className="text-white/90 text-sm">
                    50ml parfümler sınırlı süreyle indirimli
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center">
                <div className="text-white/90 mr-3">
                  <span className="line-through text-white/70">699₺</span>{" "}
                  yerine
                </div>
                <div className="text-white font-bold text-2xl">599₺</div>
                <div className="ml-3">
                  <Link
                    href="https://www.shopier.com/blueperfumery"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-sm border border-green-300/30 flex items-center gap-1"
                  >
                    Hemen Al
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kişiselleştirilmiş Parfüm Deneyimi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Blue Perfumery farkıyla kendinizi özel hissedin.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link
              href="/parfumunu-bul"
              className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 group relative overflow-hidden border border-blue-100"
            >
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply blur-2xl opacity-30 group-hover:opacity-40 transition-all duration-500 -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-100 rounded-full mix-blend-multiply blur-2xl opacity-30 group-hover:opacity-40 transition-all duration-500 translate-x-20 translate-y-20"></div>

              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transform transition-all duration-500 relative">
                <span className="absolute w-20 h-20 bg-white opacity-20 rounded-full animate-ping"></span>
                <span
                  className="text-white animate-pulse"
                  role="img"
                  aria-label="magnifying glass"
                >
                  🔍
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                Kişilik Analizi
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-6">
                Kişiliğinize, yaşam tarzınıza ve tercihlerinize göre size özel
                parfüm önerileri sunuyoruz.
              </p>

              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Teste Başla</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Yeni
                </span>
              </div>
            </Link>

            <Link
              href="https://www.shopier.com/blueperfumery"
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                💎
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Premium Koleksiyon
              </h3>
              <p className="text-gray-600">
                En seçkin parfüm evlerinin en özel parçalarını bir araya getiren
                benzersiz koleksiyonumuz.
              </p>
            </Link>
            <Link
              href="https://www.shopier.com/blueperfumery"
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                🎁
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Özel Paketleme
              </h3>
              <p className="text-gray-600">
                Her parfüm, şık ve özel tasarım kutularda sevdiklerinize hediye
                etmeye hazır şekilde sunulur.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Parfümlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En çok tercih edilen ve beğenilen Blue Perfumery imzalı kokular.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transform transition-all duration-300 group">
              <div className="h-48 bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl group-hover:scale-110 transform transition-transform duration-300">
                  ✨
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  Kirke
                </h3>
                <p className="text-blue-600 text-sm mb-2">
                  Blue Perfumery Exclusive
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Tatlı ve meyvemsi notalarla bezeli, sofistike ve çekici bir
                  koku. Yaz akşamlarının vazgeçilmezi.
                </p>
                <div className="flex items-center justify-end">
                  <Link
                    href="https://shopier.com/blueperfumery/kirke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transform transition-all duration-300"
                  >
                    Satın Al
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transform transition-all duration-300 group">
              <div className="h-48 bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl group-hover:scale-110 transform transition-transform duration-300">
                  🌙
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  Libre
                </h3>
                <p className="text-blue-600 text-sm mb-2">
                  Blue Perfumery Artisanal
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Modern ve özgür ruhlu bir koku. Lavanta ve portakal çiçeği
                  notalarıyla özgürlüğün sembolü.
                </p>
                <div className="flex items-center justify-end">
                  <Link
                    href="https://shopier.com/blueperfumery/libre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transform transition-all duration-300"
                  >
                    Satın Al
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transform transition-all duration-300 group">
              <div className="h-48 bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl group-hover:scale-110 transform transition-transform duration-300">
                  🌸
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  La Vie Est Belle
                </h3>
                <p className="text-blue-600 text-sm mb-2">
                  Blue Perfumery Classic
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Hayatın güzelliğini yansıtan, iris ve vanilya notalarıyla
                  bezeli, mutluluk veren bir koku.
                </p>
                <div className="flex items-center justify-end">
                  <Link
                    href="https://shopier.com/blueperfumery/lavieestbelle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transform transition-all duration-300"
                  >
                    Satın Al
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="https://www.shopier.com/blueperfumery"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500/80 to-blue-600/80 hover:from-green-600/90 hover:to-blue-700/90 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Tüm Parfümleri Keşfet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Your Perfume CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Kişiliğine Uygun Parfümü Keşfet
              </h2>
              <p className="text-xl text-blue-100">
                Birkaç soruyla sana özel parfüm önerilerimizi gör. Blue
                Perfumery&apos;nin eşsiz algoritması ile kendini tanı, kokunu
                bul.
              </p>
            </div>
            <div className="md:ml-8">
              <Link
                href="/parfumunu-bul"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-blue-700 bg-white hover:bg-blue-50 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -inset-4 blur-md bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                <div className="relative flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-700 group-hover:animate-bounce"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  <span>Teste Başla</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Blue Perfumery</h3>
              <p className="text-gray-400">
                Lüks ve kişiselleştirilmiş parfüm deneyiminiz için yanınızdayız.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/parfumunu-bul"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Parfümünü Bul
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hakkimizda"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.shopier.com/blueperfumery"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Satın Al
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Bizi Takip Edin</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 Blue Perfumery. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
