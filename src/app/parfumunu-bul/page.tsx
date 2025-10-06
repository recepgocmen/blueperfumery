import { getProducts, type Product } from "@/lib/api";
import PerfumeFinderClient from "./PerfumeFinderClient";

export const metadata = {
  title: "Parfümünü Bul | Blue Perfumery",
  description:
    "Kişiliğine ve yaşam tarzına uygun en iyi parfümü bulmak için birkaç basit soruyu yanıtla.",
};

export default async function PerfumeFinder() {
  // Fetch all active products from API (Server Component)
  let products: Product[] = [];

  try {
    const response = await getProducts({
      status: "active",
      limit: 100,
    });
    products = response.data;
  } catch (error) {
    console.error("Error fetching products for survey:", error);
    products = []; // Fallback to empty array
  }

  // Pass products to Client Component
  return <PerfumeFinderClient products={products} />;
}
