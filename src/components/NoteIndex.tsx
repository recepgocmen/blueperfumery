import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/api";
import { buyUrl, capitalize, dotted, featuredFirst } from "@/lib/catalog";
import Price from "./Price";
import ProductImage from "./ProductImage";
import KeepRowInView from "./KeepRowInView";

// Notes are free text in the database. Spellings of one ingredient fold into one
// entry here; null drops an entry too vague to choose by.
const NOTE_ALIASES: Record<string, string | null> = {
  "beyaz misk": "misk",
  "vanilya infüzyonu": "vanilya",
  "vanilya havyarı": "vanilya",
  "vanilya mutlak": "vanilya",
  "vanilya orkidesi": "vanilya", // the vanilla plant's flower
  "odunsu notalar": null,
};

// A note is listed once this many bottles carry it (at 2 the live catalog gives ~30 rows).
const MIN_BOTTLES = 3;

const notesOf = (product: Product) => [
  ...new Set(
    product.notes.flatMap((raw) => {
      const note = raw.trim().toLocaleLowerCase("tr-TR");
      const alias = note in NOTE_ALIASES ? NOTE_ALIASES[note] : note;
      return alias ? [alias] : [];
    }),
  ),
];

const noteIndex = (products: Product[]) => {
  const byNote = new Map<string, Product[]>();
  featuredFirst(products).forEach((product) =>
    notesOf(product).forEach((note) =>
      byNote.set(note, [...(byNote.get(note) ?? []), product]),
    ),
  );
  return [...byNote.entries()]
    .filter(([, bottles]) => bottles.length >= MIN_BOTTLES)
    .sort(
      ([a, x], [b, y]) => y.length - x.length || a.localeCompare(b, "tr"),
    );
};

const NoteIndex = ({ products }: { products: Product[] }) => {
  const index = noteIndex(products);
  if (index.length === 0) return null;

  return (
    <section
      aria-labelledby="nota-dizini"
      className="border-t border-gold/30 bg-brand pb-24 pt-20 text-ivory lg:pb-32 lg:pt-28"
    >
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 sm:px-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20 lg:px-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="nota-dizini"
            data-reveal="heading"
            className="text-[2.5rem] leading-none lg:text-[3.5rem]"
          >
            Sevdiğin nota hangisi?
          </h2>
          <p className="mt-5 max-w-[36ch] text-lg text-ivory/85">
            Bir notaya dokun; onu taşıyan şişeler altında açılsın.
          </p>
        </div>

        <div id="notalar-listesi" className="border-b border-gold/30 [overflow-anchor:none]">
          <KeepRowInView target="notalar-listesi" />
          {index.map(([note, bottles], position) => (
            <details
              key={note}
              name="nota"
              open={position === 0}
              className="group/note border-t border-gold/30"
            >
              <summary className="group/row relative flex min-h-16 cursor-pointer list-none items-baseline justify-between gap-6 py-3 lg:min-h-[4.5rem] [&::-webkit-details-marker]:hidden">
                <span className="font-display text-4xl italic leading-tight transition-transform duration-500 ease-pour group-open/note:text-gold lg:text-5xl [@media(hover:hover)]:group-hover/row:translate-x-1">
                  {capitalize(note)}
                </span>
                <span className="flex shrink-0 items-center gap-4 text-sm tabular-nums text-ivory/80">
                  {bottles.length} şişe
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-5 text-gold transition-transform duration-500 ease-pour group-open/note:rotate-45"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold group-open/note:animate-rule"
                />
              </summary>

              <ul className="grid gap-x-10 gap-y-6 pb-10 pt-7 sm:grid-cols-2">
                {bottles.map((product, order) => (
                  <li
                    key={product.id}
                    className="flex gap-4 group-open/note:animate-rise"
                    style={{ animationDelay: `calc(var(--stagger) * ${order})` }}
                  >
                    <Link
                      href={`/parfum/${product.id}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="relative aspect-[4/5] w-[4.5rem] shrink-0 overflow-hidden bg-brand-deep"
                    >
                      <ProductImage product={product} sizes="72px" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/parfum/${product.id}`}
                        className="font-display text-xl leading-tight transition-colors duration-300 hover:text-gold"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-[0.9375rem] leading-snug text-ivory/80">
                        {dotted(
                          notesOf(product)
                            .filter((other) => other !== note)
                            .slice(0, 3)
                            .map(capitalize),
                        )}
                      </p>
                      <div className="mt-1 flex items-baseline justify-between gap-4">
                        <Price product={product} />
                        <a
                          href={buyUrl(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link inline-flex min-h-11 items-center whitespace-nowrap text-ivory"
                        >
                          Satın al
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoteIndex;
