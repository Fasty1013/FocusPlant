// Focus Plant Pro - SVG Tree Generator for all Skins and Stages

const TREE_SKINS = {
  oak: {
    id: "oak",
    name: { ru: "Дуб Мудрости", en: "Wisdom Oak", uz: "Donishmand Eman", ja: "知恵のオーク" },
    desc: { ru: "Классический могучий дуб, символ упорства и силы.", en: "Classic mighty oak, symbol of perseverance.", uz: "Klassik qudratli eman.", ja: "忍耐と強さの象徴。" },
    price: 0,
    emoji: "🌳",
    color: "#a6e3a1"
  },
  sakura: {
    id: "sakura",
    name: { ru: "Цветущая Сакура", en: "Cherry Blossom", uz: "Gullagan Sakura", ja: "桜の木" },
    desc: { ru: "Нежные розовые лепестки дарят гармонию и покой.", en: "Gentle pink petals bring harmony and peace.", uz: "Nozik pushti barglar xotirjamlik bag'ishlaydi.", ja: "調和と安らぎをもたらす。" },
    price: 100,
    emoji: "🌸",
    color: "#f5c2e7"
  },
  pine: {
    id: "pine",
    name: { ru: "Северная Сосна", en: "Nordic Pine", uz: "Shimoliy Qarag'ay", ja: "北欧のマツ" },
    desc: { ru: "Вечнозеленая хвоя, стойкая к любым невзгодам.", en: "Evergreen needles resistant to any storm.", uz: "Bo'ronlarga bardoshli doimiy yashil.", ja: "嵐にも負けない常緑樹。" },
    price: 150,
    emoji: "🌲",
    color: "#94e2d5"
  },
  apple: {
    id: "apple",
    name: { ru: "Золотая Яблоня", en: "Golden Apple Tree", uz: "Oltin Olmaxon", ja: "黄金の林檎樹" },
    desc: { ru: "Дерево изобилия с сияющими золотыми плодами.", en: "Abundance tree with glowing golden fruits.", uz: "Yaltiroq oltin mevalarga ega mo'l-ko'lchilik daraxti.", ja: "輝く黄金の果実をつける豊穣の木。" },
    price: 250,
    emoji: "🍎",
    color: "#f9e2af"
  },
  bamboo: {
    id: "bamboo",
    name: { ru: "Дзен Бамбук", en: "Zen Bamboo", uz: "Dzen Bambuk", ja: "禅の竹林" },
    desc: { ru: "Гибкий и несокрушимый, учит чистой концентрации.", en: "Flexible and unbreakable, teaches pure focus.", uz: "Egiluvchan va sinmas, diqqatni jamlashga o'rgatadi.", ja: "柔軟で決して折れない、純粋な集中。" },
    price: 300,
    emoji: "🎋",
    color: "#89dceb"
  },
  mystic: {
    id: "mystic",
    name: { ru: "Эфирное Древо", en: "Ethereal Willow", uz: "Sehrli Majnuntol", ja: "エーテルの柳" },
    desc: { ru: "Магическое дерево с неоновыми светящимися ветвями.", en: "Magical tree with glowing neon spirit branches.", uz: "Yorug'lik taratuvchi sehrli daraxt.", ja: "神秘的な光を放つ魔法の木。" },
    price: 500,
    emoji: "🔮",
    color: "#cba6f7"
  }
};

function renderTreeSVG(skinId = "oak", stage = 1, isWithered = false) {
  if (isWithered) {
    return renderWitheredTree(skinId);
  }

  // Stage 1 to 5
  switch (stage) {
    case 1: return renderStage1(skinId);
    case 2: return renderStage2(skinId);
    case 3: return renderStage3(skinId);
    case 4: return renderStage4(skinId);
    case 5:
    default: return renderStage5(skinId);
  }
}

// Stage 1: Sprout / Seed
function renderStage1(skin) {
  const potColor = "#313244";
  const soilColor = "#45475a";
  let sproutColor = "#a6e3a1";
  if (skin === "sakura") sproutColor = "#f5c2e7";
  if (skin === "pine") sproutColor = "#94e2d5";
  if (skin === "apple") sproutColor = "#f9e2af";
  if (skin === "bamboo") sproutColor = "#89dceb";
  if (skin === "mystic") sproutColor = "#cba6f7";

  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <!-- Ground Mound -->
      <ellipse cx="100" cy="165" rx="60" ry="14" fill="${potColor}"/>
      <ellipse cx="100" cy="163" rx="52" ry="10" fill="${soilColor}"/>
      
      <!-- Tiny Seed Shell -->
      <path d="M92 162 C92 155 99 154 100 162 Z" fill="#89b4fa" opacity="0.3"/>
      
      <!-- Tiny Sprout Stem -->
      <path d="M100 162 C99 148 101 138 100 126" stroke="${sproutColor}" stroke-width="4" stroke-linecap="round"/>
      
      <!-- Leaves -->
      <path d="M100 135 C92 128 85 132 82 136 C86 142 96 141 100 138" fill="${sproutColor}"/>
      <path d="M100 130 C108 122 116 124 118 129 C114 135 104 134 100 132" fill="${sproutColor}"/>
      
      <!-- Glow Dot -->
      <circle cx="100" cy="122" r="3" fill="#ffffff" opacity="0.8"/>
    </svg>
  `;
}

// Stage 2: Small Seedling
function renderStage2(skin) {
  let mainColor = "#a6e3a1";
  let leafColor = "#94e2d5";
  if (skin === "sakura") { mainColor = "#f5c2e7"; leafColor = "#f38ba8"; }
  if (skin === "pine") { mainColor = "#94e2d5"; leafColor = "#a6e3a1"; }
  if (skin === "apple") { mainColor = "#f9e2af"; leafColor = "#a6e3a1"; }
  if (skin === "bamboo") { mainColor = "#89dceb"; leafColor = "#a6e3a1"; }
  if (skin === "mystic") { mainColor = "#cba6f7"; leafColor = "#b4befe"; }

  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="170" rx="65" ry="15" fill="#313244"/>
      <ellipse cx="100" cy="168" rx="56" ry="11" fill="#45475a"/>
      
      <!-- Trunk / Stem -->
      <path d="M98 168 C97 145 102 125 100 100" stroke="#89b4fa" stroke-width="6" stroke-linecap="round"/>
      
      <!-- Stem Branches -->
      <path d="M99 135 C88 126 78 128 72 122" stroke="#89b4fa" stroke-width="3" stroke-linecap="round"/>
      <path d="M100 120 C112 112 120 114 126 108" stroke="#89b4fa" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Leaf Clusters -->
      <ellipse cx="70" cy="120" rx="14" ry="9" fill="${mainColor}" transform="rotate(-20 70 120)"/>
      <ellipse cx="128" cy="106" rx="15" ry="10" fill="${mainColor}" transform="rotate(25 128 106)"/>
      <ellipse cx="100" cy="94" rx="18" ry="12" fill="${leafColor}"/>
      
      <circle cx="100" cy="92" r="3" fill="#ffffff" opacity="0.6"/>
    </svg>
  `;
}

// Stage 3: Young Tree / Sapling
function renderStage3(skin) {
  let trunk = "#6c7086";
  let foliage = "#a6e3a1";
  let foliage2 = "#94e2d5";

  if (skin === "sakura") { trunk = "#585b70"; foliage = "#f5c2e7"; foliage2 = "#eba0ac"; }
  if (skin === "pine") { trunk = "#45475a"; foliage = "#94e2d5"; foliage2 = "#74c7ec"; }
  if (skin === "apple") { trunk = "#6c7086"; foliage = "#a6e3a1"; foliage2 = "#f9e2af"; }
  if (skin === "bamboo") { trunk = "#a6e3a1"; foliage = "#94e2d5"; foliage2 = "#89dceb"; }
  if (skin === "mystic") { trunk = "#45475a"; foliage = "#cba6f7"; foliage2 = "#b4befe"; }

  if (skin === "bamboo") {
    return `
      <svg viewBox="0 0 200 200" class="tree-svg">
        <ellipse cx="100" cy="175" rx="68" ry="14" fill="#313244"/>
        <path d="M92 175 L92 80" stroke="${trunk}" stroke-width="6" stroke-linecap="round"/>
        <path d="M108 175 L108 70" stroke="${trunk}" stroke-width="7" stroke-linecap="round"/>
        <line x1="88" y1="140" x2="96" y2="140" stroke="#1e1e2e" stroke-width="2"/>
        <line x1="88" y1="110" x2="96" y2="110" stroke="#1e1e2e" stroke-width="2"/>
        <line x1="104" y1="130" x2="112" y2="130" stroke="#1e1e2e" stroke-width="2"/>
        <line x1="104" y1="95" x2="112" y2="95" stroke="#1e1e2e" stroke-width="2"/>
        <!-- Bamboo leaves -->
        <path d="M92 110 C80 105 70 115 65 110 C75 102 88 106 92 110" fill="${foliage}"/>
        <path d="M108 95 C120 90 135 98 140 92 C128 85 115 90 108 95" fill="${foliage}"/>
        <path d="M108 70 C100 55 115 50 120 45 C125 55 118 65 108 70" fill="${foliage2}"/>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="175" rx="68" ry="14" fill="#313244"/>
      <!-- Trunk -->
      <path d="M95 175 C94 140 98 115 100 85" stroke="${trunk}" stroke-width="12" stroke-linecap="round"/>
      <path d="M98 120 C85 105 72 102 65 95" stroke="${trunk}" stroke-width="5" stroke-linecap="round"/>
      <path d="M100 105 C115 95 128 92 135 85" stroke="${trunk}" stroke-width="5" stroke-linecap="round"/>
      
      <!-- Foliage Clouds -->
      <circle cx="65" cy="90" r="22" fill="${foliage}" opacity="0.9"/>
      <circle cx="135" cy="82" r="24" fill="${foliage}" opacity="0.9"/>
      <circle cx="100" cy="70" r="32" fill="${foliage2}"/>
      <circle cx="100" cy="65" r="24" fill="${foliage}" opacity="0.8"/>
    </svg>
  `;
}

// Stage 4: Maturing Tree
function renderStage4(skin) {
  // Near mature, fuller canopy
  return renderStage5(skin, 0.85);
}

// Stage 5: Full Splendid Bloom
function renderStage5(skin, scale = 1.0) {
  if (skin === "sakura") return renderSakuraTree(scale);
  if (skin === "pine") return renderPineTree(scale);
  if (skin === "apple") return renderAppleTree(scale);
  if (skin === "bamboo") return renderBambooGrove(scale);
  if (skin === "mystic") return renderMysticTree(scale);
  return renderOakTree(scale);
}

// 1. Classic Oak Tree
function renderOakTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${70 * scale}" ry="14" fill="#313244"/>
      <!-- Sturdy Trunk -->
      <path d="M90 178 C88 140 92 110 97 80 L103 80 C108 110 112 140 110 178 Z" fill="#6c7086"/>
      <path d="M96 115 C80 98 62 95 50 86" stroke="#6c7086" stroke-width="7" stroke-linecap="round"/>
      <path d="M104 105 C122 92 138 90 150 78" stroke="#6c7086" stroke-width="7" stroke-linecap="round"/>
      
      <!-- Lush Green Canopy -->
      <circle cx="55" cy="80" r="${28 * scale}" fill="#a6e3a1"/>
      <circle cx="145" cy="72" r="${28 * scale}" fill="#a6e3a1"/>
      <circle cx="80" cy="55" r="${34 * scale}" fill="#94e2d5"/>
      <circle cx="120" cy="52" r="${34 * scale}" fill="#a6e3a1"/>
      <circle cx="100" cy="42" r="${36 * scale}" fill="#a6e3a1"/>
      <circle cx="100" cy="48" r="${26 * scale}" fill="#b4befe" opacity="0.2"/>
      
      <!-- Fireflies / Sparkles -->
      <circle cx="45" cy="65" r="2.5" fill="#f9e2af" class="glow-particle"/>
      <circle cx="155" cy="60" r="3" fill="#f9e2af" class="glow-particle"/>
      <circle cx="95" cy="25" r="2.5" fill="#f9e2af" class="glow-particle"/>
    </svg>
  `;
}

// 2. Sakura Tree
function renderSakuraTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <!-- Elegant Curving Trunk -->
      <path d="M92 178 C86 135 106 105 100 75 L106 75 C112 105 96 135 108 178 Z" fill="#585b70"/>
      <path d="M95 118 C78 104 60 100 46 90" stroke="#585b70" stroke-width="6" stroke-linecap="round"/>
      <path d="M104 100 C125 86 142 84 154 72" stroke="#585b70" stroke-width="6" stroke-linecap="round"/>
      
      <!-- Pink Sakura Clouds -->
      <circle cx="50" cy="82" r="${27 * scale}" fill="#f5c2e7"/>
      <circle cx="150" cy="68" r="${29 * scale}" fill="#f5c2e7"/>
      <circle cx="78" cy="50" r="${35 * scale}" fill="#f38ba8"/>
      <circle cx="122" cy="46" r="${35 * scale}" fill="#f5c2e7"/>
      <circle cx="100" cy="38" r="${36 * scale}" fill="#eba0ac"/>
      
      <!-- Falling Cherry Blossom Petals -->
      <ellipse cx="40" cy="120" rx="3.5" ry="2" fill="#f5c2e7" transform="rotate(30 40 120)"/>
      <ellipse cx="160" cy="110" rx="3.5" ry="2" fill="#f5c2e7" transform="rotate(-25 160 110)"/>
      <ellipse cx="130" cy="140" rx="3" ry="1.8" fill="#f38ba8" transform="rotate(45 130 140)"/>
      <ellipse cx="70" cy="155" rx="3" ry="1.8" fill="#f5c2e7" transform="rotate(-15 70 155)"/>
    </svg>
  `;
}

// 3. Nordic Pine Tree
function renderPineTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${70 * scale}" ry="14" fill="#313244"/>
      <!-- Straight Trunk -->
      <rect x="94" y="110" width="12" height="68" fill="#45475a" rx="3"/>
      
      <!-- Evergreen Tiered Needles (Triangles) -->
      <!-- Bottom tier -->
      <polygon points="100,75 40,135 160,135" fill="#74c7ec"/>
      <polygon points="100,75 46,132 154,132" fill="#94e2d5"/>
      <!-- Middle tier -->
      <polygon points="100,50 55,100 145,100" fill="#74c7ec"/>
      <polygon points="100,50 60,97 140,97" fill="#94e2d5"/>
      <!-- Top tier -->
      <polygon points="100,22 70,68 130,68" fill="#74c7ec"/>
      <polygon points="100,22 74,65 126,65" fill="#94e2d5"/>
      
      <!-- Snow Accents -->
      <path d="M100 22 L86 42 C92 40 108 40 114 42 Z" fill="#ffffff" opacity="0.75"/>
      <circle cx="100" cy="20" r="4" fill="#f9e2af"/>
    </svg>
  `;
}

// 4. Golden Apple Tree
function renderAppleTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${70 * scale}" ry="14" fill="#313244"/>
      <path d="M91 178 C88 138 94 110 98 80 L102 80 C106 110 112 138 109 178 Z" fill="#6c7086"/>
      <!-- Canopy -->
      <circle cx="55" cy="78" r="${27 * scale}" fill="#a6e3a1"/>
      <circle cx="145" cy="72" r="${27 * scale}" fill="#a6e3a1"/>
      <circle cx="80" cy="52" r="${34 * scale}" fill="#94e2d5"/>
      <circle cx="120" cy="50" r="${34 * scale}" fill="#a6e3a1"/>
      <circle cx="100" cy="40" r="${36 * scale}" fill="#a6e3a1"/>
      
      <!-- Golden Apples with Sparkles -->
      <circle cx="58" cy="80" r="6" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      <circle cx="138" cy="75" r="6" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      <circle cx="95" cy="50" r="6.5" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      <circle cx="125" cy="42" r="5.5" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      <circle cx="80" cy="65" r="5.5" fill="#f9e2af" stroke="#fab387" stroke-width="1.5"/>
      
      <!-- Shine reflections -->
      <circle cx="56" cy="78" r="1.5" fill="#ffffff"/>
      <circle cx="93" cy="48" r="1.5" fill="#ffffff"/>
      <circle cx="136" cy="73" r="1.5" fill="#ffffff"/>
    </svg>
  `;
}

// 5. Zen Bamboo Grove
function renderBambooGrove(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <!-- Bamboo Stems -->
      <!-- Stalk 1 (Left) -->
      <path d="M72 178 L72 40" stroke="#a6e3a1" stroke-width="8" stroke-linecap="round"/>
      <line x1="68" y1="140" x2="76" y2="140" stroke="#1e1e2e" stroke-width="2"/>
      <line x1="68" y1="100" x2="76" y2="100" stroke="#1e1e2e" stroke-width="2"/>
      <line x1="68" y1="65" x2="76" y2="65" stroke="#1e1e2e" stroke-width="2"/>
      
      <!-- Stalk 2 (Center-Right, Taller) -->
      <path d="M102 178 L102 25" stroke="#94e2d5" stroke-width="9" stroke-linecap="round"/>
      <line x1="97" y1="145" x2="107" y2="145" stroke="#1e1e2e" stroke-width="2.5"/>
      <line x1="97" y1="105" x2="107" y2="105" stroke="#1e1e2e" stroke-width="2.5"/>
      <line x1="97" y1="65" x2="107" y2="65" stroke="#1e1e2e" stroke-width="2.5"/>
      
      <!-- Stalk 3 (Far Right) -->
      <path d="M130 178 L130 50" stroke="#a6e3a1" stroke-width="7" stroke-linecap="round"/>
      <line x1="126" y1="130" x2="134" y2="130" stroke="#1e1e2e" stroke-width="2"/>
      <line x1="126" y1="90" x2="134" y2="90" stroke="#1e1e2e" stroke-width="2"/>
      
      <!-- Bamboo Leaves -->
      <path d="M72 100 C55 90 40 102 32 96 C48 88 64 92 72 100" fill="#a6e3a1"/>
      <path d="M102 65 C85 52 70 65 62 58 C78 50 94 56 102 65" fill="#94e2d5"/>
      <path d="M102 25 C118 15 135 25 142 18 C128 12 112 18 102 25" fill="#89dceb"/>
      <path d="M130 90 C145 82 158 92 165 86 C152 78 138 84 130 90" fill="#a6e3a1"/>
      <path d="M130 50 C145 40 156 50 162 44 C150 36 138 42 130 50" fill="#94e2d5"/>
    </svg>
  `;
}

// 6. Ethereal Mystic Willow
function renderMysticTree(scale = 1.0) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg">
      <ellipse cx="100" cy="178" rx="${72 * scale}" ry="14" fill="#313244"/>
      <!-- Twisted Ethereal Trunk -->
      <path d="M92 178 C80 135 110 105 98 75 L104 75 C116 105 92 135 108 178 Z" fill="#45475a"/>
      
      <!-- Main Core Glow -->
      <circle cx="100" cy="65" r="${38 * scale}" fill="#cba6f7" opacity="0.6"/>
      <circle cx="100" cy="65" r="${26 * scale}" fill="#b4befe" opacity="0.8"/>
      
      <!-- Hanging Glowing Tendrils -->
      <path d="M65 65 Q55 105 60 130" stroke="#cba6f7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M80 65 Q70 115 78 140" stroke="#b4befe" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M120 65 Q130 115 122 140" stroke="#b4befe" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M135 65 Q145 105 140 130" stroke="#cba6f7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M100 65 Q100 125 102 145" stroke="#89dceb" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      
      <!-- Glowing Spirit Orbs -->
      <circle cx="60" cy="130" r="3.5" fill="#f5c2e7" class="glow-particle"/>
      <circle cx="78" cy="140" r="3" fill="#89dceb" class="glow-particle"/>
      <circle cx="102" cy="145" r="4" fill="#cba6f7" class="glow-particle"/>
      <circle cx="122" cy="140" r="3" fill="#89dceb" class="glow-particle"/>
      <circle cx="140" cy="130" r="3.5" fill="#f5c2e7" class="glow-particle"/>
    </svg>
  `;
}

// Withered / Dead Tree
function renderWitheredTree(skin) {
  return `
    <svg viewBox="0 0 200 200" class="tree-svg tree-withered">
      <!-- Dry Cracked Ground -->
      <ellipse cx="100" cy="178" rx="68" ry="13" fill="#181825"/>
      <path d="M70 178 L85 176 M115 180 L130 177 M95 179 L105 181" stroke="#313244" stroke-width="2"/>
      
      <!-- Crooked Leafless Trunk -->
      <path d="M96 178 C95 148 85 128 92 103 C96 88 98 73 100 63" stroke="#6c7086" stroke-width="13" stroke-linecap="round"/>
      <path d="M104 178 C103 148 93 128 100 103 C104 88 106 73 108 63" stroke="#585b70" stroke-width="5" stroke-linecap="round"/>
      
      <!-- Bare Twisted Branches -->
      <path d="M92 103 C80 93 65 94 55 83" stroke="#6c7086" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M65 94 C62 80 50 76 45 68" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M100 93 C115 86 135 90 145 78" stroke="#6c7086" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M125 88 C135 78 148 74 155 63" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M98 73 C90 58 92 46 88 36" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M100 63 C108 50 115 43 120 33" stroke="#6c7086" stroke-width="3.5" stroke-linecap="round"/>
      
      <!-- Fallen Faded Leaves / Dust -->
      <circle cx="60" cy="174" r="3" fill="#45475a"/>
      <circle cx="138" cy="176" r="3.5" fill="#45475a"/>
      <circle cx="118" cy="182" r="2.5" fill="#f38ba8" opacity="0.6"/>
      <circle cx="80" cy="180" r="3" fill="#f38ba8" opacity="0.6"/>
      <circle cx="95" cy="183" r="2" fill="#585b70"/>
    </svg>
  `;
}

