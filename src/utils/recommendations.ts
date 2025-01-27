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
  let multiplier = 1.0;

  // Temel uyumluluk kontrolü
  if (perfume.gender === survey.gender || perfume.gender === "unisex") {
    score += 15;
  } else {
    return 0; // Cinsiyet uyuşmuyorsa direk elenir
  }

  // Yaş aralığı kontrolü - yaşa göre dinamik puanlama
  if (survey.age >= perfume.ageRange.min && survey.age <= perfume.ageRange.max) {
    // Yaş aralığının tam ortasına yakınlık bonus puan getirir
    const ageMidPoint = (perfume.ageRange.min + perfume.ageRange.max) / 2;
    const ageDifference = Math.abs(survey.age - ageMidPoint);
    const ageRangeSize = perfume.ageRange.max - perfume.ageRange.min;
    score += 15 * (1 - ageDifference / ageRangeSize);
  }

  // Bütçe kontrolü - fiyat aralığına göre dinamik puanlama
  const budgetRange = BUDGET_RANGES[survey.budget];
  if (perfume.price >= budgetRange.min && perfume.price <= budgetRange.max) {
    // Bütçe aralığının ortasına yakınlık bonus puan getirir
    const budgetMidPoint = (budgetRange.min + budgetRange.max) / 2;
    const priceDifference = Math.abs(perfume.price - budgetMidPoint);
    const budgetRangeSize = budgetRange.max - budgetRange.min;
    score += 15 * (1 - priceDifference / budgetRangeSize);
  }

  // Notalar kontrolü - daha detaylı analiz
  if (survey.likedNotes) {
    const matchingLikedNotes = perfume.notes.filter(note =>
      survey.likedNotes?.includes(note)
    );
    // Eşleşen nota sayısına göre artan bonus
    const matchBonus = matchingLikedNotes.length * (matchingLikedNotes.length + 5);
    score += matchBonus;
    
    // Çok fazla eşleşen nota varsa çarpan artışı
    if (matchingLikedNotes.length >= 3) {
      multiplier += 0.2;
    }
  }

  if (survey.dislikedNotes) {
    const matchingDislikedNotes = perfume.notes.filter(note =>
      survey.dislikedNotes?.includes(note)
    );
    // Sevmediği notaların sayısına göre artan ceza
    const penaltyMultiplier = matchingDislikedNotes.length * 1.5;
    score -= 15 * penaltyMultiplier;
  }

  // Kullanıcı tercihleri kontrolü - daha detaylı eşleştirme
  if (perfume.rating) {
    const preferencesScore = calculatePreferencesScore(
      perfume.rating,
      survey.preferences
    );
    score += preferencesScore * 2; // Tercihlere daha fazla ağırlık
    
    // Yüksek tercih uyumu bonus getirir
    if (preferencesScore > 30) {
      multiplier += 0.15;
    }
  }

  // Kullanım amacına göre karakteristik analizi
  const occasionScores: Record<SurveyResponse["occasion"], {
    primary: string[],
    secondary: string[]
  }> = {
    daily: {
      primary: ["fresh", "clean", "subtle"],
      secondary: ["light", "casual", "versatile"]
    },
    special: {
      primary: ["unique", "elegant", "sophisticated"],
      secondary: ["luxurious", "rich", "memorable"]
    },
    night: {
      primary: ["seductive", "intense", "mysterious"],
      secondary: ["dark", "warm", "deep"]
    },
    work: {
      primary: ["professional", "clean", "subtle"],
      secondary: ["fresh", "light", "balanced"]
    }
  };

  const { primary, secondary } = occasionScores[survey.occasion];
  
  // Birincil karakteristikler daha yüksek puan getirir
  const matchingPrimary = perfume.characteristics.filter(char =>
    primary.includes(char)
  );
  score += matchingPrimary.length * 12;
  
  // İkincil karakteristikler daha az puan getirir
  const matchingSecondary = perfume.characteristics.filter(char =>
    secondary.includes(char)
  );
  score += matchingSecondary.length * 8;

  // Karakteristik eşleşmesi çok iyiyse çarpan artışı
  if (matchingPrimary.length >= 2 || (matchingPrimary.length + matchingSecondary.length) >= 4) {
    multiplier += 0.25;
  }

  // Final skor hesaplama
  const finalScore = Math.round(score * multiplier);
  
  // Minimum skor kontrolü
  return Math.max(finalScore, 0);
}

function calculatePreferencesScore(
  perfumeRating: NonNullable<Perfume["rating"]>,
  userPreferences: SurveyResponse["preferences"]
): number {
  let score = 0;
  
  // Her özellik için detaylı karşılaştırma
  const preferences = [
    { key: "sweetness", weight: 1.2 },
    { key: "longevity", weight: 1.3 },
    { key: "sillage", weight: 1.1 },
    { key: "uniqueness", weight: 1.4 }
  ] as const;

  for (const { key, weight } of preferences) {
    if (perfumeRating[key] !== undefined && userPreferences[key] !== undefined) {
      const diff = Math.abs(perfumeRating[key]! - userPreferences[key]);
      // Fark az ise daha yüksek puan
      const matchScore = (5 - diff) * 5 * weight;
      score += matchScore;
      
      // Tam eşleşme durumunda bonus
      if (diff === 0) {
        score += 5 * weight;
      }
    }
  }

  return Math.round(score);
}

function getMatchReasons(perfume: Perfume, survey: SurveyResponse): string[] {
  const reasons: string[] = [];

  // Cinsiyet ve yaş grubu uyumu
  const genderMessages = {
    male: [
      "Erkek dünyasının güçlü karakterini yansıtan bir seçim",
      "Modern erkeğin tarzını tamamlayan sofistike bir parfüm",
      "Maskülen notalarla harmanlanmış özel bir kompozisyon"
    ],
    female: [
      "Kadın zarafetini vurgulayan özel bir seçim",
      "Feminen notalarla bezeli büyüleyici bir parfüm",
      "Kadınsı cazibeni tamamlayan zarif bir kompozisyon"
    ],
    unisex: [
      "Cinsiyet kalıplarını aşan modern bir seçim",
      "Her tarza uyum sağlayan çok yönlü bir parfüm",
      "Unisex kullanıma uygun dengeli bir kompozisyon"
    ]
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
        "Genç yaşam tarzına uygun modern kompozisyon"
      ];
    } else if (age <= 34) {
      return [
        "Kariyerinin başındaki profesyoneller için ideal",
        "Tutkulu ve kararlı karaktere uygun seçim",
        "Aktif yaşam tarzını tamamlayan dinamik notalar"
      ];
    } else if (age <= 44) {
      return [
        "Olgun ve sofistike bir seçim",
        "Dengeli yaşam tarzını yansıtan rafine notalar",
        "Karakter sahibi bir parfüm deneyimi"
      ];
    } else {
      return [
        "Zarafet ve karizmanın mükemmel uyumu",
        "Yılların getirdiği özgüveni yansıtan seçkin notalar",
        "Klasik ve zamansız bir parfüm deneyimi"
      ];
    }
  };

  const ageMessages = getAgeGroupMessage(survey.age);
  reasons.push(ageMessages[Math.floor(Math.random() * 3)]);

  // Bütçe uyumu
  const budgetRange = BUDGET_RANGES[survey.budget];
  if (perfume.price <= budgetRange.max && perfume.price >= budgetRange.min) {
    const budgetMessages = {
      low: [
        "Ekonomik ve akıllı bir seçim",
        "Bütçe dostu kaliteli bir parfüm",
        "Uygun fiyatlı premium deneyim"
      ],
      medium: [
        "Kalite-fiyat dengesi mükemmel",
        "Orta segment parfümler arasında öne çıkan bir seçim",
        "Erişilebilir lüks kategorisinde özel bir parfüm"
      ],
      high: [
        "Premium segmentte dikkat çeken bir seçim",
        "Üst düzey kalite arayanlar için ideal",
        "Lüks parfüm dünyasından seçkin bir örnek"
      ],
      luxury: [
        "En üst segment parfümler arasından seçkin bir örnek",
        "Lüks parfüm tutkunları için özel bir seçim",
        "Ultra premium kategoride benzersiz bir deneyim"
      ]
    };
    reasons.push(budgetMessages[survey.budget][Math.floor(Math.random() * 3)]);
  }

  // Nota uyumu
  if (survey.likedNotes) {
    const matchingNotes = perfume.notes.filter(note =>
      survey.likedNotes?.includes(note)
    );
    if (matchingNotes.length > 0) {
      const noteMessages = [
        `${matchingNotes.length} favori notanı içeren özel bir harman`,
        `Sevdiğin ${matchingNotes.slice(0, 2).join(" ve ")} notalarıyla bezeli`,
        `Tercih ettiğin notaların muhteşem uyumu`
      ];
      reasons.push(noteMessages[Math.floor(Math.random() * 3)]);
    }
  }

  // Kullanım amacı uyumu
  const occasionCharacteristics: Record<string, {
    characteristics: string[],
    messages: string[]
  }> = {
    daily: {
      characteristics: ["fresh", "clean", "light", "casual", "subtle"],
      messages: [
        "Günlük kullanım için ideal ferahlık",
        "Her güne özel tazeleyici bir deneyim",
        "Günlük rutinine mükemmel uyum"
      ]
    },
    special: {
      characteristics: ["unique", "luxurious", "elegant", "rich", "sophisticated"],
      messages: [
        "Özel anlarını taçlandıracak bir seçim",
        "Unutulmaz anlar için büyüleyici bir parfüm",
        "Özel günlerin vazgeçilmezi olacak"
      ]
    },
    night: {
      characteristics: ["seductive", "intense", "dark", "mysterious", "warm"],
      messages: [
        "Gece hayatına uygun baştan çıkarıcı notalar",
        "Gecenin gizemini yansıtan yoğun bir kompozisyon",
        "Akşam davetleri için ideal bir seçim"
      ]
    },
    work: {
      characteristics: ["clean", "professional", "subtle", "fresh", "light"],
      messages: [
        "Profesyonel yaşama uygun zarif bir seçim",
        "İş ortamı için ideal dengeli notalar",
        "Ofis kullanımına uygun rafine bir kompozisyon"
      ]
    }
  };

  const { characteristics, messages } = occasionCharacteristics[survey.occasion];
  const matchingCharacteristics = perfume.characteristics.filter(char =>
    characteristics.includes(char)
  );

  if (matchingCharacteristics.length > 0) {
    reasons.push(messages[Math.floor(Math.random() * 3)]);
  }

  // Özel karakteristik uyumu
  if (perfume.rating && survey.preferences) {
    const ratings = [
      { 
        key: "longevity" as const,
        messages: [
          "Tercih ettiğin kalıcılık seviyesine sahip",
          "Aradığın kalıcılıkta bir parfüm",
          "İstediğin süre boyunca seninle"
        ]
      },
      {
        key: "sillage" as const,
        messages: [
          "Koku izinde tam istediğin etki",
          "Aradığın koku yayılımına sahip",
          "İdeal silaj seviyesinde bir parfüm"
        ]
      },
      {
        key: "uniqueness" as const,
        messages: [
          "Aradığın benzersizlikte özel bir parfüm",
          "İstediğin kadar dikkat çekici",
          "Tam senin tarzında farklı bir seçim"
        ]
      }
    ];

    for (const { key, messages } of ratings) {
      if (perfume.rating[key] === survey.preferences[key]) {
        reasons.push(messages[Math.floor(Math.random() * 3)]);
      }
    }
  }

  return reasons;
}
