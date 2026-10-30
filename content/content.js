// Focus Plant Pro - Cross-Browser Content Script Blocker & Wilting Engine
(function() {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  // Fallback translations if locale modules are not pre-injected
  const FALLBACK_OVERLAY = {
    ru: {
      badge: "⚠️ Фокус нарушен",
      title: "Ваше дерево завяло! 🥀",
      openedSite: "Вы открыли сайт",
      duringFocus: "во время активной сессии фокуса.",
      bannerDesc: "Ваше дерево погибло из-за отвлечения на этот сайт.",
      quote: "«Каждое секундное отвлечение губит плоды сосредоточенности. Примите этот урок и посадите новое дерево!»",
      okBtn: "✓ ОК, понятно",
      closeTab: "✖ Закрыть вкладку",
      goBack: "↩ Назад",
      switchToFullscreen: "📺 На весь экран",
      switchToBanner: "🪟 Компактный вид",
      minimize: "➖ Свернуть",
      minimizedPill: "🥀 Дерево завяло",
      strictBadge: "🔒 СТРОГИЙ РЕЖИМ",
      strictTitle: "ДОСТУП ЗАБЛОКИРОВАН 🔒",
      strictDesc: "В строгом режиме запрещено заходить на запрещенные сайты до окончания таймера!",
      strictTimerLabel: "⏳ До окончания концентрации осталось:",
      strictNoOkNotice: "Кнопка «ОК» отключена! В строгом режиме нельзя убрать это окно до конца таймера.",
      strictUnlocked: "🎉 Время вышло! Сессия концентрации успешно завершена.",
      unblockBtn: "✓ Разблокировать сайт"
    },
    en: {
      badge: "⚠️ Focus Broken",
      title: "Your tree has withered! 🥀",
      openedSite: "You opened",
      duringFocus: "during an active focus session.",
      bannerDesc: "Your focus tree has withered due to visiting this site.",
      quote: "“Every momentary distraction steals your focus. Accept the lesson and plant a new tree!”",
      okBtn: "✓ OK, Understood",
      closeTab: "✖ Close Tab",
      goBack: "↩ Go back",
      switchToFullscreen: "📺 Full Screen",
      switchToBanner: "🪟 Compact View",
      minimize: "➖ Minimize",
      minimizedPill: "🥀 Tree withered",
      strictBadge: "🔒 STRICT MODE",
      strictTitle: "ACCESS BLOCKED 🔒",
      strictDesc: "In strict mode, visiting prohibited sites is blocked until the timer expires!",
      strictTimerLabel: "⏳ Time remaining until unlock:",
      strictNoOkNotice: "The 'OK' button is disabled! In strict mode, you cannot dismiss this window until focus ends.",
      strictUnlocked: "🎉 Time's up! Focus session successfully completed.",
      unblockBtn: "✓ Unlock Website"
    },
    uz: {
      badge: "⚠️ Fokus buzildi",
      title: "Sizning daraxtingiz so'ldi! 🥀",
      openedSite: "Siz",
      duringFocus: "saytiga fokus vaqtida kirdingiz.",
      bannerDesc: "Ushbu saytga kirganingiz sababli daraxtingiz nobud bo'ldi.",
      quote: "«Har bir chalg'ish diqqat mevasini nobud qiladi. Saboq oling va yangi daraxt eking!»",
      okBtn: "✓ OK, tushundim",
      closeTab: "✖ Tabni yopish",
      goBack: "↩ Orqaga",
      switchToFullscreen: "📺 To'liq ekran",
      switchToBanner: "🪟 Ixcham ko'rinish",
      minimize: "➖ Yashirish",
      minimizedPill: "🥀 Daraxt so'ldi",
      strictBadge: "🔒 QAT'IY REJIM",
      strictTitle: "KIRISH TAQIQLANDI 🔒",
      strictDesc: "Qat'iy rejimda taymer tugaguncha taqiqlangan saytlarga kirish butunlay bloklangan!",
      strictTimerLabel: "⏳ Fokus tugashiga qoldi:",
      strictNoOkNotice: "'OK' tugmasi o'chirilgan! Qat'iy rejimda taymer tugaguncha bu oynani yopib bo'lmaydi.",
      strictUnlocked: "🎉 Vaqt tugadi! Fokus sessiyasi yakunlandi.",
      unblockBtn: "✓ Saytni ochish"
    },
    ja: {
      badge: "⚠️ 集中が途切れました",
      title: "あなたの木が枯れてしまいました！🥀",
      openedSite: "集中モード中にサイト",
      duringFocus: "を開いてしまいました。",
      bannerDesc: "このサイトにアクセスしたため、木が息絶えてしまいました。",
      quote: "「一瞬の誘惑が集中を奪います。気持ちを切り替えて新しい木を育てましょう！」",
      okBtn: "✓ 了解",
      closeTab: "✖ タブを閉じる",
      goBack: "↩ 戻る",
      switchToFullscreen: "📺 全画面表示",
      switchToBanner: "🪟 コンパクト表示",
      minimize: "➖ 最小化",
      minimizedPill: "🥀 木が枯れました",
      strictBadge: "🔒 厳格モード",
      strictTitle: "アクセス制限中 🔒",
      strictDesc: "厳格モード中はタイマー終了まで禁止サイトへのアクセスが完全にブロックされます！",
      strictTimerLabel: "⏳ 集中終了まで残り時間：",
      strictNoOkNotice: "「了解」ボタンは無効です！厳格モード中はタイマー終了までこの画面を閉じられません。",
      strictUnlocked: "🎉 終了しました！集中セッションが正常に完了しました。",
      unblockBtn: "✓ サイトのブロック解除"
    }
  };

  function getOverlayTranslations(lang = "ru") {
    if (typeof window !== "undefined" && window.I18N_LOCALES && window.I18N_LOCALES[lang] && window.I18N_LOCALES[lang].overlay) {
      return window.I18N_LOCALES[lang].overlay;
    }
    return FALLBACK_OVERLAY[lang] || FALLBACK_OVERLAY.ru;
  }

  function checkDomainMatch(currentUrl, siteList) {
    if (typeof matchesSiteList === "function") {
      return matchesSiteList(currentUrl, siteList);
    }
    if (typeof window !== "undefined" && typeof window.matchesSiteList === "function") {
      return window.matchesSiteList(currentUrl, siteList);
    }
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
        return currentHost === cleanSite || currentHost.endsWith('.' + cleanSite) || currentUrl.toLowerCase().includes(cleanSite);
      });
    } catch (e) {
      return false;
    }
  }

  let hasBlockedCurrentPage = false;
  let activeElementContainer = null;
  let strictTimerInterval = null;

  function ensureOverlayStylesheet() {
    if (!document.getElementById("fp-overlay-style") && ext.runtime && ext.runtime.getURL) {
      const link = document.createElement("link");
      link.id = "fp-overlay-style";
      link.rel = "stylesheet";
      link.href = ext.runtime.getURL("content/overlay.css");
      (document.head || document.documentElement).appendChild(link);
    }
  }

  // Withered SVG Tree Icon (High Detail Botanical with Glowing Embers)
  function getWitheredSvg(size = 180) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="fpWitherGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f38ba8" stop-opacity="0.3"/>
            <stop offset="70%" stop-color="#f38ba8" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#f38ba8" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="fpTrunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#9399b2"/>
            <stop offset="40%" stop-color="#6c7086"/>
            <stop offset="80%" stop-color="#45475a"/>
            <stop offset="100%" stop-color="#313244"/>
          </linearGradient>
          <linearGradient id="fpMoundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#45475a"/>
            <stop offset="100%" stop-color="#181825"/>
          </linearGradient>
        </defs>
        <circle cx="120" cy="120" r="100" fill="url(#fpWitherGlow)"/>
        <ellipse cx="120" cy="206" rx="85" ry="15" fill="url(#fpMoundGrad)"/>
        <ellipse cx="120" cy="206" rx="70" ry="9" fill="#11111b" opacity="0.8"/>
        <path d="M72 206L94 203M146 208L168 205M108 207L126 209" stroke="#585b70" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M116 206 C114 172 102 146 110 118 C115 98 117 78 120 68" stroke="url(#fpTrunkGrad)" stroke-width="16" stroke-linecap="round"/>
        <path d="M124 206 C122 172 110 146 118 118 C123 98 125 78 128 68" stroke="#45475a" stroke-width="7" stroke-linecap="round"/>
        <path d="M110 118 C95 106 78 108 65 94 C58 86 54 74 48 64" stroke="url(#fpTrunkGrad)" stroke-width="8" stroke-linecap="round"/>
        <path d="M78 108 C74 92 60 88 52 78" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>
        <path d="M120 106 C138 98 162 103 174 88 C182 78 186 66 192 54" stroke="url(#fpTrunkGrad)" stroke-width="8" stroke-linecap="round"/>
        <path d="M150 100 C162 88 178 83 186 70" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>
        <path d="M118 84 C108 67 110 51 105 39" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>
        <path d="M120 68 C130 52 138 43 144 30" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>
        <circle cx="65" cy="202" r="3.5" fill="#a6adc8"/>
        <circle cx="172" cy="204" r="4.5" fill="#a6adc8"/>
        <path d="M88 203 C90 199 96 200 94 204 C92 206 86 205 88 203Z" fill="#f38ba8" opacity="0.9"/>
        <path d="M142 207 C144 203 150 204 148 208 C146 210 140 209 142 207Z" fill="#f38ba8" opacity="0.9"/>
        <path d="M112 210 C114 207 118 208 117 211 C115 213 110 212 112 210Z" fill="#fab387" opacity="0.9"/>
        <circle cx="152" cy="176" r="2.2" fill="#f38ba8" opacity="0.75"/>
        <circle cx="82" cy="156" r="1.8" fill="#fab387" opacity="0.85"/>
      </svg>
    `;
  }

  // 1. RENDER COMPACT FLOATING GLASS BANNER
  function renderCompactBanner(blockedDomain, lang = "ru") {
    ensureOverlayStylesheet();
    if (activeElementContainer) activeElementContainer.remove();

    const t = getOverlayTranslations(lang);

    const bannerWrap = document.createElement("div");
    bannerWrap.id = "focusplant-floating-banner-wrap";

    bannerWrap.innerHTML = `
      <div id="focusplant-banner">
        <div class="fp-banner-avatar">
          ${getWitheredSvg(48)}
        </div>
        <div class="fp-banner-info">
          <div class="fp-banner-header-row">
            <span class="fp-banner-badge">${t.badge}</span>
            <span class="fp-banner-title">${t.title}</span>
          </div>
          <div class="fp-banner-desc">
            ${t.openedSite} <b class="fp-domain-tag">${blockedDomain || location.hostname}</b>. ${t.bannerDesc}
          </div>
        </div>
        <div class="fp-banner-actions">
          <button id="fp-banner-close-tab" class="fp-btn-danger">${t.closeTab}</button>
          <button id="fp-banner-to-fullscreen" class="fp-btn-secondary" title="${t.switchToFullscreen}">${t.switchToFullscreen}</button>
          <button id="fp-banner-minimize" class="fp-btn-ghost" title="${t.minimize}">✖</button>
        </div>
      </div>
      <div id="focusplant-minimized-pill" style="display: none;">
        <span>${t.minimizedPill}</span>
        <small style="font-size: 0.65rem; color: #a6adc8;">(нажмите)</small>
      </div>
    `;

    document.documentElement.appendChild(bannerWrap);
    activeElementContainer = bannerWrap;

    const closeBtn = document.getElementById("fp-banner-close-tab");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => ext.runtime.sendMessage({ action: "CLOSE_TAB" }));
    }

    const toFullscreenBtn = document.getElementById("fp-banner-to-fullscreen");
    if (toFullscreenBtn) {
      toFullscreenBtn.addEventListener("click", () => renderFullscreenOverlay(blockedDomain, lang));
    }

    const minBtn = document.getElementById("fp-banner-minimize");
    const bannerBox = document.getElementById("focusplant-banner");
    const minPill = document.getElementById("focusplant-minimized-pill");

    if (minBtn && bannerBox && minPill) {
      minBtn.addEventListener("click", () => {
        bannerBox.style.display = "none";
        minPill.style.display = "flex";
      });
      minPill.addEventListener("click", () => {
        bannerBox.style.display = "flex";
        minPill.style.display = "none";
      });
    }
  }

  // 2. RENDER FULLSCREEN OVERLAY
  function renderFullscreenOverlay(blockedDomain, lang = "ru", isStrict = false, sessionEndTime = 0) {
    ensureOverlayStylesheet();
    if (activeElementContainer) activeElementContainer.remove();
    if (strictTimerInterval) {
      clearInterval(strictTimerInterval);
      strictTimerInterval = null;
    }

    try {
      if (window.stop) window.stop();
      document.querySelectorAll('video, audio').forEach(el => { try { el.pause(); } catch(e){} });
    } catch (e) {}

    const t = getOverlayTranslations(lang);
    const overlay = document.createElement("div");
    overlay.id = "focusplant-fullscreen-overlay";

    document.documentElement.style.background = "#0d0d15";
    document.documentElement.style.overflow = "hidden";
    if (document.body) document.body.style.overflow = "hidden";

    if (isStrict) {
      overlay.innerHTML = `
        <div class="fp-fullscreen-card fp-strict-card">
          <div class="fp-tree-float-box">
            ${getWitheredSvg(185)}
          </div>
          <div class="fp-strict-badge-capsule">
            <span>🔒</span> ${t.strictBadge}
          </div>
          <h1 class="fp-strict-title">
            ${t.strictTitle}
          </h1>
          <p class="fp-strict-desc">
            ${t.openedSite} <span class="fp-domain-tag">${blockedDomain || location.hostname}</span>.<br>
            ${t.strictDesc}
          </p>
          <div id="fp-strict-timer-box" class="fp-strict-timer-hud">
            <span class="fp-strict-timer-label">${t.strictTimerLabel}</span>
            <div id="fp-strict-timer" class="fp-strict-timer-digits">--:--</div>
          </div>
          <div class="fp-strict-notice-banner">
            <span style="font-size: 1.15rem;">🚫</span> ${t.strictNoOkNotice}
          </div>
          <div style="display: flex; gap: 14px; width: 100%; max-width: 520px;">
            <button id="fp-fs-close-tab" class="fp-btn-danger" style="flex: 1; padding: 15px 22px; font-size: 1.05rem;">
              ${t.closeTab}
            </button>
            <button id="fp-fs-back" class="fp-btn-secondary" style="flex: 1; padding: 15px 22px; font-size: 1.05rem;">
              ${t.goBack}
            </button>
          </div>
        </div>
      `;
    } else {
      overlay.innerHTML = `
        <div class="fp-fullscreen-card">
          <div class="fp-tree-float-box">
            ${getWitheredSvg(190)}
          </div>
          <div class="fp-overlay-badge">
            <span>⚠️</span> ${t.badge}
          </div>
          <h1 class="fp-overlay-title">
            ${t.title}
          </h1>
          <p class="fp-overlay-desc">
            ${t.openedSite} <span class="fp-domain-tag">${blockedDomain || location.hostname}</span> ${t.duringFocus}
          </p>
          <div class="fp-overlay-quote">
            ${t.quote}
          </div>
          <div style="width: 100%; max-width: 520px; margin-bottom: 14px;">
            <button id="fp-fs-dismiss-ok" class="fp-btn-primary" style="width: 100%; padding: 16px 28px; font-size: 1.2rem;">
              ${t.okBtn}
            </button>
          </div>
          <div style="display: flex; gap: 14px; width: 100%; max-width: 520px;">
            <button id="fp-fs-close-tab" class="fp-btn-danger" style="flex: 1; padding: 14px 20px; font-size: 1.05rem;">
              ${t.closeTab}
            </button>
            <button id="fp-fs-back" class="fp-btn-secondary" style="flex: 1; padding: 14px 20px; font-size: 1.05rem;">
              ${t.goBack}
            </button>
          </div>
        </div>
      `;
    }

    document.documentElement.appendChild(overlay);
    activeElementContainer = overlay;

    const okBtn = document.getElementById("fp-fs-dismiss-ok");
    if (okBtn) {
      okBtn.addEventListener("click", () => {
        overlay.remove();
        activeElementContainer = null;
        document.documentElement.style.overflow = "";
        if (document.body) document.body.style.overflow = "";
      });
    }

    const closeBtn = document.getElementById("fp-fs-close-tab");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => ext.runtime.sendMessage({ action: "CLOSE_TAB" }));
    }

    const backBtn = document.getElementById("fp-fs-back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          ext.runtime.sendMessage({ action: "CLOSE_TAB" });
        }
      });
    }

    if (isStrict && sessionEndTime) {
      const updateStrictCountdown = () => {
        const timerEl = document.getElementById("fp-strict-timer");
        if (!timerEl) return;
        const now = Date.now();
        const diffSec = Math.max(0, Math.floor((sessionEndTime - now) / 1000));
        const m = Math.floor(diffSec / 60);
        const s = diffSec % 60;
        timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (diffSec <= 0) {
          clearInterval(strictTimerInterval);
          strictTimerInterval = null;
          const box = document.getElementById("fp-strict-timer-box");
          if (box) {
            box.innerHTML = `
              <div style="color: #a6e3a1; font-weight: 700; font-size: 1rem; margin-bottom: 10px;">${t.strictUnlocked}</div>
              <button id="fp-strict-unblock-btn" class="fp-btn-primary" style="padding: 12px 22px;">${t.unblockBtn}</button>
            `;
            const unblockBtn = document.getElementById("fp-strict-unblock-btn");
            if (unblockBtn) {
              unblockBtn.addEventListener("click", () => {
                overlay.remove();
                activeElementContainer = null;
                document.documentElement.style.overflow = "";
                if (document.body) document.body.style.overflow = "";
              });
            }
          }
        }
      };

      updateStrictCountdown();
      strictTimerInterval = setInterval(updateStrictCountdown, 1000);
    }
  }

  function showWarning(domain, style = "fullscreen", lang = "ru", isStrict = false, sessionEndTime = 0) {
    if (hasBlockedCurrentPage && activeElementContainer) return;
    hasBlockedCurrentPage = true;

    if (activeElementContainer) {
      activeElementContainer.remove();
      activeElementContainer = null;
    }

    renderFullscreenOverlay(domain, lang, isStrict, sessionEndTime);
  }

  function applyBlockingLogic() {
    ext.storage.local.get([
      "timerState", "isTimerRunning", "blockedSites", "whiteListSites",
      "blockMode", "lang", "alertStyle", "strictMode", "sessionEndTime"
    ], (data) => {
      const isRunning = data.timerState === "running" || data.isTimerRunning === true;
      if (!isRunning) {
        if (activeElementContainer && data.timerState !== "withered") {
          activeElementContainer.remove();
          activeElementContainer = null;
          document.documentElement.style.overflow = "";
          if (document.body) document.body.style.overflow = "";
        }
        return;
      }

      const {
        blockedSites = [],
        whiteListSites = [],
        blockMode = "blacklist",
        lang = "ru",
        alertStyle = "fullscreen",
        strictMode = false,
        sessionEndTime = 0
      } = data;

      const currentUrl = window.location.href;
      let shouldBlock = false;

      if (blockMode === "blacklist") {
        shouldBlock = checkDomainMatch(currentUrl, blockedSites);
      } else if (blockMode === "whitelist") {
        shouldBlock = !checkDomainMatch(currentUrl, whiteListSites);
      }

      if (shouldBlock) {
        try {
          if (window.stop) window.stop();
          document.querySelectorAll('video, audio').forEach(el => { try { el.pause(); } catch(e){} });
        } catch(e) {}

        if (document.documentElement) {
          document.documentElement.style.background = "#0d0d15";
          document.documentElement.style.overflow = "hidden";
        }
        if (document.body) {
          document.body.style.overflow = "hidden";
        }

        const domain = window.location.hostname;
        ext.runtime.sendMessage({ action: "TREE_WITHERED", domain: domain, url: currentUrl });
        showWarning(domain, alertStyle, lang, strictMode, sessionEndTime);
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
    if (changes.timerState || changes.isTimerRunning || changes.blockedSites || changes.blockMode || changes.alertStyle || changes.strictMode) {
      applyBlockingLogic();
    }
  });

})();
