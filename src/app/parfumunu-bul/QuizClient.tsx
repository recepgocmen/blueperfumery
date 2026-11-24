"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { ArrowLeft, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import type { Product } from "@/lib/api";
import {
  FAMILIES,
  askMira,
  audienceLabel,
  buyUrl,
  capitalize,
} from "@/lib/catalog";
import {
  AUDIENCES,
  EMPTY_ANSWERS,
  MOMENTS,
  QUESTION_COUNT,
  QUESTION_TITLES,
  TRAILS,
  rankProducts,
  reasonSentence,
  topNotes,
  type Answers,
  type Audience,
  type Moment,
  type Ranked,
  type Trail,
} from "@/lib/quiz";
import ProductImage from "@/components/ProductImage";
import Price from "@/components/Price";
import ProductTile from "@/components/ProductTile";

const ADVANCE_DELAY = 500;
const NAV_KEYS = [
  "ArrowDown",
  "ArrowUp",
  "ArrowRight",
  "ArrowLeft",
  "Home",
  "End",
];

type Option = { value: string; label: string };

type View = {
  product?: { id: string; name: string; image?: string };
  title: string;
  text: string;
};

const moveFocus = (event: KeyboardEvent<HTMLUListElement>) => {
  if (!NAV_KEYS.includes(event.key)) return;
  const buttons = [...event.currentTarget.querySelectorAll("button")];
  const index = buttons.findIndex(
    (button) => button === document.activeElement,
  );
  if (index < 0) return;
  event.preventDefault();
  const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : (index + step + buttons.length) % buttons.length;
  buttons[next].focus();
};

// No id: ProductImage resolves it to the shared, unbranded bottle photo.
const PLAIN_BOTTLE = { id: "", name: "Blue Parfüm" };

const panelView = (started: boolean, leader?: Ranked): View => {
  if (!started)
    return {
      product: PLAIN_BOTTLE,
      title: "Blue Parfüm",
      text: "Cevapladıkça şişen belirecek.",
    };
  if (!leader)
    return {
      title: "Henüz şişe yok",
      text: "Bu seçime uyan bir şişe bulamadık.",
    };
  return {
    product: leader.product,
    title: leader.product.name,
    text:
      reasonSentence(leader.reasons) || "Seçtikçe sıralama yeniden kurulacak.",
  };
};

type MenuProps = {
  options: Option[];
  isSelected: (value: string) => boolean;
  onPick: (value: string) => void;
  multi?: boolean;
  columns?: boolean;
};

const OptionMenu = ({
  options,
  isSelected,
  onPick,
  multi,
  columns,
}: MenuProps) => (
  <ul
    role={multi ? "group" : "radiogroup"}
    aria-labelledby="quiz-question"
    onKeyDown={moveFocus}
    className={`border-t border-ink/20 ${columns ? "sm:grid sm:grid-cols-2 sm:gap-x-8" : ""}`}
  >
    {options.map((option, index) => {
      const selected = isSelected(option.value);
      return (
        <li
          key={option.value}
          className="animate-rise border-b border-ink/20"
          style={{ animationDelay: `${index * 35}ms` }}
        >
          <button
            type="button"
            role={multi ? undefined : "radio"}
            aria-checked={multi ? undefined : selected}
            aria-pressed={multi ? selected : undefined}
            onClick={() => onPick(option.value)}
            className={`relative isolate flex min-h-14 w-full items-center gap-4 px-4 py-2 text-left font-display text-2xl leading-tight transition-[background-color] duration-200 before:absolute before:inset-0 before:-z-10 before:origin-left before:bg-brand before:transition-transform before:duration-[450ms] before:ease-pour focus-visible:[outline-offset:-2px] lg:text-[1.75rem] ${
              selected
                ? "text-ivory before:scale-x-100"
                : "text-ink before:scale-x-0 active:bg-sand [@media(hover:hover)]:hover:bg-sand"
            }`}
          >
            <span
              aria-hidden
              className={`flex size-5 shrink-0 items-center justify-center border transition-colors duration-150 ${
                selected ? "border-ivory bg-brand" : "border-ink"
              }`}
            >
              {selected && (
                <Check strokeWidth={2} className="size-4 text-ivory" />
              )}
            </span>
            {option.label}
          </button>
        </li>
      );
    })}
  </ul>
);

type Shot = View["product"];

// Keeps the previous photograph mounted under the one that pours in, so a change never blanks to navy.
const useLayers = (product: Shot) => {
  const [current, setCurrent] = useState<Shot>(product);
  const [previous, setPrevious] = useState<Shot>(undefined);
  if (product?.id !== current?.id) {
    setPrevious(current);
    setCurrent(product);
  }
  return {
    current,
    previous: previous?.id === current?.id ? undefined : previous,
  };
};

const LivePanel = ({ view }: { view: View }) => {
  const { current, previous } = useLayers(view.product);
  return (
    <aside
      aria-label="Şu an en yakın"
      className="hidden bg-brand text-ivory lg:sticky lg:top-36 lg:flex lg:h-[calc(100svh-9rem)] lg:flex-col lg:self-start"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden bg-brand-deep">
        {previous && (
          <div key={`under-${previous.id}`} className="absolute inset-0">
            <ProductImage
              product={previous}
              sizes="(min-width: 1280px) 32rem, 26rem"
            />
          </div>
        )}
        {current && (
          <div key={current.id} className="absolute inset-0 animate-pour">
            <ProductImage
              product={current}
              sizes="(min-width: 1280px) 32rem, 26rem"
            />
          </div>
        )}
      </div>
      <div aria-live="polite" className="px-10 pb-10 pt-8">
        <p
          key={view.title}
          className="animate-rise font-display text-4xl leading-tight"
        >
          {view.title}
        </p>
        <p
          key={view.text}
          className="mt-3 max-w-[65ch] animate-rise text-ivory/80"
        >
          {view.text}
        </p>
      </div>
    </aside>
  );
};

const LiveStrip = ({ view }: { view: View }) => {
  const { current, previous } = useLayers(view.product);
  return (
    <aside
      aria-label="Şu an en yakın"
      className="sticky top-[4.5rem] z-10 -mx-5 mt-6 flex min-h-24 items-center gap-4 bg-brand px-5 py-3 text-ivory sm:-mx-10 sm:px-10 lg:hidden"
    >
      {current && (
        <div className="relative h-[4.5rem] w-14 shrink-0 overflow-hidden bg-brand-deep">
          {previous && (
            <div key={`under-${previous.id}`} className="absolute inset-0">
              <ProductImage product={previous} sizes="56px" />
            </div>
          )}
          <div key={current.id} className="absolute inset-0 animate-pour">
            <ProductImage product={current} sizes="56px" />
          </div>
        </div>
      )}
      <div aria-live="polite" className="min-w-0">
        <p
          key={view.title}
          className="animate-rise truncate font-display text-xl"
        >
          {view.title}
        </p>
        <p
          key={view.text}
          className="animate-rise truncate text-sm text-ivory/80"
        >
          {view.text}
        </p>
      </div>
    </aside>
  );
};

const QuizClient = ({ products }: { products: Product[] }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const moved = useRef(false);

  const ranked = useMemo(
    () => rankProducts(products, answers),
    [products, answers],
  );
  const notes = useMemo(
    () => topNotes(products, answers.audience),
    [products, answers.audience],
  );

  useEffect(() => {
    if (moved.current) headingRef.current?.focus();
  }, [step]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const goTo = (next: number) => {
    window.clearTimeout(timer.current);
    moved.current = true;
    setStep(next);
  };

  const pickSingle = (patch: Partial<Answers>) => {
    setAnswers((current) => ({ ...current, ...patch }));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => goTo(step + 1), ADVANCE_DELAY);
  };

  const toggle = (key: "families" | "notes", value: string) =>
    setAnswers((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));

  const restart = () => {
    setAnswers(EMPTY_ANSWERS);
    goTo(0);
  };

  if (!products.length)
    return (
      <div className="px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pt-36">
        <h1 className="text-4xl sm:text-5xl">Parfümünü bul</h1>
        <p className="mt-4 max-w-[65ch] text-ink-soft">
          Şu an gösterebileceğimiz bir şişe yok. Koleksiyona oradan göz
          atabilirsin.
        </p>
        <Link href="/satin-al" className="btn-brand mt-8">
          Koleksiyona git
        </Link>
      </div>
    );

  if (step === QUESTION_COUNT)
    return (
      <QuizResult ranked={ranked} headingRef={headingRef} onRestart={restart} />
    );

  const questions = [
    {
      options: AUDIENCES,
      isSelected: (value: string) => answers.audience === value,
      onPick: (value: string) =>
        pickSingle({
          audience: value as Audience,
          notes: value === answers.audience ? answers.notes : [],
        }),
    },
    {
      options: FAMILIES.map((family) => ({
        value: family,
        label: capitalize(family),
      })),
      isSelected: (value: string) => answers.families.includes(value),
      onPick: (value: string) => toggle("families", value),
      hint: "Birden fazla seçebilirsin.",
      multi: true,
    },
    {
      options: MOMENTS,
      isSelected: (value: string) => answers.moment === value,
      onPick: (value: string) => pickSingle({ moment: value as Moment }),
    },
    {
      options: TRAILS,
      isSelected: (value: string) => answers.trail === value,
      onPick: (value: string) => pickSingle({ trail: value as Trail }),
    },
    {
      options: notes.map((note) => ({ value: note, label: capitalize(note) })),
      isSelected: (value: string) => answers.notes.includes(value),
      onPick: (value: string) => toggle("notes", value),
      hint: notes.length
        ? "Birden fazla seçebilirsin; istersen geç."
        : "Bu seçime uyan nota listesi yok, geçebilirsin.",
      multi: true,
      columns: true,
    },
  ];
  const question = questions[step];
  const continueDisabled = step === 1 && !answers.families.length;
  const picked = step === 1 ? answers.families.length : answers.notes.length;
  const continueLabel =
    step === QUESTION_COUNT - 1 && !picked
      ? "Geç"
      : `${step === QUESTION_COUNT - 1 ? "Sonucu gör" : "Devam"}${picked ? ` (${picked})` : ""}`;

  return (
    <div className="pt-28 lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:pt-36 xl:grid-cols-[minmax(0,1fr)_32rem]">
      <div className="px-5 pb-24 sm:px-10 lg:px-16">
        <div className="max-w-[52rem]">
          <h1 className="sr-only">Parfümünü bul</h1>
          <div className="flex min-h-11 items-center justify-between gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="-ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-ink-soft transition-colors hover:text-brand"
              >
                <ArrowLeft size={18} strokeWidth={1.5} aria-hidden />
                Geri
              </button>
            ) : (
              <span />
            )}
            <p className="tabular-nums text-ink-soft">
              <span className="sr-only">Soru </span>
              {step + 1} / {QUESTION_COUNT}
            </p>
          </div>
          <div aria-hidden className="mt-2 h-px bg-ink/15">
            <div
              className="h-0.5 origin-left bg-gold-ink transition-transform duration-slow ease-pour"
              style={{
                transform: `translateY(-1px) scaleX(${(step + 1) / QUESTION_COUNT})`,
              }}
            />
          </div>

          <div key={`q${step}`} className="mt-10 lg:mt-14">
            <h2
              id="quiz-question"
              ref={headingRef}
              tabIndex={-1}
              className="animate-rise text-3xl focus:outline-none sm:text-4xl"
            >
              {QUESTION_TITLES[step]}
            </h2>
            {question.hint && (
              <p className="mt-2 animate-rise text-ink-soft">{question.hint}</p>
            )}
          </div>

          <LiveStrip view={panelView(step > 0, ranked[0])} />

          <div key={`o${step}`} className="mt-8 lg:mt-10">
            <OptionMenu
              options={question.options}
              isSelected={question.isSelected}
              onPick={question.onPick}
              multi={question.multi}
              columns={question.columns}
            />
            {question.multi && (
              <div className="sticky bottom-0 z-10 -mx-5 mt-6 bg-ground px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0">
                <button
                  type="button"
                  disabled={continueDisabled}
                  onClick={() => goTo(step + 1)}
                  className="btn-brand disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {continueLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LivePanel view={panelView(step > 0, ranked[0])} />
    </div>
  );
};

type ResultProps = {
  ranked: Ranked[];
  headingRef: RefObject<HTMLHeadingElement | null>;
  onRestart: () => void;
};

const QuizResult = ({ ranked, headingRef, onRestart }: ResultProps) => {
  const [top, ...rest] = ranked;
  const runnersUp = rest.slice(0, 2);
  const restartButton = (
    <button type="button" onClick={onRestart} className="btn-line mt-16">
      <RotateCcw size={18} strokeWidth={1.5} aria-hidden />
      Testi yeniden başlat
    </button>
  );

  if (!top)
    return (
      <div className="px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pt-36">
        <h1 className="sr-only">Parfümünü bul</h1>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-4xl focus:outline-none sm:text-5xl"
        >
          Bu seçimlere uyan bir şişe bulamadık.
        </h2>
        <p className="mt-4 max-w-[65ch] text-ink-soft">
          Koleksiyonun tamamına{" "}
          <Link href="/satin-al" className="link text-ink">
            buradan
          </Link>{" "}
          göz atabilirsin.
        </p>
        {restartButton}
      </div>
    );

  const { product } = top;

  return (
    <div className="px-5 pb-24 pt-28 sm:px-10 lg:px-16 lg:pt-36">
      <div className="mx-auto max-w-[90rem]">
        <h1 className="sr-only">Parfümünü bul</h1>
        <section className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="relative aspect-[4/5] animate-pour overflow-hidden bg-sand">
            <ProductImage
              product={product}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="animate-rise break-words text-[2.75rem] leading-[1.02] tracking-[-0.03em] focus:outline-none sm:text-6xl lg:text-7xl"
            >
              {product.name}
            </h2>
            <p className="mt-3 tabular-nums text-ink-soft">
              {audienceLabel(product)} · {product.ml} ml ·{" "}
              <Price product={product} />
            </p>
            <p className="mt-6 max-w-[65ch]">{product.description}</p>
            <h3 className="mt-10 text-2xl">Neden bu?</h3>
            <p className="mt-2 max-w-[65ch]">
              {reasonSentence(top.reasons) ||
                "Seçtiğin ailelerle birebir örtüşen bir şişe yok; bu, cevaplarına en yakın olanı."}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={buyUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand"
              >
                Satın al
                <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden />
              </a>
              <Link href={`/parfum/${product.id}`} className="btn-line">
                İncele
              </Link>
              <button
                type="button"
                onClick={() =>
                  askMira(
                    `Parfümünü Bul testinde bana ${product.name} çıktı, bu kokuyu anlatır mısın?`,
                  )
                }
                className="btn-line"
              >
                Mira&apos;ya danış
              </button>
            </div>
          </div>
        </section>

        {runnersUp.length > 0 && (
          <section aria-labelledby="quiz-runners-up" className="mt-20 lg:mt-28">
            <h2
              id="quiz-runners-up"
              data-reveal="heading"
              className="text-3xl sm:text-4xl"
            >
              {runnersUp.length > 1
                ? "Sana yakın iki şişe daha"
                : "Sana yakın bir şişe daha"}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-10 lg:max-w-[60rem]">
              {runnersUp.map((entry) => (
                <ProductTile key={entry.product.id} product={entry.product} />
              ))}
            </div>
          </section>
        )}

        {restartButton}
      </div>
    </div>
  );
};

export default QuizClient;
