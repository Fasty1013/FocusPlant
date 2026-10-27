chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(null);

  const defaults = {
    siteList: ['youtube.com', 'instagram.com'],
    mode: 'blacklist',
    isFocusing: false,
    coins: 0,
    streak: 0,
    garden: [],
    ownedPlants: ['tree'],
    selectedPlant: 'tree',
    dailyStats: {},
    ambientSound: 'none',
    lang: 'ru',
    selectedTheme: 'default',
    ownedThemes: ['default'],
    todos: [],
    completedCount: 0,
    givenUpCount: 0
  };

  const newStorage = {};
  for (const key in defaults) {
    if (data[key] === undefined) {
      newStorage[key] = defaults[key];
    }
  }

  if (Object.keys(newStorage).length > 0) {
    await chrome.storage.local.set(newStorage);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const { isFocusing, siteList = [], mode = 'blacklist', endTime, lang = 'ru' } = 
      await chrome.storage.local.get(['isFocusing', 'siteList', 'mode', 'endTime', 'lang']);

    if (isFocusing && endTime && Date.now() < endTime) {
      const urlLower = tab.url.toLowerCase();
      
      if (
        urlLower.startsWith('chrome://') || 
        urlLower.startsWith('chrome-extension://') || 
        urlLower.startsWith('about:') || 
        urlLower.startsWith('moz-extension://') || 
        urlLower.startsWith('edge://')
      ) {
        return;
      }

      let isBlocked = false;

      if (mode === 'blacklist') {
        isBlocked = siteList.some(site => site.trim() !== '' && urlLower.includes(site.toLowerCase()));
      } else if (mode === 'whitelist') {
        const isAllowed = siteList.some(site => site.trim() !== '' && urlLower.includes(site.toLowerCase()));
        isBlocked = !isAllowed;
      }

      if (isBlocked) {
        const { givenUpCount = 0 } = await chrome.storage.local.get('givenUpCount');
        await chrome.storage.local.set({
          isFocusing: false,
          petState: 'withered',
          endTime: null,
          givenUpCount: givenUpCount + 1
        });
        
        const notifyMsgs = {
          ru: 'Сессия провалена! Вы открыли заблокированный сайт.',
          uz: 'Sessiya muvaffaqiyatsiz bo\'ldi! Siz taqiqlangan saytni ochdingiz.',
          en: 'Session failed! You opened a blocked website.',
          ja: 'セッション失敗！ブロックされたサイトを開きました。'
        };

        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU55TkJggg==',
          title: 'Focus Plant Pro 🥀',
          message: notifyMsgs[lang] || notifyMsgs.ru
        });

        chrome.tabs.sendMessage(tabId, { action: 'BLOCK_PAGE', lang: lang }, () => {
          if (chrome.runtime.lastError) {
            void chrome.runtime.lastError;
          }
        });
      }
    }
  }
});