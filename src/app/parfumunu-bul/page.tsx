import type { Metadata } from "next";
import { getProducts, type Product } from "@/lib/api";
import QuizClient from "./QuizClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Parfümünü Bul | Blue Parfüm",
  description:
    "Beş kısa soruyu cevapla, koku ailesine, anına ve sevdiğin notalara göre sana en yakın Blue Parfüm şişesini gör.",
};

const ParfumunuBulPage = async () => {
  let products: Product[] = [];
  try {
    const response = await getProducts({ status: "active", limit: 100 });
    products = response.data;
  } catch (error) {
    console.error("Error fetching products for quiz:", error);
  }

  return <QuizClient products={products} />;
};

export default ParfumunuBulPage;
