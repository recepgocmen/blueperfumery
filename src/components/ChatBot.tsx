"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { buyUrl, dotted } from "@/lib/catalog";
import Price from "./Price";
import ProductImage from "./ProductImage";

type ChatProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  ml: number;
  image?: string;
  notes: string[];
};

type Message = {
  id: string;
  role: "user" | "mira";
  text: string;
  products?: ChatProduct[];
  quickReplies?: string[];
};

type Failure = "network" | "rate";

const VISITOR_KEY = "bp_visitor_id";
const SESSION_KEY = "bp_chat_session";
const MESSAGES_KEY = "bp_chat_messages";
const MAX_LENGTH = 500;
const TIMEOUT_MS = 30_000;

const STARTERS = [
  "Bana bir parfüm öner",
  "Ofis için hafif bir koku",
  "Vanilyalı kokuları göster",
  "Hediye için ne önerirsin?",
];

const FAILURE_TEXT: Record<Failure, string> = {
  network: "Şu an yanıt veremiyorum. Tekrar dener misin?",
  rate: "Çok hızlı gittik. Birkaç saniye sonra tekrar dene.",
};

const storedId = (storage: Storage, key: string) => {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  storage.setItem(key, id);
  return id;
};

const readSavedMessages = (): Message[] => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(MESSAGES_KEY) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const fetchReply = async (
  message: string,
  signal: AbortSignal,
): Promise<Message | Failure> => {
  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: storedId(sessionStorage, SESSION_KEY),
        visitorId: storedId(localStorage, VISITOR_KEY),
        message,
      }),
      signal,
    });
    if (res.status === 429) return "rate";
    const body = await res.json();
    const data = body?.data;
    if (!res.ok || !body?.success || typeof data?.reply !== "string") {
      return "network";
    }
    return {
      id: crypto.randomUUID(),
      role: "mira",
      text: data.reply,
      products: Array.isArray(data.products) ? data.products : [],
      quickReplies: Array.isArray(data.quickReplies) ? data.quickReplies : [],
    };
  } catch {
    return "network";
  }
};

const outlineButton =
  "inline-flex min-h-11 items-center border border-ink/30 px-4 text-left text-sm transition-colors duration-200 hover:bg-ink/5";

const ProductRow = ({ product }: { product: ChatProduct }) => (
  <li className="flex gap-4 border-t border-ink/15 py-4 first:border-t-0">
    <div className="relative size-[4.5rem] shrink-0 bg-sand">
      <ProductImage product={product} sizes="72px" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="font-display text-lg leading-tight">{product.name}</p>
      <p className="mt-0.5 text-[0.9375rem] text-ink-soft">
        {dotted(product.notes.slice(0, 3))}
      </p>
      <p className="text-[0.9375rem] tabular-nums">
        <Price product={product} /> · {product.ml} ml
      </p>
      <div className="flex gap-5 text-sm">
        <Link
          href={`/parfum/${product.id}`}
          className="link inline-flex min-h-11 items-center"
        >
          İncele
        </Link>
        <a
          href={buyUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-flex min-h-11 items-center"
        >
          Satın al
        </a>
      </div>
    </div>
  </li>
);

const Typing = () => (
  <p className="flex items-center gap-2 text-sm text-ink-soft">
    Mira yazıyor
    <span aria-hidden="true" className="flex gap-1">
      {[0, 200, 400].map((delay) => (
        <span
          key={delay}
          className="size-1.5 animate-glint bg-gold-ink"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  </p>
);

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [restored, setRestored] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<Failure | null>(null);
  const [viewport, setViewport] = useState<{ height: number; top: number }>();

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const stickRef = useRef(true);
  const openedRef = useRef(false);
  const sendRef = useRef<(text: string) => void>(() => {});

  const ask = async (text: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    setPending(true);
    setFailure(null);

    const result = await fetchReply(text, controller.signal);
    clearTimeout(timer);
    if (abortRef.current !== controller) return;
    abortRef.current = null;
    setPending(false);
    if (typeof result === "string") {
      setFailure(result);
      return;
    }
    setMessages((prev) => [...prev, result]);
  };

  const send = (text: string) => {
    const message = text.trim().slice(0, MAX_LENGTH);
    if (!message || pending) return;
    stickRef.current = true;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: message },
    ]);
    ask(message);
  };
  sendRef.current = send;

  const retry = () => {
    const lastUser = messages.findLast((message) => message.role === "user");
    if (lastUser) ask(lastUser.text);
  };

  const startOver = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setPending(false);
    setFailure(null);
    setMessages([]);
    sessionStorage.setItem(SESSION_KEY, crypto.randomUUID());
    inputRef.current?.focus();
  };

  const close = () => setOpen(false);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!draft.trim() || pending) return;
    send(draft);
    setDraft("");
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    if (event.nativeEvent.isComposing) return;
    event.preventDefault();
    submit();
  };

  useEffect(() => {
    setMessages(readSavedMessages());
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }, [messages, restored]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      setOpen(true);
      const question = (event as CustomEvent<string | undefined>).detail;
      if (typeof question === "string" && question.trim()) {
        sendRef.current(question);
      }
    };
    window.addEventListener("mira:open", onOpen);
    return () => window.removeEventListener("mira:open", onOpen);
  }, []);

  useEffect(() => {
    if (open) {
      openedRef.current = true;
      inputRef.current?.focus();
      return;
    }
    if (openedRef.current) launcherRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const visual = window.visualViewport;
    if (!open || !visual) return;
    const update = () =>
      setViewport({ height: visual.height, top: visual.offsetTop });
    update();
    visual.addEventListener("resize", update);
    visual.addEventListener("scroll", update);
    return () => {
      visual.removeEventListener("resize", update);
      visual.removeEventListener("scroll", update);
    };
  }, [open]);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread || !stickRef.current) return;
    // A new reply opens at its first line; anything else keeps the thread at the bottom.
    const last = messages.at(-1);
    const reply =
      last?.role === "mira" && !pending
        ? thread.querySelector<HTMLElement>(`[data-reply="${last.id}"]`)
        : null;
    thread.scrollTop = reply
      ? reply.getBoundingClientRect().top -
        thread.getBoundingClientRect().top +
        thread.scrollTop -
        20
      : thread.scrollHeight;
  }, [messages, pending, failure, open]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
  }, [draft, open]);

  const onThreadScroll = () => {
    const thread = threadRef.current;
    if (!thread) return;
    stickRef.current =
      thread.scrollHeight - thread.scrollTop - thread.clientHeight < 48;
  };

  const latest = messages.at(-1);
  const viewportStyle = viewport
    ? ({
        "--mira-h": `${viewport.height}px`,
        "--mira-top": `${viewport.top}px`,
      } as CSSProperties)
    : undefined;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="mira-panel"
        className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-12 items-center gap-2 border border-gold bg-brand px-4 text-ivory sm:h-14 sm:gap-2.5 sm:px-5 transition-colors duration-200 hover:bg-brand-deep sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-6 ${
          open ? "invisible" : ""
        }`}
      >
        <MessageCircle
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-5 text-gold"
        />
        <span className="font-display text-lg italic sm:text-xl">Mira</span>
      </button>

      {open && (
        <div
          id="mira-panel"
          role="dialog"
          aria-label="Mira ile sohbet"
          onKeyDown={(event) => event.key === "Escape" && close()}
          style={viewportStyle}
          className="fixed left-0 right-0 top-[var(--mira-top,0px)] z-[60] flex h-[var(--mira-h,100dvh)] animate-lift flex-col bg-ivory text-ink sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:shadow-float sm:left-auto sm:right-6 sm:top-auto sm:h-[min(40rem,calc(100dvh-3rem))] sm:w-[26rem]"
        >
          <header className="flex items-start justify-between gap-4 bg-brand py-3 pl-5 pr-2 text-ivory">
            <div className="pt-1">
              <h2 className="text-2xl leading-none">Mira</h2>
              <p className="mt-1.5 text-sm text-ivory/85">
                Blue Parfüm koku danışmanı
              </p>
            </div>
            <div className="flex items-center">
              {(messages.length > 0 || pending) && (
                <button
                  type="button"
                  onClick={startOver}
                  className="link min-h-11 px-3 text-sm text-ivory"
                >
                  Yeni sohbet
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Sohbeti kapat"
                className="inline-flex size-11 items-center justify-center text-ivory transition-colors duration-200 hover:bg-ivory/10"
              >
                <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
              </button>
            </div>
          </header>

          <div
            ref={threadRef}
            onScroll={onThreadScroll}
            role="log"
            aria-live="polite"
            className="flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 text-base leading-relaxed"
          >
            {messages.length === 0 && !pending && (
              <div>
                <p className="max-w-[34ch]">
                  Merhaba, ben Mira. Sana yalnızca Blue Parfüm&apos;ün
                  rafındaki parfümlerden öneri yaparım; ne aradığını anlat.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => send(starter)}
                      className={outlineButton}
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) =>
              message.role === "user" ? (
                <p
                  key={message.id}
                  className="ml-auto w-fit max-w-[85%] animate-rise whitespace-pre-line break-words bg-brand px-4 py-2.5 text-ivory"
                >
                  {message.text}
                </p>
              ) : (
                <div key={message.id} data-reply={message.id} className="animate-rise">
                  <p className="whitespace-pre-line break-words">
                    {message.text}
                  </p>
                  {!!message.products?.length && (
                    <ul className="mt-3 border-y border-ink/15">
                      {message.products.map((product) => (
                        <ProductRow key={product.id} product={product} />
                      ))}
                    </ul>
                  )}
                  {message === latest &&
                    !pending &&
                    !failure &&
                    !!message.quickReplies?.length && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            type="button"
                            onClick={() => send(reply)}
                            className={outlineButton}
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ),
            )}

            {pending && <Typing />}

            {failure && (
              <div className="text-sm">
                <p>{FAILURE_TEXT[failure]}</p>
                <button type="button" onClick={retry} className="link min-h-11">
                  Tekrar dene
                </button>
              </div>
            )}
          </div>

          <form
            onSubmit={submit}
            className="border-t border-ink/15 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3"
          >
            <div className="flex items-end gap-2">
              <label htmlFor="mira-input" className="sr-only">
                Mira&apos;ya mesajın
              </label>
              <textarea
                id="mira-input"
                ref={inputRef}
                rows={1}
                value={draft}
                maxLength={MAX_LENGTH}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Ne arıyorsun?"
                className="max-h-[8.75rem] min-h-11 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-2.5 text-base leading-6 placeholder:text-ink-soft"
              />
              <button
                type="submit"
                disabled={!draft.trim() || pending}
                aria-label="Gönder"
                className="inline-flex size-11 shrink-0 items-center justify-center bg-brand text-ivory transition-colors duration-200 hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5"
                />
              </button>
            </div>
            {draft.length >= MAX_LENGTH - 50 && (
              <p className="mt-1 px-2 text-right text-xs tabular-nums text-ink-soft">
                {draft.length}/{MAX_LENGTH}
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
