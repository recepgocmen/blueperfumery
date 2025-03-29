import { perfumes } from "@/data/perfumes";
import { PREFERRED_PERFUMES } from "@/types/survey";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ParfumDetay({ params }: any) {
  const perfume = perfumes.find((p) => p.id === params.id);
  const isPreferred = PREFERRED_PERFUMES.includes(
    params.id as (typeof PREFERRED_PERFUMES)[number]
  );

  if (!perfume) {
    notFound();
  }

  // Parfüm kategorisine göre renk teması belirle
  const getColorTheme = () => {
    if (
      perfume.brand.includes("Artisanal") ||
      perfume.brand.includes("Exclusive")
    ) {
      return {
        gradient: "from-amber-50 to-orange-100",
        border: "border-amber-500",
        badge: "bg-amber-600",
        tag: "bg-amber-50 text-amber-700",
        button: {
          outline: "border-amber-600 text-amber-600 hover:bg-amber-50",
          primary:
            "from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700",
        },
      };
    } else if (perfume.gender === "female") {
      return {
        gradient: "from-pink-50 to-purple-100",
        border: "border-purple-500",
        badge: "bg-purple-600",
        tag: "bg-purple-50 text-purple-700",
        button: {
          outline: "border-purple-600 text-purple-600 hover:bg-purple-50",
          primary:
            "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
        },
      };
    } else {
      return {
        gradient: "from-blue-50 to-indigo-100",
        border: "border-indigo-500",
        badge: "bg-indigo-600",
        tag: "bg-indigo-50 text-indigo-700",
        button: {
          outline: "border-indigo-600 text-indigo-600 hover:bg-indigo-50",
          primary:
            "from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700",
        },
      };
    }
  };

  const theme = getColorTheme();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.gradient} pt-24 pb-12`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Sol taraf - Görsel */}
            <div className="relative h-[500px] md:h-full">
              <Image
                src="/card-photos/1.png"
                alt={perfume.name}
                fill
                className="object-cover"
              />
              {isPreferred && (
                <div
                  className={`absolute top-4 right-4 ${theme.badge} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  Öne Çıkan
                </div>
              )}
            </div>

            {/* Sağ taraf - Detaylar */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {perfume.name}
                </h1>
                <p className="text-lg text-gray-600">{perfume.brand}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Parfüm Hakkında
                </h2>
                <p className="text-gray-600">{perfume.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Özellikler
                </h2>
                <div className="flex flex-wrap gap-2">
                  {perfume.characteristics.map((char, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 ${theme.tag} text-sm rounded-full`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Notalar
                </h2>
                <div className="flex flex-wrap gap-2">
                  {perfume.notes.map((note, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Detaylar
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Cinsiyet</p>
                    <p className="font-medium text-gray-900">
                      {perfume.gender === "male"
                        ? "Erkek"
                        : perfume.gender === "female"
                        ? "Kadın"
                        : "Unisex"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Yaş Aralığı</p>
                    <p className="font-medium text-gray-900">
                      {perfume.ageRange.min} - {perfume.ageRange.max}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hacim</p>
                    <p className="font-medium text-gray-900">50 ml</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fiyat</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">599₺</p>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Açılışa Özel
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="https://www.shopier.com/blueperfumery"
                  className={`flex-1 bg-gradient-to-r ${theme.button.primary} text-white px-6 py-3 rounded-lg text-lg font-medium text-center transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  Satın Al
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
