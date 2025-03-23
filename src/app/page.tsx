"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = ["/image-1.jpg", "/image-2.jpg", "/image-3.jpg", "/image-4.jpg"];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Her 5 saniyede bir değişecek

    return () => clearInterval(timer);
  }, []);

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
            Kendine Özel Parfüm Deneyimi
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-10 drop-shadow">
            Blue Perfumery ile kişiliğinize ve tarzınıza uygun parfümleri
            keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/parfumunu-bul"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-blue-600/90 hover:bg-blue-600 backdrop-blur-sm hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
            >
              Parfümünü Bul
            </Link>
            <Link
              href="https://www.shopier.com/blueperfumery"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-transparent hover:bg-white/10 backdrop-blur-sm hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
            >
              Satın Al
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
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                🔍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Kişilik Analizi
              </h3>
              <p className="text-gray-600">
                Kişiliğinize, yaşam tarzınıza ve tercihlerinize göre size özel
                parfüm önerileri sunuyoruz.
              </p>
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
                  <a
                    href="https://shopier.com/blueperfumery/kirke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transform transition-all duration-300"
                  >
                    Satın Al
                  </a>
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
                  <a
                    href="https://shopier.com/blueperfumery/libre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transform transition-all duration-300"
                  >
                    Satın Al
                  </a>
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
                  <a
                    href="https://shopier.com/blueperfumery/lavieestbelle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transform transition-all duration-300"
                  >
                    Satın Al
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="https://www.shopier.com/blueperfumery"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Tüm Parfümleri Keşfet
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
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Teste Başla
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
