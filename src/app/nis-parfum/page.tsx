import { getActiveProducts } from "@/lib/api";
import { isNiche } from "@/lib/catalog";
import CollectionPage from "@/components/CollectionPage";

export const metadata = {
  title: "Niş Parfümler | Blue Parfüm",
  description:
    "Blue Parfüm niş parfümleri: tanınmış niş kokuların yorumları.",
};

const NisParfum = async () => {
  const products = (await getActiveProducts()).filter(isNiche);

  return (
    <CollectionPage
      title="Niş parfümler"
      intro="Niş parfümlerin Blue Parfüm yorumları. Notalarına bakıp seç."
      products={products}
    />
  );
};

export default NisParfum;
