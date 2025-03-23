import {
  Perfume,
  SurveyResponse,
  RecommendationResult,
  BUDGET_RANGES,
} from "../types/survey";
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

      // Add a unique "flavor" score for each user to increase variation
      // Use a combination of user preferences to create a unique fingerprint
      const userFingerprint =
        survey.gender + survey.age + (survey.preferences?.uniqueness || 0);
      const hashValue = simpleHash(perfume.id + userFingerprint);

      // This creates a perfume-specific boost for each user
      const uniqueBoost = (hashValue % 30) / 100; // Perfume-specific boost of up to 30%

      // Combine the calculated score with the unique boost
      const boostedScore = matchScore * (1 + uniqueBoost);

      return {
        perfume,
        matchScore: boostedScore,
        matchReasons,
        // Store original score for debugging
        originalScore: matchScore,
        boost: uniqueBoost,
      };
    })
    .filter((result) => result.matchScore > 0); // Filter out 0 scores

  // Sort by score with enhanced randomization for similar scores
  results.sort((a, b) => {
    // Increase randomness range for more variety (±15%)
    const randomFactorA = 1 + (Math.random() - 0.5) * 0.3;
    const randomFactorB = 1 + (Math.random() - 0.5) * 0.3;

    // Apply the random factor to the scores
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
      characteristics: r.perfume.characteristics,
    }))
  );

  // Remove debugging properties from final results
  return diverseResults.map(({ perfume, matchScore, matchReasons }) => ({
    perfume,
    matchScore,
    matchReasons,
  }));
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
    perfume: Perfume;
    matchScore: number;
    matchReasons: string[];
    originalScore: number;
    boost: number;
  }>,
  maxRecommendations: number
): Array<{
  perfume: Perfume;
  matchScore: number;
  matchReasons: string[];
  originalScore: number;
  boost: number;
}> {
  const diverseResults: Array<{
    perfume: Perfume;
    matchScore: number;
    matchReasons: string[];
    originalScore: number;
    boost: number;
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

function calculateMatchScore(perfume: Perfume, survey: SurveyResponse): number {
  let score = 0;
  let multiplier = 1.0;

  // Temel uyumluluk kontrolü
  if (perfume.gender === survey.gender || perfume.gender === "unisex") {
    score += 15;
  } else {
    return 0; // Cinsiyet uyuşmuyorsa direk elenir
  }

  // Yaş aralığı kontrolü - yaşa göre dinamik puanlama
  if (
    survey.age >= perfume.ageRange.min &&
    survey.age <= perfume.ageRange.max
  ) {
    // Yaş aralığının tam ortasına yakınlık bonus puan getirir
    const ageMidPoint = (perfume.ageRange.min + perfume.ageRange.max) / 2;
    const ageDifference = Math.abs(survey.age - ageMidPoint);
    const ageRangeSize = perfume.ageRange.max - perfume.ageRange.min;
    score += 15 * (1 - ageDifference / ageRangeSize);
  }

  // Bütçe kontrolü - fiyat aralığına göre dinamik puanlama
  if (survey.budget) {
    const budgetRange = BUDGET_RANGES[survey.budget];
    if (perfume.price >= budgetRange.min && perfume.price <= budgetRange.max) {
      // Bütçe aralığının ortasına yakınlık bonus puan getirir
      const budgetMidPoint = (budgetRange.min + budgetRange.max) / 2;
      const priceDifference = Math.abs(perfume.price - budgetMidPoint);
      const budgetRangeSize = budgetRange.max - budgetRange.min;
      score += 15 * (1 - priceDifference / budgetRangeSize);
    }
  }

  // Notalar kontrolü - daha detaylı analiz
  if (survey.likedNotes) {
    const matchingLikedNotes = perfume.notes.filter((note) =>
      survey.likedNotes?.includes(note)
    );
    // Eşleşen nota sayısına göre artan bonus
    const matchBonus =
      matchingLikedNotes.length * (matchingLikedNotes.length + 5);
    score += matchBonus;

    // Çok fazla eşleşen nota varsa çarpan artışı
    if (matchingLikedNotes.length >= 3) {
      multiplier += 0.2;
    }
  }

  if (survey.dislikedNotes) {
    const matchingDislikedNotes = perfume.notes.filter((note) =>
      survey.dislikedNotes?.includes(note)
    );
    // Sevmediği notaların sayısına göre artan ceza
    const penaltyMultiplier = matchingDislikedNotes.length * 1.5;
    score -= 15 * penaltyMultiplier;
  }

  // Kullanıcı kişiliği ile parfüm karakteri arasında ilişki kurma
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

    // Her eşleşen özellik için puan ekle
    score += matchingTraits.length * 10;

    // Güçlü eşleşme durumunda çarpan artışı
    if (matchingTraits.length >= 2) {
      multiplier += 0.15;
    }
  }

  // Mevsim tercihi kontrolü
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

    // Mevsimsel uyum puanı
    score += matchingSeasonTraits.length * 8;

    // Güçlü mevsimsel uyum çarpan artışı getirir
    if (matchingSeasonTraits.length >= 3) {
      multiplier += 0.2;
    }
  }

  // Kullanım amacına göre karakteristik analizi
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

    // Birincil karakteristikler daha yüksek puan getirir
    const matchingPrimary = perfume.characteristics.filter((char) =>
      primary.includes(char)
    );
    score += matchingPrimary.length * 12;

    // İkincil karakteristikler daha az puan getirir
    const matchingSecondary = perfume.characteristics.filter((char) =>
      secondary.includes(char)
    );
    score += matchingSecondary.length * 8;

    // Karakteristik eşleşmesi çok iyiyse çarpan artışı
    if (
      matchingPrimary.length >= 2 ||
      matchingPrimary.length + matchingSecondary.length >= 4
    ) {
      multiplier += 0.25;
    }
  }

  // Marka bilinci
  if (survey.preferences?.brandConsciousness) {
    // Premium markalardan mı hoşlanıyor?
    const isPremiumBrand = [
      "Blue Perfumery Luxury",
      "Blue Perfumery Premium",
      "Blue Perfumery Exclusive",
      "Blue Perfumery Artisanal",
    ].includes(perfume.brand);

    if (isPremiumBrand && survey.preferences.brandConsciousness > 3) {
      // Marka bilinci yüksek olan kullanıcıya premium markalar için bonus
      multiplier += 0.15;
    } else if (!isPremiumBrand && survey.preferences.brandConsciousness < 3) {
      // Marka bilinci düşük olan kullanıcıya klasik markalar için bonus
      multiplier += 0.1;
    }
  }

  // Stil eşleşmesi
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

    // Stil uyumu puanı
    score += matchingStyleTraits.length * 7;
  }

  // Desired impression (istenen etki) analizi
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

    // Etki uyumu puanı
    score += matchingImpressionTraits.length * 10;

    // Güçlü etki uyumu çarpan artışı getirir
    if (matchingImpressionTraits.length >= 3) {
      multiplier += 0.2;
    }
  }

  // Final skor hesaplama
  const finalScore = Math.round(score * multiplier);

  // Minimum skor kontrolü
  return Math.max(finalScore, 0);
}

function getMatchReasons(perfume: Perfume, survey: SurveyResponse): string[] {
  const reasons: string[] = [];

  // Cinsiyet ve yaş grubu uyumu
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

  // Cinsiyet mesajını rastgele seç
  if (perfume.gender === survey.gender) {
    reasons.push(genderMessages[survey.gender][Math.floor(Math.random() * 3)]);
  } else if (perfume.gender === "unisex") {
    reasons.push(genderMessages.unisex[Math.floor(Math.random() * 3)]);
  }

  // Yaş grubu mesajları
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

  // Karakteristik mesajları
  const getCharMessage = () => {
    const charMap: Record<string, string[]> = {
      sweet: [
        "Tatlı notalarla bezeli cezbedici bir koku",
        "Baştan çıkarıcı tatlı dokunuşlar içeriyor",
        "Tatlı ve yumuşak aromalarla sarmalanmış bir deneyim",
      ],
      fresh: [
        "Ferah ve canlandırıcı bir tazelik sunuyor",
        "Taze ve canlı notalar içeren modern bir parfüm",
        "Gün boyu ferahlık hissi veren temiz bir koku",
      ],
      woody: [
        "Odunsu notalarla derinlik kazanan güçlü bir karakter",
        "Doğadan ilham alan odunsu aromalar içeriyor",
        "Etkileyici odunsu temel notalarla desteklenmiş",
      ],
      floral: [
        "Çiçeksi notalarla zenginleştirilmiş zarif bir kompozisyon",
        "Çiçek bahçesinden ilham alan büyüleyici bir buket",
        "Seçkin çiçek notalarıyla bezenmiş feminen bir koku",
      ],
      spicy: [
        "Karakter sahibi baharatlı notalarla zenginleştirilmiş",
        "Isıtıcı baharatlarla sarmalanmış güçlü bir imza",
        "Cesur baharatlı dokunuşlar içeren etkileyici bir parfüm",
      ],
      citrusy: [
        "Enerji dolu narenciye notalarıyla canlandırıcı",
        "Tazelik veren narenciye harmonisi sunuyor",
        "Pozitif enerji saçan narenciye dokunuşları içeriyor",
      ],
      oriental: [
        "Doğunun egzotik cazibesini yansıtan bir koku",
        "Mistik ve çekici oryantal notalarla bezeli",
        "Oryantal esintiler taşıyan lüks bir kompozisyon",
      ],
      leather: [
        "Sofistike deri notalarıyla bütünleşen güçlü karakter",
        "Maskülen deri dokunuşlarıyla karakter kazanan bir parfüm",
        "Zarif deri tonları içeren etkileyici bir koku",
      ],
      vanilla: [
        "Sıcak vanilya notalarıyla sarmalayan rahatlatıcı bir koku",
        "Baştan çıkarıcı vanilya dokunuşları içeren yumuşak bir parfüm",
        "Kremsi vanilya aromalarıyla bezeli sakinleştirici bir deneyim",
      ],
      amber: [
        "Sıcak amber notalarıyla baştan çıkarıcı",
        "Zengin amber dokusuna sahip etkileyici bir parfüm",
        "Lüks amber aromalarıyla sarmalayan güçlü bir koku",
      ],
    };

    // Parfümün karakteristiklerine göre rastgele bir mesaj seç
    const availableChars = perfume.characteristics.filter(
      (char) => charMap[char]
    );
    if (availableChars.length > 0) {
      const selectedChar =
        availableChars[Math.floor(Math.random() * availableChars.length)];
      const charMessages = charMap[selectedChar];
      if (charMessages && charMessages.length > 0) {
        return charMessages[Math.floor(Math.random() * charMessages.length)];
      }
    }

    return "Blue Perfumery'nin özenle seçilmiş notalarıyla harmanlanan özel bir parfüm";
  };

  reasons.push(getCharMessage());

  // Parfüm hakkında özel bir mesaj
  const uniqueMessages = [
    `${perfume.name}, Blue Perfumery'nin kişiliğinize özel olarak seçilen bir kompozisyonu`,
    `Tercihlerinizle uyumlu özgün notalar içeren bir Blue Perfumery imzası`,
    `Kişisel tarzınızı yansıtacak şekilde Blue Perfumery tarafından tasarlanmış`,
    `Blue Perfumery koleksiyonunun sizin karakterinize hitap eden özel bir üyesi`,
  ];

  reasons.push(
    uniqueMessages[Math.floor(Math.random() * uniqueMessages.length)]
  );

  // Parfümün özellikleri hakkında özel mesaj
  if (perfume.notes && perfume.notes.length > 0) {
    const selectedNotes = perfume.notes.slice(
      0,
      Math.min(3, perfume.notes.length)
    );
    const notesMessage = `${selectedNotes.join(
      ", "
    )} notalarının uyumlu birleşimi`;
    reasons.push(notesMessage);
  }

  return reasons;
}
