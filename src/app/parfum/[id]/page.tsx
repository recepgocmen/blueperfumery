import { getProductById } from "@/lib/api";
import { PREFERRED_PERFUMES } from "@/types/survey";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const perfume = await getProductById(id);
    return {
      title: `${perfume.name} | Blue Perfumery`,
      description: perfume.description,
    };
  } catch {
    return {
      title: "Ürün Bulunamadı | Blue Perfumery",
    };
  }
}

export default async function ParfumDetay({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let perfume;
  try {
    perfume = await getProductById(id);
  } catch {
    notFound();
  }

  const isPreferred = PREFERRED_PERFUMES.includes(
    id as (typeof PREFERRED_PERFUMES)[number]
  );

  // Parfüm kategorisine göre renk teması belirle
  const getColorTheme = () => {
    if (
      perfume.brand.includes("Artisanal") ||
      perfume.brand.includes("Exclusive")
    ) {
      return {
        gradient: "from-amber-900/80 via-slate-900 to-navy",
        border: "border-gold",
        badge: "bg-gold text-navy",
        tag: "bg-gold/10 text-gold",
        button: {
          outline: "border-gold text-gold hover:bg-gold/10",
          primary:
            "from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy",
        },
      };
    } else if (perfume.gender === "female") {
      return {
        gradient: "from-purple-900 via-slate-900 to-navy",
        border: "border-gold",
        badge: "bg-gold text-navy",
        tag: "bg-purple-500/20 text-purple-300",
        button: {
          outline: "border-gold text-gold hover:bg-gold/10",
          primary:
            "from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy",
        },
      };
    } else {
      return {
        gradient: "from-slate-800 via-slate-900 to-navy",
        border: "border-gold",
        badge: "bg-gold text-navy",
        tag: "bg-blue-500/20 text-blue-300",
        button: {
          outline: "border-gold text-gold hover:bg-gold/10",
          primary:
            "from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy",
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
                src={perfume.image || "/card-photos/1.png"}
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
              {perfume.stock <= 5 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Son {perfume.stock} Adet!
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
                    <p className="font-medium text-gray-900">{perfume.ml} ml</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stok</p>
                    <p className="font-medium text-gray-900">
                      {perfume.stock > 10
                        ? "Stokta"
                        : `Son ${perfume.stock} adet`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ₺{perfume.price}
                  </span>
                  {perfume.originalPrice &&
                    perfume.originalPrice > perfume.price && (
                      <>
                        <span className="text-xl text-gray-400 line-through">
                          ₺{perfume.originalPrice}
                        </span>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          %
                          {Math.round(
                            (1 - perfume.price / perfume.originalPrice) * 100
                          )}{" "}
                          İndirim
                        </span>
                      </>
                    )}
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={"/satin-al"}
                  target="_blank"
                  rel="noopener noreferrer"
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
