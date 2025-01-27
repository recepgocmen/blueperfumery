import OpenAI from "openai";
import { UserPreferences, Perfume } from "../types/survey";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getPerfumeRecommendation = async (
  preferences: UserPreferences,
  availablePerfumes: Perfume[]
) => {
  try {
    const prompt = `
    Bir kullanıcı için parfüm önerisi yapmam gerekiyor. Kullanıcı detaylı bilgileri:

    Kişilik: ${preferences.personality}
    En Sevdiği Koku: ${preferences.scentMemory}
    Kendini Temsil Eden Mevsim: ${preferences.season}
    Element: ${preferences.element}
    Renk Tercihi: ${preferences.color}
    Giyim Tarzı: ${preferences.style}
    Günlük Rutin: ${preferences.dailyRoutine}
    İnsanlarda Bırakmak İstediği İzlenim: ${preferences.desiredImpression}

    Elimdeki parfüm listesi:
    ${availablePerfumes
      .map(
        (perfume: Perfume) => `
      - ${perfume.name}: ${perfume.description}
    `
      )
      .join("\n")}

    Bu kullanıcı için en uygun parfümü seç ve neden bu parfümü seçtiğini detaylı olarak açıkla.
    Kişilik özellikleri, tercih ettiği kokular ve bırakmak istediği izlenimi göz önünde bulundur.
    Cevabını JSON formatında ver:
    {
      "selectedPerfume": "parfüm adı",
      "explanation": "seçim sebebi - detaylı açıklama"
    }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    
    try {
      const parsedResponse = JSON.parse(response || "{}");
      return parsedResponse;
    } catch (error) {
      console.error("Failed to parse OpenAI response:", error);
      return {
        selectedPerfume: "Parsing Error",
        explanation: "OpenAI yanıtı işlenirken bir hata oluştu.",
      };
    }
  } catch (error) {
    console.error("Error getting perfume recommendation:", error);
    throw new Error("Parfüm önerisi alınırken bir hata oluştu. Lütfen tekrar deneyin.");
  }
};
