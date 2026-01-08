"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Local development: http://localhost:3002/api
// Production: https://blueperfumery-backend.vercel.app/api
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3002/api"
    : "https://blueperfumery-backend.vercel.app/api");

// Samimi karşılama mesajları
const GREETING_MESSAGES = [
  "Merhaba! ✨ Hoş geldiniz Blue Perfumery'ye! Ben Mavi, parfüm danışmanınız. Size nasıl yardımcı olabilirim?",
  "Selam! 💫 Blue Perfumery'ye hoş geldiniz! Ben Mavi. Bugün size özel bir koku mu arıyorsunuz?",
  "Merhaba! 🌟 Ben Mavi, kişisel parfüm danışmanınız. Hayalinizdeki kokuyu birlikte bulalım mı?",
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
          <div className="relative bg-navy/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 max-w-[220px] border border-gold/30">
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-navy/95 transform rotate-45 border-r border-b border-gold/30"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-navy font-heading font-bold text-lg">
                  M
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Merhaba! 👋</p>
                <p className="text-xs text-gray-400">
                  Size yardımcı olabilir miyim?
                </p>
              </div>
            </div>
            <button
              className="absolute -top-2 -right-2 w-6 h-6 bg-white/10 rounded-full text-gray-400 text-xs hover:bg-white/20 transition-colors flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
            >
              <X className="w-3 h-3" />
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
        <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20"></div>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold via-amber-500 to-gold opacity-50 blur-sm group-hover:opacity-80 transition-opacity"></div>

        {/* Main Button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-navy via-slate-800 to-navy rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gold/30">
          {/* Icon */}
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-gold" />
            {/* Online Indicator */}
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-navy animate-pulse"></span>
          </div>
        </div>

        {/* Hover Label */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10">
          Parfüm Danışmanı Mavi ✨
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-navy"></div>
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
        <div className="w-[380px] h-[550px] bg-navy/95 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-navy via-slate-800 to-navy px-5 py-4 border-b border-gold/20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-lg">
                    <span className="text-navy font-heading font-bold text-xl">
                      M
                    </span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-navy"></span>
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold text-lg">
                    Mavi
                  </h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                    Parfüm Danışmanı • Çevrimiçi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-900/50 to-navy/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                    <span className="text-navy font-heading font-bold text-sm">
                      M
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gold text-navy rounded-2xl rounded-br-sm shadow-lg"
                      : "bg-white/5 backdrop-blur-sm text-white rounded-2xl rounded-bl-sm shadow-md border border-white/10"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1.5 ${
                      message.role === "user" ? "text-navy/60" : "text-gray-500"
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                  <span className="text-navy font-heading font-bold text-sm">
                    M
                  </span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 bg-gold/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gold/60 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gold/60 rounded-full animate-bounce"
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
              <p className="text-xs text-gray-500 mb-2">Hızlı sorular:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(suggestion);
                    }}
                    className="px-3 py-1.5 bg-white/5 hover:bg-gold/10 hover:text-gold text-gray-400 text-xs rounded-full transition-colors border border-white/10 hover:border-gold/30"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-slate-900/50 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 text-white placeholder-gray-500 border border-white/10"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-light hover:scale-105 transition-all duration-200 active:scale-95"
              >
                <Send className="w-5 h-5 text-navy" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI destekli kişisel parfüm danışmanınız ✨
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
