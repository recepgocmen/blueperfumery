import { getActiveProducts } from "@/lib/api";
import { forWomen } from "@/lib/catalog";
import CollectionPage from "@/components/CollectionPage";

export const metadata = {
  title: "Kadın Parfümleri | Blue Parfümeri",
  description:
    "Blue Parfümeri kadın parfümleri: kadınlara yönelik ve unisex şişeler; her biri bilinen bir kokunun yorumu.",
};

const KadinParfum = async () => {
  const products = (await getActiveProducts()).filter(forWomen);

  return (
    <CollectionPage
      title="Kadın parfümleri"
      intro="Kadınlara yönelik ve unisex şişeler. Her biri bilinen bir kokunun Blue Parfümeri yorumu; notalarına bakıp seç."
      products={products}
    />
  );
};

export default KadinParfum;
