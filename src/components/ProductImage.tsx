"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/api";
import { DEFAULT_IMAGE, productImage } from "@/lib/catalog";

type Props = {
  product: Pick<Product, "id" | "image" | "name">;
  sizes: string;
  priority?: boolean;
  className?: string;
};

const ProductImage = ({ product, sizes, priority, className }: Props) => {
  const wanted = productImage(product);
  const [failed, setFailed] = useState<string | null>(null);
  const src = failed === wanted ? DEFAULT_IMAGE : wanted;

  return (
    <Image
      src={src}
      alt={`${product.name} parfüm şişesi`}
      fill
      sizes={sizes}
      quality={90}
      priority={priority}
      unoptimized={!src.startsWith("/")}
      onError={() => setFailed(wanted)}
      className={`object-cover ${className ?? ""}`}
    />
  );
};

export default ProductImage;
