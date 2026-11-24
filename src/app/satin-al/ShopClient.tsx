"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/lib/api";
import {
  FAMILIES,
  capitalize,
  featuredFirst,
  forMen,
  forWomen,
  isNiche,
} from "@/lib/catalog";
import ProductTile from "@/components/ProductTile";

type Props = {
  products: Product[];
};

const TABS = [
  { key: "", label: "Tümü", matches: () => true },
  {
    key: "kadin",
    label: "Kadın",
    matches: forWomen,
  },
  {
    key: "erkek",
    label: "Erkek",
    matches: forMen,
  },
  {
    key: "nis",
    label: "Niş",
    matches: isNiche,
  },
];

const SORTS = [
  { key: "", label: "Öne çıkanlar", byPrice: false },
  { key: "az", label: "Ada göre A-Z", byPrice: false },
  { key: "fiyat-artan", label: "Fiyat: düşükten yükseğe", byPrice: true },
  { key: "fiyat-azalan", label: "Fiyat: yüksekten düşüğe", byPrice: true },
];

const sortProducts = (products: Product[], sort: string) => {
  if (sort === "az")
    return [...products].sort((a, b) => a.name.localeCompare(b.name, "tr"));
  if (sort === "fiyat-artan")
    return [...products].sort((a, b) => a.price - b.price);
  if (sort === "fiyat-azalan")
    return [...products].sort((a, b) => b.price - a.price);
  return featuredFirst(products);
};

const ShopClient = ({ products }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pricesDiffer =
    new Set(products.map((product) => product.price)).size > 1;
  const sortOptions = SORTS.filter((sort) => pricesDiffer || !sort.byPrice);

  const tab =
    TABS.find((item) => item.key === searchParams.get("tur")) ?? TABS[0];
  const families = (searchParams.get("koku") ?? "")
    .split(",")
    .filter((family) => (FAMILIES as readonly string[]).includes(family));
  const sort =
    sortOptions.find((item) => item.key === searchParams.get("sira"))?.key ??
    "";

  const filtered = sortProducts(
    products.filter(
      (product) =>
        tab.matches(product) &&
        (families.length === 0 ||
          families.some((family) => product.characteristics.includes(family))),
    ),
    sort,
  );

  const update = (changes: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) =>
      value ? params.set(key, value) : params.delete(key),
    );
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const toggleFamily = (family: string) => {
    const next = families.includes(family)
      ? families.filter((item) => item !== family)
      : [...families, family];
    update({ koku: next.join(",") });
  };

  const clearFilters = () => router.replace(pathname, { scroll: false });

  return (
    <>
      <div
        className="mt-12 border-b border-gold-ink"
        role="group"
        aria-label="Kime göre"
      >
        <ul className="-mb-px flex gap-6 overflow-x-auto sm:gap-10">
          {TABS.map((item) => {
            const active = item.key === tab.key;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ tur: item.key })}
                  className={`flex min-h-12 items-baseline gap-1.5 whitespace-nowrap border-b-2 pb-2 font-display text-2xl transition-colors sm:text-3xl ${
                    active
                      ? "border-brand text-ink"
                      : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span className="font-sans text-sm tabular-nums">
                    {products.filter(item.matches).length}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Koku ailesi">
          <ul className="flex flex-wrap gap-2">
            {FAMILIES.map((family) => {
              const active = families.includes(family);
              return (
                <li key={family}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleFamily(family)}
                    className={`min-h-11 border px-4 text-[0.9375rem] transition-colors ${
                      active
                        ? "border-brand bg-brand text-ivory"
                        : "border-ink/25 hover:border-ink"
                    }`}
                  >
                    {capitalize(family)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-6 lg:justify-end">
          <p className="tabular-nums text-ink-soft" aria-live="polite">
            {filtered.length} parfüm
          </p>
          <label className="flex items-center gap-3">
            <span className="text-ink-soft">Sırala</span>
            <span className="relative">
              <select
                value={sort}
                onChange={(event) => update({ sira: event.target.value })}
                className="min-h-11 appearance-none rounded-none border border-ink bg-transparent py-2 pl-4 pr-11 font-sans text-[0.9375rem] text-ink"
              >
                {sortOptions.map((item) => (
                  <option key={item.label} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.5}
                className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink"
              />
            </span>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-start gap-6">
          <p className="text-lg">Bu seçimle eşleşen parfüm yok.</p>
          <button type="button" onClick={clearFilters} className="btn-line">
            Filtreleri temizle
          </button>
        </div>
      ) : (
        <div
          key={searchParams.toString()}
          className="mt-12 grid animate-fade grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4"
        >
          {filtered.map((product, index) => (
            <ProductTile
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ShopClient;
