import { useState } from "react";
import { UserPreferences } from "../types/survey";

interface SurveyFormProps {
  onSubmit: (preferences: UserPreferences) => Promise<void>;
}

export default function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    fragrancePreferences: {},
  });

  const questions = [
    {
      title: "👋 Öncelikle Tanışalım!",
      question: "Hangi dünyadan parfüm önerileri istersin?",
      options: [
        { value: "male", label: "Erkek", icon: "👔" },
        { value: "female", label: "Kadın", icon: "👗" },
        { value: "unisex", label: "Unisex", icon: "✨" },
      ],
      field: "gender" as const,
    },
    {
      title: "🎭 Yaşam Evren",
      question: "Hangi yaş enerjisine sahipsin?",
      options: [
        { value: "18", label: "18-24: Genç ve Dinamik", icon: "✨" },
        { value: "25", label: "25-34: Tutkulu ve Kararlı", icon: "🌟" },
        { value: "35", label: "35-44: Sofistike ve Dengeli", icon: "💫" },
        { value: "45", label: "45+: Zarif ve Karizmatik", icon: "⭐" },
      ],
      field: "age" as const,
      onSelect: (value: string) => {
        const ageMap: Record<string, number> = {
          "18": 21,
          "25": 29,
          "35": 39,
          "45": 50,
        };
        setPreferences((prev) => ({
          ...prev,
          age: ageMap[value] || 25,
        }));
      },
    },
    {
      title: "✨ Karakterini Keşfet",
      question: "Hangi kelime seni en iyi anlatır?",
      options: [
        { value: "adventurous", label: "Maceraperest", icon: "🌎" },
        { value: "romantic", label: "Romantik", icon: "💝" },
        { value: "calm", label: "Sakin", icon: "🌊" },
        { value: "mysterious", label: "Gizemli", icon: "🌙" },
        { value: "energetic", label: "Enerjik", icon: "⚡" },
        { value: "minimalist", label: "Minimalist", icon: "✨" },
        { value: "passionate", label: "Tutkulu", icon: "🔥" },
      ],
      field: "personality" as const,
    },
    {
      title: "🌊 Çocukluğuna Dön",
      question: "Çocukken en sevdiğin koku neydi?",
      options: [
        { value: "seaside", label: "Deniz kenarı", icon: "🌊" },
        { value: "burning_wood", label: "Yanan odun", icon: "🔥" },
        { value: "rose_garden", label: "Gül bahçesi", icon: "🌹" },
        { value: "petrichor", label: "Yağmur sonrası toprak", icon: "🌧️" },
        { value: "fresh_grass", label: "Taze çimen", icon: "🌿" },
        { value: "books", label: "Kitaplar", icon: "📚" },
        { value: "mothers_kitchen", label: "Annemin yemeği", icon: "👩‍🍳" },
      ],
      field: "scentMemory" as const,
    },
    {
      title: "🍁 Mevsimler ve Sen",
      question: "Hangi mevsim seni en iyi temsil ediyor?",
      options: [
        { value: "spring", label: "İlkbahar", icon: "🌸" },
        { value: "summer", label: "Yaz", icon: "☀️" },
        { value: "autumn", label: "Sonbahar", icon: "🍁" },
        { value: "winter", label: "Kış", icon: "❄️" },
      ],
      field: "season" as const,
    },
    {
      title: "👔 Tarzını Yansıt",
      question: "Giyim tarzın nasıl?",
      options: [
        { value: "classic", label: "Klasik", icon: "👔" },
        { value: "bohemian", label: "Bohem", icon: "🌺" },
        { value: "sporty", label: "Sportif", icon: "🏃" },
        { value: "vintage", label: "Vintage", icon: "🎭" },
        { value: "modern", label: "Modern", icon: "✨" },
      ],
      field: "style" as const,
    },
    {
      title: "🔮 Büyülü Bir An",
      question: "Bir kokuyu giydiğinde insanlar ne hissetsin?",
      options: [
        { value: "confidence", label: "Özgüven", icon: "💫" },
        { value: "elegance", label: "Zarafet", icon: "👑" },
        { value: "mystery", label: "Gizem", icon: "🌙" },
        { value: "energy", label: "Enerji", icon: "⚡" },
        { value: "romance", label: "Romantizm", icon: "💝" },
        { value: "freedom", label: "Özgürlük", icon: "🦋" },
        { value: "luxury", label: "Lüks", icon: "✨" },
        { value: "nature", label: "Doğallık", icon: "🌿" },
      ],
      field: "desiredImpression" as const,
    },
  ] as const;

  type QuestionField = (typeof questions)[number]["field"];

  const handleOptionSelect = (field: QuestionField, value: string) => {
    if (isSubmitting) return;

    setPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(preferences as UserPreferences);
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  const currentQuestion = questions[step - 1];
  const hasSelectedCurrentOption = Boolean(preferences[currentQuestion.field]);

  const isOptionSelected = (value: string) => {
    if (currentQuestion.field === "age") {
      const ageMap: Record<string, number> = {
        "18": 21,
        "25": 29,
        "35": 39,
        "45": 50,
      };
      return preferences.age === ageMap[value];
    }
    return preferences[currentQuestion.field] === value;
  };

  return (
    <div
      className="max-w-md mx-auto bg-white rounded-xl shadow-lg"
      role="form"
      aria-label="Parfüm tercihi anketi"
    >
      <div className="text-center p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {currentQuestion.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {currentQuestion.question}
        </p>
      </div>

      <div
        className="px-4 sm:px-6 space-y-2 sm:space-y-3"
        role="listbox"
        aria-label={currentQuestion.question}
      >
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() =>
              handleOptionSelect(currentQuestion.field, option.value)
            }
            onKeyDown={(e) =>
              handleKeyDown(e, () =>
                handleOptionSelect(currentQuestion.field, option.value)
              )
            }
            className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all duration-300 ${
              isOptionSelected(option.value)
                ? "bg-blue-50 border-blue-500 shadow-md transform scale-[1.02]"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md hover:scale-[1.01]"
            }`}
            type="button"
            role="option"
            aria-selected={isOptionSelected(option.value)}
            disabled={isSubmitting}
            tabIndex={0}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span
                className="text-xl sm:text-2xl"
                role="img"
                aria-label={option.label}
              >
                {option.icon}
              </span>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6 flex justify-between items-center">
        <button
          onClick={() => !isSubmitting && step > 1 && setStep(step - 1)}
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              () => !isSubmitting && step > 1 && setStep(step - 1)
            )
          }
          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
            step > 1
              ? "text-gray-600 hover:bg-gray-100 hover:scale-110"
              : "opacity-0 pointer-events-none"
          }`}
          type="button"
          disabled={isSubmitting || step === 1}
          aria-label="Önceki soru"
          tabIndex={step > 1 ? 0 : -1}
        >
          <span className="text-lg sm:text-xl">←</span>
        </button>

        <div
          className="space-x-1 sm:space-x-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={step}
          aria-label={`Soru ${step} / ${questions.length}`}
        >
          {Array.from({ length: questions.length }).map((_, i) => (
            <span
              key={i}
              className={`inline-block h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                i + 1 === step
                  ? "w-4 sm:w-5 bg-blue-500"
                  : i + 1 < step
                  ? "w-1.5 sm:w-2 bg-blue-200"
                  : "w-1.5 sm:w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {step === questions.length ? (
          <button
            onClick={handleSubmit}
            onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 ${
              isSubmitting || !hasSelectedCurrentOption
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:scale-105"
            }`}
            type="button"
            disabled={isSubmitting || !hasSelectedCurrentOption}
            aria-label={isSubmitting ? "Yükleniyor" : "Parfümümü bul"}
            tabIndex={0}
          >
            <span className="flex items-center gap-2">
              {isSubmitting ? "Yükleniyor..." : "Parfümümü Bul"}
              <span role="img" aria-hidden="true">
                ✨
              </span>
            </span>
          </button>
        ) : (
          <button
            onClick={() => hasSelectedCurrentOption && setStep(step + 1)}
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                () => hasSelectedCurrentOption && setStep(step + 1)
              )
            }
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              hasSelectedCurrentOption
                ? "text-gray-600 hover:bg-gray-100 hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
            type="button"
            disabled={!hasSelectedCurrentOption || isSubmitting}
            aria-label="Sonraki soru"
            tabIndex={hasSelectedCurrentOption ? 0 : -1}
          >
            <span className="text-lg sm:text-xl">→</span>
          </button>
        )}
      </div>

      <div
        className="text-xs sm:text-sm text-gray-500 text-center font-medium pb-4"
        aria-label={`${step} / ${questions.length} soru`}
      >
        {step} / {questions.length}
      </div>
    </div>
  );
}
