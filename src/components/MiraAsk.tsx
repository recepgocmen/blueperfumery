"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { askMira } from "@/lib/catalog";

const EXAMPLES = [
  "Yaz için ferah bir şey önerir misin?",
  "Akşam yemeği için kalıcı bir koku arıyorum",
  "Vanilyalı ama çok tatlı olmayan hangisi?",
];

const MiraAsk = () => {
  const [question, setQuestion] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = question.trim();
    if (!text) return;
    askMira(text);
    setQuestion("");
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <div>
        <h2 data-reveal="heading" className="max-w-[16ch] text-[2.25rem] leading-[1.1] lg:text-[3.25rem]">
          Karar veremedin mi? <em>Mira&apos;ya sor.</em>
        </h2>
        <p className="mt-5 max-w-[48ch] text-ink-soft">
          Mira, sitenin yapay zeka koku danışmanı. Yalnızca raftaki parfümlerden
          öneri yapar.
        </p>
      </div>

      <div data-reveal="tile" className="lg:pt-3">
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="mira-question" className="sr-only">
            Mira&apos;ya sorunu yaz
          </label>
          <input
            id="mira-question"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ofise uygun, ağır olmayan bir koku arıyorum"
            className="min-h-14 flex-1 rounded-none border-0 border-b border-ink/40 bg-transparent px-0 text-lg text-ink transition-colors duration-300 placeholder:text-ink-soft focus:border-brand sm:text-xl"
          />
          <button type="submit" className="btn-brand min-h-14 shrink-0">
            Mira&apos;ya sor
          </button>
        </form>

        <ul className="mt-8 flex flex-col items-start gap-1">
          {EXAMPLES.map((example) => (
            <li key={example}>
              <button
                type="button"
                onClick={() => askMira(example)}
                className="link min-h-11 text-left text-ink transition-transform duration-300 ease-pour hover:translate-x-1"
              >
                &ldquo;{example}&rdquo;
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-ink-soft">
          Ya da{" "}
          <Link href="/parfumunu-bul" className="link text-ink">
            beş soruluk testi çöz
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default MiraAsk;
