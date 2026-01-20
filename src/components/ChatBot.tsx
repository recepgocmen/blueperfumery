"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface RecommendedProduct {
  id: string;
  name: string;
  brand: string;
}

interface QuickOption {
  text: string;
  value: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendedProducts?: RecommendedProduct[];
  options?: QuickOption[];
}

// Local development: http://localhost:3001/api
// Production: https://blueperfumery-backend.vercel.app/api
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001/api"
    : "https://blueperfumery-backend.vercel.app/api");

// Bot ismi - sabit
const BOT_NAME = "Mira";

// Samimi karşılama mesajı - seçeneklerle birlikte
const GREETING_MESSAGE = {
  content: `Merhaba! 💫 Ben Mira, Blue Perfumery'nin koku danışmanı.\n\nSana özel bir imza koku bulmak için buradayım!\n\n_(Yeni başladım, bazen takılabilirim 🌱)_`,
  options: [
    { text: "Kendim için arıyorum 🧴", value: "Kendim için parfüm arıyorum" },
    {
      text: "Hediye için arıyorum 🎁",
      value: "Birine hediye için parfüm arıyorum",
    },
    {
      text: "Sadece göz atıyorum 👀",
      value: "Sadece göz atmak istiyorum, ne tarz parfümleriniz var?",
    },
  ],
};

// Unique ID oluştur
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// LocalStorage'dan visitor ID al veya oluştur
function getVisitorId(): string {
  if (typeof window === "undefined") return generateId();

  let visitorId = localStorage.getItem("bp_visitor_id");
  if (!visitorId) {
    visitorId = generateId();
    localStorage.setItem("bp_visitor_id", visitorId);
  }
  return visitorId;
}

// Basit markdown parser - **bold**, _italic_, ve satır başı işlemleri
function parseMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Satırlara böl
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    // Satırı parçalara ayır ve markdown işle
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let keyIndex = 0;

    // **bold** işle
    while (remaining.includes("**")) {
      const startIdx = remaining.indexOf("**");
      const endIdx = remaining.indexOf("**", startIdx + 2);

      if (endIdx === -1) break;

      // Önceki metin
      if (startIdx > 0) {
        parts.push(remaining.substring(0, startIdx));
      }

      // Bold metin
      const boldText = remaining.substring(startIdx + 2, endIdx);
      parts.push(
        <strong
          key={`bold-${lineIndex}-${keyIndex++}`}
          className="font-semibold"
        >
          {boldText}
        </strong>,
      );

      remaining = remaining.substring(endIdx + 2);
    }

    // _italic_ işle (kalan metinde)
    if (remaining.includes("_")) {
      const tempParts: React.ReactNode[] = [];
      let tempRemaining = remaining;

      while (tempRemaining.includes("_")) {
        const startIdx = tempRemaining.indexOf("_");
        const endIdx = tempRemaining.indexOf("_", startIdx + 1);

        if (endIdx === -1) break;

        // Önceki metin
        if (startIdx > 0) {
          tempParts.push(tempRemaining.substring(0, startIdx));
        }

        // Italic metin
        const italicText = tempRemaining.substring(startIdx + 1, endIdx);
        tempParts.push(
          <em
            key={`italic-${lineIndex}-${keyIndex++}`}
            className="italic text-gray-400"
          >
            {italicText}
          </em>,
        );

        tempRemaining = tempRemaining.substring(endIdx + 1);
      }

      if (tempRemaining) {
        tempParts.push(tempRemaining);
      }

      if (tempParts.length > 0) {
        parts.push(...tempParts);
        remaining = "";
      }
    }

    // Kalan metin
    if (remaining) {
      parts.push(remaining);
    }

    // Boş satırlar için br ekle
    if (parts.length === 0 && line === "") {
      return <br key={`br-${lineIndex}`} />;
    }

    return (
      <span key={`line-${lineIndex}`}>
        {parts}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatBot() {
  // Bot ismi - sabit Mira
  const botName = BOT_NAME;

  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0); // Soru sayacı
  const [sessionId, setSessionId] = useState<string>(""); // Chat session ID
  const [visitorId, setVisitorId] = useState<string>(""); // Visitor ID
  const [showBubble, setShowBubble] = useState(true); // Merhaba balonu görünürlüğü
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Input focus için

  // Session ve Visitor ID'leri başlat
  useEffect(() => {
    setVisitorId(getVisitorId());
    setSessionId(generateId());
  }, []);

  // Merhaba balonu 6 saniye sonra kaybolsun
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Mesajı DB'ye kaydet
  const saveMessageToDb = useCallback(
    async (
      message: string,
      role: "user" | "assistant",
      recommendedProducts?: RecommendedProduct[],
    ) => {
      if (!sessionId || !visitorId) return;

      try {
        await fetch(`${API_BASE_URL}/chat-sessions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            visitorId,
            message,
            role,
            recommendedProducts,
          }),
        });
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    },
    [sessionId, visitorId],
  );

  // Chat açılınca karşılama mesajı
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: GREETING_MESSAGE.content,
            timestamp: new Date(),
            options: GREETING_MESSAGE.options,
          },
        ]);
        setHasGreeted(true);
      }, 1000);
    }
  }, [isOpen, hasGreeted]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Soru limiti kontrolü (15 soru)
    if (questionCount >= 15) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Soru hakkın doldu! 🌸 Daha fazla yardım için bize ulaşabilirsin. Teşekkürler!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, limitMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    // Kullanıcı mesajını DB'ye kaydet
    saveMessageToDb(userMessage.content, "user");

    // Soru sayacını artır
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);

    // Input'a focus'u koru
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    try {
      // Conversation history hazırla (son 10 mesaj)
      const conversationHistory = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${API_BASE_URL}/agent/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory,
        }),
      });

      const data = await response.json();

      // 1-2 saniye bekleme - düşünüyormuş gibi doğal his
      await new Promise((resolve) =>
        setTimeout(resolve, 1200 + Math.random() * 800),
      );

      setIsTyping(false);

      let assistantContent = "";
      let recommendedProducts: RecommendedProduct[] = [];
      let options: QuickOption[] = [];

      if (response.ok && data.success && data.data?.message) {
        assistantContent = data.data.message;
        recommendedProducts = data.data.recommendedProducts || [];
        options = data.data.options || [];
      } else if (data.error) {
        assistantContent = `Üzgünüm, bir sorun oluştu: ${data.error}`;
      } else if (data.code === "AI_SERVICE_UNAVAILABLE") {
        assistantContent =
          "AI asistan şu an kullanılamıyor. Lütfen daha sonra tekrar deneyin. 🙏";
      } else {
        assistantContent =
          "Şu an bir sorun yaşıyorum. Biraz sonra tekrar dener misiniz? 🙏";
      }

      // 10. soruda uyarı ekle
      if (newQuestionCount === 10) {
        assistantContent += "\n\n⚠️ 5 soru hakkın kaldı!";
      }
      // 13-14. sorularda hatırlatma
      else if (newQuestionCount >= 13 && newQuestionCount < 15) {
        assistantContent += `\n\n⚠️ ${
          15 - newQuestionCount
        } soru hakkın kaldı!`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
        recommendedProducts:
          recommendedProducts.length > 0 ? recommendedProducts : undefined,
        options: options.length > 0 ? options : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Bot mesajını DB'ye kaydet
      saveMessageToDb(
        assistantContent,
        "assistant",
        recommendedProducts.length > 0 ? recommendedProducts : undefined,
      );
    } catch {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Bağlantıda bir sorun var. Lütfen tekrar deneyin.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Mesaj gönderildikten sonra focus'u koru
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Hızlı başlangıç butonları - sadece cinsiyet seçimi
  const quickStartOptions = [
    { text: "Erkek parfümü 🧔", query: "Erkek parfümü arıyorum" },
    { text: "Kadın parfümü 💄", query: "Kadın parfümü arıyorum" },
  ];

  // Hazır öneri butonuna tıklayınca direkt gönder
  const handleSuggestionClick = async (query: string) => {
    if (isLoading) return;

    // Soru limiti kontrolü
    if (questionCount >= 15) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Soru hakkın doldu! 🌸 Daha fazla yardım için bize ulaşabilirsin. Teşekkürler!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, limitMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    // Kullanıcı mesajını DB'ye kaydet
    saveMessageToDb(query, "user");

    // Soru sayacını artır
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);

    try {
      // Conversation history hazırla (mevcut mesajlar + yeni mesaj)
      const currentMessages = [...messages, userMessage];
      const conversationHistory = currentMessages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${API_BASE_URL}/agent/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          conversationHistory,
        }),
      });

      const data = await response.json();

      // 1-2 saniye bekleme - düşünüyormuş gibi doğal his
      await new Promise((resolve) =>
        setTimeout(resolve, 1200 + Math.random() * 800),
      );
      setIsTyping(false);

      let assistantContent = "";
      let recommendedProducts: RecommendedProduct[] = [];
      let options: QuickOption[] = [];

      if (response.ok && data.success && data.data?.message) {
        assistantContent = data.data.message;
        recommendedProducts = data.data.recommendedProducts || [];
        options = data.data.options || [];
      } else if (data.error) {
        assistantContent = `Üzgünüm, bir sorun oluştu: ${data.error}`;
      } else if (data.code === "AI_SERVICE_UNAVAILABLE") {
        assistantContent =
          "AI asistan şu an kullanılamıyor. Lütfen daha sonra tekrar deneyin. 🙏";
      } else {
        assistantContent =
          "Şu an bir sorun yaşıyorum. Biraz sonra tekrar dener misiniz? 🙏";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
        recommendedProducts:
          recommendedProducts.length > 0 ? recommendedProducts : undefined,
        options: options.length > 0 ? options : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      inputRef.current?.focus();

      // Bot mesajını DB'ye kaydet
      saveMessageToDb(
        assistantContent,
        "assistant",
        recommendedProducts.length > 0 ? recommendedProducts : undefined,
      );
    } catch {
      setIsTyping(false);
      const errorContent = "Bağlantıda bir sorun var. Lütfen tekrar deneyin.";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      saveMessageToDb(errorContent, "assistant");
    } finally {
      setIsLoading(false);
      // Mesaj gönderildikten sonra focus'u koru
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Çiçek SVG komponenti - Zarif orkide/gül tasarımı
  const FlowerIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Merkez çiçek */}
      <circle cx="12" cy="10" r="2.5" fill="currentColor" opacity="0.9" />

      {/* Yapraklar - 5 yapraklı çiçek */}
      <ellipse
        cx="12"
        cy="5"
        rx="2.5"
        ry="4"
        fill="currentColor"
        opacity="0.7"
      />
      <ellipse
        cx="17"
        cy="8"
        rx="2.5"
        ry="4"
        fill="currentColor"
        opacity="0.6"
        transform="rotate(72 17 8)"
      />
      <ellipse
        cx="15.5"
        cy="14"
        rx="2.5"
        ry="4"
        fill="currentColor"
        opacity="0.5"
        transform="rotate(144 15.5 14)"
      />
      <ellipse
        cx="8.5"
        cy="14"
        rx="2.5"
        ry="4"
        fill="currentColor"
        opacity="0.5"
        transform="rotate(-144 8.5 14)"
      />
      <ellipse
        cx="7"
        cy="8"
        rx="2.5"
        ry="4"
        fill="currentColor"
        opacity="0.6"
        transform="rotate(-72 7 8)"
      />

      {/* Sap */}
      <path
        d="M12 12 L12 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Yaprak detayları */}
      <path
        d="M12 16 Q9 14 7 16 Q9 18 12 16"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M12 18 Q15 16 17 18 Q15 20 12 18"
        fill="currentColor"
        opacity="0.4"
      />

      {/* Parlama */}
      <circle cx="11" cy="9" r="0.5" fill="white" opacity="0.6" />
    </svg>
  );

  return (
    <>
      {/* Chat Button - Dikkat Çekici Floating Design */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[9999] transition-all duration-500 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Parfüm Danışmanı"
      >
        <div className="relative group">
          {/* Sürekli görünen pulse ring - dikkat çekici */}
          <div className="absolute -inset-2 bg-gradient-to-r from-gold via-amber-400 to-gold rounded-full blur-md opacity-60 animate-pulse"></div>
          <div className="absolute -inset-4 bg-gradient-to-r from-gold/30 via-amber-300/20 to-gold/30 rounded-full blur-xl opacity-50 animate-[pulse_2s_ease-in-out_infinite]"></div>

          {/* Main button - Daha büyük ve belirgin */}
          <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 bg-gradient-to-br from-slate-900 via-navy to-slate-800 rounded-full shadow-[0_8px_32px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-gold/60 overflow-hidden">
            {/* İç cam efekti */}
            <div className="absolute inset-1 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-full"></div>

            {/* Rotating shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[spin_4s_linear_infinite] opacity-50"></div>

            {/* Mira ikonu - kadın emoji */}
            <span className="text-3xl sm:text-4xl drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)] relative z-10">
              👩
            </span>
          </div>

          {/* Floating message bubble - 6 saniye sonra kaybolur */}
          <div
            className={`absolute -top-2 -left-36 sm:-left-44 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold to-amber-500 text-navy text-sm font-semibold rounded-2xl shadow-xl whitespace-nowrap border border-amber-300/50 transition-all duration-500 ${
              showBubble && !isOpen
                ? "opacity-100 animate-bounce"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <span>✨ Kokunu bulalım!</span>
            {/* Konuşma balonu ok işareti */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-b-[8px] border-l-[10px] border-transparent border-l-amber-500"></div>
          </div>

          {/* Hover tooltip - ek bilgi */}
          <div className="hidden sm:flex absolute bottom-full right-0 mb-4 items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-navy via-slate-800 to-navy text-white text-sm rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gold/40">
            <span className="text-gold">✨</span>
            <span className="font-medium">Koku Danışmanı Mira</span>
            <div className="absolute top-full right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-slate-800"></div>
          </div>
        </div>
      </button>

      {/* Chat Window - Mobile Optimized with Fancy Design */}
      <div
        className={`fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop blur for mobile */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>

        <div className="relative w-full h-full sm:w-[420px] sm:h-[750px] sm:max-h-[92vh] bg-gradient-to-br from-slate-950 via-navy to-slate-900 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border-0 sm:border sm:border-gold/40">
          {/* Decorative top gold bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20"></div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/10 to-transparent pointer-events-none"></div>

          {/* Header - Lüks Parfüm Temalı */}
          <div className="bg-gradient-to-r from-slate-900 via-navy to-slate-900 px-5 py-4 border-b border-gold/40 flex-shrink-0 relative overflow-hidden">
            {/* Background art deco pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(45deg, gold 0, gold 1px, transparent 0, transparent 50%),
                    repeating-linear-gradient(-45deg, gold 0, gold 1px, transparent 0, transparent 50%)
                  `,
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            {/* Subtle shine effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full animate-pulse"
              style={{ animationDuration: "3s" }}
            ></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                {/* Avatar - Parfüm şişesi temalı */}
                <div className="relative">
                  {/* Outer ring */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-gold via-amber-400 to-gold rounded-xl opacity-60 blur-sm"></div>

                  {/* Main avatar container */}
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-navy flex items-center justify-center shadow-xl border border-gold/50 overflow-hidden">
                    {/* Glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>

                    {/* Mira emojisi */}
                    <span className="text-xl relative z-10">👩</span>

                    {/* Shine */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg tracking-wide flex items-center gap-2">
                    <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
                      {botName}
                    </span>
                    <span className="text-gold text-sm">✦</span>
                  </h3>
                  <p className="text-gray-400 text-xs flex items-center gap-2 tracking-wide">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    Parfüm Danışmanı
                  </p>
                </div>
              </div>

              {/* Close button - elegant */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-gold/20 hover:border-gold/40 shadow-lg"
              >
                <X className="w-4 h-4 text-gold/80" />
              </button>
            </div>
          </div>

          {/* Messages - Enhanced */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-900/80 to-navy/90">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-2 ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex gap-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gold/30 rounded-lg blur-sm"></div>
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-navy flex items-center justify-center shadow-md border border-gold/40">
                        <span className="text-sm">👩</span>
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-gold to-amber-500 text-navy rounded-2xl rounded-br-sm shadow-lg border border-amber-400/30"
                        : "bg-white/10 backdrop-blur-sm text-white rounded-2xl rounded-bl-sm shadow-md border border-white/10"
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      {parseMarkdown(message.content)}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/20 to-amber-500/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                      <span className="text-sm">💎</span>
                    </div>
                  )}
                </div>

                {/* Recommended Products Links - Kompakt */}
                {message.role === "assistant" &&
                  message.recommendedProducts &&
                  message.recommendedProducts.length > 0 && (
                    <div className="ml-10 flex flex-wrap gap-1.5 max-w-[85%]">
                      {message.recommendedProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/parfum/${product.id}`}
                          className="group px-2.5 py-1.5 bg-gold/15 hover:bg-gold/25 rounded-full border border-gold/30 hover:border-gold/50 transition-all duration-200 flex items-center gap-1.5"
                        >
                          <span className="text-xs font-medium text-gold truncate max-w-[120px]">
                            {product.name}
                          </span>
                          <ExternalLink className="w-3 h-3 text-gold/60 group-hover:text-gold flex-shrink-0 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  )}

                {/* Quick Options - Seçenekli Cevaplar (ürün önerisi yoksa göster) */}
                {message.role === "assistant" &&
                  message.options &&
                  message.options.length > 0 &&
                  !message.recommendedProducts?.length &&
                  message.id === messages[messages.length - 1]?.id && (
                    <div className="ml-10 flex flex-wrap gap-1.5 max-w-[95%] mt-1">
                      {message.options.map((option, idx) => (
                        <button
                          key={`option-${message.id}-${idx}`}
                          onClick={() => handleSuggestionClick(option.value)}
                          disabled={isLoading}
                          className="px-3 py-2 bg-gradient-to-r from-slate-800/90 to-navy/90 hover:from-gold/25 hover:to-amber-500/25 text-gray-200 hover:text-gold text-xs rounded-lg transition-all duration-300 border border-gold/30 hover:border-gold/60 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md hover:shadow-gold/10 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing Indicator - Lüks Parfüm Temalı */}
            {isTyping && (
              <div className="flex justify-start gap-2">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gold/30 rounded-lg blur-sm"></div>
                  <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-navy flex items-center justify-center shadow-md border border-gold/40">
                    <span className="text-sm animate-pulse">👩</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-800/80 to-navy/80 backdrop-blur-sm px-4 py-3 rounded-xl rounded-bl-none shadow-lg border border-gold/20">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-gradient-to-br from-gold to-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gradient-to-br from-amber-400 to-gold rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gradient-to-br from-gold to-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Start Options - Kompakt cinsiyet seçimi */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-5 py-3 border-t border-gold/20 bg-gradient-to-r from-slate-900/50 via-navy/30 to-slate-900/50 backdrop-blur-sm flex-shrink-0">
              <p className="text-xs text-gold/60 mb-2 px-1 flex items-center gap-2">
                <span>✦</span> Hızlı başlangıç
              </p>
              <div className="flex gap-2">
                {quickStartOptions.map((option, idx) => (
                  <button
                    key={`quick-${idx}`}
                    onClick={() => handleSuggestionClick(option.query)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-slate-800/80 to-navy/80 hover:from-gold/20 hover:to-amber-500/20 text-gray-300 hover:text-gold text-sm rounded-xl transition-all duration-300 border border-gold/20 hover:border-gold/50 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-gold/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input - Enhanced */}
          <div className="p-4 bg-gradient-to-t from-slate-900/95 to-slate-900/80 border-t border-gold/20 backdrop-blur-sm flex-shrink-0">
            {/* Soru sayacı göstergesi */}
            {questionCount > 0 && (
              <div className="text-xs text-gray-500 text-center mb-2">
                {questionCount}/15 soru kullanıldı
              </div>
            )}
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  questionCount >= 15
                    ? "Soru hakkın doldu"
                    : "Mesajınızı yazın..."
                }
                className="flex-1 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:bg-white/15 text-white placeholder-gray-400 border border-white/10 focus:border-gold/30 transition-all shadow-sm"
                disabled={isLoading || questionCount >= 15}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading || questionCount >= 15}
                className="relative w-12 h-12 bg-gradient-to-br from-gold to-amber-500 rounded-full flex items-center justify-center disabled:opacity-50 hover:from-amber-400 hover:to-amber-600 active:scale-95 transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed border border-amber-400/30 group"
              >
                <Send className="w-5 h-5 text-navy group-hover:scale-110 transition-transform" />
                {!input.trim() || isLoading || questionCount >= 15 ? (
                  <div className="absolute inset-0 rounded-full bg-white/20"></div>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
