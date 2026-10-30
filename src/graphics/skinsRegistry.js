// Focus Plant Pro - Tree Skins Registry & Botanical Catalog

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
  orange_tree: {
    id: "orange_tree",
    rarity: "uncommon",
    name: { ru: "Сочный Апельсин", en: "Valencia Orange", uz: "Shirin Apelsin", ja: "オレンジの木" },
    desc: { ru: "Средиземноморское цитрусовое дерево с яркими ароматными плодами.", en: "Mediterranean citrus tree with vibrant aromatic fruits.", uz: "Yorqin mevali o'rta dengiz apelsini.", ja: "爽やかな香りと果実を実らせる柑橘の木。" },
    price: 180,
    emoji: "🍊",
    color: "#fab387"
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
  jacaranda: {
    id: "jacaranda",
    rarity: "rare",
    name: { ru: "Сиреневая Джакаранда", en: "Purple Jacaranda", uz: "Binafsha Jakaranda", ja: "ジャカランダの木" },
    desc: { ru: "Волшебное субтропическое дерево с пышным облаком лавандовых цветов.", en: "Enchanting tree blooming with a violet-lavender cloud of flowers.", uz: "Binafsharang gullar bulutiga ega sehrli daraxt.", ja: "紫色の花が雲のように咲き誇る幻想的な木。" },
    price: 320,
    emoji: "🪻",
    color: "#b4befe"
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
  golden_ginkgo: {
    id: "golden_ginkgo",
    rarity: "epic",
    name: { ru: "Золотой Гинкго", en: "Golden Ginkgo", uz: "Oltin Ginkgo", ja: "黄金のイチョウ" },
    desc: { ru: "Древнейшее священное древо мира с веерообразными золотыми листьями.", en: "Ancient sacred tree with brilliant fan-shaped golden leaves.", uz: "Yelpig'ichsimon oltin bargli qadimiy daraxt.", ja: "扇形の黄金の葉が舞い散る長寿と繁栄の木。" },
    price: 550,
    emoji: "🍂",
    color: "#f9e2af"
  },
  cyber_neon: {
    id: "cyber_neon",
    rarity: "epic",
    exclusiveShop: true,
    name: { ru: "Кибер-Неон 2077", en: "Cyber Neon 2077", uz: "Kiber-Neon 2077", ja: "サイバーネオン 2077" },
    desc: { ru: "⚡ ЭКСКЛЮЗИВ МАГАЗИНА: Футуристическое кибер-древо с неоновыми импульсами. Нельзя выбить из сессий фокуса!", en: "⚡ SHOP EXCLUSIVE: Futuristic tree pulsing with neon data streams. Cannot be rolled from focus sessions!", uz: "⚡ DO'KON EKSKLUZIVI: Neon impulslarga ega futuristik kiber daraxt. Fokusdan chiqmaydi!", ja: "⚡ ショップ限定: ネオンパルスが走る未来型サイバーツリー。タイマーからは出現しません！" },
    price: 650,
    emoji: "⚡",
    color: "#00f0ff"
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
  volcano_magma: {
    id: "volcano_magma",
    rarity: "legendary",
    exclusiveShop: true,
    name: { ru: "Магматический Вулкан", en: "Volcanic Magma Tree", uz: "Vulkan Magma Daraxti", ja: "溶岩のマグマ樹" },
    desc: { ru: "🔥 ЭКСКЛЮЗИВ МАГАЗИНА: Застывший базальт с раскалёнными магматическими жилами и искрами пламени. Нельзя выбить!", en: "🔥 SHOP EXCLUSIVE: Obsidian core coursing with liquid magma rivers and glowing embers. Cannot be rolled!", uz: "🔥 DO'KON EKSKLUZIVI: Qaynoq magma daryolari va olov uchqunlari bilan to'la daraxt. Fokusdan chiqmaydi!", ja: "🔥 ショップ限定: 黒曜石の幹に灼熱の溶岩が流れる火山樹。タイマーからは入手不可！" },
    price: 950,
    emoji: "🌋",
    color: "#ff5500"
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
  },
  celestial_starlight: {
    id: "celestial_starlight",
    rarity: "mythic",
    exclusiveShop: true,
    name: { ru: "Звёздный Селестиал", en: "Celestial Starlight", uz: "Yulduzli Selestial", ja: "星神のセレスティアル" },
    desc: { ru: "✦ ВЫСШИЙ ЭКСКЛЮЗИВ: Выковано из звёздного света и алмазной космической пыли. Доступно только в магазине!", en: "✦ SUPREME EXCLUSIVE: Forged from pure starlight, astral diamonds and auroras. Shop exclusive!", uz: "✦ OLIY EKSKLUZIV: Yulduzlar nuri va olmos changidan yaratilgan oliyjanob daraxt!", ja: "✦ 最高峰限定: 星屑とオーロラを纏う神聖なる星樹。ショップでのみ入手可能！" },
    price: 2000,
    emoji: "🌟",
    color: "#f5e0dc"
  }
};

if (typeof window !== "undefined") {
  window.TREE_SKINS = TREE_SKINS;
}
if (typeof globalThis !== "undefined") {
  globalThis.TREE_SKINS = TREE_SKINS;
}
