import { getProducts, type Product } from "@/lib/api";
import {
  featuredFirst,
  formatPrice,
  heroPicks,
  sharedCampaign,
} from "@/lib/catalog";
import ScentMenu from "@/components/ScentMenu";
import HomeShelf from "@/components/HomeShelf";
import MiraAsk from "@/components/MiraAsk";
import NoteIndex from "@/components/NoteIndex";

export const revalidate = 60;

const loadProducts = async (): Promise<Product[]> => {
  try {
    const response = await getProducts({ status: "active", limit: 100 });
    return response.data;
  } catch {
    return [];
  }
};

const Home = async () => {
  const products = await loadProducts();
  const campaign = sharedCampaign(products);

  return (
    <>
      <ScentMenu
        picks={{
          female: heroPicks(products, "female"),
          male: heroPicks(products, "male"),
        }}
      />

      <section
        id="raftakiler"
        aria-labelledby="shelf-heading"
        className="mx-auto max-w-[90rem] scroll-mt-20 px-5 pb-24 pt-24 sm:px-10 lg:px-16 lg:pb-32 lg:pt-36"
      >
        <h2 id="shelf-heading" data-reveal="heading" className="text-[2.5rem] leading-none lg:text-[3.5rem]">
          Raftakiler
        </h2>
        {campaign && (
          <p className="mt-4 text-lg text-brand">
            Kampanya: tüm parfümler {formatPrice(campaign.originalPrice)}{" "}
            yerine {formatPrice(campaign.price)}.
          </p>
        )}
        <p className="mt-2 max-w-[60ch] text-ink-soft">
          Her şişe, adı açıkça yazılı bilinen bir kokunun Blue Parfüm yorumu.
        </p>
        <HomeShelf products={featuredFirst(products)} />
      </section>

      <section aria-label="Mira'ya sor" className="bg-sand">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
          <MiraAsk />
        </div>
      </section>

      <NoteIndex products={products} />
    </>
  );
};

export default Home;
