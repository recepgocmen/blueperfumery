import Link from "next/link";
import type { Product } from "@/lib/api";
import { audienceLabel, buyUrl } from "@/lib/catalog";
import Price from "./Price";
import ProductImage from "./ProductImage";

type Props = {
  product: Product;
  priority?: boolean;
};

const stockNote = (stock: number) => {
  if (stock === 0) return "Tükendi";
  if (stock <= 5) return `Son ${stock} adet`;
  return null;
};

const ProductTile = ({ product, priority }: Props) => {
  const note = stockNote(product.stock);

  return (
    <article className="group flex flex-col">
      <Link href={`/parfum/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <ProductImage
            product={product}
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="transition-transform duration-700 ease-pour group-hover:scale-[1.04]"
          />
          {note && (
            <span className="absolute left-0 top-4 bg-bordo px-3 py-1 text-sm text-ivory">
              {note}
            </span>
          )}
        </div>
        <h3 className="mt-4 text-xl leading-tight sm:text-2xl">{product.name}</h3>
      </Link>
      <p className="mt-1 text-[0.9375rem] text-ink-soft">
        {product.notes.slice(0, 3).join(" · ")}
      </p>
      <p className="text-[0.9375rem] text-ink-soft">
        {audienceLabel(product)} · {product.ml} ml
      </p>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <Price product={product} />
        <a
          href={buyUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="link text-[0.9375rem]"
        >
          Satın al
        </a>
      </div>
    </article>
  );
};

export default ProductTile;
