"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";
import { buyUrl, capitalize, dotted } from "@/lib/catalog";
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
  // Hover selects only once the pointer rests, so sweeping across the list does not restart the pour on every name.
  const intent = useRef<number | undefined>(undefined);
  const [previousId, setPreviousId] = useState<string | null>(null);

  const list = picks[gender];

  if (list.length === 0) {
    return (
      <section className="flex min-h-[100svh] flex-col justify-end bg-brand px-5 pb-20 pt-28 text-ivory sm:px-10 lg:px-16 lg:pb-28">
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

  // On load the plate's lines wait for the photograph to settle; on a family change they follow at once.
  const lineDelay = (line: number) =>
    `calc(${changed ? 0 : 400}ms + var(--stagger) * ${line})`;

  const imageLayer = (id: string) => {
    if (id === product.id) return `z-20 ${changed ? "animate-pour" : ""}`;
    if (id === previousId) return "z-10 transition-opacity duration-slow ease-pour opacity-95";
    return "invisible";
  };

  return (
    <section className="relative border-b border-gold/30 bg-brand text-ivory lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_44%]">
      <div className="flex flex-col justify-end px-5 pb-5 pt-[5.5rem] sm:px-10 lg:px-16 lg:pb-14 lg:pt-32">
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
              className={`min-h-11 px-5 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300 ease-pour ${
                gender === value
                  ? "bg-ivory text-brand-deep"
                  : "text-ivory/80 hover:bg-ivory/10 hover:text-ivory"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <h1 className="animate-rise text-[1.625rem] italic leading-[1.15] lg:text-[2.5rem]">
          {QUESTION}
        </h1>
        <ul className="-mx-5 mt-3 flex gap-x-6 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:mt-8 lg:block lg:overflow-visible lg:px-0">
          {list.map(({ family }, index) => {
            const isActive = index === current;
            return (
              <li
                key={family}
                className="shrink-0 animate-rise"
                style={{ animationDelay: `calc(120ms + var(--stagger) * ${index})` }}
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => choose(index)}
                  onFocus={() => choose(index)}
                  onMouseEnter={() => {
                    window.clearTimeout(intent.current);
                    intent.current = window.setTimeout(() => choose(index), 140);
                  }}
                  onMouseLeave={() => window.clearTimeout(intent.current)}
                  className={`group inline-flex min-h-11 items-center gap-4 py-0.5 font-display text-[1.875rem] leading-[1.02] tracking-[-0.02em] transition-[color,transform] duration-500 ease-pour lg:min-h-0 lg:gap-6 lg:text-[clamp(2.5rem,6.5vw,5rem)] ${
                    isActive
                      ? "text-ivory lg:translate-x-2"
                      : "text-brand-mute hover:text-ivory focus-visible:text-ivory lg:hover:translate-x-1"
                  }`}
                >
                  {capitalize(family)}
                  <span
                    aria-hidden="true"
                    className={`hidden h-px w-20 origin-left bg-gold transition-transform duration-slow ease-pour lg:block ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <a
          href="#raftakiler"
          className="mt-10 hidden items-center gap-3 self-start text-sm tracking-[0.12em] uppercase text-ivory/80 transition-colors duration-300 hover:text-gold lg:inline-flex"
        >
          <span
            aria-hidden="true"
            className="animate-cue block h-6 w-px bg-gold"
          />
          <span>Raftakiler</span>
        </a>
      </div>

      <div className="relative lg:pb-0">
        <div className="relative h-[52svh] overflow-hidden bg-brand-deep lg:absolute lg:inset-0 lg:h-auto">
          <div className="absolute inset-0 animate-settle">
            <div className="absolute inset-0 animate-drift">
              {layers.map((pick, index) => (
                <div key={pick.id} className={`absolute inset-0 ${imageLayer(pick.id)}`}>
                  <ProductImage
                    product={pick}
                    priority={index === 0}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            aria-live="polite"
            className="absolute inset-x-0 bottom-0 z-30 flex items-center gap-4 border-y border-gold bg-brand-deep px-5 py-3 sm:px-10 lg:hidden"
          >
            <Link
              href={`/parfum/${product.id}`}
              className="min-w-0 flex-1"
            >
              <span key={product.id} className={`block ${changed ? "animate-rise" : ""}`}>
                <span className="block truncate font-display text-lg uppercase tracking-[0.06em] text-gold">
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
          className="z-30 hidden bg-brand-deep p-9 lg:absolute lg:bottom-12 lg:left-0 lg:block lg:w-[21.5rem] lg:-translate-x-[58%]"
        >
          <span
            key={`line-${product.id}`}
            aria-hidden="true"
            className="keyline pointer-events-none absolute inset-0"
            style={{ "--keyline-delay": changed ? "0ms" : "300ms" } as CSSProperties}
          />
          <div key={product.id} className="[&>*]:animate-rise">
            <p style={{ animationDelay: lineDelay(0) }} className="font-display text-[1.625rem] font-medium uppercase leading-tight tracking-[0.06em] text-gold">
              {product.name}
            </p>
            <p className="mt-3 text-ivory" style={{ animationDelay: lineDelay(1) }}>
              {dotted(product.notes.slice(0, 3))}
            </p>
            <p className="mt-1 tabular-nums text-ivory/80" style={{ animationDelay: lineDelay(2) }}>
              <Price product={product} /> · {product.ml} ml
            </p>
            <div className="mt-6 flex flex-wrap gap-2" style={{ animationDelay: lineDelay(3) }}>
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
