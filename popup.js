document.addEventListener('DOMContentLoaded', async () => {
  const coinsDisplay = document.getElementById('coins-count');
  const streakDisplay = document.getElementById('streak-count');
  const timerDisplay = document.getElementById('timer-display');
  const plantAvatar = document.getElementById('plant-avatar');
  const plantName = document.getElementById('plant-name');
  const plantBox = document.getElementById('plant-box');
  const progressBar = document.getElementById('progress-bar');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const breakBtn = document.getElementById('break-btn');
  const gardenGrid = document.getElementById('garden-grid');
  const shopGrid = document.getElementById('shop-grid');
  const themeShopGrid = document.getElementById('theme-shop-grid');
  const modeSelect = document.getElementById('mode-select');
  const ambientSelect = document.getElementById('ambient-select');
  const langSelect = document.getElementById('lang-select');
  const customMinutesInput = document.getElementById('custom-minutes');
  const siteInput = document.getElementById('site-input');
  const addBtn = document.getElementById('add-btn');
  const siteList = document.getElementById('site-list');
  const exportBtn = document.getElementById('export-btn');
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');
  const todoInput = document.getElementById('todo-input');
  const todoAddBtn = document.getElementById('todo-add-btn');
  const todoList = document.getElementById('todo-list');

  let selectedMinutes = 25;
  let timerInterval = null;
  let audioCtx = null;
  let ambientNode = null;
  let currentLang = 'ru';
  let isFocusing = false;

  const TRANSLATIONS = {
    ru: {
      tabFocus: 'Фокус', tabGarden: 'Сад', tabShop: 'Магазин', tabSites: 'Фильтр', tabStats: 'Отчёт',
      ambientLabel: '🔊 Эмбиент:', optOff: 'Выкл', optRain: 'Дождь', optNoise: 'Белый шум',
      startBtn: 'Посадить растение', stopBtn: 'Сдаться', breakBtn: 'Отдых (5м)', customPlaceholder: 'Свое',
      gardenTitle: 'Выращенные деревья 🏡', gardenEmpty: 'У вас пока нет выращенных растений.',
      shopTitle: 'Магазин семян 🛒', themeShopTitle: 'Темы сада 🎨', modeLabel: 'Режим:',
      optBlacklist: 'Blacklist (Блокировать)', optWhitelist: 'Whitelist (Разрешить ТОЛЬКО)',
      statsTitle: 'Фокус за 7 дней (мин)', totalStats: 'Всего сфокусировано: {min} мин', rateStats: 'Успешность: {rate}%',
      backupTitle: 'Резервное копирование 💾', exportBtn: '📥 Скачать бекап', importBtn: '📤 Загрузить',
      todoTitle: 'Задачи на сессию 📝', questsTitle: 'Ежедневные квесты 🎯', achievementsTitle: 'Достижения 🏆',
      activeLabel: '[Активен]', selectBtn: 'Выбрать', buyBtn: 'Купить {price}🪙',
      notEnoughCoins: 'Недостаточно монет!', backupSuccess: 'Данные восстановлены!', backupError: 'Ошибка чтения!',
      notifyWinTitle: 'Focus Plant Pro 🌳', notifyWinMsg: 'Поздравляем! Вы отработали {min} мин. Растение выращено!',
      stages: { seed: 'Семечко', sprout: 'Росток', bush: 'Растущий куст', bloomed: 'Расцветший сад!', withered: 'Растение завяло...' },
      catalog: { tree: 'Дерево', cactus: 'Кактус', sunflower: 'Подсолнух', palm: 'Пальма' },
      themes: { default: 'Классика', night: 'Ночь 🌙', zen: 'Зен ⛩️', space: 'Космос 🚀' },
      quests: { q1: 'Сфокусируйся на 25 минут', q2: 'Вырасти 2 растения за день' },
      achievements: { a1: 'Первый шаг (1 сессия)', a2: 'Ботаник (10 деревьев)', a3: 'Магнат (100 монет)' }
    },
    uz: {
      tabFocus: 'Diqqat', tabGarden: 'Bog\'', tabShop: 'Do\'kon', tabSites: 'Filtr', tabStats: 'Hisobot',
      ambientLabel: '🔊 Ovoz:', optOff: 'O\'chirilgan', optRain: 'Yomg\'ir', optNoise: 'Oq shovqin',
      startBtn: 'O\'simlik ekish', stopBtn: 'Taslim bo\'lish', breakBtn: 'Dam olish (5m)', customPlaceholder: 'O\'zingiz',
      gardenTitle: 'O\'stirilgan daraxtlar 🏡', gardenEmpty: 'Sizda hali o\'stirilgan daraxtlar yo\'q.',
      shopTitle: 'Urug\'lar do\'koni 🛒', themeShopTitle: 'Bog\' mavzulari 🎨', modeLabel: 'Rejim:',
      optBlacklist: 'Blacklist (Bloklash)', optWhitelist: 'Whitelist (Ruxsat berish)',
      statsTitle: '7 kunlik diqqat (min)', totalStats: 'Jami diqqat: {min} min', rateStats: 'Muvaffaqiyat: {rate}%',
      backupTitle: 'Zahiradan tiklash 💾', exportBtn: '📥 Yuklash', importBtn: '📤 Tiklash',
      todoTitle: 'Vazifalar 📝', questsTitle: 'Kunlik vazifalar 🎯', achievementsTitle: 'Yutuqlar 🏆',
      activeLabel: '[Faol]', selectBtn: 'Tanlash', buyBtn: 'Sotib olish {price}🪙',
      notEnoughCoins: 'Tangalar yetarli emas!', backupSuccess: 'Tiklandi!', backupError: 'Xatolik!',
      notifyWinTitle: 'Focus Plant Pro 🌳', notifyWinMsg: 'Tabriklaymiz! Siz {min} daqiqa ishladdingiz!',
      stages: { seed: 'Urug\'', sprout: 'Maysa', bush: 'Buta', bloomed: 'Gullagan bog\'!', withered: 'O\'simlik quridi...' },
      catalog: { tree: 'Daraxt', cactus: 'Kaktus', sunflower: 'Aftobparast', palm: 'Palma' },
      themes: { default: 'Klassik', night: 'Tun 🌙', zen: 'Zen ⛩️', space: 'Kosmos 🚀' },
      quests: { q1: '25 daqiqa diqqat qiling', q2: 'Kunda 2 ta daraxt o\'stiring' },
      achievements: { a1: 'Birinchi qadam', a2: 'Botaniki (10 daraxt)', a3: 'Barder (100 tanga)' }
    },
    en: {
      tabFocus: 'Focus', tabGarden: 'Garden', tabShop: 'Shop', tabSites: 'Filter', tabStats: 'Report',
      ambientLabel: '🔊 Ambient:', optOff: 'Off', optRain: 'Rain', optNoise: 'White Noise',
      startBtn: 'Plant a seed', stopBtn: 'Give Up', breakBtn: 'Break (5m)', customPlaceholder: 'Custom',
      gardenTitle: 'Grown Trees 🏡', gardenEmpty: 'You have no grown plants yet.',
      shopTitle: 'Seed Shop 🛒', themeShopTitle: 'Garden Themes 🎨', modeLabel: 'Mode:',
      optBlacklist: 'Blacklist (Block)', optWhitelist: 'Whitelist (Allow ONLY)',
      statsTitle: '7-day Focus (min)', totalStats: 'Total focus: {min} min', rateStats: 'Success rate: {rate}%',
      backupTitle: 'Backup Data 💾', exportBtn: '📥 Export', importBtn: '📤 Import',
      todoTitle: 'Session Tasks 📝', questsTitle: 'Daily Quests 🎯', achievementsTitle: 'Achievements 🏆',
      activeLabel: '[Active]', selectBtn: 'Select', buyBtn: 'Buy {price}🪙',
      notEnoughCoins: 'Not enough coins!', backupSuccess: 'Restored!', backupError: 'Error!',
      notifyWinTitle: 'Focus Plant Pro 🌳', notifyWinMsg: 'Congratulations! You focused for {min} mins!',
      stages: { seed: 'Seed', sprout: 'Sprout', bush: 'Growing Bush', bloomed: 'Bloomed Garden!', withered: 'Plant withered...' },
      catalog: { tree: 'Tree', cactus: 'Cactus', sunflower: 'Sunflower', palm: 'Palm Tree' },
      themes: { default: 'Classic', night: 'Night 🌙', zen: 'Zen ⛩️', space: 'Space 🚀' },
      quests: { q1: 'Focus for 25 minutes', q2: 'Grow 2 plants today' },
      achievements: { a1: 'First Step', a2: 'Botanist (10 trees)', a3: 'Tycoon (100 coins)' }
    },
    ja: {
      tabFocus: '集中', tabGarden: '庭', tabShop: 'ショップ', tabSites: 'フィルター', tabStats: 'レポート',
      ambientLabel: '🔊 BGM:', optOff: 'オフ', optRain: '雨の音', optNoise: 'ホワイトノイズ',
      startBtn: '植物を植える', stopBtn: '諦める', breakBtn: '休憩 (5分)', customPlaceholder: 'カスタム',
      gardenTitle: '育った木々 🏡', gardenEmpty: 'まだ育てた植物はありません。',
      shopTitle: 'タネのショップ 🛒', themeShopTitle: '庭のテーマ 🎨', modeLabel: 'モード:',
      optBlacklist: 'ブラックリスト', optWhitelist: 'ホワイトリスト',
      statsTitle: '過去7日間の集中 (分)', totalStats: '合計: {min} 分', rateStats: '達成率: {rate}%',
      backupTitle: 'バックアップ 💾', exportBtn: 'インポート', importBtn: '復元',
      todoTitle: 'タスク 📝', questsTitle: 'デイリークエスト 🎯', achievementsTitle: '実績 🏆',
      activeLabel: '[選択中]', selectBtn: '選択', buyBtn: '購入 {price}🪙',
      notEnoughCoins: 'コインが足りません！', backupSuccess: '復元しました！', backupError: 'エラー！',
      notifyWinTitle: 'Focus Plant Pro 🌳', notifyWinMsg: 'おめでとうございます！{min}分間集中しました！',
      stages: { seed: '種', sprout: '芽', bush: '低木', bloomed: '満開の庭！', withered: '枯れてしまった...' },
      catalog: { tree: '木', cactus: 'サボテン', sunflower: 'ヒマワリ', palm: 'ヤシの木' },
      themes: { default: 'クラシック', night: '夜 🌙', zen: '禅 ⛩️', space: '宇宙 🚀' },
      quests: { q1: '25分間集中する', q2: '今日2本の木を育てる' },
      achievements: { a1: '一歩目', a2: '植物学者 (10本)', a3: '大富豪 (100コイン)' }
    }
  };

  const CATALOG_ITEMS = [
    { id: 'tree', avatar: '🌳', price: 0 },
    { id: 'cactus', avatar: '🌵', price: 30 },
    { id: 'sunflower', avatar: '🌻', price: 60 },
    { id: 'palm', avatar: '🌴', price: 100 }
  ];

  const THEMES = [
    { id: 'default', price: 0 },
    { id: 'night', price: 40 },
    { id: 'zen', price: 80 },
    { id: 'space', price: 120 }
  ];

  const state = await chrome.storage.local.get([
    'coins', 'streak', 'garden', 'siteList', 'mode', 'selectedPlant', 'ownedPlants',
    'endTime', 'durationMinutes', 'isFocusing', 'petState', 'dailyStats', 'ambientSound', 'lang',
    'selectedTheme', 'ownedThemes', 'todos', 'givenUpCount', 'completedCount'
  ]);

  isFocusing = !!state.isFocusing;
  currentLang = state.lang || 'ru';
  langSelect.value = currentLang;

  coinsDisplay.textContent = state.coins || 0;
  streakDisplay.textContent = state.streak || 0;
  modeSelect.value = state.mode || 'blacklist';
  ambientSelect.value = state.ambientSound || 'none';
  
  const owned = state.ownedPlants || ['tree'];
  let currentPlantId = state.selectedPlant || 'tree';

  const ownedThemes = state.ownedThemes || ['default'];
  let currentThemeId = state.selectedTheme || 'default';

  applyTheme(currentThemeId);
  applyLanguage(currentLang);
  renderGarden(state.garden || []);
  renderShop(owned, currentPlantId, state.coins || 0);
  renderThemeShop(ownedThemes, currentThemeId, state.coins || 0);
  renderSites(state.siteList || ['youtube.com', 'instagram.com']);
  renderStats(state.dailyStats || {}, state.completedCount || 0, state.givenUpCount || 0);
  renderTodos(state.todos || []);
  renderQuestsAndAchievements(state);

  // Переключение времени таймера
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isFocusing) return;
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customMinutesInput.value = '';
      selectedMinutes = parseInt(btn.dataset.minutes) || 25;
      timerDisplay.textContent = `${selectedMinutes}:00`;
    });
  });

  customMinutesInput.addEventListener('input', () => {
    if (isFocusing) return;
    const val = parseInt(customMinutesInput.value);
    
    if (val && val > 0 && val <= 180) {
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      selectedMinutes = val;
      timerDisplay.textContent = `${selectedMinutes}:00`;
    } else if (!customMinutesInput.value) {
      selectedMinutes = 25;
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      const defaultBtn = document.querySelector('.time-btn[data-minutes="25"]');
      if (defaultBtn) defaultBtn.classList.add('active');
      timerDisplay.textContent = '25:00';
    }
  });

  // Смена языка
  langSelect.addEventListener('change', async () => {
    currentLang = langSelect.value;
    await chrome.storage.local.set({ lang: currentLang });
    applyLanguage(currentLang);
    renderShop(owned, currentPlantId, state.coins || 0);
    renderThemeShop(ownedThemes, currentThemeId, state.coins || 0);
    renderStats(state.dailyStats || {}, state.completedCount || 0, state.givenUpCount || 0);
    renderQuestsAndAchievements(await chrome.storage.local.get(null));
  });

  function applyTheme(themeId) {
    plantBox.className = `plant-container theme-${themeId}`;
    gardenGrid.className = `garden-grid theme-${themeId}`;
  }

  function applyLanguage(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.ru;
    document.getElementById('tab-focus').textContent = t.tabFocus;
    document.getElementById('tab-garden').textContent = t.tabGarden;
    document.getElementById('tab-shop').textContent = t.tabShop;
    document.getElementById('tab-sites').textContent = t.tabSites;
    document.getElementById('tab-stats').textContent = t.tabStats;

    document.getElementById('ambient-label').textContent = t.ambientLabel;
    document.getElementById('opt-off').textContent = t.optOff;
    document.getElementById('opt-rain').textContent = t.optRain;
    document.getElementById('opt-noise').textContent = t.optNoise;

    startBtn.textContent = t.startBtn;
    stopBtn.textContent = t.stopBtn;
    breakBtn.textContent = t.breakBtn;
    customMinutesInput.placeholder = t.customPlaceholder;

    document.getElementById('garden-title').textContent = t.gardenTitle;
    document.getElementById('garden-empty').textContent = t.gardenEmpty;
    document.getElementById('shop-title').textContent = t.shopTitle;
    document.getElementById('theme-shop-title').textContent = t.themeShopTitle;
    document.getElementById('mode-label').textContent = t.modeLabel;

    document.getElementById('opt-blacklist').textContent = t.optBlacklist;
    document.getElementById('opt-whitelist').textContent = t.optWhitelist;

    document.getElementById('stats-title').textContent = t.statsTitle;
    document.getElementById('backup-title').textContent = t.backupTitle;
    document.getElementById('todo-title').textContent = t.todoTitle;
    document.getElementById('quests-title').textContent = t.questsTitle;
    document.getElementById('achievements-title').textContent = t.achievementsTitle;

    exportBtn.textContent = t.exportBtn;
    importBtn.textContent = t.importBtn;
  }

  // Todo list
  todoAddBtn.addEventListener('click', async () => {
    const text = todoInput.value.trim();
    if (!text) return;
    const { todos = [] } = await chrome.storage.local.get('todos');
    const updated = [...todos, { text, done: false }];
    await chrome.storage.local.set({ todos: updated });
    renderTodos(updated);
    todoInput.value = '';
  });

  function renderTodos(list) {
    todoList.innerHTML = list.map((item, idx) => `
      <li class="todo-item ${item.done ? 'done' : ''}">
        <span class="todo-text" data-idx="${idx}">${item.done ? '✅' : '⬜'} ${item.text}</span>
        <span class="delete-site-btn todo-del" data-idx="${idx}">✕</span>
      </li>
    `).join('');

    document.querySelectorAll('.todo-text').forEach(el => {
      el.addEventListener('click', async () => {
        const idx = el.dataset.idx;
        list[idx].done = !list[idx].done;
        await chrome.storage.local.set({ todos: list });
        renderTodos(list);
      });
    });

    document.querySelectorAll('.todo-del').forEach(el => {
      el.addEventListener('click', async () => {
        const idx = el.dataset.idx;
        list.splice(idx, 1);
        await chrome.storage.local.set({ todos: list });
        renderTodos(list);
      });
    });
  }

  // Конфетти
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 340; canvas.height = 400;
    const pieces = Array.from({ length: 40 }, () => ({
      x: Math.random() * 340, y: Math.random() * -100,
      size: Math.random() * 6 + 4, speed: Math.random() * 3 + 2,
      color: ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#9b59b6'][Math.floor(Math.random() * 5)]
    }));

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, 340, 400);
      pieces.forEach(p => {
        p.y += p.speed;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      if (frame++ < 120) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, 340, 400);
    }
    animate();
  }

  // Нажатие на Перерыв
  breakBtn.addEventListener('click', () => {
    breakBtn.style.display = 'none';
    const breakEndTime = Date.now() + 5 * 60 * 1000;
    startTimerUI(breakEndTime, 5, true);
  });

  // Экспорт / Импорт
  exportBtn.addEventListener('click', async () => {
    const allData = await chrome.storage.local.get(null);
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focus-plant-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  importBtn.addEventListener('click', () => importFile.click());

  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        await chrome.storage.local.set(importedData);
        alert(TRANSLATIONS[currentLang].backupSuccess);
        window.location.reload();
      } catch (err) {
        alert(TRANSLATIONS[currentLang].backupError);
      }
    };
    reader.readAsText(file);
  });

  ambientSelect.addEventListener('change', async () => {
    const selectedSound = ambientSelect.value;
    await chrome.storage.local.set({ ambientSound: selectedSound });

    if (isFocusing) {
      if (selectedSound === 'none') {
        stopAmbient();
      } else {
        playAmbient(selectedSound);
      }
    }
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  if (isFocusing && state.endTime) {
    if (ambientSelect.value !== 'none') playAmbient(ambientSelect.value);
    startTimerUI(state.endTime, state.durationMinutes || selectedMinutes);
  } else if (state.petState === 'withered') {
    setPlantStage('withered');
  }

  startBtn.addEventListener('click', async () => {
    if (isFocusing || !selectedMinutes || selectedMinutes <= 0) return;

    const durationMs = selectedMinutes * 60 * 1000;
    const endTime = Date.now() + durationMs;

    isFocusing = true;
    await chrome.storage.local.set({
      isFocusing: true,
      petState: 'growing',
      endTime: endTime,
      durationMinutes: selectedMinutes
    });

    playAmbient(ambientSelect.value);
    startTimerUI(endTime, selectedMinutes);
  });

  stopBtn.addEventListener('click', async () => {
    clearInterval(timerInterval);
    stopAmbient();
    
    const data = await chrome.storage.local.get(['isFocusing', 'givenUpCount']);
    const wasFocusing = data.isFocusing;
    const givenUpCount = (data.givenUpCount || 0) + (wasFocusing ? 1 : 0);

    isFocusing = false;
    await chrome.storage.local.set({
      isFocusing: false,
      petState: wasFocusing ? 'withered' : 'seed',
      endTime: null,
      givenUpCount: givenUpCount
    });

    if (wasFocusing) {
      setPlantStage('withered');
    }
    
    resetUI();
    const currentState = await chrome.storage.local.get(['dailyStats', 'completedCount']);
    renderStats(currentState.dailyStats || {}, currentState.completedCount || 0, givenUpCount);
  });

  function startTimerUI(endTime, totalMinutes, isBreak = false) {
    startBtn.style.display = 'none';
    breakBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    customMinutesInput.disabled = true;
    document.querySelectorAll('.time-btn').forEach(b => b.disabled = true);

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
      const remainingMs = endTime - Date.now();

      if (remainingMs <= 0) {
        clearInterval(timerInterval);
        stopAmbient();
        if (isBreak) resetUI();
        else completeSession(totalMinutes);
        return;
      }

      const totalSec = Math.floor(remainingMs / 1000);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      timerDisplay.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;

      const totalDurationSec = totalMinutes * 60;
      const elapsedSec = totalDurationSec - totalSec;
      const progressPercent = (elapsedSec / totalDurationSec) * 100;
      progressBar.style.width = `${progressPercent}%`;

      if (!isBreak) {
        if (progressPercent < 25) setPlantStage('seed');
        else if (progressPercent < 60) setPlantStage('sprout');
        else if (progressPercent < 90) setPlantStage('bush');
        else setPlantStage('grown');
      }
    }
  }

  async function completeSession(minutes) {
    isFocusing = false;
    playFinishSound();
    launchConfetti();
    const data = await chrome.storage.local.get(['coins', 'streak', 'garden', 'dailyStats', 'selectedPlant', 'completedCount']);
    const newCoins = (data.coins || 0) + minutes * 2;
    const newStreak = (data.streak || 0) + 1;
    const garden = data.garden || [];
    const completedCount = (data.completedCount || 0) + 1;

    const itemObj = CATALOG_ITEMS.find(p => p.id === (data.selectedPlant || 'tree')) || CATALOG_ITEMS[0];
    garden.push(itemObj.avatar);

    const today = new Date().toISOString().split('T')[0];
    const stats = data.dailyStats || {};
    stats[today] = (stats[today] || 0) + minutes;

    await chrome.storage.local.set({
      isFocusing: false,
      petState: 'bloomed',
      coins: newCoins,
      streak: newStreak,
      garden: garden,
      dailyStats: stats,
      completedCount: completedCount,
      endTime: null
    });

    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;

    if (chrome.notifications) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU55TkJggg==',
        title: t.notifyWinTitle,
        message: t.notifyWinMsg.replace('{min}', minutes)
      });
    }

    coinsDisplay.textContent = newCoins;
    streakDisplay.textContent = newStreak;
    renderGarden(garden);
    renderStats(stats, completedCount, data.givenUpCount || 0);
    renderQuestsAndAchievements(await chrome.storage.local.get(null));
    setPlantStage('bloomed');
    resetUI();
    breakBtn.style.display = 'block';
  }

  function setPlantStage(stage) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
    const itemObj = CATALOG_ITEMS.find(p => p.id === currentPlantId) || CATALOG_ITEMS[0];
    const plantNameText = t.catalog[currentPlantId] || t.catalog.tree;

    const stages = {
      seed: { avatar: '🌰', name: t.stages.seed },
      sprout: { avatar: '🌱', name: t.stages.sprout },
      bush: { avatar: '🌿', name: t.stages.bush },
      grown: { avatar: itemObj.avatar, name: plantNameText },
      bloomed: { avatar: '🌸', name: t.stages.bloomed },
      withered: { avatar: '🥀', name: t.stages.withered }
    };
    const current = stages[stage] || stages.seed;
    plantAvatar.textContent = current.avatar;
    plantName.textContent = current.name;
  }

  function resetUI() {
    isFocusing = false;
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    breakBtn.style.display = 'none';
    customMinutesInput.disabled = false;
    document.querySelectorAll('.time-btn').forEach(b => b.disabled = false);
    progressBar.style.width = '0%';
    timerDisplay.textContent = `${selectedMinutes}:00`;
  }

  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  function playAmbient(type) {
    if (type === 'none') {
      stopAmbient();
      return;
    }
    initAudio();
    stopAmbient();

    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = type === 'rain' ? 0.04 : 0.015;

    noise.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    noise.start();
    ambientNode = noise;
  }

  function stopAmbient() {
    if (ambientNode) {
      ambientNode.stop();
      ambientNode = null;
    }
  }

  function playFinishSound() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
  }

  function renderShop(owned, activeId, coins) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
    shopGrid.innerHTML = CATALOG_ITEMS.map(item => {
      const isOwned = owned.includes(item.id);
      const isActive = item.id === activeId;
      const itemName = t.catalog[item.id] || item.id;
      return `
        <div class="shop-item">
          <div>${item.avatar} <b>${itemName}</b></div>
          ${isActive ? `<b>${t.activeLabel}</b>` : isOwned ? 
            `<button class="buy-btn select-plant" data-id="${item.id}">${t.selectBtn}</button>` : 
            `<button class="buy-btn buy-plant" data-id="${item.id}" data-price="${item.price}">${t.buyBtn.replace('{price}', item.price)}</button>`}
        </div>
      `;
    }).join('');

    document.querySelectorAll('.select-plant').forEach(btn => {
      btn.addEventListener('click', async () => {
        currentPlantId = btn.dataset.id;
        await chrome.storage.local.set({ selectedPlant: currentPlantId });
        renderShop(owned, currentPlantId, coins);
        setPlantStage('seed');
      });
    });

    document.querySelectorAll('.buy-plant').forEach(btn => {
      btn.addEventListener('click', async () => {
        const price = parseInt(btn.dataset.price);
        const id = btn.dataset.id;
        if (coins >= price) {
          const newCoins = coins - price;
          owned.push(id);
          await chrome.storage.local.set({ coins: newCoins, ownedPlants: owned, selectedPlant: id });
          coinsDisplay.textContent = newCoins;
          currentPlantId = id;
          renderShop(owned, id, newCoins);
          setPlantStage('seed');
        } else {
          alert(t.notEnoughCoins);
        }
      });
    });
  }

  function renderThemeShop(ownedThemes, activeThemeId, coins) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
    themeShopGrid.innerHTML = THEMES.map(theme => {
      const isOwned = ownedThemes.includes(theme.id);
      const isActive = theme.id === activeThemeId;
      const themeName = t.themes[theme.id] || theme.id;
      return `
        <div class="shop-item">
          <div><b>${themeName}</b></div>
          ${isActive ? `<b>${t.activeLabel}</b>` : isOwned ? 
            `<button class="buy-btn select-theme" data-id="${theme.id}">${t.selectBtn}</button>` : 
            `<button class="buy-btn buy-theme" data-id="${theme.id}" data-price="${theme.price}">${t.buyBtn.replace('{price}', theme.price)}</button>`}
        </div>
      `;
    }).join('');

    document.querySelectorAll('.select-theme').forEach(btn => {
      btn.addEventListener('click', async () => {
        currentThemeId = btn.dataset.id;
        await chrome.storage.local.set({ selectedTheme: currentThemeId });
        applyTheme(currentThemeId);
        renderThemeShop(ownedThemes, currentThemeId, coins);
      });
    });

    document.querySelectorAll('.buy-theme').forEach(btn => {
      btn.addEventListener('click', async () => {
        const price = parseInt(btn.dataset.price);
        const id = btn.dataset.id;
        if (coins >= price) {
          const newCoins = coins - price;
          ownedThemes.push(id);
          await chrome.storage.local.set({ coins: newCoins, ownedThemes: ownedThemes, selectedTheme: id });
          coinsDisplay.textContent = newCoins;
          currentThemeId = id;
          applyTheme(currentThemeId);
          renderThemeShop(ownedThemes, id, newCoins);
        } else {
          alert(t.notEnoughCoins);
        }
      });
    });
  }

  modeSelect.addEventListener('change', async () => {
    await chrome.storage.local.set({ mode: modeSelect.value });
  });

  addBtn.addEventListener('click', async () => {
    const site = siteInput.value.trim().toLowerCase();
    if (!site) return;
    const { siteList: list = [] } = await chrome.storage.local.get('siteList');
    if (!list.includes(site)) {
      const updated = [...list, site];
      await chrome.storage.local.set({ siteList: updated });
      renderSites(updated);
      siteInput.value = '';
    }
  });

  function renderSites(list) {
    siteList.innerHTML = list.map(site => `
      <li>
        <span>${site}</span>
        <span class="delete-site-btn" data-site="${site}">✕</span>
      </li>
    `).join('');

    document.querySelectorAll('.delete-site-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const target = btn.dataset.site;
        const { siteList: currentList = [] } = await chrome.storage.local.get('siteList');
        const updated = currentList.filter(s => s !== target);
        await chrome.storage.local.set({ siteList: updated });
        renderSites(updated);
      });
    });
  }

  function renderGarden(garden) {
    if (garden.length === 0) return;
    gardenGrid.innerHTML = garden.map(item => `<div class="garden-item">${item}</div>`).join('');
  }

  function renderQuestsAndAchievements(data) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
    const qList = document.getElementById('quests-list');
    const aList = document.getElementById('achievements-list');

    const todayMin = (data.dailyStats || {})[new Date().toISOString().split('T')[0]] || 0;
    const todayGardenCount = (data.garden || []).length;

    qList.innerHTML = `
      <div class="quest-card">
        <span>${t.quests.q1}</span>
        <span>${todayMin >= 25 ? '✅ +10🪙' : `${todayMin}/25m`}</span>
      </div>
      <div class="quest-card">
        <span>${t.quests.q2}</span>
        <span>${todayGardenCount >= 2 ? '✅ +20🪙' : `${todayGardenCount}/2`}</span>
      </div>
    `;

    const c1 = (data.completedCount || 0) >= 1;
    const c2 = (data.garden || []).length >= 10;
    const c3 = (data.coins || 0) >= 100;

    aList.innerHTML = `
      <div class="achieve-card ${c1 ? 'unlocked' : ''}">🎖️ ${t.achievements.a1}</div>
      <div class="achieve-card ${c2 ? 'unlocked' : ''}">🌿 ${t.achievements.a2}</div>
      <div class="achieve-card ${c3 ? 'unlocked' : ''}">💎 ${t.achievements.a3}</div>
    `;
  }

  function renderStats(stats, completed, givenUp) {
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;
    const canvas = document.getElementById('stats-chart');
    const ctx = canvas.getContext('2d');
    const totalDiv = document.getElementById('total-stats');
    const rateDiv = document.getElementById('rate-stats');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }

    const values = days.map(day => stats[day] || 0);
    const maxVal = Math.max(...values, 30);
    const totalMin = Object.values(stats).reduce((a, b) => a + b, 0);

    const totalSessions = completed + givenUp;
    const rate = totalSessions > 0 ? Math.round((completed / totalSessions) * 100) : 100;

    totalDiv.textContent = t.totalStats.replace('{min}', totalMin);
    rateDiv.textContent = t.rateStats.replace('{rate}', rate);

    const barWidth = 24;
    const gap = 12;
    const startX = 10;
    const height = 60;

    values.forEach((val, idx) => {
      const x = startX + idx * (barWidth + gap);
      const barHeight = (val / maxVal) * height;
      const y = height - barHeight + 15;

      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = '#95a5a6';
      ctx.font = '9px sans-serif';
      ctx.fillText(days[idx].slice(8), x + 5, height + 26);
    });
  }
});