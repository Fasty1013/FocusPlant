// Focus Plant Pro - Application Constants & Configuration

const DEFAULT_BLOCKLIST = [
  "youtube.com",
  "instagram.com",
  "facebook.com",
  "tiktok.com",
  "reddit.com",
  "twitter.com",
  "x.com",
  "vk.com",
  "netflix.com",
  "twitch.tv"
];

const DEFAULT_WHITELIST = [
  "wikipedia.org",
  "github.com",
  "stackoverflow.com",
  "google.com"
];

const DEFAULT_QUESTS = [
  { id: 1, desc: "Завершить 1 сессию фокуса", target: 1, current: 0, done: false, claimed: false, reward: 25 },
  { id: 2, desc: "Сфокусироваться на 45 минут", target: 45, current: 0, done: false, claimed: false, reward: 40 },
  { id: 3, desc: "Выполнить 2 задачи из списка", target: 2, current: 0, done: false, claimed: false, reward: 30 }
];

const APP_CONSTANTS = {
  TIMER: {
    DEFAULT_DURATION_SECONDS: 1500, // 25 minutes
    DEFAULT_MINUTES: 25,
    MIN_MINUTES: 1,
    MAX_MINUTES: 180,
    RING_RADIUS: 96,
    RING_CIRCUMFERENCE: 2 * Math.PI * 96 // 603.1857894892403
  },
  STATES: {
    IDLE: "idle",
    RUNNING: "running",
    PAUSED: "paused",
    COMPLETED: "completed",
    WITHERED: "withered"
  },
  TREE_HEALTH: {
    HEALTHY: "healthy",
    WITHERED: "withered"
  },
  TABS: {
    TIMER: "tabTimer",
    GARDEN: "tabGarden",
    SHOP: "tabShop",
    TASKS: "tabTasks",
    BLOCKER: "tabBlocker"
  },
  SOUND_TYPES: {
    NONE: "none",
    RAIN: "rain",
    WAVES: "waves",
    FOREST: "forest",
    FIRE: "fire",
    ZEN: "zen",
    WHITE: "white"
  },
  STORAGE_KEYS: [
    "timerState",
    "sessionStartTime",
    "sessionDuration",
    "sessionEndTime",
    "secondsRemaining",
    "selectedSkin",
    "witherReason",
    "coins",
    "level",
    "lastDrop",
    "strictMode",
    "treeState",
    "ambientSound",
    "lang",
    "forest",
    "stats",
    "unlockedSkins",
    "quests",
    "todos",
    "achievements",
    "strictStreak",
    "blockMode",
    "alertStyle",
    "blacklist",
    "whitelist"
  ]
};

if (typeof window !== "undefined") {
  window.APP_CONSTANTS = APP_CONSTANTS;
  window.DEFAULT_BLOCKLIST = DEFAULT_BLOCKLIST;
  window.DEFAULT_WHITELIST = DEFAULT_WHITELIST;
  window.DEFAULT_QUESTS = DEFAULT_QUESTS;
}
if (typeof globalThis !== "undefined") {
  globalThis.APP_CONSTANTS = APP_CONSTANTS;
  globalThis.DEFAULT_BLOCKLIST = DEFAULT_BLOCKLIST;
  globalThis.DEFAULT_WHITELIST = DEFAULT_WHITELIST;
  globalThis.DEFAULT_QUESTS = DEFAULT_QUESTS;
}

