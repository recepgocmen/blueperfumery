"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Sparkles, User, Heart, Sun, Moon, Leaf, 
  Wind, Flame, Coffee, Waves, TreePine, 
  ArrowRight, ArrowLeft, RotateCcw, Loader2,
  Send, ChevronRight, Crown, Zap
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
    miraMessage: "Merhaba! Ben Mavi, Blue Perfumery'nin koku danışmanı 💫\n\nSana özel bir parfüm keşfi yapmaya ne dersin? Birkaç kısa sohbetle, karakterine en uygun kokuları bulacağım.",
    question: null,
    options: null,
    field: null,
  },
  {
    id: "gender",
    miraMessage: "Öncelikle biraz tanışalım...",
    question: "Hangi koku dünyasını keşfetmek istersin?",
    options: [
      { value: "male", label: "Erkek parfümleri", icon: <Wind className="w-5 h-5" />, description: "Maskülen, güçlü notalar" },
      { value: "female", label: "Kadın parfümleri", icon: <Leaf className="w-5 h-5" />, description: "Feminen, zarif notalar" },
      { value: "unisex", label: "Her ikisi de olur", icon: <Sparkles className="w-5 h-5" />, description: "Sınırsız keşif" },
    ],
    field: "gender",
  },
  {
    id: "energy",
    miraMessage: (prev: Record<string, string>) => {
      const genderResponse: Record<string, string> = {
        male: "Harika seçim! Erkek parfümlerinde çok etkileyici seçeneklerimiz var ✨",
        female: "Mükemmel! Kadın parfümlerimiz arasında gerçek hazineler var 💎",
        unisex: "Açık fikirli biri! Sınırları aşan kokular seni bekliyor 🌟",
      };
      return genderResponse[prev.gender] || "Güzel bir başlangıç!";
    },
    question: "Şimdi biraz enerjinden bahsedelim. Sabah kalktığında kendini nasıl hissedersin?",
    options: [
      { value: "energetic", label: "Enerjik & Dinamik", icon: <Zap className="w-5 h-5" />, description: "Güne hızlı başlarım" },
      { value: "calm", label: "Sakin & Huzurlu", icon: <Waves className="w-5 h-5" />, description: "Yavaş ve keyifli uyanırım" },
      { value: "mysterious", label: "Düşünceli & Derin", icon: <Moon className="w-5 h-5" />, description: "İçsel bir dünya" },
      { value: "passionate", label: "Tutkulu & Kararlı", icon: <Flame className="w-5 h-5" />, description: "Hedeflerime odaklıyım" },
    ],
    field: "personality",
  },
  {
    id: "memory",
    miraMessage: (prev: Record<string, string>) => {
      const personalityResponse: Record<string, string> = {
        energetic: "Enerjin bulaşıcı! Sana taze ve canlandırıcı notalar çok yakışır 💫",
        calm: "Huzur arayan bir ruh... Yumuşak ve sarmalayan kokular tam senlik ☁️",
        mysterious: "İlginç! Gizemli karakterler için derin ve kompleks notalar harika olur 🌙",
        passionate: "Tutku! Sana güçlü ve iz bırakan parfümler önerebilirim 🔥",
      };
      return personalityResponse[prev.personality] || "Çok güzel!";
    },
    question: "Bir koku anısına dönelim... Aşağıdakilerden hangisi sende en güzel duyguyu uyandırır?",
    options: [
      { value: "seaside", label: "Deniz kenarındaki tuz ve esinti", icon: <Waves className="w-5 h-5" />, description: "Özgürlük hissi" },
      { value: "forest", label: "Yağmur sonrası orman", icon: <TreePine className="w-5 h-5" />, description: "Doğayla bütünlük" },
      { value: "warmth", label: "Sıcak bir kucaklama", icon: <Heart className="w-5 h-5" />, description: "Güven ve sıcaklık" },
      { value: "coffee", label: "Sabah kahvesinin kokusu", icon: <Coffee className="w-5 h-5" />, description: "Keyif ve uyanış" },
    ],
    field: "scentMemory",
  },
  {
    id: "season",
    miraMessage: (prev: Record<string, string>) => {
      const memoryResponse: Record<string, string> = {
        seaside: "Ahh deniz! Marine notalar seni çok mutlu edecek 🌊",
        forest: "Doğa aşığı bir ruh! Odunsu ve yeşil notalar senin için 🌲",
        warmth: "Ne güzel... Sarmalayan, yumuşak notalar arayalım 💕",
        coffee: "Bir kahve tutkunu! Baharatlı ve tatlı notalar dikkatini çekebilir ☕",
      };
      return memoryResponse[prev.scentMemory] || "Güzel bir anı!";
    },
    question: "Kendini hangi mevsimde en iyi hissedersin?",
    options: [
      { value: "spring", label: "İlkbahar", icon: <Leaf className="w-5 h-5" />, description: "Taze başlangıçlar" },
      { value: "summer", label: "Yaz", icon: <Sun className="w-5 h-5" />, description: "Enerji ve canlılık" },
      { value: "autumn", label: "Sonbahar", icon: <Wind className="w-5 h-5" />, description: "Sıcak tonlar" },
      { value: "winter", label: "Kış", icon: <Moon className="w-5 h-5" />, description: "Derinlik ve gizem" },
    ],
    field: "season",
  },
  {
    id: "impression",
    miraMessage: (prev: Record<string, string>) => {
      const seasonResponse: Record<string, string> = {
        spring: "İlkbahar ruhu! Çiçeksi ve taze notalar sana çok yakışır 🌸",
        summer: "Yaz enerjisi! Ferah ve canlı kokular tam senlik ☀️",
        autumn: "Sonbahar... Sıcak, baharatlı notalar harika olur 🍂",
        winter: "Kış büyüsü! Derin ve yoğun kokular seni bekliyor ❄️",
      };
      return seasonResponse[prev.season] || "Güzel bir mevsim!";
    },
    question: "Son olarak... Bir parfüm giydiğinde insanlar seni nasıl hatırlasın?",
    options: [
      { value: "elegance", label: "Zarif & Sofistike", icon: <Crown className="w-5 h-5" />, description: "Kalıcı bir etki" },
      { value: "confidence", label: "Özgüvenli & Çekici", icon: <Sparkles className="w-5 h-5" />, description: "Dikkat çekici" },
      { value: "warmth", label: "Sıcak & Samimi", icon: <Heart className="w-5 h-5" />, description: "Yakınlık hissi" },
      { value: "unique", label: "Farklı & Benzersiz", icon: <Zap className="w-5 h-5" />, description: "Unutulmaz bir iz" },
    ],
    field: "desiredImpression",
  },
];

export default function PerfumeFinderClient({ products }: PerfumeFinderClientProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversationFlow[step];

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, showOptions, isTyping]);

  // Typing effect simulation
  useEffect(() => {
    setIsTyping(true);
    setShowOptions(false);
    
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => setShowOptions(true), 300);
    }, 1200);

    return () => clearTimeout(typingTimer);
  }, [step]);

  const getMaviMessage = () => {
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

    // Son soru ise sonuçları hesapla
    if (step === conversationFlow.length - 1) {
      await calculateResults(newAnswers);
    } else {
      setTimeout(() => setStep(step + 1), 500);
    }
  };

  const handleStart = () => {
    setStep(1);
  };

  const calculateResults = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);
    
    try {
      // AI'dan analiz al
      const analysisPrompt = `Kullanıcı profili:
- Cinsiyet tercihi: ${finalAnswers.gender}
- Kişilik: ${finalAnswers.personality}
- Koku anısı: ${finalAnswers.scentMemory}
- Mevsim: ${finalAnswers.season}
- İstenilen etki: ${finalAnswers.desiredImpression}

Bu profile göre kısa, samimi ve Türkçe bir parfüm karakteri analizi yap (3-4 cümle).`;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://blueperfumery-backend.vercel.app'}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: analysisPrompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiAnalysis(data.data || "Senin için harika parfümler buldum!");
      } else {
        setAiAnalysis("Koku profilini analiz ettim ve sana özel önerilerim hazır! 💫");
      }

      // Ürünleri filtrele
      const filteredProducts = filterProducts(products, finalAnswers);
      setRecommendations(filteredProducts.slice(0, 3));
      
    } catch (error) {
      console.error("AI analysis error:", error);
      setAiAnalysis("Koku profilini analiz ettim ve sana özel önerilerim hazır! 💫");
      const filteredProducts = filterProducts(products, finalAnswers);
      setRecommendations(filteredProducts.slice(0, 3));
    } finally {
      setIsLoading(false);
      setShowResults(true);
    }
  };

  const filterProducts = (products: Product[], answers: Record<string, string>): Product[] => {
    let filtered = [...products];

    // Gender filter
    if (answers.gender !== "unisex") {
      filtered = filtered.filter(p => 
        p.gender === answers.gender || p.gender === "unisex"
      );
    }

    // Karakteristik eşleştirme
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

    // Score products
    const scoredProducts = filtered.map(product => {
      let score = 0;
      const chars = product.characteristics?.join(" ").toLowerCase() || "";
      const notes = JSON.stringify(product.notes || {}).toLowerCase();
      const combined = chars + " " + notes;

      Object.entries(answers).forEach(([key, value]) => {
        const keywords = characteristicMap[value] || [];
        keywords.forEach(keyword => {
          if (combined.includes(keyword.toLowerCase())) {
            score += 10;
          }
        });
      });

      return { product, score };
    });

    // Sort by score
    scoredProducts.sort((a, b) => b.score - a.score);
    
    return scoredProducts.map(sp => sp.product);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-navy pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">Mavi&apos;nın Önerileri</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-4">
              Senin İçin Seçtiklerim ✨
            </h1>
          </div>

          {/* AI Analysis */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-amber-600/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div>
                <span className="text-gold text-sm font-medium block mb-2">Mavi</span>
                <p className="text-white/80 text-lg leading-relaxed">{aiAnalysis}</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {recommendations.map((product, index) => (
                <div key={product.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gold text-navy px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Crown className="w-3 h-3" /> En Uygun
                    </div>
                  )}
                  <PerfumeCard 
                    perfume={product}
                    isPreferred={index === 0}
                    variant={product.gender === "female" ? "female" : product.gender === "male" ? "male" : "niche"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Henüz uygun parfüm bulunamadı. Koleksiyonumuzu keşfetmeye ne dersin?</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              Tekrar Dene
            </button>
            <Link
              href="/satin-al"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold text-navy font-semibold rounded-full hover:bg-gold-light transition-all duration-300"
            >
              Tüm Koleksiyonu Gör
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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-amber-600/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-8 h-8 text-gold animate-spin" />
          </div>
          <h2 className="font-heading text-2xl text-white mb-2">Mavi düşünüyor...</h2>
          <p className="text-gray-400">Senin için en uygun parfümleri seçiyorum ✨</p>
        </div>
      </div>
    );
  }

  // Chat Interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-navy pt-20 pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 pt-4">
          <div className="inline-flex items-center gap-2 bg-gold/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">Kişisel Parfüm Keşfi</span>
          </div>
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-white">
            Parfümünü Bul
          </h1>
        </div>

        {/* Progress Bar - Top */}
        {step > 0 && (
          <div className="mb-6 flex items-center justify-center gap-4">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`p-2 rounded-full transition-all ${
                step > 1 ? "text-white/60 hover:bg-white/10" : "opacity-0 pointer-events-none"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-1.5">
              {conversationFlow.slice(1).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i + 1 === step
                      ? "w-8 bg-gold"
                      : i + 1 < step
                      ? "w-3 bg-gold/50"
                      : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </div>
            
            <span className="text-white/40 text-sm min-w-[40px] text-right">
              {step}/{conversationFlow.length - 1}
            </span>
            </div>
          )}

        {/* Main Card - Question & Options Together */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          {/* Mavi's Message */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-amber-600/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div className="flex-1">
                <span className="text-gold text-sm font-medium block mb-2">Mavi</span>
                {isTyping ? (
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 inline-block">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2.5 h-2.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2.5 h-2.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-5 py-4">
                    <p className="text-white/90 whitespace-pre-line text-base leading-relaxed">{getMaviMessage()}</p>
                    {currentConversation.question && (
                      <p className="text-white font-semibold mt-4 text-lg">{currentConversation.question}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Options - Directly Below Question */}
          {showOptions && (
            <div className="px-6 pb-6">
              {step === 0 ? (
                // Start button
                <button
                  onClick={handleStart}
                  className="w-full bg-gold text-navy font-semibold py-4 rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  Başlayalım
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : currentConversation.options ? (
                // Option buttons - 2x2 grid
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentConversation.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      className="group bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:bg-gold/10 hover:border-gold/40 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                          {option.icon}
                        </div>
                        <span className="text-white font-medium text-base">{option.label}</span>
                      </div>
                      <p className="text-gray-400 text-sm pl-[52px]">{option.description}</p>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Previous Answers Summary - Compact */}
        {Object.keys(answers).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {Object.entries(answers).map(([field, value]) => {
              const question = conversationFlow.find(q => q.field === field);
              const option = question?.options?.find(o => o.value === value);
              if (!option) return null;
              
              return (
                <span 
                  key={field} 
                  className="inline-flex items-center gap-2 bg-gold/10 text-gold/80 px-3 py-1.5 rounded-full text-sm border border-gold/20"
                >
                  {option.icon}
                  {option.label}
                </span>
              );
            })}
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
