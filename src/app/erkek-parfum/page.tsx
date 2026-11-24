import { getActiveProducts } from "@/lib/api";
import { forMen } from "@/lib/catalog";
import CollectionPage from "@/components/CollectionPage";

export const metadata = {
  title: "Erkek Parfümleri | Blue Parfüm",
  description:
    "Blue Parfüm'ün erkek parfüm koleksiyonu. Maskülen ve sofistike kokularla karakterini tamamla.",
};

const ErkekParfum = async () => {
  const products = (await getActiveProducts()).filter(forMen);

  return (
    <CollectionPage
      title="Erkek parfümleri"
      intro="Maskülen ve sofistike kokularla karakterini tamamla."
      products={products}
    />
  );
};

export default ErkekParfum;
