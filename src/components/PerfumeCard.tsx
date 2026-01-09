"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/api";

// Varsayılan parfüm resmi
const DEFAULT_PERFUME_IMAGE =
  "https://framerusercontent.com/images/Kr4buJy50VrffvLOvJMs7f8tpI.png";

interface PerfumeCardProps {
  perfume: Product;
  isPreferred?: boolean;
  variant?: "male" | "female" | "niche";
}

// Get variant-specific styles
function getVariantStyles(variant: "male" | "female" | "niche") {
  switch (variant) {
    case "female":
      return {
        imageBg: "bg-gradient-to-br from-purple-900/30 to-slate-800/50",
        glowColor: "from-rose-500/5",
        tagStyle: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      };
    case "niche":
      return {
        imageBg: "bg-gradient-to-br from-amber-900/20 to-slate-800/50",
        glowColor: "from-gold/5",
        tagStyle: "bg-gold/10 text-gold/80 border-gold/20",
      };
    default: // male
      return {
        imageBg: "bg-gradient-to-br from-slate-700/50 to-slate-800/50",
        glowColor: "from-gold/5",
        tagStyle: "bg-white/5 text-gray-300 border-white/10",
      };
  }
}

export default function PerfumeCard({
  perfume,
  isPreferred = false,
  variant = "male",
}: PerfumeCardProps) {
  const styles = getVariantStyles(variant);

  return (
    <div
      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-500 ${
        isPreferred
          ? "border-gold/50 hover:border-gold"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      {/* Subtle glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${styles.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div
        className={`relative aspect-square ${styles.imageBg} flex items-center justify-center overflow-hidden`}
      >
        {/* Ürün resmi veya varsayılan resim (400x400 kare) */}
        <Image
          src={
            perfume.image &&
            perfume.image.trim() !== "" &&
            perfume.image !== "/card-photos/1.png" &&
            !perfume.image.includes("placeholder")
              ? perfume.image
              : DEFAULT_PERFUME_IMAGE
          }
          alt={perfume.name}
          fill
          className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 p-4"
        />
        {isPreferred && (
          <div className="absolute top-3 right-3 bg-gold text-navy px-3 py-1 rounded-full text-xs font-semibold">
            Öne Çıkan
          </div>
        )}
        {perfume.stock <= 5 && (
          <div className="absolute top-3 left-3 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
            Son {perfume.stock}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-heading font-semibold text-white mb-1 group-hover:text-gold transition-colors duration-300">
          {perfume.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          {perfume.brand} • {perfume.ml}ml
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {perfume.characteristics?.slice(0, 3).map((char, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full border ${styles.tagStyle}`}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <span className="text-2xl font-semibold text-gold">
            ₺{perfume.price}
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/parfum/${perfume.id}`}
            className="flex-1 border border-white/20 text-white px-4 py-2.5 rounded-lg text-sm font-medium text-center hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            Keşfet
          </Link>
          <Link
            href={
              perfume.shopierLink || "https://www.shopier.com/blueperfumery"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gold text-navy px-4 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-gold-light transition-all duration-300"
          >
            Satın Al
          </Link>
        </div>
      </div>
    </div>
  );
}
