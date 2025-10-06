import { getProducts, type Product } from "@/lib/api";
import ShopPageClient from "./ShopPageClient";

export const metadata = {
  title: "Satın Al | Blue Perfumery",
  description:
    "Blue Perfumery koleksiyonu. En özel anlarda size eşlik edecek seçkin parfümlerimizi keşfedin.",
};

export default async function ShopPage() {
  // Fetch all active products from API (Server Component)
  let products: Product[] = [];

  try {
    const response = await getProducts({
      status: "active",
      limit: 100,
    });
    products = response.data;
  } catch (error) {
    console.error("Error fetching products for shop:", error);
    products = [];
  }

  return <ShopPageClient products={products} />;
}
