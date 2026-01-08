"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://blueperfumery-backend.vercel.app/api";

// Samimi karşılama mesajları
const GREETING_MESSAGES = [
  "Merhaba! 🌸 Hoş geldiniz Blue Perfumery'ye! Ben Mira, parfüm danışmanınız. Size nasıl yardımcı olabilirim?",
  "Selam! ✨ Blue Perfumery'ye hoş geldiniz! Ben Mira. Bugün size özel bir koku mu arıyorsunuz?",
  "Merhaba! 💫 Ben Mira, kişisel parfüm danışmanınız. Hayalinizdeki kokuyu birlikte bulalım mı?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sayfa yüklenince 3 saniye sonra bubble göster
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowBubble(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Chat açılınca karşılama mesajı
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setIsTyping(true);
      const randomGreeting =
        GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)];

      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: randomGreeting,
            timestamp: new Date(),
          },
        ]);
        setHasGreeted(true);
      }, 1500);
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

    try {
      const response = await fetch(`${API_BASE_URL}/agent/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      // Daha doğal hissettirmek için kısa gecikme
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsTyping(false);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.success
          ? data.data.message
          : "Hmm, şu an bir sorun yaşıyorum. Biraz sonra tekrar dener misiniz? 🙏",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Bağlantıda bir sorun var gibi görünüyor. Lütfen biraz sonra tekrar deneyin. 💫",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowBubble(false);
  };

  // Öneri butonları
  const suggestions = [
    "Erkek parfümü öner",
    "Yazlık parfüm istiyorum",
    "En popüler hangisi?",
  ];

  return (
    <>
      {/* Attention Bubble */}
      {showBubble && !isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 animate-bounce-slow cursor-pointer"
          onClick={handleOpen}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-[220px] border border-gray-100">
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white text-lg">👩</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Merhaba! 👋</p>
                <p className="text-xs text-gray-500">
                  Size yardımcı olabilir miyim?
                </p>
              </div>
            </div>
            <button
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full text-gray-500 text-xs hover:bg-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-500 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Parfüm Danışmanı ile Sohbet"
      >
        {/* Outer Ring Animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 animate-ping opacity-30"></div>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 opacity-70 blur-sm group-hover:opacity-100 transition-opacity animate-pulse"></div>

        {/* Main Button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {/* Avatar */}
          <div className="relative">
            <span className="text-2xl">👩‍💼</span>
            {/* Online Indicator */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
          </div>
        </div>

        {/* Hover Label */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          Parfüm Danışmanı Mira 💄
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 px-5 py-4">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Mira</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                    Parfüm Danışmanı • Çevrimiçi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                    <span className="text-sm">👩</span>
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl rounded-br-md shadow-lg"
                      : "bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-md border border-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1.5 ${
                      message.role === "user"
                        ? "text-white/70"
                        : "text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                  <span className="text-sm">👩</span>
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-md border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-400 mb-2">Hızlı sorular:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(suggestion);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-600 text-xs rounded-full transition-colors border border-gray-200 hover:border-rose-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 text-gray-800 placeholder-gray-400 pr-12"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              AI destekli kişisel parfüm danışmanınız 💄
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
