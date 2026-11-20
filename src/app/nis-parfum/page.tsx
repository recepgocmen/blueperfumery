import { getActiveProducts } from "@/lib/api";
import { isNiche } from "@/lib/catalog";
import CollectionPage from "@/components/CollectionPage";

export const metadata = {
  title: "Niş Parfümler | Blue Perfumery",
  description:
    "Blue Perfumery'nin niş parfüm koleksiyonu. Benzersiz ve ayırt edici kokularla fark yarat.",
};

const NisParfum = async () => {
  const products = (await getActiveProducts()).filter(isNiche);

  return (
    <CollectionPage
      title="Niş parfümler"
      intro="Benzersiz ve ayırt edici kokularla fark yarat."
      products={products}
    />
  );
};

export default NisParfum;
