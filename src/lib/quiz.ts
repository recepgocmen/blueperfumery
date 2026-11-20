import type { Product } from "./api";
import { FEATURED_IDS, forMen, forWomen } from "./catalog";

export type Audience = "female" | "male" | "any";
export type Moment = "day" | "night" | "everyday";
export type Trail = "light" | "lasting";

export type Answers = {
  audience?: Audience;
  families: string[];
  moment?: Moment;
  trail?: Trail;
  notes: string[];
};

export type Ranked = { product: Product; score: number; reasons: string[] };

type Trait<T extends string> = {
  value: T;
  label: string;
  reason: string;
  traits: string[];
};

export const EMPTY_ANSWERS: Answers = { families: [], notes: [] };

export const QUESTION_COUNT = 5;

export const QUESTION_TITLES = [
  "Kimin için?",
  "Hangi kokular seni çeker?",
  "Nerede süreceksin?",
  "Nasıl bir iz bırakmalı?",
  "Sevdiğin notalar var mı?",
];

export const AUDIENCES: { value: Audience; label: string }[] = [
  { value: "female", label: "Kadın" },
  { value: "male", label: "Erkek" },
  { value: "any", label: "Fark etmez" },
];

export const MOMENTS: Trait<Moment>[] = [
  {
    value: "day",
    label: "Gündüz, ofiste",
    reason: "gündüze ve ofise uyuyor",
    traits: [
      "ofis",
      "temiz",
      "hafif",
      "şık",
      "klasik",
      "çok yönlü",
      "ferah",
      "zarif",
    ],
  },
  {
    value: "night",
    label: "Gece, davette",
    reason: "geceye ve davete yakışıyor",
    traits: [
      "gece",
      "yoğun",
      "seksi",
      "kalıcı",
      "cesur",
      "gizemli",
      "karizmatik",
      "güçlü",
    ],
  },
  {
    value: "everyday",
    label: "Her gün",
    reason: "her gün sürülebilir",
    traits: ["çok yönlü", "modern", "temiz", "ferah"],
  },
];

export const TRAILS: Trait<Trail>[] = [
  {
    value: "light",
    label: "Tene yakın, hafif",
    reason: "tene yakın, hafif bir iz bırakıyor",
    traits: ["hafif", "temiz", "pudralı", "kremsi", "ferah", "zarif"],
  },
  {
    value: "lasting",
    label: "Fark edilir, kalıcı",
    reason: "fark edilir, kalıcı bir iz bırakıyor",
    traits: ["kalıcı", "yoğun", "güçlü", "bağımlılık yapıcı", "lüks", "sıcak"],
  },
];

export const joinTr = (items: string[]) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} ve ${items[items.length - 1]}`;

export const isEligible = (product: Product, audience?: Audience) => {
  if (!audience || audience === "any") return true;
  return audience === "female" ? forWomen(product) : forMen(product);
};

export const topNotes = (
  products: Product[],
  audience?: Audience,
  count = 12,
) => {
  const tally = new Map<string, number>();
  products
    .filter((product) => isEligible(product, audience))
    .forEach((product) =>
      product.notes.forEach((note) =>
        tally.set(note, (tally.get(note) ?? 0) + 1),
      ),
    );
  return [...tally.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "tr"))
    .slice(0, count)
    .map(([note]) => note);
};

const traitScore = (traits: string[], characteristics: string[]) =>
  Math.min(3, traits.filter((trait) => characteristics.includes(trait)).length);

const scoreProduct = (product: Product, answers: Answers): Ranked => {
  const reasons: string[] = [];
  let score = 0;

  const families = answers.families.filter((family) =>
    product.characteristics.includes(family),
  );
  score += families.length * 3;
  if (families.length) reasons.push(`${joinTr(families)} bir karakteri var`);

  const moment = MOMENTS.find((option) => option.value === answers.moment);
  const momentScore = moment
    ? traitScore(moment.traits, product.characteristics)
    : 0;
  score += momentScore;
  if (moment && momentScore) reasons.push(moment.reason);

  const trail = TRAILS.find((option) => option.value === answers.trail);
  const trailScore = trail
    ? traitScore(trail.traits, product.characteristics)
    : 0;
  score += trailScore;
  if (trail && trailScore) reasons.push(trail.reason);

  const notes = answers.notes.filter((note) => product.notes.includes(note));
  score += notes.length * 2;
  if (notes.length)
    reasons.push(
      `sevdiğin ${joinTr(notes.map((note) => note.toLocaleLowerCase("tr-TR")))} ${notes.length > 1 ? "notalarını" : "notasını"} taşıyor`,
    );

  return { product, score, reasons };
};

const featuredRank = (product: Product) =>
  Number(FEATURED_IDS.includes(product.id));

export const rankProducts = (products: Product[], answers: Answers): Ranked[] =>
  products
    .filter((product) => isEligible(product, answers.audience))
    .map((product) => scoreProduct(product, answers))
    .sort(
      (a, b) =>
        b.score - a.score ||
        featuredRank(b.product) - featuredRank(a.product) ||
        a.product.name.localeCompare(b.product.name, "tr"),
    );

export const reasonSentence = (reasons: string[]) => {
  const sentence = joinTr(reasons);
  return (
    sentence &&
    `${sentence.charAt(0).toLocaleUpperCase("tr-TR")}${sentence.slice(1)}.`
  );
};
