import { Perfume, SurveyResponse, RecommendationResult, BUDGET_RANGES } from "../types/survey";
import { perfumes } from "../data/perfumes";

export function getLocalRecommendations(
  survey: SurveyResponse,
  maxRecommendations: number = 3
): RecommendationResult[] {
  // Calculate scores for all perfumes
  const results = perfumes
    .map((perfume) => {
      const matchScore = calculateMatchScore(perfume, survey);
      const matchReasons = getMatchReasons(perfume, survey);
      return { perfume, matchScore, matchReasons };
    })
    .filter((result) => result.matchScore > 0); // Filter out 0 scores

  // Sort by score and apply diversity bonus
  results.sort((a, b) => {
    // Add a small random factor for diversity (±5%)
    const randomFactorA = 1 + (Math.random() - 0.5) * 0.1;
    const randomFactorB = 1 + (Math.random() - 0.5) * 0.1;
    
    // Apply the random factor to the scores
    const finalScoreA = a.matchScore * randomFactorA;
    const finalScoreB = b.matchScore * randomFactorB;
    
    return finalScoreB - finalScoreA;
  });

  // Log all scores for debugging
  console.log('All perfume scores:', results.map(r => ({
    name: r.perfume.name,
    score: r.matchScore,
    characteristics: r.perfume.characteristics,
    notes: r.perfume.notes
  })));

  // Return top N recommendations
  return results.slice(0, maxRecommendations);
}

function calculateMatchScore(perfume: Perfume, survey: SurveyResponse): number {
  let score = 0;

  // Cinsiyet kontrolü - daha az ağırlıklı
  if (perfume.gender === survey.gender || perfume.gender === "unisex") {
    score += 10;
  } else {
    return 0; // Cinsiyet uyuşmuyorsa direk 0 puan
  }

  // Yaş aralığı kontrolü - daha az ağırlıklı
  if (
    survey.age >= perfume.ageRange.min &&
    survey.age <= perfume.ageRange.max
  ) {
    score += 10;
  }

  // Bütçe kontrolü - daha az ağırlıklı
  const budgetRange = BUDGET_RANGES[survey.budget];
  if (perfume.price >= budgetRange.min && perfume.price <= budgetRange.max) {
    score += 10;
  }

  // Notalar kontrolü - daha önemli
  if (survey.likedNotes) {
    const matchingLikedNotes = perfume.notes.filter(note =>
      survey.likedNotes?.includes(note)
    );
    score += matchingLikedNotes.length * 8;
  }

  if (survey.dislikedNotes) {
    const matchingDislikedNotes = perfume.notes.filter(note =>
      survey.dislikedNotes?.includes(note)
    );
    score -= matchingDislikedNotes.length * 15;
  }

  // Kullanıcı tercihleri kontrolü - daha önemli
  if (perfume.rating) {
    const preferencesScore = calculatePreferencesScore(
      perfume.rating,
      survey.preferences
    );
    score += preferencesScore * 1.5; // Tercihlere daha fazla ağırlık ver
  }

  // Occasion kontrolü - daha detaylı ve önemli
  const occasionScores: Record<SurveyResponse["occasion"], string[]> = {
    daily: ["fresh", "light", "clean", "casual", "subtle"],
    special: ["unique", "luxurious", "elegant", "rich", "sophisticated"],
    night: ["seductive", "intense", "dark", "mysterious", "warm"],
    work: ["clean", "professional", "subtle", "fresh", "light"],
  };

  const relevantCharacteristics = occasionScores[survey.occasion];
  const matchingCharacteristics = perfume.characteristics.filter(char =>
    relevantCharacteristics.includes(char)
  );
  score += matchingCharacteristics.length * 8;

  // Rastgelelik faktörü ekle (±5 puan)
  score += (Math.random() - 0.5) * 10;

  return Math.max(0, score);
}

function calculatePreferencesScore(
  perfumeRating: NonNullable<Perfume["rating"]>,
  userPreferences: SurveyResponse["preferences"]
): number {
  let score = 0;
  let matchCount = 0;

  // Her bir özellik için kullanıcı tercihleri ile parfüm özelliklerini karşılaştır
  if (perfumeRating.sweetness && userPreferences.sweetness) {
    const diff = Math.abs(perfumeRating.sweetness - userPreferences.sweetness);
    score += (5 - diff) * 3;
    matchCount++;
  }

  if (perfumeRating.longevity && userPreferences.longevity) {
    const diff = Math.abs(perfumeRating.longevity - userPreferences.longevity);
    score += (5 - diff) * 3;
    matchCount++;
  }

  if (perfumeRating.sillage && userPreferences.sillage) {
    const diff = Math.abs(perfumeRating.sillage - userPreferences.sillage);
    score += (5 - diff) * 3;
    matchCount++;
  }

  if (perfumeRating.uniqueness && userPreferences.uniqueness) {
    const diff = Math.abs(perfumeRating.uniqueness - userPreferences.uniqueness);
    score += (5 - diff) * 3;
    matchCount++;
  }

  // Eşleşen özellik sayısına göre skoru normalize et
  return matchCount > 0 ? score / matchCount : 0;
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
