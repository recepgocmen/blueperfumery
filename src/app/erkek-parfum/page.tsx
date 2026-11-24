import { getActiveProducts } from "@/lib/api";
import { forMen } from "@/lib/catalog";
import CollectionPage from "@/components/CollectionPage";

export const metadata = {
  title: "Erkek Parfümleri | Blue Parfüm",
  description:
    "Blue Parfüm erkek parfümleri: erkeklere yönelik ve unisex şişeler; her biri bilinen bir kokunun yorumu.",
};

const ErkekParfum = async () => {
  const products = (await getActiveProducts()).filter(forMen);

  return (
    <CollectionPage
      title="Erkek parfümleri"
      intro="Erkeklere yönelik ve unisex şişeler. Her biri bilinen bir kokunun Blue Parfüm yorumu; notalarına bakıp seç."
      products={products}
    />
  );
};

export default ErkekParfum;
