import Link from "next/link";
import type { Product } from "@/lib/api";
import { capitalize, dotted } from "@/lib/catalog";
import ProductImage from "./ProductImage";
import GalleryNav from "./GalleryNav";

export type FamilyCard = {
  family: string;
  count: number;
  notes: string[];
  cover: Product;
};

const FamilyGallery = ({ cards }: { cards: FamilyCard[] }) => (
  <section
    aria-labelledby="aileler"
    className="border-y border-gold/30 bg-brand py-20 text-ivory lg:py-28"
  >
    <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-5 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
      <div>
        <h2
          id="aileler"
          data-reveal="heading"
          className="text-[2.5rem] leading-none lg:text-[3.5rem]"
        >
          Kokuna göre seç
        </h2>
        <p className="mt-5 max-w-[46ch] text-lg text-ivory/85">
          Her şişe, adı açıkça yazılı bilinen bir kokunun Blue Parfüm
          yorumu.
        </p>
      </div>
      <GalleryNav target="aile-galerisi" />
    </div>

    <ul
      id="aile-galerisi"
      className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:gap-6 sm:px-10 lg:mt-16 lg:scroll-px-16 lg:px-[max(4rem,calc((100vw-90rem)/2+4rem))]"
    >
      {cards.map(({ family, count, notes, cover }) => (
        <li key={family} data-reveal="tile" className="shrink-0 snap-start">
          <Link
            href={`/satin-al?koku=${encodeURIComponent(family)}`}
            className="group relative block aspect-[3/4] w-[72vw] overflow-hidden bg-brand-deep sm:w-[19rem] lg:w-[22rem]"
          >
            <ProductImage
              product={cover}
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 19rem, 72vw"
              className="transition-transform duration-[1400ms] ease-pour motion-safe:[@media(hover:hover)]:group-hover:scale-[1.06]"
            />
            <span
              aria-hidden="true"
              className="tile-glint pointer-events-none absolute inset-0"
            />
            {/* Functional scrim: keeps the family name legible over any photograph. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-deep/90 to-transparent transition-opacity duration-500 ease-pour [@media(hover:hover)]:group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="tile-line pointer-events-none absolute inset-2"
            />
            <span className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-700 ease-pour [@media(hover:hover)]:group-hover:-translate-y-1 lg:p-7">
              <span className="block font-display text-[2.25rem] font-semibold leading-none lg:text-[2.75rem]">
                {capitalize(family)}
              </span>
              <span className="mt-3 block text-ivory/85">
                {dotted(notes.map(capitalize))}
              </span>
              <span className="mt-1 block text-sm tabular-nums text-gold">
                {count} parfüm
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>

    <div className="mx-auto mt-12 flex max-w-[90rem] gap-10 px-5 sm:px-10 lg:px-16">
      <Link href="/parfumunu-bul" className="link inline-flex min-h-11 items-center text-ivory">
        Kokunu bul
      </Link>
      <Link href="/satin-al" className="link inline-flex min-h-11 items-center text-ivory">
        Koleksiyonu gör
      </Link>
    </div>
  </section>
);

export default FamilyGallery;
