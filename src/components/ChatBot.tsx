"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Local development: http://localhost:3001/api
// Production: https://blueperfumery-backend.vercel.app/api
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001/api"
    : "https://blueperfumery-backend.vercel.app/api");

// Samimi karşılama mesajları
const GREETING_MESSAGES = [
  "Merhaba! 🌸 Ben Mavi. Size nasıl yardımcı olabilirim?",
  "Selam! 💫 Bugün size özel bir koku mu arıyorsunuz?",
  "Merhaba! ✨ Hayalinizdeki kokuyu birlikte bulalım mı?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsTyping(false);

      let assistantContent = "";
      if (response.ok && data.success && data.data?.message) {
        assistantContent = data.data.message;
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
      };

      setMessages((prev) => [...prev, assistantMessage]);
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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Öneri butonları
  const suggestions = ["Erkek parfümü öner", "Yazlık parfüm", "En popüler?"];

  return (
    <>
      {/* Chat Button - Sade ve Samimi */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Parfüm Danışmanı"
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-amber-500 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-navy" />
          {/* Online dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
        </div>
      </button>

      {/* Chat Window - Mobile Optimized */}
      <div
        className={`fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full h-full sm:w-[360px] sm:h-[500px] sm:max-h-[80vh] bg-navy sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-0 sm:border sm:border-white/10">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy to-slate-800 px-4 py-3 border-b border-gold/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center">
                  <span className="text-lg">🌸</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">Mavi</h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Çevrimiçi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs">🌸</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 ${
                    message.role === "user"
                      ? "bg-gold text-navy rounded-2xl rounded-br-sm"
                      : "bg-white/10 text-white rounded-2xl rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-xs">🌸</span>
                </div>
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center gap-1">
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
            <div className="px-4 py-2 border-t border-white/5 flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-gold/20 hover:text-gold text-gray-400 text-xs rounded-full transition-colors border border-white/10"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-slate-900/80 border-t border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-4 py-2.5 bg-white/5 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 text-white placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-amber-500 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4 text-navy" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
