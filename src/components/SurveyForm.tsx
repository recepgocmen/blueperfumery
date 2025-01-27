import { useState } from "react";
import { UserPreferences } from "../types/survey";

interface SurveyFormProps {
  onSubmit: (preferences: UserPreferences) => Promise<void>;
}

export default function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    gender: "male",
    age: 25,
    fragrancePreferences: {},
  });

  const questions = [
    {
      title: "✨ Önce seni tanıyalım!",
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
      title: "🔮 Büyülü Bir An",
      question: "Bir kokuyla büyü yapabilseydin, neye dönüşürdün?",
      options: [
        { value: "fire", label: "Ateş", icon: "🔥" },
        { value: "water", label: "Su", icon: "💧" },
        { value: "air", label: "Rüzgâr", icon: "🌪️" },
        { value: "earth", label: "Toprak", icon: "🌍" },
      ],
      field: "element" as const,
    },
    {
      title: "🎨 Renklerin Dili",
      question: "Kokunu bir renkle tanımlasaydın hangisi olurdu?",
      options: [
        { value: "deep_purple", label: "Koyu Mor", icon: "💜" },
        { value: "gold", label: "Altın Sarısı", icon: "✨" },
        { value: "light_blue", label: "Açık Mavi", icon: "💠" },
        { value: "forest_green", label: "Orman Yeşili", icon: "🌲" },
        { value: "ruby_red", label: "Yakut Kırmızısı", icon: "❤️" },
      ],
      field: "color" as const,
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
      title: "🌅 Güne Başlarken",
      question: "Sabah ilk iş olarak ne yaparsın?",
      options: [
        { value: "coffee", label: "Kahve içmek", icon: "☕" },
        { value: "morning_run", label: "Koşuya çıkmak", icon: "🏃" },
        { value: "music", label: "Müzik dinlemek", icon: "🎧" },
        { value: "meditation", label: "Meditasyon yapmak", icon: "🧘" },
        { value: "reading", label: "Kitap okumak", icon: "📚" },
      ],
      field: "dailyRoutine" as const,
    },
    {
      title: "✨ Son Olarak",
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

  const handleKeyDown = (
    event: React.KeyboardEvent,
    action: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const currentQuestion = questions[step - 1];
  const hasSelectedCurrentOption = preferences[currentQuestion.field];

  return (
    <div 
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
      role="form"
      aria-label="Parfüm tercihi anketi"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {currentQuestion.title}
        </h2>
        <p className="text-lg text-gray-600">{currentQuestion.question}</p>
      </div>

      <div 
        className="space-y-4"
        role="listbox"
        aria-label={currentQuestion.question}
      >
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionSelect(currentQuestion.field, option.value)}
            onKeyDown={(e) => handleKeyDown(e, () => handleOptionSelect(currentQuestion.field, option.value))}
            className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 ${
              preferences[currentQuestion.field] === option.value
                ? "bg-blue-50 border-blue-500 shadow-md transform scale-[1.02]"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md hover:scale-[1.01]"
            }`}
            type="button"
            role="option"
            aria-selected={preferences[currentQuestion.field] === option.value}
            disabled={isSubmitting}
            tabIndex={0}
          >
            <div className="flex items-center gap-6">
              <span className="text-3xl" role="img" aria-label={option.label}>
                {option.icon}
              </span>
              <span className="text-xl font-medium text-gray-800">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={() => !isSubmitting && step > 1 && setStep(step - 1)}
          onKeyDown={(e) => handleKeyDown(e, () => !isSubmitting && step > 1 && setStep(step - 1))}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
            step > 1 
              ? 'text-gray-600 hover:bg-gray-100 hover:scale-110' 
              : 'opacity-0 pointer-events-none'
          }`}
          type="button"
          disabled={isSubmitting || step === 1}
          aria-label="Önceki soru"
          tabIndex={step > 1 ? 0 : -1}
        >
          <span className="text-2xl">←</span>
        </button>

        <div 
          className="space-x-2"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={step}
          aria-label={`Soru ${step} / ${questions.length}`}
        >
          {Array.from({ length: questions.length }).map((_, i) => (
            <span
              key={i}
              className={`inline-block h-2.5 rounded-full transition-all duration-300 ${
                i + 1 === step 
                  ? "w-6 bg-blue-500" 
                  : i + 1 < step 
                    ? "w-2.5 bg-blue-200"
                    : "w-2.5 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {step === questions.length ? (
          <button
            onClick={handleSubmit}
            onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
            className={`px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${
              isSubmitting || !hasSelectedCurrentOption
                ? 'bg-gray-400 opacity-50 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:scale-105'
            }`}
            type="button"
            disabled={isSubmitting || !hasSelectedCurrentOption}
            aria-label={isSubmitting ? "Yükleniyor" : "Parfümümü bul"}
            tabIndex={0}
          >
            <span className="flex items-center gap-2">
              {isSubmitting ? "Yükleniyor" : "Parfümümü Bul"}
              <span role="img" aria-hidden="true">✨</span>
            </span>
          </button>
        ) : (
          <button
            onClick={() => hasSelectedCurrentOption && setStep(step + 1)}
            onKeyDown={(e) => handleKeyDown(e, () => hasSelectedCurrentOption && setStep(step + 1))}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
              hasSelectedCurrentOption 
                ? 'text-gray-600 hover:bg-gray-100 hover:scale-110' 
                : 'opacity-0 pointer-events-none'
            }`}
            type="button"
            disabled={!hasSelectedCurrentOption || isSubmitting}
            aria-label="Sonraki soru"
            tabIndex={hasSelectedCurrentOption ? 0 : -1}
          >
            <span className="text-2xl">→</span>
          </button>
        )}
      </div>

      <div 
        className="text-sm text-gray-500 text-center font-medium"
        aria-label={`${step} / ${questions.length} soru`}
      >
        {step} / {questions.length}
      </div>
    </div>
  );
}
