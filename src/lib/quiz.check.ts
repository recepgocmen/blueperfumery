import assert from "node:assert/strict";
import type { Product } from "./api";
import { EMPTY_ANSWERS, rankProducts } from "./quiz";

const make = (
  id: string,
  gender: Product["gender"],
  characteristics: string[],
  notes: string[] = [],
) =>
  ({
    id,
    name: id,
    brand: "",
    description: "",
    price: 0,
    ml: 50,
    gender,
    category: "niches",
    status: "active",
    stock: 1,
    sku: id,
    notes,
    characteristics,
    ageRange: { min: 0, max: 99 },
  }) satisfies Product;

const products = [
  make("rose", "female", ["çiçeksi"], ["Gül"]),
  make("office", "female", ["ofis", "temiz"]),
  make("cedar", "male", ["odunsu", "gece"]),
  make("hacivat", "male", ["unisex", "odunsu"]),
  make("shared", "female", ["unisex", "ferah"]),
  make("both", "unisex", ["baharatlı"]),
];

const ids = (answers: Parameters<typeof rankProducts>[1]) =>
  rankProducts(products, answers).map((entry) => entry.product.id);

const female = ids({ ...EMPTY_ANSWERS, audience: "female" });
assert.ok(!female.includes("cedar"), "male product leaks into Kadın");
assert.ok(
  !female.includes("hacivat"),
  "male product with a unisex characteristic leaks into Kadın",
);
assert.deepEqual([...female].sort(), ["both", "office", "rose", "shared"]);
const male = ids({ ...EMPTY_ANSWERS, audience: "male" });
assert.deepEqual([...male].sort(), ["both", "cedar", "hacivat"]);
assert.ok(!male.includes("shared"), "female product leaks into Erkek");
assert.ok(
  female.includes("both") && male.includes("both"),
  "unisex must survive both",
);

const ranked = rankProducts(products, {
  ...EMPTY_ANSWERS,
  audience: "female",
  families: ["çiçeksi"],
  moment: "day",
});
assert.equal(ranked[0].product.id, "rose");
assert.ok(ranked[0].score > ranked[1].score);
assert.equal(ranked[1].product.id, "office");
assert.equal(ranked[0].reasons[0], "çiçeksi bir karakteri var");

assert.equal(rankProducts(products, EMPTY_ANSWERS).length, products.length);
assert.deepEqual(rankProducts([], EMPTY_ANSWERS), []);

console.log("quiz.check: ok");
