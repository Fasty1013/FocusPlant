// Focus Plant Pro - Cross-Browser Main Popup Controller with Full Localization
document.addEventListener("DOMContentLoaded", () => {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  // Comprehensive Localization Dictionary
  // Localized dictionaries & achievements loaded from i18n.js
  const i18n = window.i18n;
  const DEFAULT_ACHIEVEMENTS = window.DEFAULT_ACHIEVEMENTS;

  // State Variables
  let currentLang = "ru";
  let activeTab = "tabTimer";
  let selectedMinutes = 25;
  let selectedSeconds = 0;
  let selectedDuration = 25 * 60;
  let timerTicker = null;
  const RING_CIRCUMFERENCE = 2 * Math.PI * 96;

  // DOM Elements
  const langSelect = document.getElementById("langSelect");
  const coinsCount = document.getElementById("coinsCount");
  const userLevelBadge = document.getElementById("userLevelBadge");

  // Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Timer Tab DOM
  const timeDisplay = document.getElementById("timeDisplay");
  const timerStatus = document.getElementById("timerStatus");
  const witherAlert = document.getElementById("witherAlert");
  const witherReasonText = document.getElementById("witherReasonText");
  const treeAvatar = document.getElementById("treeAvatar");
  const progressRing = document.getElementById("progressRing");
  const timeConfigSection = document.getElementById("timeConfigSection");
  const timeSlider = document.getElementById("timeSlider");
  const customMinutesInput = document.getElementById("customMinutesInput");
  const customSecondsInput = document.getElementById("customSecondsInput");
  const lblMinuteUnit = document.getElementById("lblMinuteUnit");
  const lblSecondUnit = document.getElementById("lblSecondUnit");
  const timePresets = document.getElementById("timePresets");

  // Strict Mode DOM
  const strictModeCard = document.getElementById("strictModeCard");
  const strictModeToggle = document.getElementById("strictModeToggle");
  const lblStrictTitle = document.getElementById("lblStrictTitle");
  const lblStrictPill = document.getElementById("lblStrictPill");
  const lblStrictDesc = document.getElementById("lblStrictDesc");

  // Drop Chances DOM
  const chanceCommon = document.getElementById("chanceCommon");
  const chanceUncommon = document.getElementById("chanceUncommon");
  const chanceRare = document.getElementById("chanceRare");
  const chanceEpic = document.getElementById("chanceEpic");
  const chanceLegendary = document.getElementById("chanceLegendary");
  const chanceMythic = document.getElementById("chanceMythic");

  // Drop Reveal Card DOM
  const dropRevealCard = document.getElementById("dropRevealCard");
  const dropRarityBadge = document.getElementById("dropRarityBadge");
  const dropTitle = document.getElementById("dropTitle");
  const dropTreeName = document.getElementById("dropTreeName");
  const dropRewardText = document.getElementById("dropRewardText");
  const dropClaimBtn = document.getElementById("dropClaimBtn");
  const dropShareBtn = document.getElementById("dropShareBtn");
  const timerShareBtn = document.getElementById("timerShareBtn");
  const shareCardModal = document.getElementById("shareCardModal");
  const closeShareModalBtn = document.getElementById("closeShareModalBtn");
  const shareCardCanvas = document.getElementById("shareCardCanvas");
  const btnDownloadShareCard = document.getElementById("btnDownloadShareCard");
  const btnCopyShareCard = document.getElementById("btnCopyShareCard");
  const btnTelegramShare = document.getElementById("btnTelegramShare");
  const lblShareModalTitle = document.getElementById("lblShareModalTitle");
  const lblShareModalSub = document.getElementById("lblShareModalSub");
  let currentShareCardData = null;

  // Buttons
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resumeBtn = document.getElementById("resumeBtn");
  const resetBtn = document.getElementById("resetBtn");
  const plantNewBtn = document.getElementById("plantNewBtn");
  const ambientSelect = document.getElementById("ambientSelect");

  // Atmospheric Weather DOM
  const timerCenterpiece = document.getElementById("timerCenterpiece");
  const weatherCanvas = document.getElementById("weatherCanvas");
  const weatherBackdrop = document.getElementById("weatherBackdrop");

  // Atmospheric Weather Effects loaded from weather.js
  const weatherEffects = window.weatherEffects;
  // Initialize weather effects with DOM
  weatherEffects.init(weatherCanvas, weatherBackdrop, timerCenterpiece);

  // Garden Tab DOM
  const statGrown = document.getElementById("statGrown");
  const statWithered = document.getElementById("statWithered");
  const statMinutes = document.getElementById("statMinutes");
  const statRate = document.getElementById("statRate");
  const almanacGrid = document.getElementById("almanacGrid");
  const almanacCounter = document.getElementById("almanacCounter");
  const statsChart = document.getElementById("statsChart");
  const chartLabels = document.getElementById("chartLabels");
  const forestGrid = document.getElementById("forestGrid");

  // Shop Tab DOM
  const skinsGrid = document.getElementById("skinsGrid");

  // Tasks Tab DOM
  const questList = document.getElementById("questList");
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");

  // Blocker Tab DOM
  const blockModeSelect = document.getElementById("blockMode");
  const siteInput = document.getElementById("siteInput");
  const addSiteBtn = document.getElementById("addSiteBtn");
  const siteListContainer = document.getElementById("siteList");
  const siteCount = document.getElementById("siteCount");
  const chipBtns = document.querySelectorAll(".chip-btn");

  // Initialize Progress Ring
  progressRing.style.strokeDasharray = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
  progressRing.style.strokeDashoffset = "0";

  // Navigation Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      activeTab = btn.dataset.tab;
      const targetContent = document.getElementById(activeTab);
      if (targetContent) targetContent.classList.add("active");

      if (activeTab === "tabTimer") {
        weatherEffects.resume();
      } else {
        weatherEffects.pause();
      }

      if (activeTab === "tabGarden") renderGardenTab();
      if (activeTab === "tabShop") renderShopTab();
      if (activeTab === "tabTasks") renderTasksTab();
      if (activeTab === "tabBlocker") renderBlockerTab();
    });
  });

  // Apply Language Everywhere
  function applyLanguage(lang) {
    currentLang = lang;
    window.currentLang = lang;
    const t = i18n[lang] || i18n.ru;

    document.getElementById("tTimerBtn").textContent = t.timerTab;
    document.getElementById("tGardenBtn").textContent = t.gardenTab;
    document.getElementById("tShopBtn").textContent = t.shopTab;
    document.getElementById("tTasksBtn").textContent = t.tasksTab;
    document.getElementById("tBlockerBtn").textContent = t.blockerTab;

    document.getElementById("lblSelectTime").textContent = t.selectTime;
    if (lblMinuteUnit && t.minuteUnit) lblMinuteUnit.textContent = t.minuteUnit;
    if (lblSecondUnit && t.secondUnit) lblSecondUnit.textContent = t.secondUnit;
    if (lblStrictTitle && t.strictTitle) lblStrictTitle.textContent = t.strictTitle;
    if (lblStrictPill && t.strictPill) lblStrictPill.textContent = t.strictPill;
    if (lblStrictDesc && t.strictDesc) lblStrictDesc.textContent = t.strictDesc;
    document.getElementById("lblChancesTitle").textContent = t.chancesTitle;
    document.getElementById("lblChancesHint").textContent = t.chancesHint;

    document.getElementById("startBtn").textContent = t.startBtn;
    document.getElementById("pauseBtn").textContent = t.pauseBtn;
    document.getElementById("resumeBtn").textContent = t.resumeBtn;
    document.getElementById("resetBtn").textContent = t.resetBtn;
    document.getElementById("plantNewBtn").textContent = t.plantNewBtn;

    dropTitle.textContent = t.dropTitle;
    dropClaimBtn.textContent = t.dropClaim;
    if (dropShareBtn && t.shareCardBtn) dropShareBtn.textContent = t.shareCardBtn;
    if (timerShareBtn && t.shareCardBtn) timerShareBtn.textContent = t.shareCardBtn;
    if (lblShareModalTitle && t.shareModalTitle) lblShareModalTitle.textContent = t.shareModalTitle;
    if (lblShareModalSub && t.shareModalSub) lblShareModalSub.textContent = t.shareModalSub;
    if (btnDownloadShareCard && t.shareDownload) btnDownloadShareCard.innerHTML = t.shareDownload;
    if (btnCopyShareCard && t.shareCopy) btnCopyShareCard.innerHTML = t.shareCopy;
    if (btnTelegramShare && t.shareTelegram) btnTelegramShare.innerHTML = t.shareTelegram;

    document.getElementById("lblAmbient").textContent = t.ambientLabel;
    ambientSelect.options[0].textContent = t.ambientNone;
    ambientSelect.options[1].textContent = t.ambientRain;
    ambientSelect.options[2].textContent = t.ambientWaves;
    ambientSelect.options[3].textContent = t.ambientForest;
    ambientSelect.options[4].textContent = t.ambientFire;
    ambientSelect.options[5].textContent = t.ambientZen;
    ambientSelect.options[6].textContent = t.ambientWhite;

    document.getElementById("lblStatGrown").textContent = t.grown;
    document.getElementById("lblStatWithered").textContent = t.withered;
    document.getElementById("lblStatMins").textContent = t.focusTime;
    document.getElementById("lblStatRate").textContent = t.successRate;
    document.getElementById("lblAlmanacHeader").textContent = t.almanacHeader;
    document.getElementById("lblAlmanacSubdesc").textContent = t.almanacSubdesc;
    document.getElementById("lblStatsHeader").textContent = t.statsHeader;
    document.getElementById("lblForestHeader").textContent = t.forestHeader;

    // Chart day labels
    if (chartLabels && t.chartDays) {
      chartLabels.innerHTML = t.chartDays.map(d => `<span>${d}</span>`).join("");
    }

    document.getElementById("lblShopTitle").textContent = t.shopTitle;
    document.getElementById("lblShopDesc").textContent = t.shopDesc;

    document.getElementById("lblQuestsHeader").textContent = t.questsHeader;
    document.getElementById("lblTodoHeader").textContent = t.todoHeader;
    todoInput.placeholder = t.todoPlaceholder;
    addTodoBtn.textContent = t.addBtn;

    document.getElementById("lblBlockMode").textContent = t.blockMode;
    blockModeSelect.options[0].textContent = t.blacklistOpt;
    blockModeSelect.options[1].textContent = t.whitelistOpt;
    document.getElementById("lblModeDesc").textContent = t.modeDesc;

    const alertStyleSelect = document.getElementById("alertStyle");
    if (alertStyleSelect && t.lblAlertStyle) {
      document.getElementById("lblAlertStyle").textContent = t.lblAlertStyle;
      alertStyleSelect.options[0].textContent = t.alertStyleBanner;
      alertStyleSelect.options[1].textContent = t.alertStyleFullscreen;
      document.getElementById("lblAlertStyleDesc").textContent = t.lblAlertStyleDesc;
    }

    document.getElementById("lblQuickAddTitle").textContent = t.quickAdd;
    document.getElementById("lblActiveSites").textContent = t.activeSites;
    siteInput.placeholder = t.sitePlaceholder;
    addSiteBtn.textContent = t.addBtn;

    // Meadow Island Localized Text
    if (document.getElementById("lblMeadowTitle")) document.getElementById("lblMeadowTitle").textContent = t.meadowTitle;
    if (document.getElementById("btnFilterMyTrees")) document.getElementById("btnFilterMyTrees").textContent = t.meadowFilterMy || "Мой сад";
    if (document.getElementById("btnFilterShowcase")) document.getElementById("btnFilterShowcase").textContent = t.meadowFilterShowcase || "Все виды ✨";
    if (document.getElementById("goToGardenBtn")) document.getElementById("goToGardenBtn").textContent = t.goToGardenBtn || "🏝️ Открыть изометрический 3D Сад ➔";
    if (document.getElementById("lblMeadowHint")) document.getElementById("lblMeadowHint").textContent = t.meadowHint;
    if (document.getElementById("lblInspectDate")) document.getElementById("lblInspectDate").textContent = t.inspectDate;
    if (document.getElementById("lblInspectDuration")) document.getElementById("lblInspectDuration").textContent = t.inspectDuration;
    if (document.getElementById("btnInspectZoom")) document.getElementById("btnInspectZoom").textContent = t.btnInspectZoom || "🔍 HQ";
    if (document.getElementById("btnOpenHqModal")) document.getElementById("btnOpenHqModal").textContent = t.btnInspectZoom || "🔍 HQ Осмотр";
    if (document.getElementById("lblInspectDuplicates")) document.getElementById("lblInspectDuplicates").textContent = t.lblInspectDuplicates || "🌿 В саду:";
    if (document.getElementById("lblHqDate")) document.getElementById("lblHqDate").textContent = t.lblHqDate || "📅 Выращено";
    if (document.getElementById("lblHqDuration")) document.getElementById("lblHqDuration").textContent = t.lblHqDuration || "⏱ Время фокуса";
    if (document.getElementById("lblHqDuplicates")) document.getElementById("lblHqDuplicates").textContent = t.lblHqDuplicates || "🌿 В коллекции";
    if (document.getElementById("lblHqValue")) document.getElementById("lblHqValue").textContent = t.lblHqValue || "💎 Ценность";
    if (document.getElementById("lblAchievementsHeader") && t.achievementsHeader) document.getElementById("lblAchievementsHeader").textContent = t.achievementsHeader;
    if (document.getElementById("lblAchievementsSub") && t.achievementsSub) document.getElementById("lblAchievementsSub").textContent = t.achievementsSub;

    // Refresh active views
    syncTimerFromStorage();
    if (activeTab === "tabShop") renderShopTab();
    if (activeTab === "tabGarden") renderGardenTab();
    if (activeTab === "tabTasks") renderTasksTab();
    if (activeTab === "tabBlocker") renderBlockerTab();
  }

  langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    ext.storage.local.set({ lang }, () => {
      applyLanguage(lang);
    });
  });

  // Time & Chances Synchronizer (Minutes + Seconds)
  function updateCustomDuration(totalSec) {
    selectedDuration = Math.max(10, Math.min(180 * 60, Math.round(Number(totalSec) || 1500)));
    selectedMinutes = Math.floor(selectedDuration / 60);
    selectedSeconds = selectedDuration % 60;

    timeSlider.value = selectedMinutes;
    customMinutesInput.value = selectedMinutes;
    if (customSecondsInput) {
      customSecondsInput.value = selectedSeconds.toString().padStart(2, '0');
    }
    updateTimeDisplay(selectedDuration);

    timePresets.querySelectorAll(".preset-btn").forEach(btn => {
      const btnMins = parseInt(btn.dataset.minutes, 10);
      if (btnMins === selectedMinutes && selectedSeconds === 0) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const minsForDrop = Math.max(0.5, selectedDuration / 60);
    const chances = calculateDropChances(minsForDrop);
    chanceCommon.textContent = `⚪ ${chances.common}%`;
    chanceUncommon.textContent = `🟢 ${chances.uncommon}%`;
    chanceRare.textContent = `🔵 ${chances.rare}%`;
    chanceEpic.textContent = `🟣 ${chances.epic}%`;
    chanceLegendary.textContent = `🟡 ${chances.legendary}%`;
    chanceMythic.textContent = `✦ ${chances.mythic}%`;

    ext.storage.local.set({ sessionDuration: selectedDuration, secondsRemaining: selectedDuration });
  }

  timeSlider.addEventListener("input", (e) => {
    const mins = Number(e.target.value) || 0;
    updateCustomDuration(mins * 60 + selectedSeconds);
  });

  if (customMinutesInput) {
    customMinutesInput.addEventListener("input", (e) => {
      const mins = Math.max(0, Math.min(180, Number(e.target.value) || 0));
      updateCustomDuration(mins * 60 + selectedSeconds);
    });
  }

  if (customSecondsInput) {
    customSecondsInput.addEventListener("input", (e) => {
      const secs = Math.max(0, Math.min(59, Number(e.target.value) || 0));
      updateCustomDuration(selectedMinutes * 60 + secs);
    });
  }

  timePresets.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mins = parseInt(btn.dataset.minutes, 10);
      updateCustomDuration(mins * 60);
    });
  });

  // Strict Mode Switch Controller
  if (strictModeToggle) {
    strictModeToggle.addEventListener("change", (e) => {
      const isStrict = e.target.checked;
      strictModeCard.classList.toggle("active", isStrict);
      ext.storage.local.set({ strictMode: isStrict });
    });
  }

  function updateTimeDisplay(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${m}:${s}`;
  }

  function getGrowthStage(progressPct) {
    if (progressPct >= 95) return 5;
    if (progressPct >= 70) return 4;
    if (progressPct >= 45) return 3;
    if (progressPct >= 20) return 2;
    return 1;
  }

  function updateTimerView(remainingSeconds, totalSeconds, skin, state, reason, lastDrop, isStrict = false, treeState = "healthy") {
    const t = i18n[currentLang] || i18n.ru;
    const elapsed = Math.max(0, totalSeconds - remainingSeconds);
    const progress = totalSeconds > 0 ? (elapsed / totalSeconds) : 0;
    const progressPct = Math.min(100, Math.round(progress * 100));

    const offset = RING_CIRCUMFERENCE - (progress * RING_CIRCUMFERENCE);
    progressRing.style.strokeDashoffset = offset;

    // Check Drop Celebration
    if (state === "completed" && lastDrop) {
      dropRevealCard.style.display = "flex";
      const rarityObj = RARITIES[lastDrop.rarity] || RARITIES.common;
      dropRarityBadge.textContent = rarityObj.stars + " " + (rarityObj.name[currentLang] || rarityObj.name.ru).toUpperCase();
      dropRarityBadge.style.background = rarityObj.bg;
      dropRarityBadge.style.color = rarityObj.color;
      dropRarityBadge.style.border = `1px solid ${rarityObj.border}`;

      const skinObj = TREE_SKINS[lastDrop.skin] || TREE_SKINS.oak;
      dropTreeName.textContent = `${skinObj.name[currentLang] || skinObj.name.ru} ${skinObj.emoji}`;
      const unlockNote = lastDrop.isNew ? ` ${t.newTreeUnlocked}` : "";
      dropRewardText.textContent = `+${lastDrop.earnedCoins || 30} 🪙 • +${lastDrop.earnedXp || 50} XP!${unlockNote}`;
    } else {
      dropRevealCard.style.display = "none";
    }

    if (state === "withered") {
      progressRing.style.stroke = "#ef4444";
      progressRing.style.strokeDashoffset = "0";
      treeAvatar.innerHTML = renderTreeSVG(skin, 1, true);
      timerStatus.textContent = t.timerStatusWithered;
      timerStatus.style.color = "#fca5a5";
      timerStatus.style.background = "rgba(239, 68, 68, 0.15)";
      witherAlert.style.display = "block";
      witherReasonText.textContent = reason || t.witherDefaultReason;

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "none";
      resetBtn.style.display = "none";
      plantNewBtn.style.display = "flex";
      if (timerShareBtn) timerShareBtn.style.display = "none";
      return;
    }

    witherAlert.style.display = "none";

    if (state === "completed") {
      progressRing.style.stroke = "#10b981";
      progressRing.style.strokeDashoffset = "0";
      treeAvatar.innerHTML = renderTreeSVG(skin, 5, false);
      timerStatus.textContent = t.timerStatusCompleted;
      timerStatus.style.color = "#a6e3a1";
      timerStatus.style.background = "rgba(166, 227, 161, 0.15)";

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "none";
      resetBtn.style.display = "none";
      plantNewBtn.style.display = "flex";
      if (timerShareBtn) timerShareBtn.style.display = "flex";
      return;
    }

    if (state === "running") {
      progressRing.style.stroke = isStrict ? "#f38ba8" : "#10b981";
      const stage = getGrowthStage(progressPct);
      const isWitheredVisual = treeState === "withered";
      treeAvatar.innerHTML = renderTreeSVG(skin, isWitheredVisual ? 1 : stage, isWitheredVisual);

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      resumeBtn.style.display = "none";
      plantNewBtn.style.display = "none";
      if (timerShareBtn) timerShareBtn.style.display = "none";

      if (isStrict) {
        timerStatus.textContent = `🔒 ${t.strictStatusRunning} (${progressPct}%)`;
        timerStatus.style.color = "#f38ba8";
        timerStatus.style.background = "rgba(243, 139, 168, 0.15)";
        pauseBtn.style.display = "none";
        resetBtn.style.display = "none";
      } else {
        timerStatus.textContent = `${t.timerStatusRunning} (${progressPct}%)`;
        timerStatus.style.color = "#94e2d5";
        timerStatus.style.background = "rgba(148, 226, 213, 0.12)";
        pauseBtn.style.display = "flex";
        resetBtn.style.display = "flex";
      }
      return;
    }

    if (state === "paused") {
      progressRing.style.stroke = "#f59e0b";
      const stage = getGrowthStage(progressPct);
      treeAvatar.innerHTML = renderTreeSVG(skin, stage, false);
      timerStatus.textContent = t.timerStatusPaused;
      timerStatus.style.color = "#f9e2af";
      timerStatus.style.background = "rgba(249, 226, 175, 0.15)";

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "flex";
      resetBtn.style.display = "flex";
      plantNewBtn.style.display = "none";
      if (timerShareBtn) timerShareBtn.style.display = "none";
      return;
    }

    // IDLE State
    progressRing.style.stroke = "#10b981";
    progressRing.style.strokeDashoffset = `${RING_CIRCUMFERENCE}`;
    treeAvatar.innerHTML = renderTreeSVG(skin, 1, false);
    timerStatus.textContent = t.timerStatusIdle;
    timerStatus.style.color = "#bac2de";
    timerStatus.style.background = "rgba(255, 255, 255, 0.05)";

    timeConfigSection.style.display = "flex";
    startBtn.style.display = "flex";
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "none";
    resetBtn.style.display = "none";
    plantNewBtn.style.display = "none";
    if (timerShareBtn) timerShareBtn.style.display = "none";
  }

  // Dismiss/Claim Drop celebration card
  function dismissDropCard() {
    dropRevealCard.style.display = "none";
    ext.storage.local.set({ lastDrop: null });
  }

  // Claim Drop button: dismiss reveal card immediately and view tree in garden!
  dropClaimBtn.addEventListener("click", () => {
    dismissDropCard();
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    const gBtn = document.getElementById("tGardenBtn");
    if (gBtn) gBtn.classList.add("active");
    const gTab = document.getElementById("tabGarden");
    if (gTab) gTab.classList.add("active");
    activeTab = "tabGarden";
    renderGardenTab();
  });

  const dropCloseBtn = document.getElementById("dropCloseBtn");
  if (dropCloseBtn) {
    dropCloseBtn.addEventListener("click", () => {
      dismissDropCard();
    });
  }

  // Synchronize Timer from Storage
  function syncTimerFromStorage() {
    window.syncTimerFromStorage = syncTimerFromStorage;
    ext.storage.local.get([
      "timerState", "sessionStartTime", "sessionDuration", "sessionEndTime",
      "secondsRemaining", "selectedSkin", "witherReason", "coins", "level", "lastDrop",
      "strictMode", "treeState"
    ], (data) => {
      const state = data.timerState || "idle";
      const totalSec = data.sessionDuration || selectedDuration;
      const skin = data.selectedSkin || "oak";
      const reason = data.witherReason || "";
      const lastDrop = data.lastDrop || null;
      const isStrict = !!data.strictMode;
      const treeState = data.treeState || "healthy";
      const t = i18n[currentLang] || i18n.ru;

      if (strictModeToggle) {
        strictModeToggle.checked = isStrict;
        strictModeToggle.disabled = (state === "running");
      }
      if (strictModeCard) {
        strictModeCard.classList.toggle("active", isStrict);
      }

      coinsCount.textContent = data.coins || 0;
      const lvl = data.level || 1;
      userLevelBadge.textContent = t.userLevel(lvl);

      if (state === "running" && data.sessionEndTime) {
        const remainingMs = data.sessionEndTime - Date.now();
        if (remainingMs <= 0) {
          updateTimeDisplay(0);
          updateTimerView(0, totalSec, skin, "completed", "", lastDrop, isStrict, treeState);
        } else {
          const remainingSec = Math.round(remainingMs / 1000);
          updateTimeDisplay(remainingSec);
          updateTimerView(remainingSec, totalSec, skin, "running", "", null, isStrict, treeState);
        }
      } else if (state === "paused") {
        const rem = data.secondsRemaining || totalSec;
        updateTimeDisplay(rem);
        updateTimerView(rem, totalSec, skin, "paused", "", null, isStrict, treeState);
      } else if (state === "withered") {
        updateTimeDisplay(0);
        updateTimerView(0, totalSec, skin, "withered", reason, null, isStrict, treeState);
      } else if (state === "completed") {
        updateTimeDisplay(0);
        updateTimerView(0, totalSec, skin, "completed", "", lastDrop, isStrict, treeState);
      } else {
        // Idle
        updateTimeDisplay(totalSec);
        updateTimerView(totalSec, totalSec, skin, "idle", "", null, isStrict, treeState);
        updateCustomDuration(totalSec);
      }
    });
  }

  // Start continuous 1s ticker for countdown
  if (timerTicker) clearInterval(timerTicker);
  timerTicker = setInterval(() => {
    ext.storage.local.get([
      "timerState", "sessionEndTime", "sessionDuration", "selectedSkin",
      "lastDrop", "strictMode", "treeState"
    ], (data) => {
      if (data.timerState === "running" && data.sessionEndTime) {
        const remainingMs = data.sessionEndTime - Date.now();
        const totalSec = data.sessionDuration || 1500;
        const skin = data.selectedSkin || "oak";
        const isStrict = !!data.strictMode;
        const treeState = data.treeState || "healthy";

        if (remainingMs <= 0) {
          updateTimeDisplay(0);
          updateTimerView(0, totalSec, skin, "completed", "", data.lastDrop, isStrict, treeState);
        } else {
          const remainingSec = Math.round(remainingMs / 1000);
          updateTimeDisplay(remainingSec);
          updateTimerView(remainingSec, totalSec, skin, "running", "", null, isStrict, treeState);
        }
      }
    });
  }, 1000);

  // Timer Button Actions
  startBtn.addEventListener("click", () => {
    const isStrict = strictModeToggle ? strictModeToggle.checked : false;
    ext.runtime.sendMessage({
      action: "START_TIMER",
      duration: selectedDuration,
      strictMode: isStrict
    }, () => {
      syncTimerFromStorage();
    });
  });

  pauseBtn.addEventListener("click", () => {
    ext.runtime.sendMessage({ action: "PAUSE_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  resumeBtn.addEventListener("click", () => {
    ext.runtime.sendMessage({ action: "RESUME_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  resetBtn.addEventListener("click", () => {
    ext.runtime.sendMessage({ action: "RESET_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  plantNewBtn.addEventListener("click", () => {
    dismissDropCard();
    ext.runtime.sendMessage({ action: "RESET_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  // Ambient Sound Controller (Persists in background & offscreen document)
  ambientSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    weatherEffects.setWeather(val);
    ext.runtime.sendMessage({ action: "SET_AMBIENT_SOUND", soundType: val });
  });

  // -------------------------------------------------------------
  // TAB 2: 3D ISOMETRIC VIRTUAL GARDEN & RARITIES ALMANAC (garden.js)
  // -------------------------------------------------------------
  // Toast Notification System
  function showToast(message) {
    let toast = document.getElementById("fpToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fpToast";
      toast.style.position = "fixed";
      toast.style.top = "18px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%) translateY(-24px)";
      toast.style.background = "linear-gradient(135deg, rgba(24, 24, 37, 0.98) 0%, rgba(30, 30, 46, 0.98) 100%)";
      toast.style.border = "1.5px solid var(--accent-mint)";
      toast.style.color = "#fff";
      toast.style.padding = "8px 16px";
      toast.style.borderRadius = "20px";
      toast.style.fontSize = "0.78rem";
      toast.style.fontWeight = "700";
      toast.style.zIndex = "99999";
      toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.65), 0 0 16px rgba(148, 226, 213, 0.35)";
      toast.style.transition = "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
      toast.style.opacity = "0";
      toast.style.pointerEvents = "none";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-24px)";
    }, 2800);
  }
  window.showToast = showToast;
  const renderGardenTab = window.renderGardenTab;
  const openHqModal = window.openHqModal;

  // -------------------------------------------------------------
  // TAB CONTROLLERS & DELEGATES (Decomposed to src/modules/)
  // -------------------------------------------------------------
  const renderShopTab = window.renderShopTab;
  const renderTasksTab = window.renderTasksTab;
  const renderBlockerTab = window.renderBlockerTab;

  if (typeof window.initTasksTab === 'function') window.initTasksTab();
  if (typeof window.initBlockerTab === 'function') window.initBlockerTab();


  // Shareable Focus Card Generator loaded from shareCard.js
  const openShareModal = window.openShareModal;
  const drawShareCard = window.drawShareCard;


    // Storage Change Listener for live sync
  ext.storage.onChanged.addListener((changes) => {
    if (changes.ambientSound) {
      const soundVal = changes.ambientSound.newValue || "none";
      ambientSelect.value = soundVal;
      weatherEffects.setWeather(soundVal);
    }
    if (changes.strictMode && strictModeToggle) {
      strictModeToggle.checked = !!changes.strictMode.newValue;
      strictModeCard.classList.toggle("active", !!changes.strictMode.newValue);
    }
    if (changes.timerState || changes.sessionEndTime || changes.treeState || changes.coins || changes.lastDrop) {
      syncTimerFromStorage();
      if (activeTab === "tabGarden") renderGardenTab();
      if (activeTab === "tabShop") renderShopTab();
    }
  });

  // Initial Load
  ext.storage.local.get(["lang", "ambientSound", "strictMode", "sessionDuration"], (data) => {
    if (data.lang) {
      langSelect.value = data.lang;
      applyLanguage(data.lang);
    } else {
      applyLanguage("ru");
    }
    if (data.ambientSound) {
      ambientSelect.value = data.ambientSound;
      weatherEffects.setWeather(data.ambientSound);
    } else {
      weatherEffects.setWeather("none");
    }
    if (data.strictMode !== undefined && strictModeToggle) {
      strictModeToggle.checked = !!data.strictMode;
      strictModeCard.classList.toggle("active", !!data.strictMode);
    }
    if (data.sessionDuration) {
      updateCustomDuration(data.sessionDuration);
    }
    // Initialize decomposed submodules
    if (window.initGardenTab) window.initGardenTab();
    if (window.initShareCard) window.initShareCard();
    window.syncTimerFromStorage = syncTimerFromStorage;
    syncTimerFromStorage();
  });
});
