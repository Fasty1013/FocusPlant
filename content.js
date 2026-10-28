// Focus Plant Pro - Cross-Browser Content Script Blocker & Wilting Engine
(function() {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  const I18N_OVERLAY = {
    ru: {
      badge: "⚠️ Фокус нарушен",
      title: "Ваше дерево завяло! 🥀",
      openedSite: "Вы открыли сайт",
      duringFocus: "во время активной сессии фокуса.",
      quote: "«Каждое секундное отвлечение губит плоды сосредоточенности. Примите этот урок и посадите новое дерево!»",
      closeTab: "✖ Закрыть эту вкладку",
      goBack: "↩ Назад"
    },
    en: {
      badge: "⚠️ Focus Broken",
      title: "Your tree has withered! 🥀",
      openedSite: "You opened",
      duringFocus: "during an active focus session.",
      quote: "“Every momentary distraction steals your focus. Accept the lesson and plant a new tree!”",
      closeTab: "✖ Close this tab",
      goBack: "↩ Go back"
    },
    uz: {
      badge: "⚠️ Fokus buzildi",
      title: "Sizning daraxtingiz so'ldi! 🥀",
      openedSite: "Siz",
      duringFocus: "saytiga fokus vaqtida kirdingiz.",
      quote: "«Har bir chalg'ish diqqat mevasini nobud qiladi. Saboq oling va yangi daraxt eking!»",
      closeTab: "✖ Ushbu tabni yopish",
      goBack: "↩ Orqaga"
    },
    ja: {
      badge: "⚠️ 集中が途切れました",
      title: "あなたの木が枯れてしまいました！🥀",
      openedSite: "集中モード中にサイト",
      duringFocus: "を開いてしまいました。",
      quote: "「一瞬の誘惑が集中を奪います。気持ちを切り替えて新しい木を育てましょう！」",
      closeTab: "✖ このタブを閉じる",
      goBack: "↩ 戻る"
    }
  };

  function checkDomainMatch(currentUrl, siteList) {
    if (!Array.isArray(siteList) || siteList.length === 0) return false;
    try {
      const currentHost = window.location.hostname.toLowerCase();
      return siteList.some(site => {
        if (!site) return false;
        const cleanSite = site.toLowerCase()
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\/.*$/, '')
          .trim();
        if (!cleanSite) return false;

        return currentHost === cleanSite ||
               currentHost.endsWith('.' + cleanSite) ||
               currentUrl.toLowerCase().includes(cleanSite);
      });
    } catch (e) {
      return false;
    }
  }

  let hasBlockedCurrentPage = false;

  function renderWitheredOverlay(blockedDomain, lang = "ru") {
    if (hasBlockedCurrentPage) return;
    hasBlockedCurrentPage = true;

    try {
      if (window.stop) window.stop();
    } catch (e) {}

    const t = I18N_OVERLAY[lang] || I18N_OVERLAY.ru;

    const displayBlockedScreen = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.innerHTML = `
        <div id="focusplant-overlay" style="
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: radial-gradient(circle at center, #1e1e2e 0%, #11111b 100%) !important;
          color: #cdd6f4 !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 2147483647 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
          text-align: center !important;
          padding: 24px !important;
          box-sizing: border-box !important;
        ">
          <!-- Glass Card -->
          <div style="
            background: rgba(30, 30, 46, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(243, 139, 168, 0.3);
            border-radius: 24px;
            padding: 40px 32px;
            max-width: 520px;
            width: 100%;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(243, 139, 168, 0.15);
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: fpFadeIn 0.5s ease-out;
          ">
            
            <!-- Withered Tree SVG Illustration -->
            <div style="margin-bottom: 24px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
              <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="100" cy="180" rx="70" ry="12" fill="#313244"/>
                <path d="M70 180L85 178M115 182L130 179M95 181L105 183" stroke="#45475a" stroke-width="2"/>
                <path d="M96 180 C95 150 85 130 92 105 C96 90 98 75 100 65" stroke="#6c7086" stroke-width="14" stroke-linecap="round"/>
                <path d="M104 180 C103 150 93 130 100 105 C104 90 106 75 108 65" stroke="#585b70" stroke-width="6" stroke-linecap="round"/>
                <path d="M92 105 C80 95 65 96 55 85" stroke="#6c7086" stroke-width="6" stroke-linecap="round"/>
                <path d="M65 96 C62 82 50 78 45 70" stroke="#6c7086" stroke-width="4" stroke-linecap="round"/>
                <path d="M100 95 C115 88 135 92 145 80" stroke="#6c7086" stroke-width="6" stroke-linecap="round"/>
                <path d="M125 90 C135 80 148 76 155 65" stroke="#6c7086" stroke-width="4" stroke-linecap="round"/>
                <path d="M98 75 C90 60 92 48 88 38" stroke="#6c7086" stroke-width="4" stroke-linecap="round"/>
                <path d="M100 65 C108 52 115 45 120 35" stroke="#6c7086" stroke-width="4" stroke-linecap="round"/>
                <circle cx="60" cy="176" r="3" fill="#a6adc8"/>
                <circle cx="138" cy="178" r="4" fill="#a6adc8"/>
                <circle cx="118" cy="184" r="2.5" fill="#f38ba8"/>
                <circle cx="80" cy="182" r="3.5" fill="#f38ba8"/>
              </svg>
            </div>

            <!-- Danger Badge -->
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 6px 14px;
              background: rgba(243, 139, 168, 0.15);
              border: 1px solid #f38ba8;
              border-radius: 20px;
              color: #f38ba8;
              font-size: 0.85rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 16px;
            ">
              <span>⚠️</span> ${t.badge}
            </div>

            <!-- Main Title -->
            <h1 style="
              font-size: 1.85rem;
              margin: 0 0 10px 0;
              color: #f38ba8;
              font-weight: 800;
              line-height: 1.2;
            ">
              ${t.title}
            </h1>

            <!-- Description -->
            <p style="
              font-size: 1rem;
              margin: 0 0 18px 0;
              color: #bac2de;
              line-height: 1.5;
            ">
              ${t.openedSite} <span style="color: #f38ba8; font-weight: 700; background: rgba(243, 139, 168, 0.12); padding: 2px 6px; border-radius: 4px;">${blockedDomain || location.hostname}</span> ${t.duringFocus}
            </p>

            <!-- Focus Quote -->
            <div style="
              font-style: italic;
              font-size: 0.9rem;
              color: #a6adc8;
              background: #181825;
              border-left: 3px solid #f38ba8;
              padding: 10px 14px;
              border-radius: 0 8px 8px 0;
              margin-bottom: 26px;
              text-align: left;
              width: 100%;
              box-sizing: border-box;
            ">
              ${t.quote}
            </div>

            <!-- Buttons -->
            <div style="display: flex; gap: 12px; width: 100%;">
              <button id="fp-close-tab-btn" style="
                flex: 1;
                padding: 12px 18px;
                background: linear-gradient(135deg, #f38ba8 0%, #eba0ac 100%);
                color: #11111b;
                border: none;
                border-radius: 12px;
                font-weight: 700;
                font-size: 0.95rem;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(243, 139, 168, 0.3);
              ">
                ${t.closeTab}
              </button>

              <button id="fp-back-btn" style="
                flex: 1;
                padding: 12px 18px;
                background: #313244;
                color: #cdd6f4;
                border: 1px solid #45475a;
                border-radius: 12px;
                font-weight: 600;
                font-size: 0.95rem;
                cursor: pointer;
              ">
                ${t.goBack}
              </button>
            </div>

          </div>
        </div>
      `;

      const closeBtn = document.getElementById("fp-close-tab-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          ext.runtime.sendMessage({ action: "CLOSE_TAB" });
        });
      }

      const backBtn = document.getElementById("fp-back-btn");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            ext.runtime.sendMessage({ action: "CLOSE_TAB" });
          }
        });
      }
    };

    if (document.body) {
      displayBlockedScreen();
    } else {
      document.addEventListener("DOMContentLoaded", displayBlockedScreen);
    }
  }

  function applyBlockingLogic() {
    ext.storage.local.get(["timerState", "isTimerRunning", "blockedSites", "whiteListSites", "blockMode", "lang"], (data) => {
      const isRunning = data.timerState === "running" || data.isTimerRunning === true;
      if (!isRunning) return;

      const { blockedSites = [], whiteListSites = [], blockMode = "blacklist", lang = "ru" } = data;
      const currentUrl = window.location.href;
      let shouldBlock = false;

      if (blockMode === "blacklist") {
        shouldBlock = checkDomainMatch(currentUrl, blockedSites);
      } else if (blockMode === "whitelist") {
        shouldBlock = !checkDomainMatch(currentUrl, whiteListSites);
      }

      if (shouldBlock) {
        const domain = window.location.hostname;
        ext.runtime.sendMessage({ action: "TREE_WITHERED", domain: domain, url: currentUrl });
        renderWitheredOverlay(domain, lang);
      }
    });
  }

  applyBlockingLogic();

  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      hasBlockedCurrentPage = false;
      applyBlockingLogic();
    }
  });

  if (document.documentElement) {
    observer.observe(document.documentElement, { subtree: true, childList: true });
  }

  ext.storage.onChanged.addListener((changes) => {
    if (changes.timerState || changes.isTimerRunning || changes.blockedSites || changes.blockMode) {
      applyBlockingLogic();
    }
  });

})();
