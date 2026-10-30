// Focus Plant Pro - Achievements & Medals Registry

const DEFAULT_ACHIEVEMENTS = [
  {
    id: "night_owl",
    icon: "🦉",
    title: { ru: "Ночная сова", en: "Night Owl", uz: "Tungi boyqush", ja: "夜のフクロウ" },
    desc: {
      ru: "Успешно вырастить дерево после 23:00",
      en: "Successfully grow a tree after 23:00",
      uz: "Soat 23:00 dan keyin muvaffaqiyatli daraxt o'stiring",
      ja: "夜23時以降に木を1本育てる"
    },
    target: 1,
    current: 0,
    unlocked: false,
    claimed: false,
    reward: 50
  },
  {
    id: "marathon",
    icon: "🏃",
    title: { ru: "Марафонец", en: "Marathoner", uz: "Marafonchi", ja: "マラソンランナー" },
    desc: {
      ru: "Непрерывный сеанс фокуса 90+ минут",
      en: "Continuous focus session for 90+ minutes",
      uz: "90+ daqiqalik uzluksiz diqqat seansi",
      ja: "90分以上の連続集中セッションを完了する"
    },
    target: 1,
    current: 0,
    unlocked: false,
    claimed: false,
    reward: 100
  },
  {
    id: "iron_will",
    icon: "🛡️",
    title: { ru: "Железная воля", en: "Iron Will", uz: "Temir iroda", ja: "鋼の意志" },
    desc: {
      ru: "Вырастить 5 деревьев подряд в Строгом режиме без срывов",
      en: "Grow 5 trees in a row in Strict Mode without failure",
      uz: "Qat'iy rejimda ketma-ket 5 ta daraxtni buzmasdan o'stiring",
      ja: "厳格モードで失敗せずに連続5本の木を育てる"
    },
    target: 5,
    current: 0,
    unlocked: false,
    claimed: false,
    reward: 150
  },
  {
    id: "mythic_botanist",
    icon: "👑",
    title: { ru: "Королевский ботаник", en: "Royal Botanist", uz: "Qirollik botanigi", ja: "王立植物学者" },
    desc: {
      ru: "Выбить первое Мифическое дерево",
      en: "Discover your first Mythic tree",
      uz: "Birinchi Afsonaviy (Mifik) daraxtni qo'lga kiriting",
      ja: "初の神話級（ミシック）の木を発見する"
    },
    target: 1,
    current: 0,
    unlocked: false,
    claimed: false,
    reward: 200
  },
  {
    id: "first_sprout",
    icon: "🌱",
    title: { ru: "Первый росток", en: "First Sprout", uz: "Birinchi nihol", ja: "初めての芽吹き" },
    desc: {
      ru: "Успешно вырастить своё первое дерево фокуса",
      en: "Successfully grow your very first focus tree",
      uz: "Birinchi diqqat daraxtingizni muvaffaqiyatli o'stiring",
      ja: "初めての木を無事に育て上げる"
    },
    target: 1,
    current: 0,
    unlocked: false,
    claimed: false,
    reward: 25
  },
  {
    id: "grove_master",
    icon: "🌲",
    title: { ru: "Мастер леса", en: "Grove Master", uz: "O'rmon ustasi", ja: "森のマスター" },
    desc: {
      ru: "Собрать коллекцию из 10 уникальных видов деревьев",
      en: "Collect 10 unique species of trees",
      uz: "10 xil turdagi noyob daraxtlar to'plamini yiging",
      ja: "10種類のユニークな木をコレクションする"
    },
    target: 10,
    current: 0,
    unlocked: false,
    claimed: false,
    reward: 100
  }
];

if (typeof window !== "undefined") {
  window.DEFAULT_ACHIEVEMENTS = DEFAULT_ACHIEVEMENTS;
}
if (typeof globalThis !== "undefined") {
  globalThis.DEFAULT_ACHIEVEMENTS = DEFAULT_ACHIEVEMENTS;
}
