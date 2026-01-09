import { getProducts, type Product } from "@/lib/api";
import HomeClient from "./HomeClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch products from API (Server Component - SEO friendly)
  let allProducts: Product[] = [];

  try {
    const response = await getProducts({
      status: "active",
      limit: 50, // En çok tercih edilenler için yeterli ürün çek
    });
    allProducts = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <HomeClient allProducts={allProducts} />;
}
