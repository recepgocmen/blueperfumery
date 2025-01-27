"use client";

import { useState } from "react";
import SurveyForm from "../components/SurveyForm";
import {
  UserPreferences,
  SurveyResponse,
  DailyRoutine,
  Style,
  FragrancePreference,
  RecommendationResult,
} from "../types/survey";

import { getLocalRecommendations } from "../utils/recommendations";
import { getEmojiForNote } from "../utils/noteEmojis";

export default function Home() {
  const [recommendations, setRecommendations] = useState<
    RecommendationResult[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSurvey, setShowSurvey] = useState(true);

  const convertToSurveyResponse = (
    preferences: UserPreferences
  ): SurveyResponse => {
    const getOccasion = (
      routine: DailyRoutine
    ): "daily" | "special" | "night" | "work" => {
      if (routine === "morning_run") return "daily";
      if (routine === "coffee") return "daily";
      if (routine === "meditation") return "daily";
      if (routine === "music") return "special";
      if (routine === "reading") return "night";
      return "daily";
    };

    const getBudget = (style: Style): "low" | "medium" | "high" | "luxury" => {
      if (style === "luxury") return "luxury";
      if (style === "premium") return "high";
      if (style === "casual") return "medium";
      return "low";
    };

    const getPreferenceRating = (prefs: FragrancePreference): number => {
      const trueCount = Object.values(prefs).filter(Boolean).length;
      return Math.min(Math.max(Math.round((trueCount / 8) * 5), 1), 5);
    };

    const preferenceRating = getPreferenceRating(
      preferences.fragrancePreferences
    );
    const uniquenessRating = preferences.personality === "adventurous" ? 5 : 3;

    return {
      gender: preferences.gender,
      age: preferences.age,
      occasion: getOccasion(preferences.dailyRoutine),
      budget: getBudget(preferences.style),
      preferences: {
        sweetness: preferenceRating,
        longevity: 3,
        sillage: 3,
        uniqueness: uniquenessRating,
      },
    };
  };

  const handleSurveySubmit = async (preferences: UserPreferences) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const surveyResponse = convertToSurveyResponse(preferences);
      const results = getLocalRecommendations(surveyResponse, 5);

      if (results && results.length > 0) {
        console.log("Survey Response:", surveyResponse);
        console.log(
          "All Recommendations:",
          results.map((r) => ({
            name: r.perfume.name,
            score: r.matchScore,
            reasons: r.matchReasons,
          }))
        );

        setRecommendations(results);
        setShowSurvey(false);
      } else {
        setError("Uygun parfüm önerisi bulunamadı");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setShowSurvey(true);
    setRecommendations([]);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center mb-8">
          Hangi Parfüm?
        </h1>

        {showSurvey ? (
          <>
            <p className="text-center text-xl mb-12">
              Size en uygun parfümü bulmak için birkaç soru soracağız.
            </p>
            <div className="max-w-4xl mx-auto">
              <SurveyForm onSubmit={handleSurveySubmit} />
            </div>
          </>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Size Özel Parfüm Önerileri</h2>
              <button
                onClick={handleStartOver}
                className="px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all"
              >
                Yeni Test Başlat
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((rec, index) => (
                <div
                  key={rec.perfume.id}
                  className={`p-6 bg-white bg-opacity-10 rounded-lg ${
                    index === 0
                      ? "md:col-span-2 lg:col-span-3 bg-opacity-20"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{rec.perfume.name}</h2>
                      <p className="text-gray-300">{rec.perfume.brand}</p>
                    </div>
                    {index === 0 && (
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                        En İyi Eşleşme
                      </span>
                    )}
                  </div>
                  <p className="mt-4">{rec.perfume.description}</p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Notalar:</h3>
                    <div className="flex flex-wrap gap-2">
                      {rec.perfume.notes.map((note, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white bg-opacity-5 rounded-full text-sm"
                        >
                          {getEmojiForNote(note)} {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Neden Bu Parfüm?</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {rec.matchReasons.slice(0, 3).map((reason, i) => (
                        <li key={i} className="text-sm text-gray-300">
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4">Öneriler hazırlanıyor...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-500 bg-opacity-20 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
