import Link from "next/link";
import { getProducts, type Product } from "@/lib/api";
import {
  featuredFirst,
  formatPrice,
  pickByFamily,
  sharedCampaign,
} from "@/lib/catalog";
import ScentMenu from "@/components/ScentMenu";
import HomeShelf from "@/components/HomeShelf";
import MiraAsk from "@/components/MiraAsk";

export const revalidate = 60;

const loadProducts = async (): Promise<Product[]> => {
  try {
    const response = await getProducts({ status: "active", limit: 100 });
    return response.data;
  } catch {
    return [];
  }
};

const offerLine = (products: Product[]) => {
  if (products.length === 0) return "";
  const campaign = sharedCampaign(products);
  if (campaign)
    return ` Her şişe ${products[0].ml} ml; kampanyada ${formatPrice(campaign.originalPrice)} yerine ${formatPrice(campaign.price)}.`;
  const sizes = new Set(products.map((product) => product.ml));
  const prices = products.map((product) => product.price);
  const lowest = Math.min(...prices);
  const sameSize = sizes.size === 1;
  const samePrice = new Set(prices).size === 1;
  if (sameSize && samePrice)
    return ` Her şişe ${products[0].ml} ml, her şişe ${formatPrice(lowest)}.`;
  if (sameSize)
    return ` Her şişe ${products[0].ml} ml, en uygunu ${formatPrice(lowest)}.`;
  return ` En uygun şişe ${formatPrice(lowest)}.`;
};

const Home = async () => {
  const products = await loadProducts();
  const campaign = sharedCampaign(products);

  return (
    <>
      <ScentMenu picks={pickByFamily(products).slice(0, 6)} />

      <section
        aria-labelledby="shelf-heading"
        className="mx-auto max-w-[90rem] px-5 pb-24 pt-24 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36"
      >
        <h2 id="shelf-heading" className="text-[2.5rem] leading-none lg:text-[3.5rem]">
          Raftakiler
        </h2>
        {campaign && (
          <p className="mt-4 text-lg text-bordo">
            Kampanya: bütün şişeler {formatPrice(campaign.originalPrice)}{" "}
            yerine {formatPrice(campaign.price)}.
          </p>
        )}
        <HomeShelf products={featuredFirst(products)} />
      </section>

      <section aria-label="Mira'ya sor" className="bg-sand">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
          <MiraAsk />
        </div>
      </section>

      <section className="bg-bordo text-ivory">
        <div className="mx-auto max-w-[90rem] px-5 pb-20 pt-28 sm:px-10 lg:px-16 lg:pb-28 lg:pt-40">
          <p className="max-w-[24ch] font-display text-[clamp(2rem,5vw,4rem)] leading-[1.12] tracking-[-0.015em]">
            Sevdiğin kokuların <em>Blue Perfumery</em> yorumu.
            {offerLine(products)} Ödemeyi Shopier üzerinden yaparsın.
          </p>
          <Link
            href="/hakkimizda"
            className="link mt-10 inline-flex min-h-11 items-center text-ivory"
          >
            Biz kimiz
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
