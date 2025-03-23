import { RecommendationResult } from "../types/survey";

interface ResultScreenProps {
  result: RecommendationResult;
  onReset: () => void;
}

const getEmoji = (perfume: string): string => {
  // Map perfumes to emojis based on their characteristics
  if (
    perfume.toLowerCase().includes("fresh") ||
    perfume.toLowerCase().includes("citrus")
  ) {
    return "🍊";
  } else if (
    perfume.toLowerCase().includes("floral") ||
    perfume.toLowerCase().includes("flower")
  ) {
    return "🌸";
  } else if (
    perfume.toLowerCase().includes("woody") ||
    perfume.toLowerCase().includes("wood")
  ) {
    return "🌳";
  } else if (
    perfume.toLowerCase().includes("spicy") ||
    perfume.toLowerCase().includes("oriental")
  ) {
    return "✨";
  } else if (
    perfume.toLowerCase().includes("sweet") ||
    perfume.toLowerCase().includes("vanilla")
  ) {
    return "🍯";
  } else if (
    perfume.toLowerCase().includes("aqua") ||
    perfume.toLowerCase().includes("marine")
  ) {
    return "🌊";
  } else {
    return "🌟";
  }
};

const getNoteEmoji = (note: string): string => {
  const noteMap: Record<string, string> = {
    // Çiçeksi notalar
    gül: "🌹",
    rose: "🌹",
    jasmine: "🌸",
    yasemin: "🌸",
    lavender: "💜",
    lavanta: "💜",
    lily: "🌺",
    zambak: "🌺",
    floral: "🌸",
    çiçek: "🌸",

    // Meyveli notalar
    citrus: "🍊",
    narenciye: "🍊",
    orange: "🍊",
    portakal: "🍊",
    apple: "🍎",
    elma: "🍎",
    berry: "🫐",
    üzüm: "🍇",
    grape: "🍇",

    // Tatlı notalar
    vanilla: "🍯",
    vanilya: "🍯",
    honey: "🍯",
    bal: "🍯",
    caramel: "🍪",
    karamel: "🍪",
    chocolate: "🍫",
    çikolata: "🍫",

    // Baharatlı notalar
    spicy: "🌶️",
    baharat: "🌶️",
    cinnamon: "🧂",
    tarçın: "🧂",
    pepper: "🌶️",
    biber: "🌶️",

    // Odunsu notalar
    woody: "🌳",
    odunsu: "🌳",
    cedar: "🌲",
    sedir: "🌲",
    sandalwood: "🪵",
    sandal: "🪵",

    // Taze notalar
    fresh: "🌿",
    ferah: "🌿",
    green: "🌱",
    yeşil: "🌱",
    mint: "🌿",
    nane: "🌿",

    // Deniz notaları
    marine: "🌊",
    deniz: "🌊",
    aqua: "💧",
    su: "💧",
    ocean: "🌊",
    okyanus: "🌊",

    // Amber ve misk
    amber: "✨",
    musk: "🌙",
    müsk: "🌙",

    // Diğer
    leather: "🧥",
    deri: "🧥",
    tobacco: "🍂",
    tütün: "🍂",
    coffee: "☕",
    kahve: "☕",
    powder: "🌸",
    pudra: "🌸",
  };

  // Nota ismini küçük harfe çevir
  const lowerNote = note.toLowerCase();

  // Eşleşen emoji varsa döndür, yoksa varsayılan emoji
  for (const [key, emoji] of Object.entries(noteMap)) {
    if (lowerNote.includes(key)) {
      return emoji;
    }
  }

  return "✨"; // Varsayılan emoji
};

export default function ResultScreen({ result, onReset }: ResultScreenProps) {
  const emoji = getEmoji(result.perfume.name);

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 sm:p-8 text-center">
            <div
              className="text-5xl sm:text-6xl mb-3 sm:mb-4"
              role="img"
              aria-hidden="true"
            >
              {emoji}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              İşte Senin İçin Seçtiğimiz Parfüm!
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base">
              Kişiliğine ve tercihlerine göre özel olarak seçildi
            </p>
          </div>

          <div className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {result.perfume.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  {result.perfume.brand}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
                <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                  Neden Bu Parfüm?
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {result.matchReasons.map((reason, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                  Notalar
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {result.perfume.notes.map((note, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm flex items-center gap-1.5"
                    >
                      <span role="img" aria-hidden="true">
                        {getNoteEmoji(note)}
                      </span>
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onReset}
              className="w-full py-2.5 sm:py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl transition-colors duration-200 font-medium text-sm sm:text-base"
              type="button"
            >
              Yeni Test Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
