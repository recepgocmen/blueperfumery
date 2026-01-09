import { getProductsByGender } from "@/lib/api";
import { PREFERRED_PERFUMES } from "@/types/survey";
import PerfumeCard from "@/components/PerfumeCard";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-navy pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold text-sm font-medium tracking-[0.15em] uppercase">
              Koleksiyon
            </span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white mb-4">
            Kadın Parfümleri
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Blue Perfumery&apos;nin zarif kadın parfüm koleksiyonu. Feminen ve
            etkileyici kokularla tarzınızı tamamlayın
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {kadinParfumleri.length} ürün bulundu
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
                variant="female"
              />
            );
          })}
        </div>

        {kadinParfumleri.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Şu anda kadın parfümü bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
