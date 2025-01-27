"use client";

import { useState } from "react";
import SurveyForm from "../components/SurveyForm";
import { UserPreferences } from "../types/survey";
import { perfumes } from "../data/perfumes";
import { getPerfumeRecommendation } from "../utils/openai";

export default function Home() {
  const [recommendation, setRecommendation] = useState<typeof perfumes[0] | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSurveySubmit = async (preferences: UserPreferences) => {
    setLoading(true);
    setError(null);
    try {
      const aiResponse = await getPerfumeRecommendation(preferences, perfumes);
      
      if (aiResponse) {
        const recommendedPerfume = perfumes.find(
          (p) => p.name === aiResponse.selectedPerfume
        );
        
        if (recommendedPerfume) {
          setRecommendation(recommendedPerfume);
          setAiExplanation(aiResponse.explanation);
        } else {
          setError('Önerilen parfüm bulunamadı');
        }
      }
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setError('Öneri alınırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Hangi Parfüm?
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Size en uygun parfümü bulmak için birkaç soru soracağız
        </p>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : !recommendation ? (
          <SurveyForm onSubmit={handleSurveySubmit} />
        ) : (
          <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              İşte Size Özel Önerimiz!
            </h2>
            <div className="space-y-4">
              <p className="text-xl font-semibold text-gray-900">
                {recommendation.brand}
              </p>
              <p className="text-2xl text-blue-600">{recommendation.name}</p>
              
              {aiExplanation && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">{aiExplanation}</p>
                </div>
              )}
              
              <p className="text-gray-600">{recommendation.description}</p>
              <div className="pt-4">
                <p className="font-medium text-gray-700">Notalar:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recommendation.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setRecommendation(null);
                  setAiExplanation('');
                }}
                className="w-full mt-6 p-3 bg-blue-500 text-white rounded-lg"
              >
                Yeniden Dene
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
