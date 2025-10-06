import { getProductsByGender } from "@/lib/api";
import { PREFERRED_PERFUMES } from "@/types/survey";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Kadın Parfümleri | Blue Perfumery",
  description:
    "Blue Perfumery'nin zarif kadın parfüm koleksiyonu. Feminen ve etkileyici kokularla tarzınızı tamamlayın.",
};

export default async function KadinParfum() {
  // Fetch female products from API (Server Component - SEO friendly)
  const kadinParfumleri = await getProductsByGender("female");

  // Preferred parfümleri öne çıkar
  const sortedParfumleri = [...kadinParfumleri].sort((a, b) => {
    const aIsPreferred = PREFERRED_PERFUMES.includes(
      a.id as (typeof PREFERRED_PERFUMES)[number]
    );
    const bIsPreferred = PREFERRED_PERFUMES.includes(
      b.id as (typeof PREFERRED_PERFUMES)[number]
    );
    if (aIsPreferred && !bIsPreferred) return -1;
    if (!aIsPreferred && bIsPreferred) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kadın Parfümleri
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Blue Perfumery&apos;nin zarif kadın parfüm koleksiyonu. Feminen ve
            etkileyici kokularla tarzınızı tamamlayın.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {kadinParfumleri.length} ürün bulundu
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedParfumleri.map((perfume) => {
            const isPreferred = PREFERRED_PERFUMES.includes(
              perfume.id as (typeof PREFERRED_PERFUMES)[number]
            );
            return (
              <div
                key={perfume.id}
                className={`group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] ${
                  isPreferred ? "border-4 border-purple-500" : ""
                }`}
              >
                <div className="relative h-64 bg-white">
                  <Image
                    src={perfume.image || "/card-photos/1.png"}
                    alt={perfume.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:brightness-110"
                  />
                  {isPreferred && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Öne Çıkan
                    </div>
                  )}
                  {perfume.stock <= 5 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Son {perfume.stock} Adet
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {perfume.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{perfume.brand}</p>
                  <p className="text-sm text-gray-500 mb-3">{perfume.ml}ml</p>
                  <div className="mt-3 flex flex-wrap gap-2 mb-4">
                    {perfume.characteristics.slice(0, 3).map((char, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-purple-600">
                        ₺{perfume.price}
                      </span>
                      {perfume.originalPrice &&
                        perfume.originalPrice > perfume.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ₺{perfume.originalPrice}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/parfum/${perfume.id}`}
                      className="flex-1 border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-purple-50 transition-colors duration-300"
                    >
                      Keşfet
                    </Link>
                    <Link
                      href={"/satin-al"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Satın Al
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {kadinParfumleri.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Şu anda kadın parfümü bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
