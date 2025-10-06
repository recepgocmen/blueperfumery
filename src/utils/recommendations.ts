import {
  SurveyResponse,
  RecommendationResult,
  BUDGET_RANGES,
  PREFERRED_PERFUMES,
} from "../types/survey";
import type { Product } from "../lib/api";

/**
 * Get personalized perfume recommendations based on survey
 * Now accepts products from API instead of using hardcoded data
 */
export function getLocalRecommendations(
  survey: SurveyResponse,
  products: Product[], // Now accepts products from API
  maxRecommendations: number = 3
): RecommendationResult[] {
  // Calculate scores for all perfumes
  const results = products
    .map((perfume) => {
      const matchScore = calculateMatchScore(perfume, survey);
      const matchReasons = getMatchReasons(perfume, survey);

      // Add a unique "flavor" score for each user to increase variation
      const userFingerprint =
        survey.gender + survey.age + (survey.preferences?.uniqueness || 0);
      const hashValue = simpleHash(perfume.id + userFingerprint);

      // This creates a perfume-specific boost for each user
      const uniqueBoost = (hashValue % 30) / 100; // Perfume-specific boost of up to 30%

      // Check if this is a preferred perfume and add extra boost
      const isPreferredPerfume = PREFERRED_PERFUMES.includes(
        perfume.id as (typeof PREFERRED_PERFUMES)[number]
      );
      const preferredBoost = isPreferredPerfume ? 0.55 : 0;

      // Combine the calculated score with the unique boost and preferred boost
      const boostedScore = matchScore * (1 + uniqueBoost + preferredBoost);

      return {
        perfume,
        matchScore: boostedScore,
        matchReasons,
        isPreferredPerfume,
        originalScore: matchScore,
        boost: uniqueBoost + preferredBoost,
      };
    })
    .filter((result) => result.matchScore > 0); // Filter out 0 scores

  // Sort by score with enhanced randomization for similar scores
  results.sort((a, b) => {
    // Increase randomness range for more variety (±15%)
    const randomFactorA = 1 + (Math.random() - 0.5) * 0.3;
    const randomFactorB = 1 + (Math.random() - 0.5) * 0.3;

    const finalScoreA = a.matchScore * randomFactorA;
    const finalScoreB = b.matchScore * randomFactorB;

    return finalScoreB - finalScoreA;
  });

  // Apply diversity - ensure some variety in brands and types
  const diverseResults = applyDiversity(results, maxRecommendations);

  // Log all scores for debugging
  console.log(
    "Top perfume scores:",
    diverseResults.map((r) => ({
      name: r.perfume.name,
      brand: r.perfume.brand,
      score: r.matchScore,
      originalScore: r.originalScore,
      boost: r.boost,
      isPreferredPerfume: r.isPreferredPerfume,
      characteristics: r.perfume.characteristics,
    }))
  );

  // Remove debugging properties from final results
  return diverseResults.map(
    ({ perfume, matchScore, matchReasons, isPreferredPerfume }) => ({
      perfume,
      matchScore,
      matchReasons,
      isPreferredPerfume,
    })
  );
}

// Simple string hash function
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Ensure diversity in recommendations
function applyDiversity(
  results: Array<{
    perfume: Product;
    matchScore: number;
    matchReasons: string[];
    originalScore: number;
    boost: number;
    isPreferredPerfume: boolean;
  }>,
  maxRecommendations: number
): Array<{
  perfume: Product;
  matchScore: number;
  matchReasons: string[];
  originalScore: number;
  boost: number;
  isPreferredPerfume: boolean;
}> {
  const diverseResults: Array<{
    perfume: Product;
    matchScore: number;
    matchReasons: string[];
    originalScore: number;
    boost: number;
    isPreferredPerfume: boolean;
  }> = [];
  const brandsSeen = new Set<string>();
  const characteristicsSeen = new Set<string>();

  // First, take the top result
  if (results.length > 0) {
    diverseResults.push(results[0]);
    brandsSeen.add(results[0].perfume.brand);
    results[0].perfume.characteristics.forEach((c: string) =>
      characteristicsSeen.add(c)
    );
  }

  // Then try to find diverse options
  const remainingResults = [...results.slice(1)];

  while (
    diverseResults.length < maxRecommendations &&
    remainingResults.length > 0
  ) {
    // Look for a perfume with an unseen brand
    const brandDiverseIndex = remainingResults.findIndex(
      (r) => !brandsSeen.has(r.perfume.brand)
    );

    if (brandDiverseIndex >= 0) {
      const selected = remainingResults.splice(brandDiverseIndex, 1)[0];
      diverseResults.push(selected);
      brandsSeen.add(selected.perfume.brand);
      selected.perfume.characteristics.forEach((c: string) =>
        characteristicsSeen.add(c)
      );
      continue;
    }

    // If we can't find a new brand, look for perfumes with distinct characteristics
    let maxNewCharacteristics = -1;
    let maxCharIndex = -1;

    for (let i = 0; i < remainingResults.length; i++) {
      const newChars = remainingResults[i].perfume.characteristics.filter(
        (c: string) => !characteristicsSeen.has(c)
      ).length;

      if (newChars > maxNewCharacteristics) {
        maxNewCharacteristics = newChars;
        maxCharIndex = i;
      }
    }

    if (maxCharIndex >= 0) {
      const selected = remainingResults.splice(maxCharIndex, 1)[0];
      diverseResults.push(selected);
      brandsSeen.add(selected.perfume.brand);
      selected.perfume.characteristics.forEach((c: string) =>
        characteristicsSeen.add(c)
      );
    } else {
      // If we can't find diversity, just take the next highest scoring perfume
      diverseResults.push(remainingResults.shift()!);
    }
  }

  return diverseResults;
}

function calculateMatchScore(perfume: Product, survey: SurveyResponse): number {
  let score = 0;
  let multiplier = 1.0;

  // Temel uyumluluk kontrolü
  if (perfume.gender === survey.gender || perfume.gender === "unisex") {
    score += 15;
  } else {
    return 0; // Cinsiyet uyuşmuyorsa direk elenir
  }

  // Yaş aralığı kontrolü
  if (
    survey.age >= perfume.ageRange.min &&
    survey.age <= perfume.ageRange.max
  ) {
    const ageMidPoint = (perfume.ageRange.min + perfume.ageRange.max) / 2;
    const ageDifference = Math.abs(survey.age - ageMidPoint);
    const ageRangeSize = perfume.ageRange.max - perfume.ageRange.min;
    score += 15 * (1 - ageDifference / ageRangeSize);
  }

  // Bütçe kontrolü
  if (survey.budget) {
    const budgetRange = BUDGET_RANGES[survey.budget];
    if (perfume.price >= budgetRange.min && perfume.price <= budgetRange.max) {
      const budgetMidPoint = (budgetRange.min + budgetRange.max) / 2;
      const priceDifference = Math.abs(perfume.price - budgetMidPoint);
      const budgetRangeSize = budgetRange.max - budgetRange.min;
      score += 15 * (1 - priceDifference / budgetRangeSize);
    }
  }

  // Notalar kontrolü
  if (survey.likedNotes) {
    const matchingLikedNotes = perfume.notes.filter((note) =>
      survey.likedNotes?.includes(note)
    );
    const matchBonus =
      matchingLikedNotes.length * (matchingLikedNotes.length + 5);
    score += matchBonus;

    if (matchingLikedNotes.length >= 3) {
      multiplier += 0.2;
    }
  }

  if (survey.dislikedNotes) {
    const matchingDislikedNotes = perfume.notes.filter((note) =>
      survey.dislikedNotes?.includes(note)
    );
    const penaltyMultiplier = matchingDislikedNotes.length * 1.5;
    score -= 15 * penaltyMultiplier;
  }

  // Personality matching
  if (survey.personality) {
    const personalityMap: Record<string, string[]> = {
      adventurous: ["unique", "fresh", "distinctive", "woody", "aromatic"],
      romantic: ["floral", "sweet", "warm", "gourmand", "vanilla"],
      calm: ["clean", "subtle", "light", "aquatic", "fresh"],
      mysterious: ["dark", "woody", "smoky", "oriental", "incense"],
      energetic: ["citrusy", "fresh", "spicy", "energetic", "fruity"],
      minimalist: ["clean", "subtle", "marine", "mineral", "light"],
      passionate: ["spicy", "intense", "warm", "rich", "tobacco"],
    };

    const associatedTraits = personalityMap[survey.personality] || [];
    const matchingTraits = perfume.characteristics.filter((char) =>
      associatedTraits.includes(char)
    );

    score += matchingTraits.length * 10;

    if (matchingTraits.length >= 2) {
      multiplier += 0.15;
    }
  }

  // Season matching
  if (survey.season) {
    const seasonMap: Record<string, string[]> = {
      spring: ["fresh", "floral", "light", "green", "citrusy"],
      summer: ["fresh", "aquatic", "light", "citrusy", "fruity"],
      autumn: ["spicy", "woody", "warm", "amber", "oriental"],
      winter: ["woody", "warm", "spicy", "sweet", "rich"],
    };

    const seasonTraits = seasonMap[survey.season] || [];
    const matchingSeasonTraits = perfume.characteristics.filter((char) =>
      seasonTraits.includes(char)
    );

    score += matchingSeasonTraits.length * 8;

    if (matchingSeasonTraits.length >= 3) {
      multiplier += 0.2;
    }
  }

  // Occasion matching
  if (survey.occasion) {
    const occasionScores: Record<
      string,
      {
        primary: string[];
        secondary: string[];
      }
    > = {
      daily: {
        primary: ["fresh", "clean", "subtle"],
        secondary: ["light", "casual", "versatile"],
      },
      special: {
        primary: ["unique", "elegant", "sophisticated"],
        secondary: ["luxurious", "rich", "memorable"],
      },
      night: {
        primary: ["seductive", "intense", "mysterious"],
        secondary: ["dark", "warm", "deep"],
      },
      work: {
        primary: ["professional", "clean", "subtle"],
        secondary: ["fresh", "light", "balanced"],
      },
    };

    const { primary, secondary } = occasionScores[survey.occasion];

    const matchingPrimary = perfume.characteristics.filter((char) =>
      primary.includes(char)
    );
    score += matchingPrimary.length * 12;

    const matchingSecondary = perfume.characteristics.filter((char) =>
      secondary.includes(char)
    );
    score += matchingSecondary.length * 8;

    if (
      matchingPrimary.length >= 2 ||
      matchingPrimary.length + matchingSecondary.length >= 4
    ) {
      multiplier += 0.25;
    }
  }

  // Brand consciousness
  if (survey.preferences?.brandConsciousness) {
    const isPremiumBrand = [
      "Blue Perfumery Luxury",
      "Blue Perfumery Premium",
      "Blue Perfumery Exclusive",
      "Blue Perfumery Artisanal",
    ].includes(perfume.brand);

    if (isPremiumBrand && survey.preferences.brandConsciousness > 3) {
      multiplier += 0.15;
    } else if (!isPremiumBrand && survey.preferences.brandConsciousness < 3) {
      multiplier += 0.1;
    }
  }

  // Style matching
  if (survey.style) {
    const styleMap: Record<string, string[]> = {
      classic: ["elegant", "timeless", "refined", "sophisticated", "iconic"],
      bohemian: ["unique", "artistic", "creative", "distinctive", "natural"],
      sporty: ["fresh", "clean", "energetic", "light", "marine"],
      vintage: ["rich", "powdery", "warm", "elegant", "timeless"],
      modern: ["fresh", "minimalist", "innovative", "clean", "versatile"],
    };

    const styleTraits = styleMap[survey.style] || [];
    const matchingStyleTraits = perfume.characteristics.filter((char) =>
      styleTraits.includes(char)
    );

    score += matchingStyleTraits.length * 7;
  }

  // Desired impression
  if (survey.desiredImpression) {
    const impressionMap: Record<string, string[]> = {
      confidence: ["strong", "distinctive", "bold", "intense", "rich"],
      elegance: ["refined", "sophisticated", "elegant", "balanced", "timeless"],
      mystery: ["mysterious", "dark", "deep", "smoky", "unique"],
      energy: ["fresh", "citrusy", "energetic", "spicy", "vibrant"],
      romance: ["sweet", "warm", "floral", "creamy", "vanilla"],
      freedom: ["fresh", "light", "natural", "airy", "marine"],
      luxury: ["rich", "exclusive", "elegant", "sophisticated", "unique"],
      nature: ["green", "fresh", "natural", "earthy", "herbal"],
    };

    const impressionTraits = impressionMap[survey.desiredImpression] || [];
    const matchingImpressionTraits = perfume.characteristics.filter((char) =>
      impressionTraits.includes(char)
    );

    score += matchingImpressionTraits.length * 10;

    if (matchingImpressionTraits.length >= 3) {
      multiplier += 0.2;
    }
  }

  // Final score
  const finalScore = Math.round(score * multiplier);
  return Math.max(finalScore, 0);
}

function getMatchReasons(perfume: Product, survey: SurveyResponse): string[] {
  const reasons: string[] = [];

  // Gender messages
  const genderMessages = {
    male: [
      "Erkek dünyasının güçlü karakterini yansıtan bir seçim",
      "Modern erkeğin tarzını tamamlayan sofistike bir parfüm",
      "Maskülen notalarla harmanlanmış özel bir kompozisyon",
    ],
    female: [
      "Kadın zarafetini vurgulayan özel bir seçim",
      "Feminen notalarla bezeli büyüleyici bir parfüm",
      "Kadınsı cazibeni tamamlayan zarif bir kompozisyon",
    ],
    unisex: [
      "Cinsiyet kalıplarını aşan modern bir seçim",
      "Her tarza uyum sağlayan çok yönlü bir parfüm",
      "Unisex kullanıma uygun dengeli bir kompozisyon",
    ],
  };

  if (perfume.gender === survey.gender) {
    reasons.push(genderMessages[survey.gender][Math.floor(Math.random() * 3)]);
  } else if (perfume.gender === "unisex") {
    reasons.push(genderMessages.unisex[Math.floor(Math.random() * 3)]);
  }

  // Age group messages
  const getAgeGroupMessage = (age: number) => {
    if (age <= 24) {
      return [
        "Genç ve dinamik ruha mükemmel uyum",
        "Gençliğin enerjisini yansıtan taze notalar",
        "Genç yaşam tarzına uygun modern kompozisyon",
      ];
    } else if (age <= 34) {
      return [
        "Kariyerinin başındaki profesyoneller için ideal",
        "Tutkulu ve kararlı karaktere uygun seçim",
        "Aktif yaşam tarzını tamamlayan dinamik notalar",
      ];
    } else if (age <= 44) {
      return [
        "Olgun ve sofistike bir seçim",
        "Dengeli yaşam tarzını yansıtan rafine notalar",
        "Karakter sahibi bir parfüm deneyimi",
      ];
    } else {
      return [
        "Zarafet ve karizmanın mükemmel uyumu",
        "Yılların getirdiği özgüveni yansıtan seçkin notalar",
        "Klasik ve zamansız bir parfüm deneyimi",
      ];
    }
  };

  const ageMessages = getAgeGroupMessage(survey.age);
  reasons.push(ageMessages[Math.floor(Math.random() * 3)]);

  // Characteristic message
  const charMap: Record<string, string[]> = {
    sweet: [
      "Tatlı notalarla bezeli cezbedici bir koku",
      "Baştan çıkarıcı tatlı dokunuşlar içeriyor",
    ],
    fresh: [
      "Ferah ve canlandırıcı bir tazelik sunuyor",
      "Taze ve canlı notalar içeren modern bir parfüm",
    ],
    woody: [
      "Odunsu notalarla derinlik kazanan güçlü bir karakter",
      "Doğadan ilham alan odunsu aromalar içeriyor",
    ],
    floral: [
      "Çiçeksi notalarla zenginleştirilmiş zarif bir kompozisyon",
      "Çiçek bahçesinden ilham alan büyüleyici bir buket",
    ],
    spicy: [
      "Karakter sahibi baharatlı notalarla zenginleştirilmiş",
      "Isıtıcı baharatlarla sarmalanmış güçlü bir imza",
    ],
  };

  const availableChars = perfume.characteristics.filter(
    (char) => charMap[char]
  );
  if (availableChars.length > 0) {
    const selectedChar =
      availableChars[Math.floor(Math.random() * availableChars.length)];
    const charMessages = charMap[selectedChar];
    if (charMessages) {
      reasons.push(
        charMessages[Math.floor(Math.random() * charMessages.length)]
      );
    }
  }

  // Unique message about the perfume
  reasons.push(
    `${perfume.name}, Blue Perfumery'nin kişiliğinize özel olarak seçilen bir kompozisyonu`
  );

  return reasons;
}
