"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { forMen, forWomen, isNiche } from "@/lib/catalog";
import ProductTile from "./ProductTile";

const SHELF_SIZE = 8;

const FILTERS = [
  { key: "all", label: "Tümü", match: () => true },
  { key: "female", label: "Kadın", match: forWomen },
  { key: "male", label: "Erkek", match: forMen },
  { key: "niches", label: "Niş", match: isNiche },
];

const HomeShelf = ({ products }: { products: Product[] }) => {
  const [filterKey, setFilterKey] = useState("all");
  const [switched, setSwitched] = useState(false);

  if (products.length === 0) {
    return (
      <p className="mt-8 max-w-[65ch] text-ink-soft">
        Raf şu an yüklenemedi.{" "}
        <Link href="/satin-al" className="link text-ink">
          Koleksiyonun tamamına buradan bak.
        </Link>
      </p>
    );
  }

  const filter = FILTERS.find(({ key }) => key === filterKey) ?? FILTERS[0];
  const shown = products.filter(filter.match);

  const selectFilter = (key: string) => {
    if (key === filterKey) return;
    setSwitched(true);
    setFilterKey(key);
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-7">
        {FILTERS.map(({ key, label, match }) => (
          <button
            key={key}
            type="button"
            aria-pressed={key === filterKey}
            onClick={() => selectFilter(key)}
            className="min-h-11 text-[1.0625rem] text-ink-soft decoration-brand underline-offset-[0.4em] transition-colors duration-200 hover:text-ink aria-pressed:text-brand aria-pressed:underline"
          >
            {label}{" "}
            <span className="tabular-nums">
              ({products.filter(match).length})
            </span>
          </button>
        ))}
      </div>

      <span
        aria-hidden="true"
        data-reveal="rule"
        className="mt-2 block h-px w-full bg-gold-ink/30"
      />

      {shown.length === 0 ? (
        <p className="mt-10 text-ink-soft">
          Bu rafta şu an şişe yok.{" "}
          <Link href="/satin-al" className="link text-ink">
            Tüm koleksiyona bak.
          </Link>
        </p>
      ) : (
        <ul
          key={filterKey}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16"
        >
          {shown.slice(0, SHELF_SIZE).map((product, index) => (
            <li
              key={product.id}
              className={switched ? "animate-rise" : undefined}
              style={
                switched
                  ? { animationDelay: `calc(var(--stagger) * ${index})` }
                  : undefined
              }
            >
              <ProductTile product={product} />
            </li>
          ))}
        </ul>
      )}

      <Link href="/satin-al" className="btn-line mt-14">
        Tüm koleksiyonu gör ({products.length})
      </Link>
    </>
  );
};

export default HomeShelf;
