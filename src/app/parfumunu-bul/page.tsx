"use client";

import { useState } from "react";
import SurveyForm from "@/components/SurveyForm";
import ResultScreen from "@/components/ResultScreen";
import { UserPreferences } from "../../types/survey";
import { getLocalRecommendations } from "../../utils/recommendations";
import { SurveyResponse, RecommendationResult } from "../../types/survey";

export default function PerfumeFinder() {
  const [recommendations, setRecommendations] = useState<
    RecommendationResult[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSurvey, setShowSurvey] = useState(true);

  const convertToSurveyResponse = (
    preferences: UserPreferences
  ): SurveyResponse => {
    // Kişilik özelliklerine göre tercih edilen durumu belirle
    let occasion: "daily" | "special" | "night" | "work" = "daily";

    if (
      preferences.personality === "mysterious" ||
      preferences.personality === "passionate"
    ) {
      occasion = "night";
    } else if (
      preferences.desiredImpression === "luxury" ||
      preferences.desiredImpression === "elegance"
    ) {
      occasion = "special";
    } else if (
      preferences.dailyRoutine === "coffee" ||
      preferences.style === "classic"
    ) {
      occasion = "work";
    }

    // Yaş ve cinsiyete göre uygun bütçe belirle
    let budget: "low" | "medium" | "high" | "luxury" = "medium";

    if (preferences.age >= 40) {
      budget = preferences.desiredImpression === "luxury" ? "luxury" : "high";
    } else if (preferences.age >= 30) {
      budget = "high";
    } else if (preferences.age >= 25) {
      budget = "medium";
    } else {
      budget = "low";
    }

    // Renk ve tarz seçimine göre istenen koku özelliklerini belirle
    const preferences_map = {
      sweetness:
        preferences.color === "ruby_red" || preferences.color === "gold"
          ? 4
          : 3,
      longevity: preferences.desiredImpression === "luxury" ? 5 : 4,
      sillage:
        preferences.personality === "mysterious" ||
        preferences.personality === "passionate"
          ? 4
          : 3,
      uniqueness:
        preferences.style === "bohemian" ||
        preferences.personality === "adventurous"
          ? 5
          : 3,
      brandConsciousness: preferences.desiredImpression === "luxury" ? 5 : 3,
    };

    // Sevilen ve sevilmeyen notaları belirle
    const determineLikedNotes = (): string[] => {
      const likedNotes: string[] = [];

      // Kişilik tipi ve mevsime göre bazı notaları ekle
      if (preferences.personality === "romantic") {
        likedNotes.push("rose", "vanilla");
      } else if (preferences.personality === "mysterious") {
        likedNotes.push("oud", "leather", "tobacco");
      } else if (preferences.personality === "energetic") {
        likedNotes.push("citrus", "fresh");
      }

      if (preferences.season === "winter") {
        likedNotes.push("woody", "spicy", "vanilla");
      } else if (preferences.season === "summer") {
        likedNotes.push("citrus", "fresh", "marine");
      } else if (preferences.season === "spring") {
        likedNotes.push("floral", "fresh");
      } else if (preferences.season === "autumn") {
        likedNotes.push("amber", "woody");
      }

      // Koku tercihi ekleme
      if (preferences.scentMemory === "rose_garden") {
        likedNotes.push("rose", "floral");
      } else if (preferences.scentMemory === "burning_wood") {
        likedNotes.push("woody", "smoky");
      } else if (preferences.scentMemory === "seaside") {
        likedNotes.push("marine", "fresh");
      }

      return [...new Set(likedNotes)]; // Yinelenen notaları kaldır
    };

    return {
      gender: preferences.gender,
      age: preferences.age,
      occasion,
      budget,
      preferences: preferences_map,
      likedNotes: determineLikedNotes(),
      // Diğer özellikleri UserPreferences'dan SurveyResponse'a aktar
      personality: preferences.personality,
      season: preferences.season,
      style: preferences.style,
      desiredImpression: preferences.desiredImpression,
    };
  };

  const handleSurveySubmit = async (preferences: UserPreferences) => {
    try {
      setLoading(true);
      setError(null);

      // Kullanıcı deneyimini geliştirmek için kısa bir gecikme
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Kullanıcı tercihlerini SurveyResponse formatına dönüştür
      const surveyResponse = convertToSurveyResponse(preferences);

      // Yerel tavsiye sistemini kullanarak önerileri al
      const results = getLocalRecommendations(surveyResponse, 3);

      if (results.length === 0) {
        setError(
          "Üzgünüz, tercihlerinize uygun bir parfüm bulamadık. Lütfen tekrar deneyin."
        );
        setLoading(false);
        return;
      }

      setRecommendations(results);
      setShowSurvey(false);
    } catch (err) {
      console.error("Öneri alınırken bir hata oluştu:", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations([]);
    setShowSurvey(true);
    setError(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showSurvey && (
            <div className="text-center max-w-2xl mx-auto md:my-6 my-8 pt-10">
              {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Kendine Özel Parfümünü Keşfet
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Kişiliğine ve yaşam tarzına uygun en iyi parfümü bulmak için
                birkaç basit soruyu yanıtla.
              </p> */}
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto bg-red-50 p-3 sm:p-4 rounded-xl border border-red-200 text-red-700 text-sm mb-6">
              {error}
            </div>
          )}

          <div className="">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Önerileriniz hazırlanıyor...
                </p>
              </div>
            ) : showSurvey ? (
              <SurveyForm onSubmit={handleSurveySubmit} />
            ) : recommendations.length > 0 ? (
              <div className="max-w-4xl mx-auto pt-20">
                <ResultScreen
                  result={recommendations[0]}
                  onReset={handleReset}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
