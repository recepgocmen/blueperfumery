export type Gender = "male" | "female";

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

export type Element = "fire" | "water" | "air" | "earth";

export type Color =
  | "deep_purple"
  | "gold"
  | "light_blue"
  | "forest_green"
  | "ruby_red";

export type Style = "classic" | "bohemian" | "sporty" | "vintage" | "modern";

export type DailyRoutine =
  | "coffee"
  | "morning_run"
  | "music"
  | "meditation"
  | "reading";

export type Impression =
  | "confidence"
  | "elegance"
  | "mystery"
  | "energy"
  | "romance"
  | "freedom"
  | "luxury"
  | "nature";

export interface UserPreferences {
  gender: Gender;
  age: number;
  fragrancePreferences: FragrancePreference;
  personality: Personality;
  scentMemory: ScentPreference;
  season: Season;
  element: Element;
  color: Color;
  style: Style;
  dailyRoutine: DailyRoutine;
  desiredImpression: Impression;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  gender: "male" | "female" | "unisex";
  notes: string[];
  description: string;
  ageRange: {
    min: number;
    max: number;
  };
  characteristics: string[];
  rating?: {
    sweetness?: number;
    longevity?: number;
    sillage?: number;
    uniqueness?: number;
    versatility?: number;
    value?: number;
  };
}

export interface SurveyResponse {
  gender: "male" | "female" | "unisex";
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
  element?: Element;
  color?: Color;
  style?: Style;
  dailyRoutine?: DailyRoutine;
  desiredImpression?: Impression;
}

export interface RecommendationResult {
  perfume: Perfume;
  matchScore: number;
  matchReasons: string[];
}

export const BUDGET_RANGES = {
  low: { min: 0, max: 500 },
  medium: { min: 501, max: 1000 },
  high: { min: 1001, max: 2000 },
  luxury: { min: 2001, max: Infinity },
} as const;

export const COMMON_NOTES = [
  "amber",
  "vanilla",
  "oud",
  "rose",
  "jasmine",
  "leather",
  "tobacco",
  "citrus",
  "woody",
  "floral",
  "spicy",
  "fruity",
  "marine",
  "fresh",
  "sweet",
  "powdery",
  "musky",
  "oriental",
] as const;
