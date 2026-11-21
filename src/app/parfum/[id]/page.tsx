import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProducts, type Product } from "@/lib/api";
import {
  SITE_URL,
  audienceLabel,
  buyUrl,
  capitalize,
  productImage,
  similarTo,
} from "@/lib/catalog";
import AskMiraButton from "@/components/AskMiraButton";
import Price from "@/components/Price";
import ProductImage from "@/components/ProductImage";
import ProductTile from "@/components/ProductTile";

type Props = {
  params: Promise<{ id: string }>;
};

const findActiveProduct = async (id: string) => {
  try {
    const product = await getProductById(id);
    return product.status === "active" ? product : null;
  } catch {
    return null;
  }
};

const getActiveProducts = async () => {
  try {
    const response = await getProducts({ status: "active", limit: 100 });
    return response.data;
  } catch {
    return [];
  }
};

const absoluteImage = (product: Product) => {
  const src = productImage(product);
  return src.startsWith("/") ? `${SITE_URL}${src}` : src;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const product = await findActiveProduct(id);
  if (!product) return { title: "Ürün bulunamadı | Blue Perfumery" };

  return {
    title: `${product.name} | Blue Perfumery`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Blue Perfumery`,
      description: product.description,
      url: `${SITE_URL}/parfum/${product.id}`,
      images: [{ url: absoluteImage(product), alt: product.name }],
    },
  };
};

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await findActiveProduct(id);
  if (!product) notFound();

  const similar = similarTo(product, await getActiveProducts());
  const soldOut = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteImage(product),
    brand: { "@type": "Brand", name: "Blue Perfumery" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "TRY",
      availability: soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: `${SITE_URL}/parfum/${product.id}`,
    },
  };

  return (
    <div className="px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-[90rem]">
        <article className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] w-full animate-fade bg-sand lg:max-h-[calc(100svh-9rem)]">
              <ProductImage
                product={product}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </div>

          <div className="lg:pt-6">
            <h1 className="text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
              {product.name}
            </h1>
            <p className="mt-4 text-ink-soft">
              {audienceLabel(product)} · {product.ml} ml
            </p>
            <p className="mt-8 max-w-[65ch] text-lg">{product.description}</p>

            <div className="mt-10 flex items-baseline justify-between gap-6 border-t border-gold pt-6">
              <p className="font-display text-4xl">
                <Price product={product} />
              </p>
              {lowStock && (
                <p className="text-bordo">Son {product.stock} adet</p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {soldOut ? (
                <button
                  type="button"
                  disabled
                  className="btn cursor-not-allowed border border-ink/30 text-ink-soft"
                >
                  Tükendi
                </button>
              ) : (
                <a
                  href={buyUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bordo"
                >
                  WhatsApp&apos;tan sipariş ver
                </a>
              )}
              <AskMiraButton
                question={`${product.name} nasıl bir koku, kime yakışır?`}
                className="btn-line"
              >
                Mira&apos;ya sor
              </AskMiraButton>
            </div>

            {product.notes.length > 0 && (
              <section className="mt-16" aria-labelledby="notalar">
                <h2 id="notalar" className="text-2xl">
                  Notalar
                </h2>
                <ul className="mt-5 font-display text-3xl leading-[1.4] sm:text-4xl">
                  {product.notes.map((note, index) => (
                    <li key={note} className="inline">
                      {index > 0 && " "}
                      <span className="whitespace-nowrap">
                        {index > 0 && (
                          <span
                            aria-hidden="true"
                            className="mr-3 inline-block h-px w-5 bg-gold align-middle sm:mr-4 sm:w-8"
                          />
                        )}
                        {capitalize(note)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.characteristics.length > 0 && (
              <section className="mt-12" aria-labelledby="karakter">
                <h2 id="karakter" className="text-2xl">
                  Karakter
                </h2>
                <p className="mt-3 text-ink-soft">
                  {product.characteristics.map(capitalize).join(" · ")}
                </p>
              </section>
            )}
          </div>
        </article>

        {similar.length > 0 && (
          <section
            className="mt-24 border-t border-gold pt-12 lg:mt-32"
            aria-labelledby="benzer"
          >
            <h2 id="benzer" className="text-4xl sm:text-5xl">
              Benzer kokular
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-3 sm:gap-x-8">
              {similar.map((item) => (
                <ProductTile key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
