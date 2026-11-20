"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { buyUrl, capitalize } from "@/lib/catalog";
import Price from "./Price";
import ProductImage from "./ProductImage";

type Props = {
  picks: { family: string; product: Product }[];
};

const QUESTION = "Bugün nasıl kokmak istersin?";

const ScentMenu = ({ picks }: Props) => {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  if (picks.length === 0) {
    return (
      <section className="flex min-h-[100svh] flex-col justify-end bg-bordo px-5 pb-20 pt-28 text-ivory sm:px-10 lg:px-16 lg:pb-28">
        <h1 className="max-w-[20ch] text-[2.5rem] italic leading-[1.1] lg:text-[4rem]">
          {QUESTION}
        </h1>
        <Link href="/satin-al" className="btn-ivory mt-10 self-start">
          Koleksiyona bak
        </Link>
      </section>
    );
  }

  const changed = previous !== null;
  const { product } = picks[active];

  const choose = (index: number) => {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
  };

  const imageLayer = (index: number) => {
    if (index === active) return `z-20 ${changed ? "animate-pour" : ""}`;
    if (index === previous) return "z-10";
    return "invisible";
  };

  return (
    <section className="bg-bordo text-ivory lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_42%]">
      <div className="flex flex-col justify-end px-5 pb-8 pt-[6.5rem] sm:px-10 lg:px-16 lg:pb-20 lg:pt-32">
        <h1 className="text-[1.875rem] italic leading-[1.15] lg:text-[2.5rem]">
          {QUESTION}
        </h1>
        <ul className="mt-5 lg:mt-8">
          {picks.map(({ family }, index) => {
            const isActive = index === active;
            return (
              <li key={family}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => choose(index)}
                  onFocus={() => choose(index)}
                  onMouseEnter={() => choose(index)}
                  className={`group inline-flex items-center gap-4 py-0.5 font-display text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02] tracking-[-0.02em] transition-colors duration-300 lg:gap-6 ${
                    isActive
                      ? "text-ivory"
                      : "text-bordo-mute hover:text-ivory focus-visible:text-ivory"
                  }`}
                >
                  {capitalize(family)}
                  <span
                    aria-hidden="true"
                    className={`h-px bg-gold transition-[width] duration-700 ease-pour ${
                      isActive ? "w-10 lg:w-20" : "w-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
        <div
          aria-live="polite"
          className="-mx-5 mt-6 flex items-center gap-4 bg-bordo-deep px-5 py-3 sm:-mx-10 sm:px-10 lg:hidden"
        >
          <Link
            href={`/parfum/${product.id}`}
            className="flex min-w-0 flex-1 items-center gap-4"
          >
            <span
              key={product.id}
              className={`relative h-[4.5rem] w-14 shrink-0 overflow-hidden bg-bordo ${
                changed ? "animate-pour" : ""
              }`}
            >
              <ProductImage product={product} sizes="56px" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-xl">
                {product.name}
              </span>
              <Price product={product} className="text-sm text-ivory/80" />
            </span>
          </Link>
          <a
            href={buyUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line-ivory shrink-0 px-4"
          >
            Satın al
          </a>
        </div>
      </div>

      <div className="relative pb-12 lg:pb-0">
        <div className="relative h-[60svh] overflow-hidden bg-bordo-deep lg:absolute lg:inset-0 lg:h-auto">
          {picks.map(({ family, product: pick }, index) => (
            <div
              key={family}
              className={`absolute inset-0 ${imageLayer(index)}`}
            >
              <ProductImage
                product={pick}
                priority={index === 0}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
          ))}
        </div>

        <div
          aria-live="polite"
          className="relative z-30 mx-5 -mt-24 hidden bg-bordo-deep p-6 outline outline-1 outline-gold/40 [outline-offset:-0.625rem] sm:mx-10 sm:w-[22rem] sm:p-8 lg:absolute lg:block lg:bottom-16 lg:left-0 lg:mx-0 lg:mt-0 lg:-translate-x-1/3"
        >
          <div key={product.id} className={changed ? "animate-rise" : ""}>
            <p className="font-display text-[1.625rem] font-medium uppercase leading-tight tracking-[0.06em] text-gold">
              {product.name}
            </p>
            <p className="mt-3 text-ivory">
              {product.notes.slice(0, 3).join(" · ")}
            </p>
            <p className="mt-1 tabular-nums text-ivory/80">
              <Price product={product} /> · {product.ml} ml
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={`/parfum/${product.id}`} className="btn-ivory">
                İncele
              </Link>
              <a
                href={buyUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line-ivory"
              >
                Satın al
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScentMenu;
