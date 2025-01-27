import { NextResponse } from "next/server";
import { SurveyResponse, RecommendationResult } from "@/types/survey";
import { getLocalRecommendations } from "@/utils/recommendations";

export async function POST(request: Request) {
  try {
    const surveyData: SurveyResponse = await request.json();

    try {
      // Önce AI'dan öneriler almayı dene
      const aiRecommendations = await getAIRecommendations(surveyData);
      return NextResponse.json(aiRecommendations);
    } catch (error) {
      // AI hatası durumunda local önerileri kullan
      console.log(
        "AI recommendation failed, using local recommendations",
        error
      );
      const localRecommendations = getLocalRecommendations(surveyData);
      return NextResponse.json({ recommendations: localRecommendations });
    }
  } catch (error) {
    console.error("Error in recommendations route:", error);
    return NextResponse.json(
      { error: "Failed to process recommendation request" },
      { status: 500 }
    );
  }
}

async function getAIRecommendations(
  surveyData: SurveyResponse
): Promise<RecommendationResult[]> {
  // TODO: Implement AI recommendation logic
  console.log("Received survey data:", surveyData);
  // Şimdilik her zaman hata fırlat ki local önerilere düşsün
  throw new Error("AI recommendations not implemented yet");
}
