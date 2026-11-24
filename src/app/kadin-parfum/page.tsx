import { getActiveProducts } from "@/lib/api";
import { forWomen } from "@/lib/catalog";
import CollectionPage from "@/components/CollectionPage";

export const metadata = {
  title: "Kadın Parfümleri | Blue Parfüm",
  description:
    "Blue Parfüm'ün kadın parfüm koleksiyonu. Feminen ve etkileyici kokularla tarzını tamamla.",
};

const KadinParfum = async () => {
  const products = (await getActiveProducts()).filter(forWomen);

  return (
    <CollectionPage
      title="Kadın parfümleri"
      intro="Feminen ve etkileyici kokularla tarzını tamamla."
      products={products}
    />
  );
};

export default KadinParfum;
