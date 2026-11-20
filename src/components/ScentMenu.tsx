"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { buyUrl, capitalize } from "@/lib/catalog";
import Price from "./Price";
import ProductImage from "./ProductImage";

type Gender = "female" | "male";
type Pick = { family: string; product: Product };

type Props = {
  picks: Record<Gender, Pick[]>;
};

const QUESTION = "Bugün nasıl kokmak istersin?";

const GENDERS: { value: Gender; label: string }[] = [
  { value: "female", label: "Kadın" },
  { value: "male", label: "Erkek" },
];

const ScentMenu = ({ picks }: Props) => {
  const [gender, setGender] = useState<Gender>("female");
  const [active, setActive] = useState(0);
  const [previousId, setPreviousId] = useState<string | null>(null);

  const list = picks[gender];

  if (list.length === 0) {
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

  const changed = previousId !== null;
  const current = Math.min(active, list.length - 1);
  const { product } = list[current];

  const choose = (index: number) => {
    if (index === current) return;
    setPreviousId(product.id);
    setActive(index);
  };

  const switchGender = (next: Gender) => {
    if (next === gender) return;
    setPreviousId(product.id);
    setGender(next);
    setActive(0);
  };

  // Every bottle of both lists stays mounted, so switching never waits on a fetch.
  const layers = [...picks.female, ...picks.male]
    .map(({ product: pick }) => pick)
    .filter((pick, index, all) => all.findIndex((p) => p.id === pick.id) === index);

  const imageLayer = (id: string) => {
    if (id === product.id) return `z-20 ${changed ? "animate-pour" : ""}`;
    if (id === previousId) return "z-10";
    return "invisible";
  };

  return (
    <section className="bg-bordo text-ivory lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_42%]">
      <div className="flex flex-col justify-end px-5 pb-5 pt-[5.5rem] sm:px-10 lg:px-16 lg:pb-20 lg:pt-32">
        <div
          role="group"
          aria-label="Kimin için"
          className="mb-5 flex self-start border border-ivory/40 lg:mb-8"
        >
          {GENDERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={gender === value}
              onClick={() => switchGender(value)}
              className={`min-h-11 px-5 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                gender === value
                  ? "bg-ivory text-bordo-deep"
                  : "text-ivory/80 hover:bg-ivory/10 hover:text-ivory"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <h1 className="text-[1.625rem] italic leading-[1.15] lg:text-[2.5rem]">
          {QUESTION}
        </h1>
        <ul className="-mx-5 mt-3 flex gap-x-6 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:mt-8 lg:block lg:overflow-visible lg:px-0">
          {list.map(({ family }, index) => {
            const isActive = index === current;
            return (
              <li key={family} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => choose(index)}
                  onFocus={() => choose(index)}
                  onMouseEnter={() => choose(index)}
                  className={`group inline-flex min-h-11 items-center gap-4 py-0.5 font-display text-[1.875rem] leading-[1.02] tracking-[-0.02em] transition-colors duration-300 lg:min-h-0 lg:gap-6 lg:text-[clamp(2.5rem,7vw,5.25rem)] ${
                    isActive
                      ? "text-ivory"
                      : "text-bordo-mute hover:text-ivory focus-visible:text-ivory"
                  }`}
                >
                  {capitalize(family)}
                  <span
                    aria-hidden="true"
                    className={`hidden h-px bg-gold transition-[width] duration-700 ease-pour lg:block ${
                      isActive ? "w-20" : "w-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative lg:pb-0">
        <div className="relative h-[52svh] overflow-hidden bg-bordo-deep lg:absolute lg:inset-0 lg:h-auto">
          {layers.map((pick, index) => (
            <div key={pick.id} className={`absolute inset-0 ${imageLayer(pick.id)}`}>
              <ProductImage
                product={pick}
                priority={index === 0}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
          ))}

          <div
            aria-live="polite"
            className="absolute inset-x-0 bottom-0 z-30 flex items-center gap-4 bg-bordo-deep/90 px-5 py-3 sm:px-10 lg:hidden"
          >
            <Link
              href={`/parfum/${product.id}`}
              className="min-w-0 flex-1"
            >
              <span key={product.id} className={`block ${changed ? "animate-rise" : ""}`}>
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

        <div
          aria-live="polite"
          className="relative z-30 hidden bg-bordo-deep p-8 outline outline-1 outline-gold/40 [outline-offset:-0.625rem] lg:absolute lg:bottom-16 lg:left-0 lg:block lg:w-[22rem] lg:-translate-x-1/3"
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
