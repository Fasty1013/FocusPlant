// Focus Plant Pro - Application Constants & Configuration

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
}
if (typeof globalThis !== "undefined") {
  globalThis.APP_CONSTANTS = APP_CONSTANTS;
}
