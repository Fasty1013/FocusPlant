// Focus Plant Pro - Rarity Tier System, Drop Pools & Badges

const RARITIES = {
  common: {
    id: "common",
    name: { ru: "Обычное", en: "Common", uz: "Oddiy", ja: "コモン" },
    color: "#a6adc8",
    bg: "rgba(166, 173, 200, 0.15)",
    border: "#6c7086",
    stars: "★"
  },
  uncommon: {
    id: "uncommon",
    name: { ru: "Необычное", en: "Uncommon", uz: "Noyob", ja: "アンコモン" },
    color: "#a6e3a1",
    bg: "rgba(166, 227, 161, 0.15)",
    border: "#a6e3a1",
    stars: "★★"
  },
  rare: {
    id: "rare",
    name: { ru: "Редкое", en: "Rare", uz: "Kamyob", ja: "レア" },
    color: "#89dceb",
    bg: "rgba(137, 220, 235, 0.15)",
    border: "#89dceb",
    stars: "★★★"
  },
  epic: {
    id: "epic",
    name: { ru: "Эпическое", en: "Epic", uz: "Epik", ja: "エピック" },
    color: "#cba6f7",
    bg: "rgba(203, 166, 247, 0.18)",
    border: "#cba6f7",
    stars: "★★★★"
  },
  legendary: {
    id: "legendary",
    name: { ru: "Легендарное", en: "Legendary", uz: "Afsonaviy", ja: "レジェンダリー" },
    color: "#f9e2af",
    bg: "rgba(249, 226, 175, 0.2)",
    border: "#f9e2af",
    stars: "★★★★★"
  },
  mythic: {
    id: "mythic",
    name: { ru: "Мифическое", en: "Mythic", uz: "Mifologik", ja: "ミシック" },
    color: "#f38ba8",
    bg: "rgba(243, 139, 168, 0.22)",
    border: "#f38ba8",
    stars: "✦ МИФИЧЕСКОЕ ✦"
  }
};

const RARITY_POOLS = {
  common: ["oak", "birch"],
  uncommon: ["pine", "apple", "orange_tree"],
  rare: ["sakura", "bamboo", "jacaranda"],
  epic: ["wisteria", "autumn_maple", "golden_ginkgo"],
  legendary: ["world_tree", "crystal"],
  mythic: ["mystic", "cosmic"]
};

const RARITY_NAMES = {
  common: "⚪ Обычное",
  uncommon: "🟢 Необычное",
  rare: "🔵 Редкое",
  epic: "🟣 Эпическое",
  legendary: "🟡 Легендарное",
  mythic: "✦ МИФИЧЕСКОЕ ✦"
};

if (typeof window !== "undefined") {
  window.RARITIES = RARITIES;
  window.RARITY_POOLS = RARITY_POOLS;
  window.RARITY_NAMES = RARITY_NAMES;
}
if (typeof globalThis !== "undefined") {
  globalThis.RARITIES = RARITIES;
  globalThis.RARITY_POOLS = RARITY_POOLS;
  globalThis.RARITY_NAMES = RARITY_NAMES;
}

