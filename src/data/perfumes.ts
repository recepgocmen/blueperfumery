import { Perfume } from "../types/survey";

export const perfumes: Perfume[] = [
  {
    id: "mfk-br540",
    name: "Baccarat Rouge 540",
    brand: "Blue Perfumery Exclusive",
    price: 1250,
    gender: "unisex",
    notes: ["saffron", "jasmine", "amber", "cedar"],
    description:
      "Blue Perfumery koleksiyonundan lüks ve sofistike bir koku. Tatlı ve odunsu notalar ile öne çıkar.",
    ageRange: { min: 20, max: 35 },
    characteristics: ["sweet", "woody", "amber", "warm"],
  },
  {
    id: "mfk-oud-satin",
    name: "Oud Satin Mood",
    brand: "Blue Perfumery Premium",
    price: 1350,
    gender: "unisex",
    notes: ["oud", "rose", "vanilla", "benzoin"],
    description: "Blue Perfumery&apos;nin zengin ve yoğun oryantal kokusu",
    ageRange: { min: 20, max: 50 },
    characteristics: ["oriental", "rich", "sweet", "woody"],
  },
  {
    id: "mfk-grand-soir",
    name: "Grand Soir",
    brand: "Blue Perfumery Signature",
    price: 1200,
    gender: "unisex",
    notes: ["amber", "vanilla", "benzoin", "tonka bean"],
    description:
      "Blue Perfumery&apos;den sıcak ve baştan çıkarıcı amber kokusu",
    ageRange: { min: 25, max: 50 },
    characteristics: ["amber", "warm", "sweet", "vanilla"],
  },
  {
    id: "tf-oud-wood",
    name: "Oud Wood",
    brand: "Blue Perfumery Luxury",
    price: 1400,
    gender: "male",
    notes: ["oud", "rosewood", "cardamom", "sandalwood"],
    description: "Sofistike ve maskülen bir ağaç kokusu",
    ageRange: { min: 25, max: 55 },
    characteristics: ["woody", "spicy", "luxurious", "refined"],
  },
  {
    id: "tf-lost-cherry",
    name: "Lost Cherry",
    brand: "Blue Perfumery Premium",
    price: 1300,
    gender: "female",
    notes: ["cherry", "almond", "tonka bean", "peru balsam"],
    description: "Tatlı ve baştan çıkarıcı kiraz kokusu",
    ageRange: { min: 20, max: 45 },
    characteristics: ["sweet", "fruity", "gourmand"],
  },
  {
    id: "tf-tobacco-vanille",
    name: "Tobacco Vanille",
    brand: "Blue Perfumery Premium",
    price: 1300,
    gender: "unisex",
    notes: ["tobacco", "vanilla", "cocoa", "tonka bean"],
    description: "Sıcak ve zengin tütün-vanilya kokusu",
    ageRange: { min: 25, max: 50 },
    characteristics: ["sweet", "spicy", "warm", "tobacco"],
  },
  {
    id: "tf-bitter-peach",
    name: "Bitter Peach",
    brand: "Blue Perfumery Premium",
    price: 1300,
    gender: "female",
    notes: ["peach", "cardamom", "rum", "vanilla"],
    description: "Tatlı-acı şeftali aroması",
    ageRange: { min: 18, max: 40 },
    characteristics: ["fruity", "sweet", "spicy"],
  },
  {
    id: "tf-ebene-fume",
    name: "Ébène Fumé",
    brand: "Blue Perfumery Exclusive",
    price: 1350,
    gender: "unisex",
    notes: ["palo santo", "leather", "black pepper", "ebony wood"],
    description: "Mistik ve derin bir ahşap kokusu",
    ageRange: { min: 27, max: 60 },
    characteristics: ["woody", "smoky", "mysterious", "deep"],
  },
  {
    id: "tf-ombre-leather",
    name: "Ombre Leather",
    brand: "Blue Perfumery Premium",
    price: 1250,
    gender: "unisex",
    notes: ["leather", "cardamom", "jasmine", "moss"],
    description: "Yumuşak ve sofistike bir deri kokusu",
    ageRange: { min: 23, max: 55 },
    characteristics: ["leather", "spicy", "floral", "earthy"],
  },
  {
    id: "creed-original-santal",
    name: "Original Santal",
    brand: "Blue Perfumery Luxury",
    price: 1450,
    gender: "male",
    notes: ["sandalwood", "cinnamon", "coriander", "lavender"],
    description: "Lüks ve egzotik bir sandal ağacı kokusu",
    ageRange: { min: 28, max: 55 },
    characteristics: ["woody", "spicy", "warm", "aromatic"],
  },
  {
    id: "xerjoff-naxos",
    name: "Naxos",
    brand: "Blue Perfumery Exclusive",
    price: 1500,
    gender: "male",
    notes: ["tobacco", "honey", "vanilla", "tonka bean"],
    description: "Zengin ve sofistike bir tütün kokusu",
    ageRange: { min: 25, max: 50 },
    characteristics: ["tobacco", "sweet", "honey", "vanilla"],
  },
  {
    id: "xerjoff-alexandria",
    name: "Alexandria II",
    brand: "Blue Perfumery Exclusive",
    price: 1600,
    gender: "unisex",
    notes: ["oud", "vanilla", "amber", "cedar"],
    description: "Lüks ve oryantal bir koku",
    ageRange: { min: 25, max: 45 },
    characteristics: ["oriental", "woody", "rich"],
  },
  {
    id: "ch-212-men",
    name: "212 Men",
    brand: "Blue Perfumery Urban",
    price: 650,
    gender: "male",
    notes: ["green spices", "grapefruit", "sandalwood", "incense"],
    description: "Modern ve dinamik bir erkek kokusu",
    ageRange: { min: 18, max: 35 },
    characteristics: ["fresh", "spicy", "woody", "urban"],
  },
  {
    id: "invictus",
    name: "Invictus",
    brand: "Blue Perfumery Urban",
    price: 600,
    gender: "male",
    notes: ["grapefruit", "marine", "guaiac wood"],
    description: "Taze ve maskülen bir koku",
    ageRange: { min: 20, max: 35 },
    characteristics: ["fresh", "marine", "woody"],
  },
  {
    id: "chanel-chance",
    name: "Chance",
    brand: "Blue Perfumery Classic",
    price: 900,
    gender: "female",
    notes: ["pink pepper", "jasmine", "patchouli"],
    description: "Zarif ve feminen bir koku",
    ageRange: { min: 19, max: 45 },
    characteristics: ["floral", "fresh", "spicy"],
  },
  {
    id: "chanel-coco-mademoiselle",
    name: "Coco Mademoiselle",
    brand: "Blue Perfumery Classic",
    price: 980,
    gender: "female",
    notes: ["orange", "jasmine", "rose", "patchouli"],
    description: "Modern ve çekici bir klasik kadın kokusu",
    ageRange: { min: 25, max: 50 },
    characteristics: ["floral", "fresh", "oriental", "elegant"],
  },
  {
    id: "armani-stronger-with-you",
    name: "Stronger With You",
    brand: "Blue Perfumery Urban",
    price: 750,
    gender: "male",
    notes: ["cardamom", "sage", "chestnut", "vanilla"],
    description: "Güçlü ve çekici bir erkek kokusu",
    ageRange: { min: 20, max: 40 },
    characteristics: ["spicy", "sweet", "aromatic", "warm"],
  },
  {
    id: "armani-si",
    name: "Si",
    brand: "Blue Perfumery Classic",
    price: 820,
    gender: "female",
    notes: ["blackcurrant", "freesia", "vanilla", "ambroxan"],
    description: "Modern ve sofistike bir kadın kokusu",
    ageRange: { min: 25, max: 50 },
    characteristics: ["fruity", "floral", "sweet", "elegant"],
  },
  {
    id: "terenzi-telea",
    name: "Telea",
    brand: "Blue Perfumery Exclusive",
    price: 1200,
    gender: "unisex",
    notes: ["white flowers", "vanilla", "musk", "amber"],
    description: "Zarif ve yoğun beyaz çiçek kokusu",
    ageRange: { min: 22, max: 45 },
    characteristics: ["floral", "sweet", "warm", "intense"],
  },
  {
    id: "terenzi-kirke",
    name: "Kirke",
    brand: "Blue Perfumery Exclusive",
    price: 1180,
    gender: "female",
    notes: ["passionfruit", "peach", "vanilla", "musk"],
    description: "Çekici ve meyve dolu bir parfüm",
    ageRange: { min: 20, max: 40 },
    characteristics: ["fruity", "sweet", "tropical", "elegant"],
  },
  {
    id: "memo-lalibela",
    name: "Lalibela",
    brand: "Blue Perfumery Artisanal",
    price: 1100,
    gender: "unisex",
    notes: ["frankincense", "vanilla", "musk", "almond"],
    description: "Ruhani ve derin bir koku deneyimi",
    ageRange: { min: 28, max: 55 },
    characteristics: ["incense", "spiritual", "warm", "resinous"],
  },
  {
    id: "memo-italian-leather",
    name: "Italian Leather",
    brand: "Blue Perfumery Artisanal",
    price: 1150,
    gender: "unisex",
    notes: ["leather", "tomato leaf", "vanilla", "tolu balsam"],
    description: "İtalyan deri geleneğini yansıtan zarif bir koku",
    ageRange: { min: 25, max: 60 },
    characteristics: ["leather", "green", "aromatic", "sophisticated"],
  },
  {
    id: "memo-african-leather",
    name: "African Leather",
    brand: "Blue Perfumery Artisanal",
    price: 1200,
    gender: "unisex",
    notes: ["leather", "cardamom", "saffron", "patchouli"],
    description: "Egzotik ve derili bir koku",
    ageRange: { min: 23, max: 50 },
    characteristics: ["leather", "spicy", "woody"],
  },
  {
    id: "memo-marfa",
    name: "Marfa",
    brand: "Blue Perfumery Artisanal",
    price: 1150,
    gender: "unisex",
    notes: ["orange blossom", "tuberose", "white musk", "sandalwood"],
    description: "Çölün ruhunu yansıtan büyüleyici bir koku",
    ageRange: { min: 25, max: 50 },
    characteristics: ["floral", "woody", "creamy", "artistic"],
  },
  {
    id: "memo-ocean-leather",
    name: "Ocean Leather",
    brand: "Blue Perfumery Artisanal",
    price: 1180,
    gender: "unisex",
    notes: ["leather", "marine notes", "cedarwood", "sage"],
    description: "Okyanus esintileri ile buluşan deri notaları",
    ageRange: { min: 22, max: 45 },
    characteristics: ["marine", "leather", "fresh", "deep"],
  },
  {
    id: "memo-flam",
    name: "Flam",
    brand: "Blue Perfumery Artisanal",
    price: 1100,
    gender: "unisex",
    notes: ["saffron", "violet", "blackberry", "oud"],
    description: "İskandinav ormanlarının mistik atmosferi",
    ageRange: { min: 28, max: 55 },
    characteristics: ["fruity", "woody", "mysterious", "elegant"],
  },
  {
    id: "ex-nihilo-fleur-narcotique",
    name: "Fleur Narcotique",
    brand: "Blue Perfumery Exclusive",
    price: 1250,
    gender: "unisex",
    notes: ["bergamot", "peach", "jasmine", "musk"],
    description: "Çiçeksi ve bağımlılık yaratan bir parfüm",
    ageRange: { min: 22, max: 45 },
    characteristics: ["floral", "fruity", "addictive", "sophisticated"],
  },
  {
    id: "mancera-hindu-kush",
    name: "Hindu Kush",
    brand: "Blue Perfumery Premium",
    price: 920,
    gender: "unisex",
    notes: ["cannabis", "incense", "vetiver", "oud"],
    description: "Mistik dağların esrarengiz kokusu",
    ageRange: { min: 25, max: 50 },
    characteristics: ["woody", "smoky", "resinous", "distinctive"],
  },
  {
    id: "mancera-roses-vanille",
    name: "Roses Vanille",
    brand: "Blue Perfumery Premium",
    price: 880,
    gender: "female",
    notes: ["rose", "vanilla", "sugar", "cedar"],
    description: "Tatlı ve romantik gül-vanilya kompozisyonu",
    ageRange: { min: 20, max: 40 },
    characteristics: ["floral", "sweet", "gourmand", "romantic"],
  },
  {
    id: "mancera-cedrat-boise",
    name: "Cedrat Boise",
    brand: "Blue Perfumery Premium",
    price: 900,
    gender: "unisex",
    notes: ["citrus", "cedar", "leather", "vanilla"],
    description: "Energetic ve çarpıcı bir odunsu citrus kokusu",
    ageRange: { min: 22, max: 45 },
    characteristics: ["fresh", "woody", "citrusy", "modern"],
  },
  {
    id: "nasomatto-black-afgano",
    name: "Black Afgano",
    brand: "Blue Perfumery Artisanal",
    price: 1180,
    gender: "unisex",
    notes: ["cannabis", "coffee", "oud", "tobacco"],
    description: "Derin ve karanlık bir bağımlılık parfümü",
    ageRange: { min: 28, max: 55 },
    characteristics: ["resinous", "dark", "intense", "addictive"],
  },
  {
    id: "montale-chocolate-greedy",
    name: "Chocolate Greedy",
    brand: "Blue Perfumery Premium",
    price: 850,
    gender: "unisex",
    notes: ["chocolate", "vanilla", "coffee", "dried fruits"],
    description: "Zengin ve tatlı çikolata kokusu",
    ageRange: { min: 20, max: 45 },
    characteristics: ["gourmand", "sweet", "rich", "warm"],
  },
  {
    id: "guerlain-shalimar",
    name: "Shalimar",
    brand: "Blue Perfumery Classic",
    price: 890,
    gender: "female",
    notes: ["bergamot", "iris", "vanilla", "incense"],
    description: "Oryantal parfümeride bir başyapıt",
    ageRange: { min: 30, max: 60 },
    characteristics: ["oriental", "powdery", "iconic", "timeless"],
  },
  {
    id: "guerlain-homme-ideal-intense",
    name: "L'Homme Ideal Intense",
    brand: "Blue Perfumery Classic",
    price: 820,
    gender: "male",
    notes: ["almond", "leather", "cedar", "tonka bean"],
    description: "Yoğun ve çekici bir maskülen parfüm",
    ageRange: { min: 25, max: 50 },
    characteristics: ["woody", "aromatic", "elegant", "intense"],
  },
  {
    id: "mar-barrois-ganymede",
    name: "Ganymede",
    brand: "Blue Perfumery Artisanal",
    price: 980,
    gender: "unisex",
    notes: ["mandarin", "violet", "immortelle", "suede"],
    description: "Modern ve minimalist bir tasarım harikası",
    ageRange: { min: 25, max: 55 },
    characteristics: ["mineral", "suede", "fresh", "innovative"],
  },
  {
    id: "ysl-libre-woman",
    name: "Libre Woman",
    brand: "Blue Perfumery Classic",
    price: 800,
    gender: "female",
    notes: ["lavender", "orange blossom", "vanilla", "musk"],
    description: "Modern ve özgür bir kadın kokusu",
    ageRange: { min: 20, max: 40 },
    characteristics: ["floral", "warm", "fresh"],
  },
  {
    id: "ysl-libre-parfum",
    name: "Libre Le Parfum",
    brand: "Blue Perfumery Classic",
    price: 850,
    gender: "female",
    notes: ["lavender", "orange blossom", "vanilla", "ginger"],
    description: "Orijinal Libre'nin daha yoğun ve sıcak versiyonu",
    ageRange: { min: 22, max: 45 },
    characteristics: ["floral", "warm", "rich", "intense"],
  },
  {
    id: "ysl-homme",
    name: "L'Homme",
    brand: "Blue Perfumery Classic",
    price: 780,
    gender: "male",
    notes: ["ginger", "bergamot", "cedarwood", "vetiver"],
    description: "Çekici ve zarif bir erkek kokusu",
    ageRange: { min: 22, max: 50 },
    characteristics: ["fresh", "spicy", "woody", "versatile"],
  },
  {
    id: "vs-bombshell",
    name: "Bombshell",
    brand: "Blue Perfumery Urban",
    price: 600,
    gender: "female",
    notes: ["passion fruit", "peony", "vanilla", "musk"],
    description: "Genç ve çekici bir kadın kokusu",
    ageRange: { min: 18, max: 35 },
    characteristics: ["fruity", "floral", "fresh", "feminine"],
  },
  {
    id: "dior-jadore",
    name: "J'Adore",
    brand: "Blue Perfumery Classic",
    price: 920,
    gender: "female",
    notes: ["bergamot", "jasmine", "rose", "ylang-ylang"],
    description: "Zarif ve lüks bir çiçek buketi",
    ageRange: { min: 25, max: 55 },
    characteristics: ["floral", "elegant", "feminine", "luxurious"],
  },
  {
    id: "pdm-pegasus",
    name: "Pegasus",
    brand: "Blue Perfumery Luxury",
    price: 1250,
    gender: "male",
    notes: ["almond", "vanilla", "sandalwood", "amber"],
    description: "Tatlı ve maskülen bir odunsu koku",
    ageRange: { min: 25, max: 50 },
    characteristics: ["oriental", "sweet", "creamy", "distinguished"],
  },
  {
    id: "v-r-spicebomb-extreme",
    name: "Spicebomb Extreme",
    brand: "Blue Perfumery Premium",
    price: 880,
    gender: "male",
    notes: ["tobacco", "black pepper", "vanilla", "lavender"],
    description: "Sıcak ve baharatlı bir erkek bombası",
    ageRange: { min: 22, max: 45 },
    characteristics: ["spicy", "sweet", "warm", "intense"],
  },
  {
    id: "amouage-reflection-man",
    name: "Reflection Man",
    brand: "Blue Perfumery Luxury",
    price: 1380,
    gender: "male",
    notes: ["rosemary", "jasmine", "neroli", "sandalwood"],
    description: "Zarif ve sofistike bir erkek parfümü",
    ageRange: { min: 28, max: 60 },
    characteristics: ["floral", "fresh", "woody", "refined"],
  },
  {
    id: "mfk-aqua-celestia",
    name: "Aqua Celestia",
    brand: "Blue Perfumery Premium",
    price: 1100,
    gender: "unisex",
    notes: ["lime", "mint", "blackcurrant", "mimosa"],
    description: "Taze ve ferahlatıcı bir yaz kokusu",
    ageRange: { min: 20, max: 45 },
    characteristics: ["fresh", "aquatic", "citrusy", "uplifting"],
  },
  {
    id: "lveb",
    name: "La Vie Est Belle",
    brand: "Blue Perfumery Classic",
    price: 850,
    gender: "female",
    notes: ["iris", "patchouli", "praline", "vanilla"],
    description: "Tatlı ve feminen bir koku",
    ageRange: { min: 20, max: 45 },
    characteristics: ["sweet", "gourmand", "floral"],
  },
];
