// Focus Plant Pro - Cross-Browser Background Service Worker & Script
const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

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

const DEFAULT_ACHIEVEMENTS = [
  {
    id: "night_owl",
    icon: "🦉",
    title: { ru: "Ночная сова", en: "Night Owl", uz: "Tungi boyqush", zh: "夜猫子" },
    desc: {
      ru: "Успешно вырастить дерево после 23:00",
      en: "Successfully grow a tree after 23:00",
      uz: "Soat 23:00 dan keyin muvaffaqiyatli daraxt o'stiring",
      zh: "晚上 23:00 后成功种出一棵树"
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
    title: { ru: "Марафонец", en: "Marathoner", uz: "Marafonchi", zh: "马拉松选手" },
    desc: {
      ru: "Непрерывный сеанс фокуса 90+ минут",
      en: "Continuous focus session for 90+ minutes",
      uz: "90+ daqiqalik uzluksiz diqqat seansi",
      zh: "连续专注 90 分钟以上"
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
    title: { ru: "Железная воля", en: "Iron Will", uz: "Temir iroda", zh: "钢铁意志" },
    desc: {
      ru: "Вырастить 5 деревьев подряд в Строгом режиме без срывов",
      en: "Grow 5 trees in a row in Strict Mode without failure",
      uz: "Qat'iy rejimda ketma-ket 5 ta daraxtni buzmasdan o'stiring",
      zh: "在严格模式下连续种出 5 棵树且不违规"
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
    title: { ru: "Королевский ботаник", en: "Royal Botanist", uz: "Qirollik botanigi", zh: "皇家植物学家" },
    desc: {
      ru: "Выбить первое Мифическое дерево",
      en: "Discover your first Mythic tree",
      uz: "Birinchi Afsonaviy (Mifik) daraxtni qo'lga kiriting",
      zh: "抽到第一棵神话级树木"
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
    title: { ru: "Первый росток", en: "First Sprout", uz: "Birinchi nihol", zh: "破土萌芽" },
    desc: {
      ru: "Успешно вырастить своё первое дерево фокуса",
      en: "Successfully grow your very first focus tree",
      uz: "Birinchi diqqat daraxtingizni muvaffaqiyatli o'stiring",
      zh: "成功种出第一棵专注树"
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
    title: { ru: "Мастер леса", en: "Grove Master", uz: "O'rmon ustasi", zh: "森林大师" },
    desc: {
      ru: "Собрать коллекцию из 10 уникальных видов деревьев",
      en: "Collect 10 unique species of trees",
      uz: "10 xil turdagi noyob daraxtlar to'plamini yiging",
      zh: "收集 10 种不同品种的树木"
    },
    target: 10,
    current: 0,
    unlocked: false,
    claimed: false,
    reward: 100
  }
];

// Tree Rarity Pools
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

// Calculate drop chances based on duration
function getDropChances(minutes) {
  const m = Math.max(5, Math.min(180, Number(minutes) || 25));

  if (m <= 15) {
    return { common: 75, uncommon: 22, rare: 3, epic: 0, legendary: 0, mythic: 0 };
  } else if (m <= 25) {
    return { common: 55, uncommon: 30, rare: 12, epic: 3, legendary: 0, mythic: 0 };
  } else if (m <= 45) {
    return { common: 35, uncommon: 32, rare: 22, epic: 9, legendary: 2, mythic: 0 };
  } else if (m <= 60) {
    return { common: 18, uncommon: 28, rare: 30, epic: 17, legendary: 6, mythic: 1 };
  } else if (m <= 90) {
    return { common: 8, uncommon: 20, rare: 32, epic: 26, legendary: 11, mythic: 3 };
  } else {
    return { common: 3, uncommon: 12, rare: 28, epic: 32, legendary: 18, mythic: 7 };
  }
}

// Roll random tree based on duration
function rollTreeByDuration(minutes) {
  const chances = getDropChances(minutes);
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

  const pool = RARITY_POOLS[chosenRarity] || ["oak"];
  const skin = pool[Math.floor(Math.random() * pool.length)] || "oak";

  return { skin, rarity: chosenRarity };
}

// Cross-Browser Background Audio Manager (Keeps playing even when browser is minimized or popup is closed)
let creatingOffscreenDoc = null;
async function ensureOffscreenDoc() {
  if (typeof chrome !== 'undefined' && chrome.offscreen && chrome.offscreen.createDocument) {
    if (chrome.offscreen.hasDocument) {
      try {
        if (await chrome.offscreen.hasDocument()) return;
      } catch (e) {}
    }
    if (chrome.runtime.getContexts) {
      try {
        const contexts = await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] });
        if (contexts && contexts.length > 0) return;
      } catch (e) {}
    }
    if (creatingOffscreenDoc) {
      await creatingOffscreenDoc;
      return;
    }
    try {
      creatingOffscreenDoc = chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'Keep ambient focus audio playing when popup is closed or browser is minimized'
      });
      await creatingOffscreenDoc;
    } catch (e) {
      // Document might already exist
    } finally {
      creatingOffscreenDoc = null;
    }
  }
}

async function setAmbientAudio(soundType) {
  await ext.storage.local.set({ ambientSound: soundType });

  if (soundType === "none") {
    try { ext.runtime.sendMessage({ action: "STOP_AMBIENT" }); } catch (e) {}
    if (typeof soundManager !== 'undefined') {
      soundManager.stopAmbient();
    }
    return;
  }

  if (typeof chrome !== 'undefined' && chrome.offscreen) {
    await ensureOffscreenDoc();
    try {
      ext.runtime.sendMessage({ action: "PLAY_AMBIENT", soundType });
    } catch (e) {}
    setTimeout(() => {
      try {
        ext.runtime.sendMessage({ action: "PLAY_AMBIENT", soundType });
      } catch (e) {}
    }, 150);
  } else {
    if (typeof soundManager !== 'undefined') {
      soundManager.playAmbient(soundType);
    }
  }
}

function playBackgroundChime() {
  try { ext.runtime.sendMessage({ action: "PLAY_CHIME" }); } catch (e) {}
  if (typeof soundManager !== 'undefined') {
    soundManager.playCompleteChime();
  }
}

function playBackgroundWilt() {
  try { ext.runtime.sendMessage({ action: "PLAY_WILT" }); } catch (e) {}
  if (typeof soundManager !== 'undefined') {
    soundManager.playWiltSound();
  }
}

// Helper to update badge
function setBadge(text, color = "#10b981") {
  const action = ext.action || ext.browserAction;
  if (!action) return;

  action.setBadgeText({ text: text || "" });
  if (text) {
    action.setBadgeBackgroundColor({ color });
  }
}

// Show cross-browser notification
function showNotification(title, message) {
  if (ext.notifications && ext.notifications.create) {
    ext.notifications.create({
      type: "basic",
      iconUrl: ext.runtime.getURL("icons/icon128.png"),
      title: title,
      message: message,
      priority: 2
    });
  }
}

// Check if a URL matches the site list
function matchesSiteList(url, siteList) {
  if (!url || !Array.isArray(siteList) || siteList.length === 0) return false;
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    return siteList.some(item => {
      if (!item) return false;
      const clean = item.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/.*$/, '')
        .trim();
      if (!clean) return false;

      return hostname === clean ||
             hostname.endsWith('.' + clean) ||
             parsed.href.toLowerCase().includes(clean);
    });
  } catch (e) {
    return false;
  }
}

// Initialize on install
ext.runtime.onInstalled.addListener(() => {
  ext.storage.local.get(null, (data) => {
    const defaults = {
      timerState: "idle",
      isTimerRunning: false,
      sessionStartTime: null,
      sessionDuration: 25 * 60,
      sessionEndTime: null,
      secondsRemaining: 25 * 60,
      selectedSkin: "oak",
      unlockedSkins: ["oak"],
      treeState: "healthy",
      witherReason: null,
      coins: 50,
      xp: 0,
      level: 1,
      forest: [],
      blockedSites: DEFAULT_BLOCKLIST,
      whiteListSites: DEFAULT_WHITELIST,
      blockMode: "blacklist",
      todos: [],
      quests: DEFAULT_QUESTS,
      stats: {
        totalSessions: 0,
        completedSessions: 0,
        witheredSessions: 0,
        totalFocusMinutes: 0,
        dailyStats: [0, 0, 0, 0, 0, 0, 0]
      },
      lang: "ru",
      alertStyle: "fullscreen",
      ambientSound: "none",
      strictMode: false,
      achievements: DEFAULT_ACHIEVEMENTS,
      strictStreak: 0
    };

    const toSet = {};
    for (const key in defaults) {
      if (data[key] === undefined) {
        toSet[key] = defaults[key];
      }
    }
    // Migrate any legacy "banner" to "fullscreen"
    if (data.alertStyle === "banner") {
      toSet.alertStyle = "fullscreen";
    }

    if (Object.keys(toSet).length > 0) {
      ext.storage.local.set(toSet);
    }
  });
});

// Auto-migrate legacy alertStyle to fullscreen on every load
ext.storage.local.get(["alertStyle"], (d) => {
  if (!d.alertStyle || d.alertStyle === "banner") {
    ext.storage.local.set({ alertStyle: "fullscreen" });
  }
});

// Resume background sound on browser startup if session is still running
if (ext.runtime.onStartup) {
  ext.runtime.onStartup.addListener(() => {
    ext.storage.local.get(["timerState", "ambientSound"], (data) => {
      if (data.timerState === "running" && data.ambientSound && data.ambientSound !== "none") {
        setAmbientAudio(data.ambientSound);
      }
    });
  });
}

// Periodic badge update alarm
ext.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "FOCUS_SESSION_END") {
    handleSessionComplete();
  } else if (alarm.name === "BADGE_TICK") {
    updateRunningBadge();
  }
});

// Update badge display while timer is running
function updateRunningBadge() {
  ext.storage.local.get(["timerState", "sessionEndTime", "strictMode"], (data) => {
    if (data.timerState === "running" && data.sessionEndTime) {
      const remainingMs = data.sessionEndTime - Date.now();
      if (remainingMs <= 0) {
        handleSessionComplete();
      } else {
        const mins = Math.ceil(remainingMs / 60000);
        const color = data.strictMode ? "#f38ba8" : "#10b981";
        setBadge(data.strictMode ? `🔒${mins}m` : `${mins}m`, color);
      }
    }
  });
}

// Tree withers when user visits blacklisted site
function handleTreeWithered(domain) {
  ext.storage.local.get([
    "timerState", "sessionStartTime", "sessionDuration", "selectedSkin",
    "forest", "stats", "strictMode", "treeState"
  ], (data) => {
    if (data.timerState !== "running") return;
    const isStrict = data.strictMode === true;

    // In Strict mode, session continues running! In Normal mode, alarms are cleared.
    if (!isStrict) {
      ext.alarms.clear("FOCUS_SESSION_END");
      ext.alarms.clear("BADGE_TICK");
    }

    const elapsedSeconds = data.sessionStartTime ? Math.floor((Date.now() - data.sessionStartTime) / 1000) : 0;
    const skin = data.selectedSkin || "oak";

    const witheredTree = {
      id: Date.now(),
      skin: skin,
      duration: Math.round(elapsedSeconds / 60),
      targetDuration: Math.round((data.sessionDuration || 1500) / 60),
      status: "withered",
      reason: domain || "Запрещенный сайт",
      date: new Date().toISOString()
    };

    const forest = Array.isArray(data.forest) ? [...data.forest, witheredTree] : [witheredTree];
    const stats = data.stats || {
      totalSessions: 0,
      completedSessions: 0,
      witheredSessions: 0,
      totalFocusMinutes: 0,
      dailyStats: [0, 0, 0, 0, 0, 0, 0]
    };
    stats.totalSessions = (stats.totalSessions || 0) + 1;
    stats.witheredSessions = (stats.witheredSessions || 0) + 1;

    const targetTimerState = isStrict ? "running" : "withered";
    const targetIsRunning = isStrict ? true : false;

    ext.storage.local.set({
      timerState: targetTimerState,
      isTimerRunning: targetIsRunning,
      treeState: "withered",
      witherReason: domain || "Запрещенный сайт",
      forest: forest,
      stats: stats,
      strictStreak: 0
    }, () => {
      setBadge(isStrict ? "🔒" : "🥀", "#ef4444");
      if (!isStrict) {
        setAmbientAudio("none");
      }
      playBackgroundWilt();
      showNotification(
        isStrict ? "🔒 Доступ заблокирован (Строгий режим)!" : "🥀 Дерево завяло!",
        isStrict 
          ? `Вы зашли на сайт "${domain}". В строгом режиме фокус продолжается до конца таймера, доступ заблокирован!`
          : `Вы зашли на сайт "${domain}" во время фокуса. Ваше дерево погибло. Не сдавайтесь, попробуйте снова!`
      );
    });
  });
}

// Session successfully completes
function handleSessionComplete() {
  ext.alarms.clear("FOCUS_SESSION_END");
  ext.alarms.clear("BADGE_TICK");

  ext.storage.local.get([
    "sessionDuration", "selectedSkin", "unlockedSkins", "forest", "stats",
    "coins", "xp", "level", "quests", "achievements", "strictMode", "strictStreak", "treeState"
  ], (data) => {
    const durationSec = data.sessionDuration || 1500;
    const durationMin = Math.round(durationSec / 60);

    // Roll random tree based on focus duration!
    const drop = rollTreeByDuration(durationMin);
    const rolledSkin = drop.skin;
    const rolledRarity = drop.rarity;

    const unlocked = Array.isArray(data.unlockedSkins) ? [...data.unlockedSkins] : ["oak"];
    const isNewDiscovery = !unlocked.includes(rolledSkin);
    if (isNewDiscovery) {
      unlocked.push(rolledSkin);
    }

    // Reward calculation: base 20 + duration bonus + rarity bonus
    let rarityCoinBonus = 0;
    if (rolledRarity === "uncommon") rarityCoinBonus = 10;
    if (rolledRarity === "rare") rarityCoinBonus = 25;
    if (rolledRarity === "epic") rarityCoinBonus = 50;
    if (rolledRarity === "legendary") rarityCoinBonus = 100;
    if (rolledRarity === "mythic") rarityCoinBonus = 250;

    const duplicateBonus = isNewDiscovery ? 0 : Math.floor(rarityCoinBonus / 2);
    const earnedCoins = 20 + Math.floor(durationMin / 2) + rarityCoinBonus + duplicateBonus;
    const earnedXp = durationMin * 2 + rarityCoinBonus;
    const newCoins = (data.coins || 0) + earnedCoins;
    const newXp = (data.xp || 0) + earnedXp;
    const newLevel = Math.floor(newXp / 100) + 1;

    // Forest log
    const completedTree = {
      id: Date.now(),
      skin: rolledSkin,
      rarity: rolledRarity,
      duration: durationMin,
      targetDuration: durationMin,
      status: "completed",
      reason: "",
      date: new Date().toISOString()
    };
    const forest = Array.isArray(data.forest) ? [...data.forest, completedTree] : [completedTree];

    // Stats
    const stats = data.stats || {
      totalSessions: 0,
      completedSessions: 0,
      witheredSessions: 0,
      totalFocusMinutes: 0,
      dailyStats: [0, 0, 0, 0, 0, 0, 0]
    };
    stats.totalSessions = (stats.totalSessions || 0) + 1;
    stats.completedSessions = (stats.completedSessions || 0) + 1;
    stats.totalFocusMinutes = (stats.totalFocusMinutes || 0) + durationMin;
    if (Array.isArray(stats.dailyStats)) {
      stats.dailyStats[6] = (stats.dailyStats[6] || 0) + durationMin;
    }

    // Quests progress
    const quests = Array.isArray(data.quests) ? data.quests.map(q => {
      if (q.id === 1) {
        const cur = q.current + 1;
        return { ...q, current: cur, done: cur >= q.target };
      }
      if (q.id === 2) {
        const cur = q.current + durationMin;
        return { ...q, current: cur, done: cur >= q.target };
      }
      return q;
    }) : DEFAULT_QUESTS;

    const isHealthy = data.treeState !== "withered";

    // Strict Streak logic
    let strictStreak = data.strictStreak || 0;
    if (data.strictMode && isHealthy) {
      strictStreak += 1;
    } else if (!isHealthy) {
      strictStreak = 0;
    }

    // Achievements Evaluation
    let storedAchievements = Array.isArray(data.achievements) ? [...data.achievements] : [];
    DEFAULT_ACHIEVEMENTS.forEach(defAch => {
      const existing = storedAchievements.find(a => a.id === defAch.id);
      if (!existing) {
        storedAchievements.push({ ...defAch });
      }
    });

    const completionHour = new Date().getHours();
    let newlyUnlockedAch = null;

    storedAchievements = storedAchievements.map(ach => {
      if (ach.unlocked) return ach;

      let shouldUnlock = false;
      let newCurrent = ach.current || 0;

      if (ach.id === "night_owl") {
        if (isHealthy && (completionHour >= 23 || completionHour < 4)) {
          shouldUnlock = true;
          newCurrent = 1;
        }
      } else if (ach.id === "marathon") {
        if (isHealthy && durationMin >= 90) {
          shouldUnlock = true;
          newCurrent = 1;
        }
      } else if (ach.id === "iron_will") {
        newCurrent = strictStreak;
        if (strictStreak >= 5) {
          shouldUnlock = true;
        }
      } else if (ach.id === "mythic_botanist") {
        if (isHealthy && rolledRarity === "mythic") {
          shouldUnlock = true;
          newCurrent = 1;
        }
      } else if (ach.id === "first_sprout") {
        if (isHealthy) {
          shouldUnlock = true;
          newCurrent = 1;
        }
      } else if (ach.id === "grove_master") {
        newCurrent = unlocked.length;
        if (unlocked.length >= 10) {
          shouldUnlock = true;
        }
      }

      if (shouldUnlock) {
        newlyUnlockedAch = ach;
        return {
          ...ach,
          current: Math.max(newCurrent, ach.target),
          unlocked: true,
          unlockedDate: new Date().toISOString()
        };
      }

      return { ...ach, current: newCurrent };
    });

    const lastDropInfo = {
      skin: rolledSkin,
      rarity: rolledRarity,
      isNew: isNewDiscovery,
      earnedCoins: earnedCoins,
      earnedXp: earnedXp
    };

    ext.storage.local.set({
      timerState: "completed",
      isTimerRunning: false,
      treeState: "healthy",
      selectedSkin: rolledSkin,
      unlockedSkins: unlocked,
      coins: newCoins,
      xp: newXp,
      level: newLevel,
      forest: forest,
      stats: stats,
      quests: quests,
      achievements: storedAchievements,
      strictStreak: strictStreak,
      lastDrop: lastDropInfo
    }, () => {
      setBadge("✓", "#10b981");
      setAmbientAudio("none");
      playBackgroundChime();
      const rarityLabel = RARITY_NAMES[rolledRarity] || "";
      showNotification(
        `🎉 Вы вырастили дерево [${rarityLabel}]!`,
        `Сессия ${durationMin} мин! Вам выпало дерево: ${rolledSkin.toUpperCase()}. Награда: +${earnedCoins} 🪙, +${earnedXp} XP!`
      );
      if (newlyUnlockedAch) {
        setTimeout(() => {
          showNotification(
            `🏆 Новое достижение разблокировано!`,
            `Вы получили медаль «${newlyUnlockedAch.title.ru}» ${newlyUnlockedAch.icon}! Заберите награду +${newlyUnlockedAch.reward} 🪙 в разделе задач.`
          );
        }, 1200);
      }
    });
  });
}

// Background tab listener for instant blacklist blocking
ext.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || (changeInfo.status === "loading" && tab.url)) {
    const targetUrl = changeInfo.url || tab.url;
    if (!targetUrl || targetUrl.startsWith("chrome://") || targetUrl.startsWith("about:") || targetUrl.startsWith("edge://")) {
      return;
    }

    ext.storage.local.get(["timerState", "blockMode", "blockedSites", "whiteListSites"], (data) => {
      if (data.timerState !== "running") return;

      const { blockMode = "blacklist", blockedSites = [], whiteListSites = [] } = data;
      let shouldBlock = false;

      if (blockMode === "blacklist") {
        shouldBlock = matchesSiteList(targetUrl, blockedSites);
      } else if (blockMode === "whitelist") {
        shouldBlock = !matchesSiteList(targetUrl, whiteListSites);
      }

      if (shouldBlock) {
        let domain = "";
        try { domain = new URL(targetUrl).hostname; } catch(e) { domain = targetUrl; }
        handleTreeWithered(domain);
      }
    });
  }
});

// Message listener from popup & content scripts
ext.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.action) return false;

  switch (msg.action) {
    case "START_TIMER": {
      const duration = Number(msg.duration) || 1500;
      const now = Date.now();
      const endTime = now + (duration * 1000);
      const isStrict = msg.strictMode !== undefined ? !!msg.strictMode : false;

      ext.alarms.clear("FOCUS_SESSION_END");
      ext.alarms.clear("BADGE_TICK");

      ext.alarms.create("FOCUS_SESSION_END", { when: endTime });
      ext.alarms.create("BADGE_TICK", { periodInMinutes: 1 });

      ext.storage.local.set({
        timerState: "running",
        isTimerRunning: true,
        sessionStartTime: now,
        sessionDuration: duration,
        sessionEndTime: endTime,
        secondsRemaining: duration,
        treeState: "healthy",
        witherReason: null,
        lastDrop: null,
        strictMode: isStrict
      }, () => {
        const mins = Math.ceil(duration / 60);
        setBadge(isStrict ? `🔒${mins}m` : `${mins}m`, isStrict ? "#f38ba8" : "#10b981");
        sendResponse({ success: true, endTime });
      });
      return true;
    }

    case "PAUSE_TIMER": {
      ext.storage.local.get(["sessionEndTime", "sessionDuration", "strictMode", "timerState"], (data) => {
        // STRICT MODE: PAUSE IS FORBIDDEN
        if (data.strictMode && data.timerState === "running") {
          sendResponse({ success: false, error: "STRICT_MODE_ACTIVE" });
          return;
        }

        ext.alarms.clear("FOCUS_SESSION_END");
        ext.alarms.clear("BADGE_TICK");

        const remaining = data.sessionEndTime ? Math.max(0, Math.round((data.sessionEndTime - Date.now()) / 1000)) : (data.sessionDuration || 1500);
        ext.storage.local.set({
          timerState: "paused",
          isTimerRunning: false,
          secondsRemaining: remaining,
          sessionEndTime: null
        }, () => {
          setBadge("||", "#f59e0b");
          sendResponse({ success: true, remaining });
        });
      });
      return true;
    }

    case "RESUME_TIMER": {
      ext.storage.local.get(["secondsRemaining", "sessionDuration"], (data) => {
        const remaining = data.secondsRemaining || data.sessionDuration || 1500;
        const now = Date.now();
        const endTime = now + (remaining * 1000);

        ext.alarms.create("FOCUS_SESSION_END", { when: endTime });
        ext.alarms.create("BADGE_TICK", { periodInMinutes: 1 });

        ext.storage.local.set({
          timerState: "running",
          isTimerRunning: true,
          sessionStartTime: now - ((data.sessionDuration - remaining) * 1000),
          sessionEndTime: endTime
        }, () => {
          const mins = Math.ceil(remaining / 60);
          setBadge(`${mins}m`, "#10b981");
          sendResponse({ success: true, endTime });
        });
      });
      return true;
    }

    case "RESET_TIMER": {
      ext.storage.local.get(["sessionDuration", "strictMode", "timerState"], (data) => {
        // STRICT MODE: GIVING UP IS FORBIDDEN WHILE RUNNING
        if (data.strictMode && data.timerState === "running") {
          sendResponse({ success: false, error: "STRICT_MODE_ACTIVE" });
          return;
        }

        ext.alarms.clear("FOCUS_SESSION_END");
        ext.alarms.clear("BADGE_TICK");
        setAmbientAudio("none");

        const dur = data.sessionDuration || 1500;
        ext.storage.local.set({
          timerState: "idle",
          isTimerRunning: false,
          sessionStartTime: null,
          sessionEndTime: null,
          secondsRemaining: dur,
          treeState: "healthy",
          witherReason: null,
          lastDrop: null
        }, () => {
          setBadge("");
          sendResponse({ success: true });
        });
      });
      return true;
    }

    case "TREE_WITHERED": {
      handleTreeWithered(msg.domain);
      sendResponse({ success: true });
      return true;
    }

    case "CLOSE_TAB": {
      if (sender && sender.tab && sender.tab.id) {
        ext.tabs.remove(sender.tab.id);
      }
      sendResponse({ success: true });
      return true;
    }

    case "SET_AMBIENT_SOUND": {
      setAmbientAudio(msg.soundType).then(() => {
        sendResponse({ success: true, soundType: msg.soundType });
      });
      return true;
    }

    default:
      return false;
  }
});
