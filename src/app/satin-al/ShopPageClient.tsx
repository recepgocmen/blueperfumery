"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";
import PerfumeCard from "@/components/PerfumeCard";
import { Sparkles, Filter, Grid3X3, LayoutGrid } from "lucide-react";

type Category = "all" | "unisex" | "male" | "female" | "niches";

interface ShopPageClientProps {
  products: Product[];
}

export default function ShopPageClient({ products }: ShopPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [gridSize, setGridSize] = useState<3 | 4>(3);

  // Filtreleme işlevi
  const filteredPerfumes = products.filter((perfume) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "male" || activeCategory === "female" || activeCategory === "unisex") {
      return perfume.gender === activeCategory;
    }
    if (activeCategory === "niches") {
      return (
        perfume.category === "niches" || 
        perfume.category === "exclusive" || 
        perfume.category === "artisanal"
      );
    }
    return true;
  });

  const categories: { value: Category; label: string; count: number }[] = [
    { value: "all", label: "Tümü", count: products.length },
    { value: "male", label: "Erkek", count: products.filter((p) => p.gender === "male").length },
    { value: "female", label: "Kadın", count: products.filter((p) => p.gender === "female").length },
    { value: "unisex", label: "Unisex", count: products.filter((p) => p.gender === "unisex").length },
    { value: "niches", label: "Niş", count: products.filter((p) => 
      p.category === "niches" || p.category === "exclusive" || p.category === "artisanal"
    ).length },
  ];

  const getVariant = (product: Product): "male" | "female" | "niche" => {
    if (product.category === "niches" || product.category === "exclusive" || product.category === "artisanal") {
      return "niche";
    }
    return product.gender === "female" ? "female" : "male";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-navy pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
              Koleksiyon
            </span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white mb-4">
            Blue Perfumery Koleksiyonu
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            En özel anlarda size eşlik edecek seçkin parfüm koleksiyonumuzu keşfedin. 
            Karakterinizi yansıtan kokular ile tanışın.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {filteredPerfumes.length} ürün
          </p>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "bg-gold text-navy"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.label}
                <span className="ml-1.5 opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Grid Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGridSize(3)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                gridSize === 3 ? "bg-gold text-navy" : "bg-white/5 text-white hover:bg-white/10"
              }`}
              title="3 sütun"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setGridSize(4)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                gridSize === 4 ? "bg-gold text-navy" : "bg-white/5 text-white hover:bg-white/10"
              }`}
              title="4 sütun"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${
          gridSize === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-6 lg:gap-8 mb-16`}>
          {filteredPerfumes.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              variant={getVariant(perfume)}
            />
          ))}
        </div>

        {filteredPerfumes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg">
              Bu kategoride henüz ürün bulunmamaktadır.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 text-gold hover:underline"
            >
              Tüm ürünleri göster
            </button>
          </div>
        )}

        {/* Special Collections */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-heading font-semibold text-white mb-2">
              Özel Koleksiyonlar
            </h2>
            <p className="text-gray-400">
              Size özel hazırladığımız koleksiyonları keşfedin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/nis-parfum"
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-64 block hover:border-gold/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-3 py-1 mb-4">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-gold text-sm font-medium">Özel Koleksiyon</span>
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    Niş Parfümler
                  </h3>
                  <p className="text-gray-400">
                    Benzersiz ve ayırt edici kokularla fark yaratın.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-gold font-medium">
                  Keşfet
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </Link>

            <Link
              href="/parfumunu-bul"
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-64 block hover:border-gold/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-3 py-1 mb-4">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium">AI Destekli</span>
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    Kişiye Özel Öneri
                  </h3>
                  <p className="text-gray-400">
                    Yapay zeka ile size en uygun parfümü bulun.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-purple-400 font-medium">
                  Teste Başla
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
