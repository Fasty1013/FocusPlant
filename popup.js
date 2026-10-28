// Focus Plant Pro - Cross-Browser Main Popup Controller with Full Localization
document.addEventListener("DOMContentLoaded", () => {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  // Comprehensive Localization Dictionary
  const i18n = {
    ru: {
      timerTab: "⏱ Таймер",
      gardenTab: "🪴 Сад & Редкости",
      shopTab: "🛒 Скины",
      tasksTab: "✅ Задачи",
      blockerTab: "🛡 Блокировка",
      userLevel: (lvl) => `Ур. ${lvl} Садовод`,
      selectTime: "⏱ Время концентрации:",
      minuteUnit: "мин",
      chancesTitle: "🎲 Шансы выпадения редкостей:",
      chancesHint: "Больше время = выше шанс на легендарные!",
      timerStatusIdle: "Выберите время и начните фокус",
      timerStatusRunning: "Режим концентрации: дерево растет!",
      timerStatusPaused: "Фокус приостановлен",
      timerStatusCompleted: "🎉 Поздравляем! Дерево успешно выросло!",
      timerStatusWithered: "🥀 Дерево завяло из-за отвлечения",
      witherDefaultReason: "Запрещенный сайт",
      startBtn: "▶ Начать фокус",
      pauseBtn: "⏸ Пауза",
      resumeBtn: "▶ Продолжить",
      resetBtn: "🔄 Сдаться",
      plantNewBtn: "🌱 Посадить новое дерево",
      dropTitle: "Вы вырастили новое дерево!",
      dropClaim: "Полюбоваться в саду",
      newTreeUnlocked: "✨ НОВОЕ ДЕРЕВО ОТКРЫТО!",
      ambientLabel: "🔊 Фоновый звук:",
      ambientNone: "Выкл",
      ambientRain: "🌧 Дождь",
      ambientWaves: "🌊 Морские волны",
      ambientForest: "🌲 Лесной ветерок",
      ambientFire: "🔥 Уютный костёр",
      ambientZen: "🌌 Дзен 432Hz",
      ambientWhite: "⚪ Белый шум",
      grown: "Выращено",
      withered: "Погибло",
      focusTime: "Время фокуса",
      successRate: "Успех",
      almanacHeader: "📖 Алманах редкостей деревьев",
      almanacSubdesc: "Ставьте больше времени на таймере, чтобы разблокировать редкие, эпические и мифические виды!",
      almanacUnlocked: "открыто",
      almanacLockedHint: "Не открыто!\nСтавьте сессии 45+ мин для выпадения!",
      almanacClickEquip: "Нажмите, чтобы выбрать!",
      statsHeader: "📊 Фокус за последние 7 дней (мин)",
      chartDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      forestHeader: "🌲 Мой цифровой лес",
      forestEmpty: "Ваш лес пока пуст. Вырастите свое первое дерево!",
      shopTitle: "Магазин деревьев",
      shopDesc: "Покупайте или открывайте новые деревья длительными сессиями фокуса!",
      equipped: "✓ Выбрано",
      equip: "Выбрать",
      buy: "Купить",
      notEnoughCoins: "Недостаточно монет для покупки этого скина!",
      questsHeader: "🎯 Ежедневные квесты",
      quest1: "Завершить 1 сессию фокуса",
      quest2: "Сфокусироваться на 45 минут",
      quest3: "Выполнить 2 задачи из списка",
      todoHeader: "📝 Список задач",
      todoPlaceholder: "Новая задача...",
      addBtn: "Добавить",
      claimReward: "Забрать",
      claimedReward: "✓ Получено",
      blockMode: "Режим блокировки:",
      blacklistOpt: "Черный список (Запрещать сайты из списка)",
      whitelistOpt: "Белый список (Разрешать только эти сайты)",
      modeDesc: "Если зайти на запрещенный сайт во время фокуса, дерево погибнет!",
      lblAlertStyle: "Формат предупреждения:",
      alertStyleBanner: "🪟 Компактный плавающий баннер (не мешает)",
      alertStyleFullscreen: "📺 На весь экран (полная блокировка)",
      lblAlertStyleDesc: "Баннер аккуратно появляется сверху и виден сразу, не перекрывая сайт.",
      quickAdd: "Быстрое добавление:",
      activeSites: "Активный список сайтов:",
      sitePlaceholder: "например: youtube.com"
    },
    en: {
      timerTab: "⏱ Timer",
      gardenTab: "🪴 Garden & Rarities",
      shopTab: "🛒 Skins",
      tasksTab: "✅ Tasks",
      blockerTab: "🛡 Blocker",
      userLevel: (lvl) => `Lvl. ${lvl} Gardener`,
      selectTime: "⏱ Focus Duration:",
      minuteUnit: "min",
      chancesTitle: "🎲 Rarity Drop Chances:",
      chancesHint: "Longer focus = higher legendary tree chance!",
      timerStatusIdle: "Choose duration and start focusing",
      timerStatusRunning: "Deep focus mode: tree is growing!",
      timerStatusPaused: "Focus session paused",
      timerStatusCompleted: "🎉 Congratulations! Tree is fully grown!",
      timerStatusWithered: "🥀 The tree withered due to distraction",
      witherDefaultReason: "Blocked website",
      startBtn: "▶ Start Focus",
      pauseBtn: "⏸ Pause",
      resumeBtn: "▶ Resume",
      resetBtn: "🔄 Give Up",
      plantNewBtn: "🌱 Plant New Tree",
      dropTitle: "You grew a new tree!",
      dropClaim: "View in Garden",
      newTreeUnlocked: "✨ NEW TREE UNLOCKED!",
      ambientLabel: "🔊 Ambient Sound:",
      ambientNone: "Off",
      ambientRain: "🌧 Rain",
      ambientWaves: "🌊 Ocean Waves",
      ambientForest: "🌲 Forest Breeze",
      ambientFire: "🔥 Cozy Campfire",
      ambientZen: "🌌 Zen 432Hz",
      ambientWhite: "⚪ White Noise",
      grown: "Grown",
      withered: "Withered",
      focusTime: "Focus Time",
      successRate: "Success",
      almanacHeader: "📖 Tree Rarities Almanac",
      almanacSubdesc: "Set longer focus sessions to unlock rare, epic, and mythic trees!",
      almanacUnlocked: "unlocked",
      almanacLockedHint: "Locked!\nSet 45+ min focus sessions to discover!",
      almanacClickEquip: "Click to equip!",
      statsHeader: "📊 Focus over last 7 days (min)",
      chartDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      forestHeader: "🌲 My Digital Forest",
      forestEmpty: "Your forest is empty. Grow your first tree!",
      shopTitle: "Tree Nursery & Skins",
      shopDesc: "Unlock exotic trees with coins or long focus sessions!",
      equipped: "✓ Equipped",
      equip: "Equip",
      buy: "Buy",
      notEnoughCoins: "Not enough coins to unlock this skin!",
      questsHeader: "🎯 Daily Quests",
      quest1: "Complete 1 focus session",
      quest2: "Focus for 45 minutes",
      quest3: "Complete 2 tasks from list",
      todoHeader: "📝 Task List",
      todoPlaceholder: "New task...",
      addBtn: "Add",
      claimReward: "Claim",
      claimedReward: "✓ Claimed",
      blockMode: "Blocker Mode:",
      blacklistOpt: "Blacklist (Block listed websites)",
      whitelistOpt: "Whitelist (Allow only listed websites)",
      modeDesc: "Visiting a blocked site during focus will wither your tree!",
      lblAlertStyle: "Warning Style:",
      alertStyleBanner: "🪟 Compact Floating Banner (recommended)",
      alertStyleFullscreen: "📺 Full Screen (strict blocking)",
      lblAlertStyleDesc: "The banner appears neatly at the top without hiding the webpage.",
      quickAdd: "Quick Add:",
      activeSites: "Active Website List:",
      sitePlaceholder: "e.g. youtube.com"
    },
    uz: {
      timerTab: "⏱ Taymer",
      gardenTab: "🪴 Bog' & Noyoblik",
      shopTab: "🛒 Daraxtlar",
      tasksTab: "✅ Vazifalar",
      blockerTab: "🛡 Bloklash",
      userLevel: (lvl) => `${lvl}-daraja Bog'bon`,
      selectTime: "⏱ Fokus vaqti:",
      minuteUnit: "daq",
      chancesTitle: "🎲 Noyoblik ehtimolligi:",
      chancesHint: "Vaqt ko'p bo'lsa = afsonaviy daraxt chiqish ehtimoli yuqori!",
      timerStatusIdle: "Vaqtni tanlang va fokusni boshlang",
      timerStatusRunning: "Fokus rejimi: daraxt o'smoqda!",
      timerStatusPaused: "Taymer to'xtatildi",
      timerStatusCompleted: "🎉 Tabriklaymiz! Daraxt to'liq o'sdi!",
      timerStatusWithered: "🥀 Chalg'ish tufayli daraxt so'ldi",
      witherDefaultReason: "Taqiqlangan sayt",
      startBtn: "▶ Fokusni boshlash",
      pauseBtn: "⏸ Pauza",
      resumeBtn: "▶ Davom etish",
      resetBtn: "🔄 Taslim bo'lish",
      plantNewBtn: "🌱 Yangi daraxt ekish",
      dropTitle: "Yangi daraxt o'stirdingiz!",
      dropClaim: "Bog'da ko'rish",
      newTreeUnlocked: "✨ YANGI DARAXT OCHILDI!",
      ambientLabel: "🔊 Fon ovozi:",
      ambientNone: "O'chirilgan",
      ambientRain: "🌧 Yomg'ir",
      ambientWaves: "🌊 Dengiz to'lqinlari",
      ambientForest: "🌲 O'rmon shamoli",
      ambientFire: "🔥 Olov qirsillashi",
      ambientZen: "🌌 Dzen 432Hz",
      ambientWhite: "⚪ Oq shovqin",
      grown: "O'stirildi",
      withered: "So'ldi",
      focusTime: "Fokus vaqti",
      successRate: "Muvaffaqiyat",
      almanacHeader: "📖 Daraxtlar Almanaği",
      almanacSubdesc: "Noyob va afsonaviy daraxtlarni ochish uchun taymerda ko'proq vaqt belgilang!",
      almanacUnlocked: "ochilgan",
      almanacLockedHint: "Qulflangan!\n45+ daqiqalik fokus orqali ochiladi!",
      almanacClickEquip: "Tanlash uchun bosing!",
      statsHeader: "📊 Oxirgi 7 kunlik fokus (daq)",
      chartDays: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
      forestHeader: "🌲 Mening o'rmonim",
      forestEmpty: "O'rmon hali bo'sh. Birinchi daraxtingizni o'stiring!",
      shopTitle: "Daraxtlar do'koni",
      shopDesc: "Tangalar yoki uzoq fokus orqali yangi daraxtlarni oching!",
      equipped: "✓ Tanlangan",
      equip: "Tanlash",
      buy: "Sotib olish",
      notEnoughCoins: "Bu daraxtni sotib olish uchun tanga yetarli emas!",
      questsHeader: "🎯 Kunlik topshiriqlar",
      quest1: "1 ta fokus sessiyasini yakunlash",
      quest2: "45 daqiqa fokus qilish",
      quest3: "Ro'yxatdan 2 ta vazifani bajarish",
      todoHeader: "📝 Vazifalar ro'yxati",
      todoPlaceholder: "Yangi vazifa...",
      addBtn: "Qo'shish",
      claimReward: "Olish",
      claimedReward: "✓ Qabul qilindi",
      blockMode: "Bloklash rejimi:",
      blacklistOpt: "Qora ro'yxat (Ro'yxatdagi saytlarni to'sish)",
      whitelistOpt: "Oq ro'yxat (Faqat shu saytlarga ruxsat)",
      modeDesc: "Taqiqlangan saytga kirsangiz, daraxtingiz so'ladi!",
      lblAlertStyle: "Ogohlantirish ko'rinishi:",
      alertStyleBanner: "🪟 Ixcham suzuvchi banner (xalaqit bermaydi)",
      alertStyleFullscreen: "📺 To'liq ekran (qat'iy bloklash)",
      lblAlertStyleDesc: "Banner sahifani to'sib qo'ymasdan tepadan chiroyli chiqadi.",
      quickAdd: "Tezkor qo'shish:",
      activeSites: "Faol saytlar ro'yxati:",
      sitePlaceholder: "masalan: youtube.com"
    },
    ja: {
      timerTab: "⏱ タイマー",
      gardenTab: "🪴 庭＆レア図鑑",
      shopTab: "🛒 スキン",
      tasksTab: "✅ タスク",
      blockerTab: "🛡 ブロック",
      userLevel: (lvl) => `Lv.${lvl} 庭師`,
      selectTime: "⏱ 集中時間:",
      minuteUnit: "分",
      chancesTitle: "🎲 レア度排出率:",
      chancesHint: "集中時間が長いほどレジェンダリーが出現！",
      timerStatusIdle: "時間を選んで集中を開始",
      timerStatusRunning: "集中モード中：木が成長しています！",
      timerStatusPaused: "集中モード一時停止",
      timerStatusCompleted: "🎉 おめでとうございます！木が育ちました！",
      timerStatusWithered: "🥀 誘惑に負けて木が枯れてしまいました",
      witherDefaultReason: "ブロックされたサイト",
      startBtn: "▶ 集中開始",
      pauseBtn: "⏸ 一時停止",
      resumeBtn: "▶ 再開",
      resetBtn: "🔄 あきらめる",
      plantNewBtn: "🌱 新しい木を植える",
      dropTitle: "新しい木が育ちました！",
      dropClaim: "庭で確認する",
      newTreeUnlocked: "✨ 新しい木を図鑑に登録！",
      ambientLabel: "🔊 BGM音:",
      ambientNone: "オフ",
      ambientRain: "🌧 雨の音",
      ambientWaves: "🌊 打ち寄せる波",
      ambientForest: "🌲 森のそよ風",
      ambientFire: "🔥 焚き火の音",
      ambientZen: "🌌 宇宙瞑想 (432Hz)",
      ambientWhite: "⚪ ホワイトノイズ",
      grown: "育成成功",
      withered: "枯れた木",
      focusTime: "集中時間",
      successRate: "成功率",
      almanacHeader: "📖 ツリーレア図鑑",
      almanacSubdesc: "集中時間を伸ばすほど、エピックやレジェンダリー、ミシックの木が出現！",
      almanacUnlocked: "解放済み",
      almanacLockedHint: "未解放！\n長時間集中すると確率で出現します！",
      almanacClickEquip: "クリックして装備！",
      statsHeader: "📊 過去7日間の集中時間（分）",
      chartDays: ["月", "火", "水", "木", "金", "土", "日"],
      forestHeader: "🌲 私のデジタルフォレスト",
      forestEmpty: "まだ木がありません。最初の木を育てましょう！",
      shopTitle: "ツリーショップ",
      shopDesc: "集中時間を伸ばすほどレアな木が育ちやすくなります！",
      equipped: "✓ 選択中",
      equip: "装備する",
      buy: "購入",
      notEnoughCoins: "コインが足りません！",
      questsHeader: "🎯 デイリークエスト",
      quest1: "集中セッションを1回完了する",
      quest2: "合計45分間集中する",
      quest3: "やることリストのタスクを2つ完了する",
      todoHeader: "📝 やることリスト",
      todoPlaceholder: "新しいタスク...",
      addBtn: "追加",
      claimReward: "受け取る",
      claimedReward: "✓ 受取済み",
      blockMode: "ブロックモード:",
      blacklistOpt: "ブラックリスト (指定サイトをブロック)",
      whitelistOpt: "ホワイトリスト (指定サイトのみ許可)",
      modeDesc: "集中中に禁止サイトを開くと木が枯れてしまいます！",
      lblAlertStyle: "警告の表示形式:",
      alertStyleBanner: "🪟 コンパクトバナー（邪魔にならない）",
      alertStyleFullscreen: "📺 全画面表示（完全ブロック）",
      lblAlertStyleDesc: "バナーはWebページを崩さず画面上部にスマートに表示されます。",
      quickAdd: "クイック追加:",
      activeSites: "登録済みサイト一覧:",
      sitePlaceholder: "例: youtube.com"
    }
  };

  // State Variables
  let currentLang = "ru";
  let activeTab = "tabTimer";
  let selectedMinutes = 25;
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
  const timePresets = document.getElementById("timePresets");

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

  // Buttons
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resumeBtn = document.getElementById("resumeBtn");
  const resetBtn = document.getElementById("resetBtn");
  const plantNewBtn = document.getElementById("plantNewBtn");
  const ambientSelect = document.getElementById("ambientSelect");

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

      if (activeTab === "tabGarden") renderGardenTab();
      if (activeTab === "tabShop") renderShopTab();
      if (activeTab === "tabTasks") renderTasksTab();
      if (activeTab === "tabBlocker") renderBlockerTab();
    });
  });

  // Apply Language Everywhere
  function applyLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang] || i18n.ru;

    document.getElementById("tTimerBtn").textContent = t.timerTab;
    document.getElementById("tGardenBtn").textContent = t.gardenTab;
    document.getElementById("tShopBtn").textContent = t.shopTab;
    document.getElementById("tTasksBtn").textContent = t.tasksTab;
    document.getElementById("tBlockerBtn").textContent = t.blockerTab;

    document.getElementById("lblSelectTime").textContent = t.selectTime;
    document.getElementById("lblMinuteUnit").textContent = t.minuteUnit;
    document.getElementById("lblChancesTitle").textContent = t.chancesTitle;
    document.getElementById("lblChancesHint").textContent = t.chancesHint;

    document.getElementById("startBtn").textContent = t.startBtn;
    document.getElementById("pauseBtn").textContent = t.pauseBtn;
    document.getElementById("resumeBtn").textContent = t.resumeBtn;
    document.getElementById("resetBtn").textContent = t.resetBtn;
    document.getElementById("plantNewBtn").textContent = t.plantNewBtn;

    dropTitle.textContent = t.dropTitle;
    dropClaimBtn.textContent = t.dropClaim;

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

  // Time & Chances Synchronizer
  function updateCustomDuration(mins) {
    selectedMinutes = Math.max(5, Math.min(180, Number(mins) || 25));
    selectedDuration = selectedMinutes * 60;

    timeSlider.value = selectedMinutes;
    customMinutesInput.value = selectedMinutes;
    updateTimeDisplay(selectedDuration);

    timePresets.querySelectorAll(".preset-btn").forEach(btn => {
      if (parseInt(btn.dataset.minutes, 10) === selectedMinutes) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const chances = calculateDropChances(selectedMinutes);
    chanceCommon.textContent = `⚪ ${chances.common}%`;
    chanceUncommon.textContent = `🟢 ${chances.uncommon}%`;
    chanceRare.textContent = `🔵 ${chances.rare}%`;
    chanceEpic.textContent = `🟣 ${chances.epic}%`;
    chanceLegendary.textContent = `🟡 ${chances.legendary}%`;
    chanceMythic.textContent = `✦ ${chances.mythic}%`;

    ext.storage.local.set({ sessionDuration: selectedDuration, secondsRemaining: selectedDuration });
  }

  timeSlider.addEventListener("input", (e) => {
    updateCustomDuration(e.target.value);
  });

  customMinutesInput.addEventListener("change", (e) => {
    updateCustomDuration(e.target.value);
  });

  timePresets.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mins = parseInt(btn.dataset.minutes, 10);
      updateCustomDuration(mins);
    });
  });

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

  function updateTimerView(remainingSeconds, totalSeconds, skin, state, reason, lastDrop) {
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
      return;
    }

    if (state === "running") {
      progressRing.style.stroke = "#10b981";
      const stage = getGrowthStage(progressPct);
      treeAvatar.innerHTML = renderTreeSVG(skin, stage, false);
      timerStatus.textContent = `${t.timerStatusRunning} (${progressPct}%)`;
      timerStatus.style.color = "#94e2d5";
      timerStatus.style.background = "rgba(148, 226, 213, 0.12)";

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      pauseBtn.style.display = "flex";
      resumeBtn.style.display = "none";
      resetBtn.style.display = "flex";
      plantNewBtn.style.display = "none";
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
  }

  // Claim Drop button
  dropClaimBtn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    const gBtn = document.getElementById("tGardenBtn");
    if (gBtn) gBtn.classList.add("active");
    const gTab = document.getElementById("tabGarden");
    if (gTab) gTab.classList.add("active");
    activeTab = "tabGarden";
    renderGardenTab();
  });

  // Synchronize Timer from Storage
  function syncTimerFromStorage() {
    ext.storage.local.get([
      "timerState", "sessionStartTime", "sessionDuration", "sessionEndTime",
      "secondsRemaining", "selectedSkin", "witherReason", "coins", "level", "lastDrop"
    ], (data) => {
      const state = data.timerState || "idle";
      const totalSec = data.sessionDuration || selectedDuration;
      const skin = data.selectedSkin || "oak";
      const reason = data.witherReason || "";
      const lastDrop = data.lastDrop || null;
      const t = i18n[currentLang] || i18n.ru;

      coinsCount.textContent = data.coins || 0;
      const lvl = data.level || 1;
      userLevelBadge.textContent = t.userLevel(lvl);

      if (state === "running" && data.sessionEndTime) {
        const remainingMs = data.sessionEndTime - Date.now();
        if (remainingMs <= 0) {
          updateTimeDisplay(0);
          updateTimerView(0, totalSec, skin, "completed", "", lastDrop);
        } else {
          const remainingSec = Math.round(remainingMs / 1000);
          updateTimeDisplay(remainingSec);
          updateTimerView(remainingSec, totalSec, skin, "running", "", null);
        }
      } else if (state === "paused") {
        const rem = data.secondsRemaining || totalSec;
        updateTimeDisplay(rem);
        updateTimerView(rem, totalSec, skin, "paused", "", null);
      } else if (state === "withered") {
        updateTimeDisplay(0);
        updateTimerView(0, totalSec, skin, "withered", reason, null);
      } else if (state === "completed") {
        updateTimeDisplay(0);
        updateTimerView(0, totalSec, skin, "completed", "", lastDrop);
      } else {
        // Idle
        updateTimeDisplay(totalSec);
        updateTimerView(totalSec, totalSec, skin, "idle", "", null);
        const mins = Math.round(totalSec / 60);
        updateCustomDuration(mins);
      }
    });
  }

  // Start continuous 1s ticker for countdown
  if (timerTicker) clearInterval(timerTicker);
  timerTicker = setInterval(() => {
    ext.storage.local.get(["timerState", "sessionEndTime", "sessionDuration", "selectedSkin", "lastDrop"], (data) => {
      if (data.timerState === "running" && data.sessionEndTime) {
        const remainingMs = data.sessionEndTime - Date.now();
        const totalSec = data.sessionDuration || 1500;
        const skin = data.selectedSkin || "oak";

        if (remainingMs <= 0) {
          updateTimeDisplay(0);
          updateTimerView(0, totalSec, skin, "completed", "", data.lastDrop);
        } else {
          const remainingSec = Math.round(remainingMs / 1000);
          updateTimeDisplay(remainingSec);
          updateTimerView(remainingSec, totalSec, skin, "running", "", null);
        }
      }
    });
  }, 1000);

  // Timer Button Actions
  startBtn.addEventListener("click", () => {
    ext.runtime.sendMessage({ action: "START_TIMER", duration: selectedDuration }, () => {
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
    ext.runtime.sendMessage({ action: "RESET_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  // Ambient Sound Controller (Persists in background & offscreen document)
  ambientSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    ext.runtime.sendMessage({ action: "SET_AMBIENT_SOUND", soundType: val });
  });

  // -------------------------------------------------------------
  // TAB 2: VIRTUAL GARDEN & RARITIES ALMANAC
  // -------------------------------------------------------------
  function renderGardenTab() {
    ext.storage.local.get(["forest", "stats", "unlockedSkins", "selectedSkin"], (data) => {
      const forest = Array.isArray(data.forest) ? data.forest : [];
      const stats = data.stats || {
        totalSessions: 0,
        completedSessions: 0,
        witheredSessions: 0,
        totalFocusMinutes: 0,
        dailyStats: [0, 0, 0, 0, 0, 0, 0]
      };
      const unlocked = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const currentSelected = data.selectedSkin || "oak";
      const t = i18n[currentLang] || i18n.ru;

      const grown = stats.completedSessions || 0;
      const withered = stats.witheredSessions || 0;
      const total = grown + withered;
      const rate = total > 0 ? Math.round((grown / total) * 100) : 100;

      statGrown.textContent = grown;
      statWithered.textContent = withered;
      statMinutes.textContent = `${stats.totalFocusMinutes || 0}m`;
      statRate.textContent = `${rate}%`;

      // Render Rarities Almanac
      const allSkins = Object.values(TREE_SKINS);
      almanacCounter.textContent = `${unlocked.length} / ${allSkins.length} ${t.almanacUnlocked}`;
      almanacGrid.innerHTML = "";

      allSkins.forEach(skin => {
        const isOwned = unlocked.includes(skin.id);
        const isEquipped = currentSelected === skin.id;
        const rarityObj = RARITIES[skin.rarity] || RARITIES.common;

        const item = document.createElement("div");
        item.className = `almanac-item ${isOwned ? "" : "locked"} ${isEquipped ? "equipped" : ""}`;
        item.style.borderColor = isOwned ? rarityObj.border : "var(--border-color)";

        item.innerHTML = `
          <div class="almanac-icon">${isOwned ? skin.emoji : "🔒"}</div>
          <div class="almanac-name">${skin.name[currentLang] || skin.name.ru}</div>
          <span class="almanac-rarity" style="background:${rarityObj.bg};color:${rarityObj.color};">${rarityObj.stars}</span>
        `;

        item.title = isOwned
          ? `${skin.name[currentLang] || skin.name.ru} (${rarityObj.name[currentLang] || rarityObj.name.ru})\n${skin.desc[currentLang] || skin.desc.ru}\n${t.almanacClickEquip}`
          : `${t.almanacLockedHint}\n[${rarityObj.name[currentLang] || rarityObj.name.ru}]`;

        if (isOwned) {
          item.addEventListener("click", () => {
            ext.storage.local.set({ selectedSkin: skin.id }, () => {
              soundManager.playCompleteChime();
              renderGardenTab();
              syncTimerFromStorage();
            });
          });
        }

        almanacGrid.appendChild(item);
      });

      // Render 7-day Bar Chart
      statsChart.innerHTML = "";
      const daily = Array.isArray(stats.dailyStats) ? stats.dailyStats : [0, 0, 0, 0, 0, 0, 0];
      const maxVal = Math.max(...daily, 15);

      daily.forEach(val => {
        const col = document.createElement("div");
        col.className = "bar-column";
        const heightPct = Math.min(100, Math.max(6, Math.round((val / maxVal) * 100)));
        col.style.height = `${heightPct}%`;
        col.title = `${val} ${t.minuteUnit}`;
        statsChart.appendChild(col);
      });

      // Render Forest Gallery
      forestGrid.innerHTML = "";
      if (forest.length === 0) {
        forestGrid.innerHTML = `<div class="empty-state">${t.forestEmpty}</div>`;
      } else {
        const recent = [...forest].reverse().slice(0, 36);
        recent.forEach(tree => {
          const cell = document.createElement("div");
          const isWithered = tree.status === "withered";
          cell.className = `forest-cell ${isWithered ? "withered" : ""}`;

          const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
          const icon = isWithered ? "🥀" : skinObj.emoji;
          cell.textContent = icon;

          const dateStr = tree.date ? new Date(tree.date).toLocaleDateString() : "";
          const durStr = `${tree.duration || 0} ${t.minuteUnit}`;
          const reasonStr = isWithered ? `\n${tree.reason}` : "";
          const rarityName = tree.rarity ? ` [${RARITIES[tree.rarity]?.name[currentLang] || ""}]` : "";
          cell.title = `${isWithered ? t.withered : t.grown}: ${skinObj.name[currentLang] || skinObj.name.ru}${rarityName}\n${durStr} • ${dateStr}${reasonStr}`;

          forestGrid.appendChild(cell);
        });
      }
    });
  }

  // -------------------------------------------------------------
  // TAB 3: TREE SKINS SHOP
  // -------------------------------------------------------------
  function renderShopTab() {
    ext.storage.local.get(["coins", "unlockedSkins", "selectedSkin"], (data) => {
      const coins = data.coins || 0;
      const unlocked = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const currentSelected = data.selectedSkin || "oak";
      const t = i18n[currentLang] || i18n.ru;

      skinsGrid.innerHTML = "";

      Object.values(TREE_SKINS).forEach(skin => {
        const isOwned = unlocked.includes(skin.id);
        const isEquipped = currentSelected === skin.id;
        const rarityObj = RARITIES[skin.rarity] || RARITIES.common;

        const card = document.createElement("div");
        card.className = `skin-card ${isEquipped ? "selected" : ""}`;

        const previewSvg = renderTreeSVG(skin.id, 5, false);

        card.innerHTML = `
          <div class="skin-preview-box">${previewSvg}</div>
          <div class="skin-details">
            <div class="skin-name-row">
              <span class="skin-name">${skin.name[currentLang] || skin.name.ru} ${skin.emoji}</span>
              <span class="skin-rarity-pill" style="background:${rarityObj.bg};color:${rarityObj.color};">${rarityObj.stars}</span>
            </div>
            <div class="skin-desc">${skin.desc[currentLang] || skin.desc.ru}</div>
          </div>
          <div class="skin-action">
            ${
              isEquipped
                ? `<button class="btn btn-sm btn-primary" disabled>${t.equipped}</button>`
                : isOwned
                  ? `<button class="btn btn-sm btn-warning equip-btn" data-skin="${skin.id}">${t.equip}</button>`
                  : `<button class="btn btn-sm btn-primary buy-btn" data-skin="${skin.id}" data-price="${skin.price}">🪙 ${skin.price} ${t.buy}</button>`
            }
          </div>
        `;

        skinsGrid.appendChild(card);
      });

      skinsGrid.querySelectorAll(".equip-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const skinId = btn.dataset.skin;
          ext.storage.local.set({ selectedSkin: skinId }, () => {
            renderShopTab();
            syncTimerFromStorage();
          });
        });
      });

      skinsGrid.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const skinId = btn.dataset.skin;
          const price = parseInt(btn.dataset.price, 10);

          if (coins < price) {
            alert(t.notEnoughCoins);
            return;
          }

          const newCoins = coins - price;
          const newUnlocked = [...unlocked, skinId];

          ext.storage.local.set({
            coins: newCoins,
            unlockedSkins: newUnlocked,
            selectedSkin: skinId
          }, () => {
            coinsCount.textContent = newCoins;
            soundManager.playCompleteChime();
            renderShopTab();
            syncTimerFromStorage();
          });
        });
      });
    });
  }

  // -------------------------------------------------------------
  // TAB 4: TASKS & QUESTS
  // -------------------------------------------------------------
  function renderTasksTab() {
    ext.storage.local.get(["quests", "todos", "coins"], (data) => {
      const quests = Array.isArray(data.quests) ? data.quests : [];
      const todos = Array.isArray(data.todos) ? data.todos : [];
      const coins = data.coins || 0;
      const t = i18n[currentLang] || i18n.ru;

      questList.innerHTML = "";
      quests.forEach(q => {
        const item = document.createElement("div");
        item.className = "quest-item";
        const progressPct = Math.min(100, Math.round((q.current / q.target) * 100));

        let questDesc = q.desc;
        if (q.id === 1) questDesc = t.quest1;
        if (q.id === 2) questDesc = t.quest2;
        if (q.id === 3) questDesc = t.quest3;

        item.innerHTML = `
          <div class="quest-item-header">
            <span>${questDesc} (${q.current}/${q.target})</span>
            <span class="quest-reward">+${q.reward} 🪙</span>
          </div>
          <div class="quest-progress-bg">
            <div class="quest-progress-bar" style="width: ${progressPct}%;"></div>
          </div>
          ${
            q.done && !q.claimed
              ? `<button class="quest-claim-btn" data-qid="${q.id}">${t.claimReward} +${q.reward} 🪙</button>`
              : q.claimed
                ? `<span style="font-size: 0.7rem; color: #a6e3a1; align-self: flex-end;">${t.claimedReward}</span>`
                : ""
          }
        `;
        questList.appendChild(item);
      });

      questList.querySelectorAll(".quest-claim-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const qid = parseInt(btn.dataset.qid, 10);
          const quest = quests.find(q => q.id === qid);
          if (!quest) return;

          quest.claimed = true;
          const newCoins = coins + quest.reward;

          ext.storage.local.set({ quests: quests, coins: newCoins }, () => {
            coinsCount.textContent = newCoins;
            soundManager.playCompleteChime();
            renderTasksTab();
          });
        });
      });

      // Todos
      todoList.innerHTML = "";
      todos.forEach((todo, idx) => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.done ? "done" : ""}`;
        li.innerHTML = `
          <div class="todo-item-left">
            <input type="checkbox" class="todo-checkbox" ${todo.done ? "checked" : ""}>
            <span>${todo.text}</span>
          </div>
          <button class="todo-del-btn" title="Delete">✖</button>
        `;

        li.querySelector(".todo-checkbox").addEventListener("change", (e) => {
          const checked = e.target.checked;
          todo.done = checked;

          let updatedCoins = coins;
          if (checked && !todo.rewarded) {
            todo.rewarded = true;
            updatedCoins += 5;
            coinsCount.textContent = updatedCoins;
            soundManager.playCompleteChime();
          }

          ext.storage.local.set({ todos: todos, coins: updatedCoins }, () => {
            renderTasksTab();
          });
        });

        li.querySelector(".todo-del-btn").addEventListener("click", () => {
          todos.splice(idx, 1);
          ext.storage.local.set({ todos: todos }, () => renderTasksTab());
        });

        todoList.appendChild(li);
      });
    });
  }

  function handleAddTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    ext.storage.local.get(["todos"], (data) => {
      const todos = Array.isArray(data.todos) ? data.todos : [];
      todos.push({ id: Date.now(), text, done: false, rewarded: false });

      ext.storage.local.set({ todos: todos }, () => {
        todoInput.value = "";
        renderTasksTab();
      });
    });
  }

  addTodoBtn.addEventListener("click", handleAddTodo);
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAddTodo();
  });

  // -------------------------------------------------------------
  // TAB 5: BLOCKER SETTINGS
  // -------------------------------------------------------------
  const alertStyleSelect = document.getElementById("alertStyle");
  if (alertStyleSelect) {
    alertStyleSelect.addEventListener("change", (e) => {
      const style = e.target.value;
      ext.storage.local.set({ alertStyle: style });
    });
  }

  function renderBlockerTab() {
    ext.storage.local.get(["blockMode", "blockedSites", "whiteListSites", "alertStyle"], (data) => {
      const mode = data.blockMode || "blacklist";
      blockModeSelect.value = mode;

      if (alertStyleSelect) {
        alertStyleSelect.value = data.alertStyle || "banner";
      }

      const list = mode === "blacklist" ? (data.blockedSites || []) : (data.whiteListSites || []);
      siteCount.textContent = `${list.length}`;

      siteListContainer.innerHTML = "";
      list.forEach((site, idx) => {
        const li = document.createElement("li");
        li.className = "site-item";
        li.innerHTML = `
          <span>${site}</span>
          <button class="site-del-btn" title="Delete">✖</button>
        `;

        li.querySelector(".site-del-btn").addEventListener("click", () => {
          list.splice(idx, 1);
          const update = mode === "blacklist" ? { blockedSites: list } : { whiteListSites: list };
          ext.storage.local.set(update, () => renderBlockerTab());
        });

        siteListContainer.appendChild(li);
      });
    });
  }

  blockModeSelect.addEventListener("change", (e) => {
    const mode = e.target.value;
    ext.storage.local.set({ blockMode: mode }, () => renderBlockerTab());
  });

  function addSiteToList(rawDomain) {
    if (!rawDomain) return;
    const clean = rawDomain.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '')
      .trim();

    if (!clean) return;

    ext.storage.local.get(["blockMode", "blockedSites", "whiteListSites"], (data) => {
      const mode = data.blockMode || "blacklist";
      const list = mode === "blacklist" ? (data.blockedSites || []) : (data.whiteListSites || []);

      if (!list.includes(clean)) {
        list.push(clean);
        const update = mode === "blacklist" ? { blockedSites: list } : { whiteListSites: list };
        ext.storage.local.set(update, () => {
          siteInput.value = "";
          renderBlockerTab();
        });
      }
    });
  }

  addSiteBtn.addEventListener("click", () => addSiteToList(siteInput.value));
  siteInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addSiteToList(siteInput.value);
  });

  chipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      addSiteToList(btn.dataset.site);
    });
  });

  // Storage Change Listener for live sync
  ext.storage.onChanged.addListener((changes) => {
    if (changes.ambientSound) {
      ambientSelect.value = changes.ambientSound.newValue || "none";
    }
    if (changes.timerState || changes.sessionEndTime || changes.treeState || changes.coins || changes.lastDrop) {
      syncTimerFromStorage();
      if (activeTab === "tabGarden") renderGardenTab();
      if (activeTab === "tabShop") renderShopTab();
    }
  });

  // Initial Load
  ext.storage.local.get(["lang", "ambientSound"], (data) => {
    if (data.lang) {
      langSelect.value = data.lang;
      applyLanguage(data.lang);
    } else {
      applyLanguage("ru");
    }
    if (data.ambientSound) {
      ambientSelect.value = data.ambientSound;
    }
    syncTimerFromStorage();
  });
});
