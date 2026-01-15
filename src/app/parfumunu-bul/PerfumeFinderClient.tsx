"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Sun,
  Moon,
  Leaf,
  Wind,
  Flame,
  Coffee,
  Waves,
  TreePine,
  ArrowRight,
  RotateCcw,
  Crown,
  Zap,
  Check,
} from "lucide-react";
import type { Product } from "@/lib/api";
import PerfumeCard from "@/components/PerfumeCard";

interface PerfumeFinderClientProps {
  products: Product[];
}

// Sohbet tarzı sorular - samimi ve merak uyandırıcı
const conversationFlow = [
  {
    id: "intro",
    miraMessage:
      "Merhaba! Ben Mira 💫\n\nSana özel parfüm önerisi yapmak istiyorum.",
    question: null,
    options: null,
    field: null,
  },
  {
    id: "gender",
    miraMessage: "Öncelikle...",
    question: "Kime parfüm arıyorsun?",
    options: [
      {
        value: "female",
        label: "Kadın 💄",
        icon: <Leaf className="w-4 h-4" />,
      },
      { value: "male", label: "Erkek 🧔", icon: <Wind className="w-4 h-4" /> },
    ],
    field: "gender",
  },
  {
    id: "energy",
    miraMessage: (prev: Record<string, string>) => {
      const r: Record<string, string> = {
        female: "Mükemmel! 💎 Kadın parfümleri ve unisex seçeneklere bakalım.",
        male: "Harika! ✨ Erkek parfümleri ve unisex seçeneklere bakalım.",
      };
      return r[prev.gender] || "Güzel!";
    },
    question: "Sabahları nasıl hissedersin?",
    options: [
      {
        value: "energetic",
        label: "Enerjik",
        icon: <Zap className="w-4 h-4" />,
      },
      { value: "calm", label: "Sakin", icon: <Waves className="w-4 h-4" /> },
      {
        value: "mysterious",
        label: "Düşünceli",
        icon: <Moon className="w-4 h-4" />,
      },
      {
        value: "passionate",
        label: "Tutkulu",
        icon: <Flame className="w-4 h-4" />,
      },
    ],
    field: "personality",
  },
  {
    id: "memory",
    miraMessage: (prev: Record<string, string>) => {
      const r: Record<string, string> = {
        energetic: "Taze notalar sana çok yakışır! 💫",
        calm: "Yumuşak kokular tam senlik ☁️",
        mysterious: "Derin notalar harika olur 🌙",
        passionate: "Güçlü parfümler önerebilirim 🔥",
      };
      return r[prev.personality] || "Çok güzel!";
    },
    question: "Hangi koku daha çok seni mutlu eder?",
    options: [
      { value: "seaside", label: "Deniz", icon: <Waves className="w-4 h-4" /> },
      {
        value: "forest",
        label: "Orman",
        icon: <TreePine className="w-4 h-4" />,
      },
      {
        value: "warmth",
        label: "Sıcaklık",
        icon: <Heart className="w-4 h-4" />,
      },
      { value: "coffee", label: "Kahve", icon: <Coffee className="w-4 h-4" /> },
    ],
    field: "scentMemory",
  },
  {
    id: "season",
    miraMessage: (prev: Record<string, string>) => {
      const r: Record<string, string> = {
        seaside: "Marine notalar 🌊",
        forest: "Odunsu notalar 🌲",
        warmth: "Yumuşak notalar 💕",
        coffee: "Baharatlı notalar ☕",
      };
      return r[prev.scentMemory] || "Güzel!";
    },
    question: "Favori mevsimin?",
    options: [
      {
        value: "spring",
        label: "İlkbahar",
        icon: <Leaf className="w-4 h-4" />,
      },
      { value: "summer", label: "Yaz", icon: <Sun className="w-4 h-4" /> },
      {
        value: "autumn",
        label: "Sonbahar",
        icon: <Wind className="w-4 h-4" />,
      },
      { value: "winter", label: "Kış", icon: <Moon className="w-4 h-4" /> },
    ],
    field: "season",
  },
  {
    id: "impression",
    miraMessage: (prev: Record<string, string>) => {
      const r: Record<string, string> = {
        spring: "Çiçeksi notalar 🌸",
        summer: "Ferah kokular ☀️",
        autumn: "Sıcak tonlar 🍂",
        winter: "Derin kokular ❄️",
      };
      return r[prev.season] || "Güzel!";
    },
    question: "Nasıl hatırlanmak istersin?",
    options: [
      {
        value: "elegance",
        label: "Zarif",
        icon: <Crown className="w-4 h-4" />,
      },
      {
        value: "confidence",
        label: "Çekici",
        icon: <Sparkles className="w-4 h-4" />,
      },
      { value: "warmth", label: "Samimi", icon: <Heart className="w-4 h-4" /> },
      {
        value: "unique",
        label: "Benzersiz",
        icon: <Zap className="w-4 h-4" />,
      },
    ],
    field: "desiredImpression",
  },
];

export default function PerfumeFinderClient({
  products,
}: PerfumeFinderClientProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentConversation = conversationFlow[step];

  // Typing effect simulation - no scroll
  useEffect(() => {
    setIsTyping(true);
    setShowOptions(false);

    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => setShowOptions(true), 200);
    }, 800);

    return () => clearTimeout(typingTimer);
  }, [step]);

  const getMiraMessage = () => {
    const message = currentConversation.miraMessage;
    if (typeof message === "function") {
      return message(answers);
    }
    return message;
  };

  const handleOptionSelect = async (value: string) => {
    if (!currentConversation.field) return;

    const newAnswers = { ...answers, [currentConversation.field]: value };
    setAnswers(newAnswers);
    setShowOptions(false);

    if (step === conversationFlow.length - 1) {
      await calculateResults(newAnswers);
    } else {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleStart = () => {
    setStep(1);
  };

  const calculateResults = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);

    try {
      // Profil bilgilerini Türkçe'ye çevir
      const genderText = finalAnswers.gender === "female" ? "kadın" : "erkek";
      const personalityMap: Record<string, string> = {
        energetic: "enerjik",
        calm: "sakin",
        mysterious: "gizemli",
        passionate: "tutkulu",
      };
      const scentMap: Record<string, string> = {
        seaside: "deniz kokuları",
        forest: "orman kokuları",
        warmth: "sıcak kokular",
        coffee: "kahve notaları",
      };
      const seasonMap: Record<string, string> = {
        spring: "ilkbahar",
        summer: "yaz",
        autumn: "sonbahar",
        winter: "kış",
      };
      const impressionMap: Record<string, string> = {
        elegance: "zarif",
        confidence: "çekici",
        warmth: "samimi",
        unique: "benzersiz",
      };

      const personalityText =
        personalityMap[finalAnswers.personality] || finalAnswers.personality;
      const scentText =
        scentMap[finalAnswers.scentMemory] || finalAnswers.scentMemory;
      const seasonText = seasonMap[finalAnswers.season] || finalAnswers.season;
      const impressionText =
        impressionMap[finalAnswers.desiredImpression] ||
        finalAnswers.desiredImpression;

      // Statik, güzel bir mesaj oluştur - API çağrısı yapmadan
      const analysisMessages = [
        `${
          personalityText.charAt(0).toUpperCase() + personalityText.slice(1)
        } ruhun ve ${scentText} sevgin, sana çok yakışacak ${genderText} parfümleri buldum! ${
          seasonText.charAt(0).toUpperCase() + seasonText.slice(1)
        } için ${impressionText} bir iz bırakmak isteyenler için özel seçimlerim. 💫`,
        `Senin ${personalityText} enerjin ve ${scentText} tutkun için mükemmel ${genderText} parfümleri buldum! Bu kokular ${impressionText} bir hava yaratacak. ✨`,
        `${
          scentText.charAt(0).toUpperCase() + scentText.slice(1)
        } seven, ${personalityText} ruhlu biri için harika ${genderText} parfümleri var! Her biri ${impressionText} bir iz bırakmak için tasarlandı. 🌟`,
      ];

      const randomMessage =
        analysisMessages[Math.floor(Math.random() * analysisMessages.length)];
      setAiAnalysis(randomMessage);

      const filteredProducts = filterProducts(products, finalAnswers);
      setRecommendations(filteredProducts.slice(0, 3));
    } catch (error) {
      console.error("Analysis error:", error);
      setAiAnalysis("Sana özel önerilerim hazır! 💫");
      const filteredProducts = filterProducts(products, finalAnswers);
      setRecommendations(filteredProducts.slice(0, 3));
    } finally {
      setIsLoading(false);
      setShowResults(true);
    }
  };

  const filterProducts = (
    products: Product[],
    answers: Record<string, string>
  ): Product[] => {
    let filtered = [...products];

    if (answers.gender !== "unisex") {
      filtered = filtered.filter(
        (p) => p.gender === answers.gender || p.gender === "unisex"
      );
    }

    const characteristicMap: Record<string, string[]> = {
      energetic: ["taze", "fresh", "citrus", "ferah"],
      calm: ["yumuşak", "soft", "powder", "misk"],
      mysterious: ["oryantal", "oriental", "oud", "derin"],
      passionate: ["baharatlı", "spicy", "yoğun", "güçlü"],
      seaside: ["marine", "deniz", "aquatic", "taze"],
      forest: ["odunsu", "woody", "yeşil", "doğal"],
      warmth: ["vanilya", "amber", "sıcak", "yumuşak"],
      coffee: ["baharatlı", "kahve", "tatlı", "yoğun"],
      spring: ["çiçeksi", "floral", "taze", "yeşil"],
      summer: ["fresh", "citrus", "marine", "ferah"],
      autumn: ["odunsu", "baharatlı", "amber", "sıcak"],
      winter: ["oryantal", "derin", "yoğun", "oud"],
    };

    const scoredProducts = filtered.map((product) => {
      let score = 0;
      const chars = product.characteristics?.join(" ").toLowerCase() || "";
      const notes = JSON.stringify(product.notes || {}).toLowerCase();
      const combined = chars + " " + notes;

      Object.entries(answers).forEach(([, value]) => {
        const keywords = characteristicMap[value] || [];
        keywords.forEach((keyword) => {
          if (combined.includes(keyword.toLowerCase())) {
            score += 10;
          }
        });
      });

      return { product, score };
    });

    scoredProducts.sort((a, b) => b.score - a.score);
    return scoredProducts.map((sp) => sp.product);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setRecommendations([]);
    setAiAnalysis("");
    setShowResults(false);
    setIsLoading(false);
  };

  // Results Screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-navy pt-20 sm:pt-24 pb-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-3 py-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm">Mira&apos;nın Önerileri</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-white">
              Senin İçin Seçtiklerim ✨
            </h1>
          </div>

          {/* AI Analysis */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-amber-600/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="text-gold text-sm font-medium block mb-1">
                  Mira
                </span>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  {aiAnalysis}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {recommendations.map((product, index) => (
                <div key={product.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 bg-gold text-navy px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3" /> En Uygun
                    </div>
                  )}
                  <PerfumeCard
                    perfume={product}
                    isPreferred={index === 0}
                    variant={
                      product.gender === "female"
                        ? "female"
                        : product.gender === "male"
                        ? "male"
                        : "niche"
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Henüz uygun parfüm bulunamadı.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-full hover:bg-white/5 transition-all text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Tekrar Dene
            </button>
            <Link
              href="/satin-al"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all text-sm"
            >
              Tüm Koleksiyon
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-amber-600/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-7 h-7 text-gold animate-spin" />
          </div>
          <h2 className="font-heading text-xl text-white mb-2">
            Mira düşünüyor...
          </h2>
          <p className="text-gray-400 text-sm">
            Senin için en uygun parfümleri seçiyorum ✨
          </p>
        </div>
      </div>
    );
  }

  // Chat Interface - Mobile Optimized, Fixed Layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-navy flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 pt-16 sm:pt-20 pb-4 px-4">
        <div className="text-center">
          <h1 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-2">
            Parfümünü Bul
          </h1>

          {/* Progress Bar */}
          {step > 0 && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {conversationFlow.slice(1).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i + 1 === step
                      ? "w-6 bg-gold"
                      : i + 1 < step
                      ? "w-3 bg-gold/50"
                      : "w-3 bg-white/20"
                  }`}
                />
              ))}
              <span className="text-white/40 text-xs ml-2">
                {step}/{conversationFlow.length - 1}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4">
        <div className="w-full max-w-md">
          {/* Message Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Mira's Message */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-amber-600/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-gold text-xs font-medium block mb-1">
                    Mira
                  </span>
                  {isTyping ? (
                    <div className="bg-white/10 rounded-xl rounded-tl-sm px-3 py-2 inline-block">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-gold/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-gold/60 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-gold/60 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/10 rounded-xl rounded-tl-sm px-3 py-2.5">
                      <p className="text-white/90 text-sm whitespace-pre-line">
                        {getMiraMessage()}
                      </p>
                      {currentConversation.question && (
                        <p className="text-white font-medium mt-2 text-sm">
                          {currentConversation.question}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Options */}
            {showOptions && (
              <div className="px-4 pb-4">
                {step === 0 ? (
                  <button
                    onClick={handleStart}
                    className="w-full bg-gold text-navy font-semibold py-3 rounded-xl hover:bg-gold-light transition-all flex items-center justify-center gap-2"
                  >
                    Başlayalım
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : currentConversation.options ? (
                  <div className="grid grid-cols-2 gap-2">
                    {currentConversation.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(option.value)}
                        className="group bg-transparent border-2 border-white/20 rounded-xl p-3 text-center hover:border-gold hover:bg-gold/10 transition-all active:scale-95"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-gold/20 flex items-center justify-center text-white/70 group-hover:text-gold mx-auto mb-1.5 transition-colors">
                          {option.icon}
                        </div>
                        <span className="text-white text-sm font-medium">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Selected Answers - Compact Pills */}
          {Object.keys(answers).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
              {Object.entries(answers).map(([field, value]) => {
                const question = conversationFlow.find(
                  (q) => q.field === field
                );
                const option = question?.options?.find(
                  (o) => o.value === value
                );
                if (!option) return null;

                return (
                  <span
                    key={field}
                    className="inline-flex items-center gap-1 bg-gold/20 text-gold px-2 py-1 rounded-full text-xs"
                  >
                    <Check className="w-3 h-3" />
                    {option.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
