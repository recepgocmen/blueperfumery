import { getProducts, type Product } from "@/lib/api";
import HomeClient from "./HomeClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch featured products from API (Server Component - SEO friendly)
  let featuredProducts: Product[] = [];
  
  try {
    const response = await getProducts({
      status: "active",
      limit: 6,
    });
    featuredProducts = response.data.slice(0, 3);
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }

  return <HomeClient featuredProducts={featuredProducts} />;
}
