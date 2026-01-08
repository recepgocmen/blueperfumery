import { getProductsByCategory } from "@/lib/api";
import { PREFERRED_PERFUMES } from "@/types/survey";
import PerfumeCard from "@/components/PerfumeCard";

export const metadata = {
  title: "Niş Parfümler | Blue Perfumery",
  description:
    "Blue Perfumery'nin özel niş parfüm koleksiyonu. Benzersiz ve ayırt edici kokularla fark yaratın.",
};

export default async function NisParfum() {
  // Fetch niche products (artisanal + exclusive + niches categories)
  const artisanalProducts = await getProductsByCategory("artisanal");
  const exclusiveProducts = await getProductsByCategory("exclusive");
  const nichesProducts = await getProductsByCategory("niches");

  // Combine and deduplicate
  const allProducts = [...artisanalProducts, ...exclusiveProducts, ...nichesProducts];
  const nisParfumleri = allProducts.filter(
    (product, index, self) => index === self.findIndex((p) => p.id === product.id)
  );

  // Preferred parfümleri öne çıkar
  const sortedParfumleri = [...nisParfumleri].sort((a, b) => {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-900/80 via-slate-900 to-navy pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
              Özel Koleksiyon
            </span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white mb-4">
            Niş Parfümler
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto pb-6">
            Blue Perfumery&apos;nin özel niş parfüm koleksiyonu. Benzersiz ve
            ayırt edici kokularla fark yaratın.
          </p>
          <p className="text-sm text-gray-400">
            {nisParfumleri.length} ürün bulundu
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedParfumleri.map((perfume) => {
            const isPreferred = PREFERRED_PERFUMES.includes(
              perfume.id as (typeof PREFERRED_PERFUMES)[number]
            );
            return (
              <PerfumeCard 
                key={perfume.id}
                perfume={perfume}
                isPreferred={isPreferred}
                variant="niche"
              />
            );
          })}
        </div>

        {nisParfumleri.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Şu anda niş parfüm bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
