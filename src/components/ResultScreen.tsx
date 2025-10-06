import { RecommendationResult } from "../types/survey";
import { useExchangeRate } from "../hooks/useExchangeRate";

interface ResultScreenProps {
  result: RecommendationResult;
  onReset: () => void;
}

const getNoteEmoji = (note: string): string => {
  const noteMap: Record<string, string> = {
    // Çiçeksi notalar
    gül: "🌹",
    rose: "🌹",
    yasemin: "🌸",
    jasmine: "🌸",
    lavanta: "💜",
    lavender: "💜",
    iris: "🌺",
    süsen: "🌺",
    menekşe: "🌸",
    violet: "🌸",

    // Meyveli notalar
    portakal: "🍊",
    orange: "🍊",
    bergamot: "🍋",
    limon: "🍋",
    lemon: "🍋",
    greyfurt: "🍊",
    grapefruit: "🍊",
    kiraz: "🍒",
    cherry: "🍒",
    şeftali: "🍑",
    peach: "🍑",

    // Odunsu notalar
    sedir: "🌲",
    cedar: "🌲",
    sandal: "🪵",
    sandalwood: "🪵",
    vetiver: "🌿",
    paçuli: "🍂",
    patchouli: "🍂",
    ud: "🪵",
    oud: "🪵",

    // Tatlı notalar
    vanilya: "🍦",
    vanilla: "🍦",
    amber: "🟡",
    misk: "🤍",
    musk: "🤍",
    tonka: "🍯",
    benjamin: "🍯",
    benzoin: "🍯",

    // Baharatlı notalar
    kakule: "🌶️",
    cardamom: "🌶️",
    tarçın: "🌶️",
    cinnamon: "🌶️",
    safran: "🟡",
    saffron: "🟡",
    zencefil: "🌶️",
    ginger: "🌶️",

    // Diğer
    deri: "🟤",
    leather: "🟤",
    tütün: "🍂",
    tobacco: "🍂",
    kahve: "☕",
    coffee: "☕",
  };

  return noteMap[note.toLowerCase()] || "🌿";
};

export default function ResultScreen({ result, onReset }: ResultScreenProps) {
  const { exchangeRate } = useExchangeRate();

  const generateShopierLink = (perfumeName: string): string => {
    const formattedName = perfumeName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    return `https://shopier.com/blueperfumery/${formattedName}`;
  };

  // TL değerini hesapla - originalPrice optional olduğu için fallback
  const calculateTRYPrice = () => {
    if (!exchangeRate) return null;
    const priceToUse = result.perfume.originalPrice || result.perfume.price;
    return (priceToUse * exchangeRate).toLocaleString("tr-TR", {
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 sm:p-8">
            <div className="text-center space-y-3">
              <div className="text-white">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                  {result.perfume.name}
                </h3>
                <p className="text-blue-100 text-sm sm:text-base">
                  {result.perfume.brand}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-white bg-opacity-20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm text-white font-medium">
                  %{Math.round(result.matchScore)} Uyumluluk
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                📖 Parfüm Hakkında
              </h4>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {result.perfume.description}
              </p>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                🎯 Neden Size Uygun?
              </h4>
              <ul className="space-y-2">
                {result.matchReasons.slice(0, 3).map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm sm:text-base"
                  >
                    <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-gray-600">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                🌺 Koku Notaları
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.perfume.notes.map((note, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm"
                  >
                    <span>{getNoteEmoji(note)}</span>
                    <span>{note}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                ✨ Özellikler
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.perfume.characteristics.map((char, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Fiyat</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                      ₺{result.perfume.price}
                    </span>
                    {result.perfume.originalPrice &&
                      result.perfume.originalPrice > result.perfume.price && (
                        <span className="text-sm sm:text-base text-gray-400 line-through">
                          ₺{result.perfume.originalPrice}
                        </span>
                      )}
                  </div>
                  {calculateTRYPrice() && (
                    <p className="text-gray-500 text-xs mt-1">
                      (~{calculateTRYPrice()} TL)
                    </p>
                  )}
                </div>
                <a
                  href={
                    result.perfume.shopierLink ||
                    generateShopierLink(result.perfume.name)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-center text-sm sm:text-base"
                >
                  Satın Al
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onReset}
                className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
              >
                Yeni Test Yap
              </button>
              <a
                href={`/parfum/${result.perfume.id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-300 text-center text-sm sm:text-base"
              >
                Detayları Gör
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
