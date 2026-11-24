import { Suspense } from "react";
import { getProducts, type Product } from "@/lib/api";
import { featuredFirst } from "@/lib/catalog";
import ProductTile from "@/components/ProductTile";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Koleksiyon | Blue Parfümeri",
  description:
    "Blue Parfümeri koleksiyonunun tamamı. Kokuya, karaktere ve notalara göre filtrele, sana uyan şişeyi seç.",
};

const getActiveProducts = async (): Promise<Product[]> => {
  try {
    const response = await getProducts({ status: "active", limit: 100 });
    return response.data;
  } catch {
    return [];
  }
};

const ShopPage = async () => {
  const products = await getActiveProducts();

  return (
    <>
      <header className="bg-sand px-5 pb-12 pt-28 sm:px-10 lg:px-16 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-[90rem]">
          <h1 className="text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            Koleksiyon
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg text-ink-soft">
            Bütün şişeler burada. Kokuya göre daralt, notalarına bak, sana
            yakışanı seç.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-[90rem] px-5 pb-24 sm:px-10 lg:px-16">
        <Suspense
          fallback={
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
              {featuredFirst(products).map((product, index) => (
                <ProductTile
                  key={product.id}
                  product={product}
                  priority={index < 4}
                />
              ))}
            </div>
          }
        >
          <ShopClient products={products} />
        </Suspense>
      </div>
    </>
  );
};

export default ShopPage;
