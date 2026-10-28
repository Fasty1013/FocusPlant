// Focus Plant Pro - Tree Skins, Rarity System & Procedural SVG Engine

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

const TREE_SKINS = {
  // COMMON
  oak: {
    id: "oak",
    rarity: "common",
    name: { ru: "Дуб Мудрости", en: "Wisdom Oak", uz: "Donishmand Eman", ja: "知恵のオーク" },
    desc: { ru: "Классический могучий дуб, символ упорства и силы.", en: "Classic mighty oak, symbol of perseverance.", uz: "Klassik qudratli eman.", ja: "忍耐と強さの象徴。" },
    price: 0,
    emoji: "🌳",
    color: "#a6e3a1"
  },
  birch: {
    id: "birch",
    rarity: "common",
    name: { ru: "Белая Берёза", en: "Silver Birch", uz: "Oq Qayin", ja: "白樺の木" },
    desc: { ru: "Изящное дерево со светлой корой и шелестящей листвой.", en: "Graceful tree with light bark and gentle foliage.", uz: "Yorug' po'stloqli nafis daraxt.", ja: "白く美しい樹皮を持つ優雅な木。" },
    price: 50,
    emoji: "🌿",
    color: "#94e2d5"
  },

  // UNCOMMON
  pine: {
    id: "pine",
    rarity: "uncommon",
    name: { ru: "Северная Сосна", en: "Nordic Pine", uz: "Shimoliy Qarag'ay", ja: "北欧のマツ" },
    desc: { ru: "Вечнозеленая хвоя, стойкая к любым невзгодам.", en: "Evergreen needles resistant to any storm.", uz: "Bo'ronlarga bardoshli doimiy yashil.", ja: "嵐にも負けない常緑樹。" },
    price: 100,
    emoji: "🌲",
    color: "#74c7ec"
  },
  apple: {
    id: "apple",
    rarity: "uncommon",
    name: { ru: "Золотистая Яблоня", en: "Golden Apple Tree", uz: "Oltin Olmaxon", ja: "黄金の林檎樹" },
    desc: { ru: "Дерево изобилия с сияющими спелыми плодами.", en: "Abundance tree with glowing ripe fruits.", uz: "Yaltiroq mevalarga ega daraxt.", ja: "実り豊かな黄金の林檎の木。" },
    price: 150,
    emoji: "🍎",
    color: "#f9e2af"
  },

  // RARE
  sakura: {
    id: "sakura",
    rarity: "rare",
    name: { ru: "Цветущая Сакура", en: "Cherry Blossom", uz: "Gullagan Sakura", ja: "桜の木" },
    desc: { ru: "Нежные розовые лепестки дарят гармонию и покой.", en: "Gentle pink petals bring harmony and peace.", uz: "Nozik pushti barglar xotirjamlik bag'ishlaydi.", ja: "調和と安らぎをもたらす日本の桜。" },
    price: 200,
    emoji: "🌸",
    color: "#f5c2e7"
  },
  bamboo: {
    id: "bamboo",
    rarity: "rare",
    name: { ru: "Дзен Бамбук", en: "Zen Bamboo", uz: "Dzen Bambuk", ja: "禅の竹林" },
    desc: { ru: "Гибкий и несокрушимый, учит чистой концентрации.", en: "Flexible and unbreakable, teaches pure focus.", uz: "Egiluvchan va sinmas dzen bambuk.", ja: "決して折れない純粋な集中。" },
    price: 250,
    emoji: "🎋",
    color: "#89dceb"
  },

  // EPIC
  wisteria: {
    id: "wisteria",
    rarity: "epic",
    name: { ru: "Глициния Грёз", en: "Dream Wisteria", uz: "Orzular Gliksiyasi", ja: "夢幻の藤の木" },
    desc: { ru: "Пышные фиолетовые гроздья цветов, источающие волшебный аромат.", en: "Lush cascading purple flower vines that soothe the soul.", uz: "Binafsharang guldasta daraxti.", ja: "紫の花房が美しく垂れ下がる幻想的な藤。" },
    price: 400,
    emoji: "🍇",
    color: "#cba6f7"
  },
  autumn_maple: {
    id: "autumn_maple",
    rarity: "epic",
    name: { ru: "Огненный Клён", en: "Fire Maple", uz: "Olovli Zarang", ja: "紅葉の楓" },
    desc: { ru: "Пылающая огненно-красная крона, вдохновляющая на великие дела.", en: "Blazing crimson canopy inspiring deep willpower.", uz: "Olovrang bargli go'zal daraxt.", ja: "燃えるような紅葉が意志を研ぎ澄ます。" },
    price: 450,
    emoji: "🍁",
    color: "#eba0ac"
  },

  // LEGENDARY
  world_tree: {
    id: "world_tree",
    rarity: "legendary",
    name: { ru: "Древо Жизни (Иггдрасиль)", en: "World Tree (Yggdrasil)", uz: "Hayot Daraxti", ja: "世界樹ユグドラシル" },
    desc: { ru: "Древнее древо миров со светящимися золотыми рунами.", en: "Ancient world tree with glowing cosmic runes.", uz: "Oltin rasm va nur taratuvchi daraxt.", ja: "天と地を繋ぐ古代の神聖な世界樹。" },
    price: 700,
    emoji: "✨",
    color: "#f9e2af"
  },
  crystal: {
    id: "crystal",
    rarity: "legendary",
    name: { ru: "Кристальное Древо", en: "Crystal Tree", uz: "Billur Daraxt", ja: "水晶の樹" },
    desc: { ru: "Ствол и ветви из сияющего хрусталя и алмазных граней.", en: "Branches carved from pure glowing quartz and diamonds.", uz: "Yaltiroq billurdan yasalgan daraxt.", ja: "ダイヤモンドのように輝く水晶の木。" },
    price: 800,
    emoji: "💎",
    color: "#89b4fa"
  },

  // MYTHIC
  mystic: {
    id: "mystic",
    rarity: "mythic",
    name: { ru: "Эфирное Древо Духов", en: "Ethereal Spirit Willow", uz: "Sehrli Majnuntol", ja: "霊魂のエーテル柳" },
    desc: { ru: "Магическое дерево с неоновыми светящимися духами и сферами.", en: "Ancient ethereal tree intertwined with floating spirit orbs.", uz: "Sehrli sharlar bilan porlovchi daraxt.", ja: "神秘的な光の精霊が宿る伝説の柳。" },
    price: 1200,
    emoji: "🔮",
    color: "#cba6f7"
  },
  cosmic: {
    id: "cosmic",
    rarity: "mythic",
    name: { ru: "Космический Бонсай", en: "Cosmic Nebula Tree", uz: "Koinot Daraxti", ja: "銀河の宇宙樹" },
    desc: { ru: "Ветви хранят целые созвездия, галактики и орбиты планет.", en: "Branches cradling starry galaxies and revolving miniature planets.", uz: "Yulduzlar va sayyoralar bilan to'la daraxt.", ja: "銀河と小惑星をその枝に宿す宇宙の木。" },
    price: 1500,
    emoji: "🌌",
    color: "#f38ba8"
  }
};

// Calculate drop chances based on duration in minutes
function calculateDropChances(minutes) {
  const m = Math.max(5, Math.min(180, Number(minutes) || 25));

  let common = 0, uncommon = 0, rare = 0, epic = 0, legendary = 0, mythic = 0;

  if (m <= 15) {
    // 5-15 min: mostly common & uncommon
    common = 75;
    uncommon = 22;
    rare = 3;
    epic = 0;
    legendary = 0;
    mythic = 0;
  } else if (m <= 25) {
    // 16-25 min
    common = 55;
    uncommon = 30;
    rare = 12;
    epic = 3;
    legendary = 0;
    mythic = 0;
  } else if (m <= 45) {
    // 26-45 min
    common = 35;
    uncommon = 32;
    rare = 22;
    epic = 9;
    legendary = 2;
    mythic = 0;
  } else if (m <= 60) {
    // 46-60 min
    common = 18;
    uncommon = 28;
    rare = 30;
    epic = 17;
    legendary = 6;
    mythic = 1;
  } else if (m <= 90) {
    // 61-90 min
    common = 8;
    uncommon = 20;
    rare = 32;
    epic = 26;
    legendary = 11;
    mythic = 3;
  } else {
    // 90-180 min (Marathon session: massive rare boost!)
    common = 3;
    uncommon = 12;
    rare = 28;
    epic = 32;
    legendary = 18;
    mythic = 7;
  }

  return { common, uncommon, rare, epic, legendary, mythic };
}

// Roll RNG to pick a tree based on duration
function rollRandomTreeByDuration(minutes) {
  const chances = calculateDropChances(minutes);
  const roll = Math.random() * 100;

  let chosenRarity = "common";
  let accum = 0;

  const order = ["mythic", "legendary", "epic", "rare", "uncommon", "common"];
  for (const r of order) {
    accum += chances[r];
    if (roll <= accum) {
      chosenRarity = r;
      break;
    }
  }

  // Filter skins of this rarity
  const availableSkins = Object.values(TREE_SKINS).filter(s => s.rarity === chosenRarity);
  const picked = availableSkins[Math.floor(Math.random() * availableSkins.length)] || TREE_SKINS.oak;

  return {
    skin: picked,
    rarity: chosenRarity,
    chances: chances
  };
}

// Procedural SVG Renderer
function renderTreeSVG(skinId = "oak", stage = 1, isWithered = false) {
  if (isWithered) return renderWitheredTree(skinId);

  switch (stage) {
    case 1: return renderStage1(skinId);
    case 2: return renderStage2(skinId);
    case 3: return renderStage3(skinId);
    case 4: return renderStage4(skinId);
    case 5:
    default: return renderStage5(skinId);
  }
}

// Stage 1: Seedling
function renderStage1(skin) {
  const skinObj = TREE_SKINS[skin] || TREE_SKINS.oak;
  const col = skinObj.color || "#a6e3a1";

  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="165" rx="60" ry="14" fill="#313244"/>
      <ellipse cx="100" cy="163" rx="52" ry="10" fill="#45475a"/>
      <path d="M100 162 C99 148 101 138 100 126" stroke="${col}" stroke-width="4" stroke-linecap="round"/>
      <path d="M100 135 C92 128 85 132 82 136 C86 142 96 141 100 138" fill="${col}"/>
      <path d="M100 130 C108 122 116 124 118 129 C114 135 104 134 100 132" fill="${col}"/>
      <circle cx="100" cy="122" r="3.5" fill="#ffffff" opacity="0.9"/>
    </svg>
  `;
}

// Stage 2: Small Sprout
function renderStage2(skin) {
  const skinObj = TREE_SKINS[skin] || TREE_SKINS.oak;
  const col = skinObj.color || "#a6e3a1";

  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="170" rx="65" ry="15" fill="#313244"/>
      <ellipse cx="100" cy="168" rx="56" ry="11" fill="#45475a"/>
      <path d="M98 168 C97 145 102 125 100 100" stroke="#89b4fa" stroke-width="6" stroke-linecap="round"/>
      <path d="M99 135 C88 126 78 128 72 122" stroke="#89b4fa" stroke-width="3" stroke-linecap="round"/>
      <path d="M100 120 C112 112 120 114 126 108" stroke="#89b4fa" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="70" cy="120" rx="14" ry="9" fill="${col}" transform="rotate(-20 70 120)"/>
      <ellipse cx="128" cy="106" rx="15" ry="10" fill="${col}" transform="rotate(25 128 106)"/>
      <ellipse cx="100" cy="94" rx="18" ry="12" fill="${col}"/>
      <circle cx="100" cy="92" r="3" fill="#ffffff" opacity="0.7"/>
    </svg>
  `;
}

// Stage 3: Sapling
function renderStage3(skin) {
  const skinObj = TREE_SKINS[skin] || TREE_SKINS.oak;
  const col = skinObj.color || "#a6e3a1";

  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="175" rx="68" ry="14" fill="#313244"/>
      <path d="M95 175 C94 140 98 115 100 85" stroke="#6c7086" stroke-width="12" stroke-linecap="round"/>
      <path d="M98 120 C85 105 72 102 65 95" stroke="#6c7086" stroke-width="5" stroke-linecap="round"/>
      <path d="M100 105 C115 95 128 92 135 85" stroke="#6c7086" stroke-width="5" stroke-linecap="round"/>
      <circle cx="65" cy="90" r="22" fill="${col}" opacity="0.9"/>
      <circle cx="135" cy="82" r="24" fill="${col}" opacity="0.9"/>
      <circle cx="100" cy="70" r="32" fill="${col}"/>
    </svg>
  `;
}

// Stage 4: Maturing Tree
function renderStage4(skin) {
  return renderStage5(skin, 0.85);
}

// Stage 5: Full Splendid Bloom
function renderStage5(skin, scale = 1.0) {
  switch (skin) {
    case "birch": return renderBirchTree(scale);
    case "sakura": return renderSakuraTree(scale);
    case "pine": return renderPineTree(scale);
    case "apple": return renderAppleTree(scale);
    case "bamboo": return renderBambooGrove(scale);
    case "wisteria": return renderWisteriaTree(scale);
    case "autumn_maple": return renderMapleTree(scale);
    case "world_tree": return renderWorldTree(scale);
    case "crystal": return renderCrystalTree(scale);
    case "cosmic": return renderCosmicTree(scale);
    case "mystic": return renderMysticTree(scale);
    case "oak":
    default:
      return renderOakTree(scale);
  }
}

// 1. Oak
function renderOakTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${70 * scale}" ry="14" fill="#313244"/>
      <path d="M90 178 C88 140 92 110 97 80 L103 80 C108 110 112 140 110 178 Z" fill="#6c7086"/>
      <path d="M96 115 C80 98 62 95 50 86" stroke="#6c7086" stroke-width="7" stroke-linecap="round"/>
      <path d="M104 105 C122 92 138 90 150 78" stroke="#6c7086" stroke-width="7" stroke-linecap="round"/>
      <circle cx="55" cy="80" r="${28 * scale}" fill="#a6e3a1"/>
      <circle cx="145" cy="72" r="${28 * scale}" fill="#a6e3a1"/>
      <circle cx="80" cy="55" r="${34 * scale}" fill="#94e2d5"/>
      <circle cx="120" cy="52" r="${34 * scale}" fill="#a6e3a1"/>
      <circle cx="100" cy="42" r="${36 * scale}" fill="#a6e3a1"/>
      <circle cx="45" cy="65" r="2.5" fill="#f9e2af" class="glow-particle"/>
      <circle cx="155" cy="60" r="3" fill="#f9e2af" class="glow-particle"/>
      <circle cx="95" cy="25" r="2.5" fill="#f9e2af" class="glow-particle"/>
    </svg>
  `;
}

// 2. Birch
function renderBirchTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${68 * scale}" ry="13" fill="#313244"/>
      <!-- Slender White Trunk with black stripes -->
      <path d="M94 178 L97 70 L103 70 L106 178 Z" fill="#cdd6f4"/>
      <line x1="95" y1="150" x2="101" y2="150" stroke="#11111b" stroke-width="2"/>
      <line x1="99" y1="125" x2="105" y2="125" stroke="#11111b" stroke-width="2"/>
      <line x1="96" y1="95" x2="102" y2="95" stroke="#11111b" stroke-width="2"/>
      <!-- Shimmering Light Green Foliage -->
      <circle cx="70" cy="75" r="${26 * scale}" fill="#94e2d5" opacity="0.9"/>
      <circle cx="130" cy="70" r="${26 * scale}" fill="#a6e3a1" opacity="0.9"/>
      <circle cx="100" cy="48" r="${32 * scale}" fill="#94e2d5"/>
      <circle cx="100" cy="40" r="${24 * scale}" fill="#a6e3a1"/>
    </svg>
  `;
}

// 3. Pine
function renderPineTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${70 * scale}" ry="14" fill="#313244"/>
      <rect x="94" y="110" width="12" height="68" fill="#45475a" rx="3"/>
      <polygon points="100,75 40,135 160,135" fill="#74c7ec"/>
      <polygon points="100,75 46,132 154,132" fill="#94e2d5"/>
      <polygon points="100,50 55,100 145,100" fill="#74c7ec"/>
      <polygon points="100,50 60,97 140,97" fill="#94e2d5"/>
      <polygon points="100,22 70,68 130,68" fill="#74c7ec"/>
      <polygon points="100,22 74,65 126,65" fill="#94e2d5"/>
      <path d="M100 22 L86 42 C92 40 108 40 114 42 Z" fill="#ffffff" opacity="0.8"/>
      <circle cx="100" cy="20" r="4" fill="#f9e2af"/>
    </svg>
  `;
}

// 4. Golden Apple
function renderAppleTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${70 * scale}" ry="14" fill="#313244"/>
      <path d="M91 178 C88 138 94 110 98 80 L102 80 C106 110 112 138 109 178 Z" fill="#6c7086"/>
      <circle cx="55" cy="78" r="${27 * scale}" fill="#a6e3a1"/>
      <circle cx="145" cy="72" r="${27 * scale}" fill="#a6e3a1"/>
      <circle cx="80" cy="52" r="${34 * scale}" fill="#94e2d5"/>
      <circle cx="120" cy="50" r="${34 * scale}" fill="#a6e3a1"/>
      <circle cx="100" cy="40" r="${36 * scale}" fill="#a6e3a1"/>
      <circle cx="58" cy="80" r="6" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      <circle cx="138" cy="75" r="6" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      <circle cx="95" cy="50" r="6.5" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      <circle cx="80" cy="65" r="5.5" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
    </svg>
  `;
}

// 5. Sakura
function renderSakuraTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <path d="M92 178 C86 135 106 105 100 75 L106 75 C112 105 96 135 108 178 Z" fill="#585b70"/>
      <path d="M95 118 C78 104 60 100 46 90" stroke="#585b70" stroke-width="6" stroke-linecap="round"/>
      <path d="M104 100 C125 86 142 84 154 72" stroke="#585b70" stroke-width="6" stroke-linecap="round"/>
      <circle cx="50" cy="82" r="${27 * scale}" fill="#f5c2e7"/>
      <circle cx="150" cy="68" r="${29 * scale}" fill="#f5c2e7"/>
      <circle cx="78" cy="50" r="${35 * scale}" fill="#f38ba8"/>
      <circle cx="122" cy="46" r="${35 * scale}" fill="#f5c2e7"/>
      <circle cx="100" cy="38" r="${36 * scale}" fill="#eba0ac"/>
      <ellipse cx="40" cy="120" rx="3.5" ry="2" fill="#f5c2e7" transform="rotate(30 40 120)"/>
      <ellipse cx="160" cy="110" rx="3.5" ry="2" fill="#f5c2e7" transform="rotate(-25 160 110)"/>
      <ellipse cx="130" cy="140" rx="3" ry="1.8" fill="#f38ba8" transform="rotate(45 130 140)"/>
    </svg>
  `;
}

// 6. Bamboo
function renderBambooGrove(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <path d="M72 178 L72 40" stroke="#a6e3a1" stroke-width="8" stroke-linecap="round"/>
      <path d="M102 178 L102 25" stroke="#94e2d5" stroke-width="9" stroke-linecap="round"/>
      <path d="M130 178 L130 50" stroke="#a6e3a1" stroke-width="7" stroke-linecap="round"/>
      <path d="M72 100 C55 90 40 102 32 96 C48 88 64 92 72 100" fill="#a6e3a1"/>
      <path d="M102 65 C85 52 70 65 62 58 C78 50 94 56 102 65" fill="#94e2d5"/>
      <path d="M102 25 C118 15 135 25 142 18 C128 12 112 18 102 25" fill="#89dceb"/>
      <path d="M130 50 C145 40 156 50 162 44 C150 36 138 42 130 50" fill="#94e2d5"/>
    </svg>
  `;
}

// 7. Wisteria (Epic)
function renderWisteriaTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <path d="M94 178 C86 130 108 95 100 65" stroke="#585b70" stroke-width="12" stroke-linecap="round"/>
      <!-- Canopy Base -->
      <circle cx="100" cy="55" r="${34 * scale}" fill="#cba6f7" opacity="0.6"/>
      <!-- Hanging Flower Cascades -->
      <path d="M60 65 Q50 105 55 135" stroke="#cba6f7" stroke-width="7" stroke-linecap="round"/>
      <path d="M75 68 Q70 115 72 145" stroke="#b4befe" stroke-width="8" stroke-linecap="round"/>
      <path d="M92 70 Q90 125 93 150" stroke="#cba6f7" stroke-width="9" stroke-linecap="round"/>
      <path d="M108 70 Q110 125 107 150" stroke="#f5c2e7" stroke-width="9" stroke-linecap="round"/>
      <path d="M125 68 Q130 115 128 145" stroke="#b4befe" stroke-width="8" stroke-linecap="round"/>
      <path d="M140 65 Q150 105 145 135" stroke="#cba6f7" stroke-width="7" stroke-linecap="round"/>
      <!-- Flower Pods -->
      <circle cx="55" cy="138" r="4" fill="#f5c2e7"/>
      <circle cx="72" cy="148" r="4.5" fill="#cba6f7"/>
      <circle cx="93" cy="154" r="5" fill="#f5c2e7"/>
      <circle cx="107" cy="154" r="5" fill="#b4befe"/>
      <circle cx="128" cy="148" r="4.5" fill="#f5c2e7"/>
    </svg>
  `;
}

// 8. Fire Maple (Epic)
function renderMapleTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${70 * scale}" ry="14" fill="#313244"/>
      <path d="M92 178 C88 135 106 105 100 78 L104 78 C110 105 96 135 108 178 Z" fill="#585b70"/>
      <!-- Flaming Amber & Crimson Canopy -->
      <circle cx="52" cy="78" r="${27 * scale}" fill="#eba0ac"/>
      <circle cx="148" cy="74" r="${27 * scale}" fill="#f38ba8"/>
      <circle cx="78" cy="48" r="${34 * scale}" fill="#fab387"/>
      <circle cx="122" cy="46" r="${34 * scale}" fill="#eba0ac"/>
      <circle cx="100" cy="38" r="${36 * scale}" fill="#f38ba8"/>
      <!-- Falling Autumn Leaves -->
      <polygon points="50,120 54,124 50,128 46,124" fill="#eba0ac"/>
      <polygon points="150,110 154,114 150,118 146,114" fill="#fab387"/>
      <polygon points="90,140 94,144 90,148 86,144" fill="#f38ba8"/>
    </svg>
  `;
}

// 9. World Tree / Yggdrasil (Legendary)
function renderWorldTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${74 * scale}" ry="14" fill="#313244"/>
      <!-- Glowing Roots -->
      <path d="M100 178 Q70 175 55 185 M100 178 Q130 175 145 185" stroke="#f9e2af" stroke-width="4" stroke-linecap="round"/>
      <!-- Ancient Golden Trunk with Runes -->
      <path d="M90 178 C85 130 92 90 98 60 L102 60 C108 90 115 130 110 178 Z" fill="#89b4fa"/>
      <circle cx="100" cy="115" r="3" fill="#f9e2af"/>
      <circle cx="100" cy="90" r="3" fill="#f9e2af"/>
      <!-- Crown with Golden Runes & Starlight -->
      <circle cx="100" cy="50" r="${44 * scale}" fill="#a6e3a1" opacity="0.8"/>
      <circle cx="100" cy="48" r="${36 * scale}" fill="#94e2d5" opacity="0.9"/>
      <circle cx="100" cy="45" r="${28 * scale}" fill="#f9e2af" opacity="0.4"/>
      <!-- Rune Orbs -->
      <circle cx="60" cy="50" r="4.5" fill="#f9e2af" class="glow-particle"/>
      <circle cx="140" cy="50" r="4.5" fill="#f9e2af" class="glow-particle"/>
      <circle cx="100" cy="15" r="5" fill="#f9e2af" class="glow-particle"/>
      <circle cx="80" cy="30" r="3" fill="#ffffff" class="glow-particle"/>
      <circle cx="120" cy="30" r="3" fill="#ffffff" class="glow-particle"/>
    </svg>
  `;
}

// 10. Crystal Tree (Legendary)
function renderCrystalTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <!-- Quartz Trunk -->
      <polygon points="94,178 98,90 102,90 106,178" fill="#89b4fa" stroke="#cdd6f4" stroke-width="1.5"/>
      <!-- Shimmering Crystal Facets -->
      <polygon points="100,20 80,70 120,70" fill="#89dceb" opacity="0.85" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="60,60 40,110 90,95" fill="#74c7ec" opacity="0.85" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="140,60 160,110 110,95" fill="#74c7ec" opacity="0.85" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="100,55 75,100 125,100" fill="#b4befe" opacity="0.9" stroke="#ffffff" stroke-width="1.5"/>
      <!-- Diamond Sparkles -->
      <circle cx="100" cy="20" r="4" fill="#ffffff" class="glow-particle"/>
      <circle cx="45" cy="105" r="3.5" fill="#ffffff" class="glow-particle"/>
      <circle cx="155" cy="105" r="3.5" fill="#ffffff" class="glow-particle"/>
      <circle cx="100" cy="75" r="3" fill="#ffffff" class="glow-particle"/>
    </svg>
  `;
}

// 11. Mystic Willow (Mythic)
function renderMysticTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <path d="M92 178 C80 135 110 105 98 75 L104 75 C116 105 92 135 108 178 Z" fill="#45475a"/>
      <circle cx="100" cy="65" r="${38 * scale}" fill="#cba6f7" opacity="0.6"/>
      <circle cx="100" cy="65" r="${26 * scale}" fill="#b4befe" opacity="0.8"/>
      <path d="M65 65 Q55 105 60 130" stroke="#cba6f7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M80 65 Q70 115 78 140" stroke="#b4befe" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M120 65 Q130 115 122 140" stroke="#b4befe" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M135 65 Q145 105 140 130" stroke="#cba6f7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="60" cy="130" r="3.5" fill="#f5c2e7" class="glow-particle"/>
      <circle cx="78" cy="140" r="3" fill="#89dceb" class="glow-particle"/>
      <circle cx="102" cy="145" r="4" fill="#cba6f7" class="glow-particle"/>
      <circle cx="122" cy="140" r="3" fill="#89dceb" class="glow-particle"/>
      <circle cx="140" cy="130" r="3.5" fill="#f5c2e7" class="glow-particle"/>
    </svg>
  `;
}

// 12. Cosmic Bonsai (Mythic)
function renderCosmicTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${74 * scale}" ry="14" fill="#181825"/>
      <!-- Deep Obsidian Trunk with Stardust -->
      <path d="M88 178 C80 130 112 100 96 70 L104 70 C118 100 96 130 112 178 Z" fill="#313244"/>
      <!-- Galaxy Nebula Canopy -->
      <circle cx="100" cy="55" r="${46 * scale}" fill="#1e1e2e"/>
      <circle cx="100" cy="55" r="${42 * scale}" fill="#cba6f7" opacity="0.45"/>
      <circle cx="100" cy="55" r="${34 * scale}" fill="#f38ba8" opacity="0.5"/>
      <circle cx="100" cy="55" r="${24 * scale}" fill="#89dceb" opacity="0.6"/>
      <!-- Revolving Celestial Planets & Stars -->
      <ellipse cx="100" cy="55" rx="60" ry="22" stroke="rgba(205, 214, 244, 0.3)" stroke-width="1.5" fill="none" transform="rotate(-15 100 55)"/>
      <circle cx="45" cy="65" r="5" fill="#fab387"/>
      <circle cx="150" cy="42" r="6" fill="#89dceb"/>
      <circle cx="100" cy="55" r="7" fill="#f9e2af" class="glow-particle"/>
      <circle cx="75" cy="40" r="2.5" fill="#ffffff" class="glow-particle"/>
      <circle cx="125" cy="70" r="2.5" fill="#ffffff" class="glow-particle"/>
    </svg>
  `;
}

// Withered Tree
function renderWitheredTree(skin) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg tree-withered">
      <ellipse cx="100" cy="178" rx="68" ry="13" fill="#181825"/>
      <path d="M70 178 L85 176 M115 180 L130 177 M95 179 L105 181" stroke="#313244" stroke-width="2"/>
      <path d="M96 178 C95 148 85 128 92 103 C96 88 98 73 100 63" stroke="#6c7086" stroke-width="13" stroke-linecap="round"/>
      <path d="M104 178 C103 148 93 128 100 103 C104 88 106 73 108 63" stroke="#585b70" stroke-width="5" stroke-linecap="round"/>
      <path d="M92 103 C80 93 65 94 55 83" stroke="#6c7086" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M65 94 C62 80 50 76 45 68" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M100 93 C115 86 135 90 145 78" stroke="#6c7086" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M125 88 C135 78 148 74 155 63" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M98 73 C90 58 92 46 88 36" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M100 63 C108 50 115 43 120 33" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="60" cy="174" r="3" fill="#45475a"/>
      <circle cx="138" cy="176" r="3.5" fill="#45475a"/>
      <circle cx="118" cy="182" r="2.5" fill="#f38ba8" opacity="0.6"/>
      <circle cx="80" cy="180" r="3" fill="#f38ba8" opacity="0.6"/>
    </svg>
  `;
}
