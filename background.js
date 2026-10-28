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

// Tree Rarity Pools
const RARITY_POOLS = {
  common: ["oak", "birch"],
  uncommon: ["pine", "apple"],
  rare: ["sakura", "bamboo"],
  epic: ["wisteria", "autumn_maple"],
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
      lang: "ru"
    };

    const toSet = {};
    for (const key in defaults) {
      if (data[key] === undefined) {
        toSet[key] = defaults[key];
      }
    }

    if (Object.keys(toSet).length > 0) {
      ext.storage.local.set(toSet);
    }
  });
});

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
  ext.storage.local.get(["timerState", "sessionEndTime"], (data) => {
    if (data.timerState === "running" && data.sessionEndTime) {
      const remainingMs = data.sessionEndTime - Date.now();
      if (remainingMs <= 0) {
        handleSessionComplete();
      } else {
        const mins = Math.ceil(remainingMs / 60000);
        setBadge(`${mins}m`, "#10b981");
      }
    }
  });
}

// Tree withers when user visits blacklisted site
function handleTreeWithered(domain) {
  ext.storage.local.get([
    "timerState", "sessionStartTime", "sessionDuration", "selectedSkin",
    "forest", "stats"
  ], (data) => {
    if (data.timerState !== "running") return;

    // Clear session alarm
    ext.alarms.clear("FOCUS_SESSION_END");
    ext.alarms.clear("BADGE_TICK");

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

    ext.storage.local.set({
      timerState: "withered",
      isTimerRunning: false,
      treeState: "withered",
      witherReason: domain || "Запрещенный сайт",
      forest: forest,
      stats: stats
    }, () => {
      setBadge("🥀", "#ef4444");
      showNotification(
        "🥀 Дерево завяло!",
        `Вы зашли на сайт "${domain}" во время фокуса. Ваше дерево погибло. Не сдавайтесь, попробуйте снова!`
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
    "coins", "xp", "level", "quests"
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
      lastDrop: lastDropInfo
    }, () => {
      setBadge("✓", "#10b981");
      const rarityLabel = RARITY_NAMES[rolledRarity] || "";
      showNotification(
        `🎉 Вы вырастили дерево [${rarityLabel}]!`,
        `Сессия ${durationMin} мин! Вам выпало дерево: ${rolledSkin.toUpperCase()}. Награда: +${earnedCoins} 🪙, +${earnedXp} XP!`
      );
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
        lastDrop: null
      }, () => {
        const mins = Math.ceil(duration / 60);
        setBadge(`${mins}m`, "#10b981");
        sendResponse({ success: true, endTime });
      });
      return true;
    }

    case "PAUSE_TIMER": {
      ext.alarms.clear("FOCUS_SESSION_END");
      ext.alarms.clear("BADGE_TICK");

      ext.storage.local.get(["sessionEndTime", "sessionDuration"], (data) => {
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
      ext.alarms.clear("FOCUS_SESSION_END");
      ext.alarms.clear("BADGE_TICK");

      ext.storage.local.get(["sessionDuration"], (data) => {
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

    default:
      return false;
  }
});
