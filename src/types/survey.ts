import type { Product } from "../lib/api";

export type Gender = "male" | "female" | "unisex";

export type FragrancePreference = {
  woody?: boolean;
  floral?: boolean;
  fruity?: boolean;
  spicy?: boolean;
  fresh?: boolean;
  sweet?: boolean;
  powdery?: boolean;
  vanilla?: boolean;
};

export type Personality =
  | "adventurous"
  | "romantic"
  | "calm"
  | "mysterious"
  | "energetic"
  | "minimalist"
  | "passionate";

export type ScentPreference =
  | "seaside"
  | "burning_wood"
  | "rose_garden"
  | "petrichor"
  | "fresh_grass"
  | "books"
  | "mothers_kitchen";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type Style = "classic" | "bohemian" | "sporty" | "vintage" | "modern";

export type Impression =
  | "confidence"
  | "elegance"
  | "mystery"
  | "energy"
  | "romance"
  | "freedom"
  | "luxury"
  | "nature";

// Preferred perfumes that should have higher recommendation rate
export const PREFERRED_PERFUMES = [
  "nishane-hacivat",
  "ysl-libre-woman",
  "mancera-roses-vanille",
  "terenzi-kirke",
  "lveb",
  "amouage-reflection-man",
  "pdm-pegasus",
  "ex-nihilo-fleur-narcotique",
  "tf-bitter-peach",
  "mfk-br540",
  "tf-lost-cherry",
  "nasomatto-black-afgano",
] as const;

export interface UserPreferences {
  gender: Gender;
  age: number;
  fragrancePreferences: FragrancePreference;
  personality: Personality;
  scentMemory: ScentPreference;
  season: Season;
  style: Style;
  desiredImpression: Impression;
}

// Use Product type from API instead of local Perfume type
export type Perfume = Product;

export interface SurveyResponse {
  gender: Gender;
  age: number;
  occasion: "daily" | "special" | "night" | "work";
  budget: "low" | "medium" | "high" | "luxury";
  preferences: {
    sweetness: number; // 1-5
    longevity: number; // 1-5
    sillage: number; // 1-5 (koku izi)
    uniqueness: number; // 1-5
    brandConsciousness?: number; // 1-5 (marka bilinci)
  };
  likedNotes?: string[];
  dislikedNotes?: string[];
  personality?: Personality;
  scentMemory?: ScentPreference;
  season?: Season;
  style?: Style;
  desiredImpression?: Impression;
}

export interface RecommendationResult {
  perfume: Product; // Now uses Product from API
  matchScore: number;
  matchReasons: string[];
  isPreferredPerfume: boolean;
}

export const BUDGET_RANGES = {
  low: { min: 0, max: 700 },
  medium: { min: 701, max: 1100 },
  high: { min: 1101, max: 1500 },
  luxury: { min: 1501, max: Infinity },
} as const;

export const COMMON_NOTES = [
  "amber",
  "vanilya",
  "ud",
  "gül",
  "yasemin",
  "deri",
  "tütün",
  "narenciye",
  "odunsu",
  "çiçeksi",
  "baharatlı",
  "meyveli",
  "deniz",
  "ferah",
  "tatlı",
  "pudralı",
  "misk",
  "oryantal",
] as const;
