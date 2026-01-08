"use client";

import { Droplets, Flower2, Sparkles, Wind, TreePine, Gem } from "lucide-react";

interface PerfumeIconProps {
  gender: string;
  characteristics?: string[];
  className?: string;
}

export default function PerfumeIcon({ gender, characteristics = [], className = "" }: PerfumeIconProps) {
  const iconClass = `w-10 h-10 stroke-[1.5] ${className}`;
  
  // Check characteristics first
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
  
  // Fallback based on gender
  if (gender === "male") return <Wind className={`${iconClass} text-blue-300`} />;
  if (gender === "female") return <Flower2 className={`${iconClass} text-rose-300`} />;
  
  // Default for unisex/niche
  return <Sparkles className={`${iconClass} text-gold`} />;
}
