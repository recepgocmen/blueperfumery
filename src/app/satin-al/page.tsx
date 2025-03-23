"use client";

import { useState } from "react";
import Link from "next/link";
import { perfumes } from "../../data/perfumes";

type Category = "all" | "unisex" | "male" | "female" | "exclusive" | "premium";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  // Filtreleme işlevi
  const filteredPerfumes = perfumes.filter((perfume) => {
    if (activeCategory === "all") return true;
    if (
      activeCategory === "male" ||
      activeCategory === "female" ||
      activeCategory === "unisex"
    ) {
      return perfume.gender === activeCategory;
    }
    if (activeCategory === "exclusive") {
      return perfume.brand.includes("Exclusive");
    }
    if (activeCategory === "premium") {
      return perfume.brand.includes("Premium");
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-blue-600 font-bold text-xl">
                Blue Perfumery
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link
                href="/parfumunu-bul"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Parfümünü Bul
              </Link>
              <Link
                href="https://www.shopier.com/blueperfumery"
                className="text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Satın Al
              </Link>
              <Link
                href="/hakkimizda"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Hakkımızda
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Blue Perfumery Koleksiyonu
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            En özel anlarda size eşlik edecek seçkin parfüm koleksiyonumuzu
            keşfedin. Karakterinizi yansıtan kokular ile tanışın.
          </p>
        </div>

        {/* Kategori Filtreleme */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full ${
              activeCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            Tümü
          </button>
          <button
            onClick={() => setActiveCategory("male")}
            className={`px-5 py-2 rounded-full ${
              activeCategory === "male"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            Erkek
          </button>
          <button
            onClick={() => setActiveCategory("female")}
            className={`px-5 py-2 rounded-full ${
              activeCategory === "female"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            Kadın
          </button>
          <button
            onClick={() => setActiveCategory("unisex")}
            className={`px-5 py-2 rounded-full ${
              activeCategory === "unisex"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            Unisex
          </button>
          <button
            onClick={() => setActiveCategory("exclusive")}
            className={`px-5 py-2 rounded-full ${
              activeCategory === "exclusive"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            Exclusive
          </button>
          <button
            onClick={() => setActiveCategory("premium")}
            className={`px-5 py-2 rounded-full ${
              activeCategory === "premium"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            Premium
          </button>
        </div>

        {/* Parfüm Listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredPerfumes.map((perfume) => (
            <a
              key={perfume.id}
              href={`https://www.shopier.com/blueperfumery/${encodeURIComponent(
                perfume.name.replace(/\s+/g, "-").toLowerCase()
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group block"
            >
              <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-5xl">
                    {perfume.gender === "male"
                      ? "♂"
                      : perfume.gender === "female"
                      ? "♀"
                      : "⚭"}
                  </div>
                </div>
                {perfume.brand.includes("Exclusive") && (
                  <div className="absolute top-2 right-2 bg-gold-500 text-white text-xs px-2 py-1 rounded">
                    Exclusive
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="px-4 py-2 bg-white rounded-md text-blue-600 font-medium shadow-md">
                    Satın Al
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {perfume.name}
                </h2>
                <p className="text-blue-600 text-sm mb-2">{perfume.brand}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {perfume.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {perfume.notes.slice(0, 3).map((note, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Özel Koleksiyonlar */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Özel Koleksiyonlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden h-64">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90"></div>
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Signature Collection
                  </h3>
                  <p className="text-blue-100">
                    Blue Perfumery&apos;nin özel imza koleksiyonu ile tanışın.
                  </p>
                </div>
                <button className="self-start px-6 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
                  Keşfet
                </button>
              </div>
            </div>
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden h-64">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-90"></div>
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Limited Edition
                  </h3>
                  <p className="text-purple-100">
                    Sınırlı sayıda üretilen özel parfümlerimizi kaçırmayın.
                  </p>
                </div>
                <button className="self-start px-6 py-2 bg-white text-purple-600 rounded-md hover:bg-purple-50 transition-colors duration-200">
                  Keşfet
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

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
