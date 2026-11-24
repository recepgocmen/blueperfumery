import { getProducts, type Product } from "@/lib/api";
import {
  FAMILIES,
  featuredFirst,
  formatPrice,
  heroPicks,
  sharedCampaign,
} from "@/lib/catalog";
import ScentMenu from "@/components/ScentMenu";
import HomeShelf from "@/components/HomeShelf";
import MiraAsk from "@/components/MiraAsk";
import FamilyGallery, { type FamilyCard } from "@/components/FamilyGallery";

export const revalidate = 60;

const loadProducts = async (): Promise<Product[]> => {
  try {
    const response = await getProducts({ status: "active", limit: 100 });
    return response.data;
  } catch {
    return [];
  }
};

// One tall photograph per scent family, each from a different bottle in that family.
const familyCards = (products: Product[]): FamilyCard[] => {
  const used = new Set<string>();
  const ordered = featuredFirst(products);
  return FAMILIES.flatMap((family) => {
    const members = ordered.filter((product) =>
      product.characteristics.includes(family),
    );
    const cover =
      members.find((product) => !used.has(product.id)) ?? members[0];
    if (!cover) return [];
    used.add(cover.id);
    const tally = new Map<string, number>();
    members.forEach((product) =>
      product.notes.forEach((note) => tally.set(note, (tally.get(note) ?? 0) + 1)),
    );
    const notes = [...tally.entries()]
      .sort((x, y) => y[1] - x[1])
      .slice(0, 3)
      .map(([note]) => note);
    return [{ family, count: members.length, notes, cover }];
  });
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
        <HomeShelf products={featuredFirst(products)} />
      </section>

      <section aria-label="Mira'ya sor" className="bg-sand">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
          <MiraAsk />
        </div>
      </section>

      {products.length > 0 && <FamilyGallery cards={familyCards(products)} />}
    </>
  );
};

export default Home;
