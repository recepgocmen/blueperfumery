import Link from "next/link";
import type { Product } from "@/lib/api";
import { featuredFirst } from "@/lib/catalog";
import ProductTile from "./ProductTile";

type Props = {
  title: string;
  intro: string;
  products: Product[];
};

const CollectionPage = ({ title, intro, products }: Props) => {
  const sorted = featuredFirst(products);

  return (
    <div className="px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pt-36">
      <div className="mx-auto max-w-[90rem]">
        <header className="border-b border-gold pb-10 lg:flex lg:items-end lg:justify-between lg:gap-16 lg:pb-14">
          <div>
            <h1 className="text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
              {title}
            </h1>
            <p className="mt-6 max-w-[48ch] text-lg text-ink-soft">{intro}</p>
          </div>
          <p className="mt-6 shrink-0 tabular-nums text-ink-soft lg:mt-0">
            {sorted.length} parfüm
          </p>
        </header>

        {sorted.length === 0 ? (
          <p className="mt-16 text-lg">
            Bu rafta şu an parfüm yok.{" "}
            <Link href="/satin-al" className="link">
              Tüm koleksiyona göz at
            </Link>
            .
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-3 sm:gap-x-8 lg:mt-16 lg:grid-cols-4">
            {sorted.map((product, index) => (
              <ProductTile
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
