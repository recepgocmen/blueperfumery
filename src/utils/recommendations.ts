import { Perfume, SurveyResponse, RecommendationResult, BUDGET_RANGES } from "../types/survey";
import { perfumes } from "../data/perfumes";

export function getLocalRecommendations(
  survey: SurveyResponse,
  maxRecommendations: number = 3
): RecommendationResult[] {
  const results: RecommendationResult[] = [];

  for (const perfume of perfumes) {
    const matchScore = calculateMatchScore(perfume, survey);
    const matchReasons = getMatchReasons(perfume, survey);

    if (matchScore > 0) {
      results.push({
        perfume,
        matchScore,
        matchReasons,
      });
    }
  }

  // En yüksek puanlı parfümleri döndür
  return results
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, maxRecommendations);
}

function calculateMatchScore(perfume: Perfume, survey: SurveyResponse): number {
  let score = 0;

  // Cinsiyet kontrolü
  if (perfume.gender === survey.gender || perfume.gender === "unisex") {
    score += 20;
  } else {
    return 0; // Cinsiyet uyuşmuyorsa direk 0 puan
  }

  // Yaş aralığı kontrolü
  if (
    survey.age >= perfume.ageRange.min &&
    survey.age <= perfume.ageRange.max
  ) {
    score += 15;
  }

  // Bütçe kontrolü
  const budgetRange = BUDGET_RANGES[survey.budget];
  if (perfume.price >= budgetRange.min && perfume.price <= budgetRange.max) {
    score += 15;
  }

  // Notalar kontrolü
  if (survey.likedNotes) {
    const matchingLikedNotes = perfume.notes.filter(note =>
      survey.likedNotes?.includes(note)
    );
    score += matchingLikedNotes.length * 5;
  }

  if (survey.dislikedNotes) {
    const matchingDislikedNotes = perfume.notes.filter(note =>
      survey.dislikedNotes?.includes(note)
    );
    score -= matchingDislikedNotes.length * 10;
  }

  // Kullanıcı tercihleri kontrolü
  if (perfume.rating) {
    const preferencesScore = calculatePreferencesScore(
      perfume.rating,
      survey.preferences
    );
    score += preferencesScore;
  }

  // Occasion kontrolü
  const occasionScores = {
    daily: ["fresh", "light", "clean"],
    special: ["unique", "luxurious", "elegant"],
    night: ["seductive", "intense", "dark"],
    work: ["clean", "professional", "subtle"],
  };

  const relevantCharacteristics = occasionScores[survey.occasion];
  const matchingCharacteristics = perfume.characteristics.filter(char =>
    relevantCharacteristics.includes(char)
  );
  score += matchingCharacteristics.length * 5;

  return Math.max(0, score); // Negatif puan olmamasını sağla
}

function calculatePreferencesScore(
  perfumeRating: NonNullable<Perfume["rating"]>,
  userPreferences: SurveyResponse["preferences"]
): number {
  let score = 0;

  // Her bir özellik için kullanıcı tercihleri ile parfüm özelliklerini karşılaştır
  if (perfumeRating.sweetness && userPreferences.sweetness) {
    score += (5 - Math.abs(perfumeRating.sweetness - userPreferences.sweetness)) * 3;
  }

  if (perfumeRating.longevity && userPreferences.longevity) {
    score += (5 - Math.abs(perfumeRating.longevity - userPreferences.longevity)) * 3;
  }

  if (perfumeRating.sillage && userPreferences.sillage) {
    score += (5 - Math.abs(perfumeRating.sillage - userPreferences.sillage)) * 3;
  }

  if (perfumeRating.uniqueness && userPreferences.uniqueness) {
    score += (5 - Math.abs(perfumeRating.uniqueness - userPreferences.uniqueness)) * 3;
  }

  return score;
}

function getMatchReasons(perfume: Perfume, survey: SurveyResponse): string[] {
  const reasons: string[] = [];

  // Cinsiyet uyumu
  if (perfume.gender === survey.gender || perfume.gender === "unisex") {
    reasons.push(`${survey.gender === "male" ? "Erkek" : "Kadın"} kullanımına uygun`);
  }

  // Yaş uyumu
  if (survey.age >= perfume.ageRange.min && survey.age <= perfume.ageRange.max) {
    reasons.push(`${survey.age} yaş için ideal`);
  }

  // Bütçe uyumu
  const budgetRange = BUDGET_RANGES[survey.budget];
  if (perfume.price >= budgetRange.min && perfume.price <= budgetRange.max) {
    reasons.push("Bütçenize uygun");
  }

  // Beğenilen notalar
  if (survey.likedNotes) {
    const matchingNotes = perfume.notes.filter(note =>
      survey.likedNotes?.includes(note)
    );
    if (matchingNotes.length > 0) {
      reasons.push(
        `Sevdiğiniz ${matchingNotes.join(", ")} notalarını içeriyor`
      );
    }
  }

  // Kullanım amacı
  const occasionTexts = {
    daily: "Günlük kullanım",
    special: "Özel günler",
    night: "Gece kullanımı",
    work: "İş ortamı",
  };
  reasons.push(`${occasionTexts[survey.occasion]} için uygun`);

  return reasons;
}
