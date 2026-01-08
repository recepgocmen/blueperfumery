"use client";

import Link from "next/link";
import Image from "next/image";
import { Droplets, Flower2, Sparkles, Wind, TreePine, Gem } from "lucide-react";
import type { Product } from "@/lib/api";

interface PerfumeCardProps {
  perfume: Product;
  isPreferred?: boolean;
  variant?: "male" | "female" | "niche";
}

// Icon mapping for perfume characteristics
function getPerfumeIcon(gender: string, characteristics: string[] = []) {
  const iconClass = "w-10 h-10 stroke-[1.5]";
  
  if (characteristics.includes("odunsu") || characteristics.includes("woody")) 
    return <TreePine className={`${iconClass} text-amber-300`} />;
  if (characteristics.includes("çiçeksi") || characteristics.includes("floral")) 
    return <Flower2 className={`${iconClass} text-rose-300`} />;
  if (characteristics.includes("taze") || characteristics.includes("fresh")) 
    return <Wind className={`${iconClass} text-cyan-300`} />;
  if (characteristics.includes("oryantal") || characteristics.includes("oriental")) 
    return <Sparkles className={`${iconClass} text-gold`} />;
  if (characteristics.includes("meyvemsi") || characteristics.includes("fruity")) 
    return <Droplets className={`${iconClass} text-orange-300`} />;
  if (characteristics.includes("baharatlı") || characteristics.includes("spicy")) 
    return <Gem className={`${iconClass} text-red-300`} />;
  
  if (gender === "male") return <Wind className={`${iconClass} text-blue-300`} />;
  if (gender === "female") return <Flower2 className={`${iconClass} text-rose-300`} />;
  return <Sparkles className={`${iconClass} text-gold`} />;
}

// Get variant-specific styles
function getVariantStyles(variant: "male" | "female" | "niche") {
  switch (variant) {
    case "female":
      return {
        iconBg: "bg-gradient-to-br from-rose-500/20 to-purple-600/20",
        imageBg: "bg-gradient-to-br from-purple-900/30 to-slate-800/50",
        glowColor: "from-rose-500/5",
        tagStyle: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      };
    case "niche":
      return {
        iconBg: "bg-gradient-to-br from-gold/15 to-amber-600/20",
        imageBg: "bg-gradient-to-br from-amber-900/20 to-slate-800/50",
        glowColor: "from-gold/5",
        tagStyle: "bg-gold/10 text-gold/80 border-gold/20",
      };
    default: // male
      return {
        iconBg: "bg-gradient-to-br from-slate-600/50 to-slate-700/50",
        imageBg: "bg-gradient-to-br from-slate-700/50 to-slate-800/50",
        glowColor: "from-gold/5",
        tagStyle: "bg-white/5 text-gray-300 border-white/10",
      };
  }
}

export default function PerfumeCard({ perfume, isPreferred = false, variant = "male" }: PerfumeCardProps) {
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
      <div className={`absolute inset-0 bg-gradient-to-t ${styles.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      
      <div className={`relative h-56 ${styles.imageBg} flex items-center justify-center overflow-hidden`}>
        {/* Show image only if it's a valid URL (not default placeholder) */}
        {perfume.image && 
         perfume.image.trim() !== "" && 
         perfume.image !== "/card-photos/1.png" &&
         !perfume.image.includes("placeholder") ? (
          <Image
            src={perfume.image}
            alt={perfume.name}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          /* Show icon when no valid image */
          <div className={`w-20 h-20 rounded-full ${styles.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
            {getPerfumeIcon(perfume.gender, perfume.characteristics)}
          </div>
        )}
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
        <p className="text-sm text-gray-400 mb-3">{perfume.brand} • {perfume.ml}ml</p>
        
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
            href={perfume.shopierLink || "https://www.shopier.com/blueperfumery"}
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
