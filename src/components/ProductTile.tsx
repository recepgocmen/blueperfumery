import Link from "next/link";
import type { Product } from "@/lib/api";
import { audienceLabel, buyUrl, dotted } from "@/lib/catalog";
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
    <article data-reveal="tile" className="group flex flex-col">
      <Link href={`/parfum/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <ProductImage
            product={product}
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="transition-transform duration-[1400ms] ease-pour motion-safe:[@media(hover:hover)]:group-hover:scale-[1.06]"
          />
          <span
            aria-hidden="true"
            className="tile-glint pointer-events-none absolute inset-0"
          />
          <span
            aria-hidden="true"
            className="tile-line pointer-events-none absolute inset-2"
          />
          {note && (
            <span className="absolute left-0 top-4 bg-brand px-3 py-1 text-sm text-ivory">
              {note}
            </span>
          )}
        </div>
        <h3 className="mt-4 text-xl leading-tight transition-colors duration-300 group-hover:text-brand sm:text-2xl">
          {product.name}
        </h3>
      </Link>
      <p className="mt-1 text-base text-ink-soft">
        {dotted(product.notes.slice(0, 3))}
      </p>
      <p className="text-base text-ink-soft">
        {audienceLabel(product)} · {product.ml} ml
      </p>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <Price product={product} />
        <a
          href={buyUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="link whitespace-nowrap text-base"
        >
          Satın al
        </a>
      </div>
    </article>
  );
};

export default ProductTile;
