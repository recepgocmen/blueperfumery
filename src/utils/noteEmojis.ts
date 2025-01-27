export const noteEmojis: Record<string, string> = {
  // Woods & Resins
  cedar: "🌲",
  oud: "🪵",
  sandalwood: "🪵",
  patchouli: "🌿",
  benzoin: "💫",
  amber: "✨",

  // Florals
  rose: "🌹",
  jasmine: "🌸",
  lavender: "💜",
  gardenia: "🌺",
  "orange blossom": "🌼",
  iris: "🌷",

  // Spices & Herbs
  saffron: "🌱",
  cardamom: "🌿",
  vanilla: "🍶",
  tobacco: "🍂",
  leather: "💼",

  // Fruits
  cherry: "🍒",
  peach: "🍑",
  bergamot: "🍊",
  grapefruit: "🍊",

  // Gourmand
  cocoa: "🍫",
  praline: "🍯",
  honey: "🍯",
  rum: "🥃",

  // Fresh & Marine
  marine: "🌊",
  fresh: "💧",

  // Others
  "guaiac wood": "🌳",
  "tonka bean": "🫘",
  "pink pepper": "💗",
  "peru balsam": "✨",
  almond: "🥜",
  juniper: "🌿",
  angelica: "🌱",
  castoreum: "🌟",
};

export const getEmojiForNote = (note: string): string => {
  const emoji = noteEmojis[note.toLowerCase()];
  return emoji || "🌟"; // Default emoji for unknown notes
};
