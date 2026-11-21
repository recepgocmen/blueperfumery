import type { Product } from "./api";

const WHATSAPP_NUMBER = "905432787386";
export const SITE_URL = "https://blueperfumery.vercel.app";
export const DEFAULT_IMAGE = "/perfumes/default.webp";
const LEGACY_DEFAULT_IMAGE = "/card-photos/blue-default.webp";

export const FEATURED_IDS = [
  "burberry-her-seluz",
  "goddess-burberry",
  "mp-vanilla-powder",
  "armani-swy-intensely",
  "nishane-hacivat-seluz",
  "fleur-narcotique-seluz",
];

export const FAMILIES = [
  "meyveli",
  "çiçeksi",
  "vanilyalı",
  "odunsu",
  "ferah",
  "baharatlı",
  "tatlı",
] as const;

export const capitalize = (text: string) =>
  text.charAt(0).toLocaleUpperCase("tr-TR") + text.slice(1);

export const formatPrice = (price: number) =>
  `₺${price.toLocaleString("tr-TR")}`;

export const hasCampaign = (
  product: Pick<Product, "price" | "originalPrice">,
): product is Pick<Product, "price"> & { originalPrice: number } =>
  typeof product.originalPrice === "number" &&
  product.originalPrice > product.price;

// The one campaign every bottle shares, or null when prices are mixed.
export const sharedCampaign = (products: Product[]) => {
  const [first] = products;
  if (!first || !hasCampaign(first)) return null;
  const same = products.every(
    (product) =>
      product.price === first.price &&
      product.originalPrice === first.originalPrice,
  );
  return same
    ? { price: first.price, originalPrice: first.originalPrice }
    : null;
};

// Orders go through WhatsApp with the bottle already written into the message.
export const buyUrl = (product: Pick<Product, "name" | "ml" | "price">) => {
  const message = `Merhaba, ${product.name} (${product.ml} ml, ${formatPrice(product.price)}) sipariş vermek istiyorum.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// A product without its own picture in the database uses the photo shipped
// with the site under /perfumes/<id>.webp; ProductImage falls back to the
// shared bottle when that file does not exist.
export const productImage = (product: Pick<Product, "id" | "image">) => {
  const src = product.image?.trim();
  const shared =
    !src || src.endsWith(DEFAULT_IMAGE) || src.endsWith(LEGACY_DEFAULT_IMAGE);
  if (shared)
    return product.id ? `/perfumes/${product.id}.webp` : DEFAULT_IMAGE;
  if (src.startsWith("/")) return src;
  try {
    const url = new URL(src);
    return url.origin === SITE_URL ? url.pathname : src;
  } catch {
    return DEFAULT_IMAGE;
  }
};

export const isUnisex = (product: Pick<Product, "gender">) =>
  product.gender === "unisex";

export const forWomen = (product: Pick<Product, "gender">) =>
  product.gender === "female" || isUnisex(product);

export const forMen = (product: Pick<Product, "gender">) =>
  product.gender === "male" || isUnisex(product);

const NICHE_CATEGORIES = ["niches", "artisanal", "exclusive"];

export const isNiche = (product: Pick<Product, "category">) =>
  NICHE_CATEGORIES.includes(product.category);

export const audienceLabel = (product: Product) => {
  if (isUnisex(product)) return "Unisex";
  return product.gender === "female" ? "Kadın" : "Erkek";
};

const featuredRank = (product: Product) => {
  const index = FEATURED_IDS.indexOf(product.id);
  return index === -1 ? FEATURED_IDS.length : index;
};

export const featuredFirst = (products: Product[]) =>
  [...products].sort((a, b) => featuredRank(a) - featuredRank(b));

// The home page hero: the order and tab label are hand-picked per audience.
const HERO_PICKS = {
  female: [
    ["idole-lancome", "ferah"],
    ["armani-my-way", "çiçeksi"],
    ["mp-vanilla-powder", "vanilyalı"],
    ["burberry-her-seluz", "meyveli"],
    ["goddess-burberry", "gurme"],
    ["jpg-scandal-woman", "tatlı"],
  ],
  male: [
    ["armani-swy-intensely", "sıcak"],
    ["dior-sauvage-elixir", "baharatlı"],
    ["fleur-narcotique-seluz", "ferah"],
    ["exnihilo-blue-talisman", "meyveli"],
    ["boss-bottled", "odunsu"],
    ["god-of-fire-mg", "enerjik"],
  ],
} as const;

export const heroPicks = (products: Product[], gender: keyof typeof HERO_PICKS) =>
  HERO_PICKS[gender].flatMap(([id, family]) => {
    const product = products.find((candidate) => candidate.id === id);
    return product ? [{ family, product }] : [];
  });

export const similarTo = (product: Product, products: Product[], count = 3) =>
  products
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (product.gender === "female"
          ? forWomen(candidate)
          : product.gender === "male"
            ? forMen(candidate)
            : true),
    )
    .map((candidate) => ({
      candidate,
      shared: candidate.notes.filter((note) => product.notes.includes(note))
        .length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, count)
    .map(({ candidate }) => candidate);

export const askMira = (question?: string) =>
  window.dispatchEvent(new CustomEvent("mira:open", { detail: question }));
