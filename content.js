// Focus Plant Pro - Cross-Browser Content Script Blocker & Wilting Engine
(function() {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  const I18N_OVERLAY = {
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
  let activeElementContainer = null;

  // Withered SVG Tree HTML String
  function getWitheredSvg(size = 140) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    `;
  }

  // 1. RENDER COMPACT FLOATING GLASS BANNER ("не мешает и виднее")
  function renderCompactBanner(blockedDomain, lang = "ru") {
    if (activeElementContainer) activeElementContainer.remove();

    const t = I18N_OVERLAY[lang] || I18N_OVERLAY.ru;

    const bannerWrap = document.createElement("div");
    bannerWrap.id = "focusplant-floating-banner-wrap";
    bannerWrap.style.cssText = `
      position: fixed !important;
      top: 16px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      z-index: 2147483647 !important;
      width: 92% !important;
      max-width: 660px !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
      animation: fpBannerSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    `;

    bannerWrap.innerHTML = `
      <style>
        @keyframes fpBannerSlide {
          from { transform: translate(-50%, -40px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes fpPulseAlert {
          0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.7), 0 0 18px rgba(243, 139, 168, 0.35); }
          50% { box-shadow: 0 10px 30px rgba(0,0,0,0.7), 0 0 30px rgba(243, 139, 168, 0.65); }
        }
      </style>
      <div id="focusplant-banner" style="
        background: rgba(24, 24, 37, 0.94);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1.5px solid #f38ba8;
        border-radius: 18px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 14px;
        color: #cdd6f4;
        animation: fpPulseAlert 3s infinite ease-in-out;
        box-sizing: border-box;
      ">
        <!-- Mini SVG Avatar -->
        <div style="flex-shrink: 0; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));">
          ${getWitheredSvg(48)}
        </div>

        <!-- Text Info -->
        <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="
              font-size: 0.68rem;
              font-weight: 800;
              background: rgba(243, 139, 168, 0.2);
              color: #f38ba8;
              border: 1px solid rgba(243, 139, 168, 0.5);
              padding: 2px 6px;
              border-radius: 10px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              ${t.badge}
            </span>
            <span style="font-size: 0.95rem; font-weight: 800; color: #f38ba8;">
              ${t.title}
            </span>
          </div>
          <div style="font-size: 0.8rem; color: #bac2de; line-height: 1.3;">
            ${t.openedSite} <b style="color: #f38ba8;">${blockedDomain || location.hostname}</b>. ${t.bannerDesc}
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
          <button id="fp-banner-close-tab" style="
            background: linear-gradient(135deg, #f38ba8 0%, #eba0ac 100%);
            color: #11111b;
            border: none;
            border-radius: 10px;
            padding: 8px 12px;
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(243, 139, 168, 0.3);
          ">
            ${t.closeTab}
          </button>

          <button id="fp-banner-to-fullscreen" title="${t.switchToFullscreen}" style="
            background: #313244;
            color: #cdd6f4;
            border: 1px solid #45475a;
            border-radius: 10px;
            padding: 8px 10px;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
          ">
            ${t.switchToFullscreen}
          </button>

          <button id="fp-banner-minimize" title="${t.minimize}" style="
            background: none;
            border: none;
            color: #a6adc8;
            font-size: 1rem;
            cursor: pointer;
            padding: 4px 6px;
          ">
            ✖
          </button>
        </div>
      </div>

      <!-- Minimized Corner Pill (Hidden by default) -->
      <div id="focusplant-minimized-pill" style="
        display: none;
        position: fixed;
        top: 14px;
        right: 14px;
        background: rgba(24, 24, 37, 0.92);
        backdrop-filter: blur(12px);
        border: 1.5px solid #f38ba8;
        border-radius: 20px;
        padding: 6px 14px;
        color: #f38ba8;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0,0,0,0.5);
        align-items: center;
        gap: 6px;
      ">
        <span>${t.minimizedPill}</span>
        <small style="font-size: 0.65rem; color: #a6adc8;">(нажмите)</small>
      </div>
    `;

    document.documentElement.appendChild(bannerWrap);
    activeElementContainer = bannerWrap;

    // Attach listeners
    const closeBtn = document.getElementById("fp-banner-close-tab");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        ext.runtime.sendMessage({ action: "CLOSE_TAB" });
      });
    }

    const toFullscreenBtn = document.getElementById("fp-banner-to-fullscreen");
    if (toFullscreenBtn) {
      toFullscreenBtn.addEventListener("click", () => {
        renderFullscreenOverlay(blockedDomain, lang);
      });
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

  let strictTimerInterval = null;

  // 2. RENDER FULLSCREEN OVERLAY
  function renderFullscreenOverlay(blockedDomain, lang = "ru", isStrict = false, sessionEndTime = 0) {
    if (activeElementContainer) activeElementContainer.remove();
    if (strictTimerInterval) {
      clearInterval(strictTimerInterval);
      strictTimerInterval = null;
    }

    try {
      if (window.stop) window.stop();
    } catch (e) {}

    const t = I18N_OVERLAY[lang] || I18N_OVERLAY.ru;

    const overlay = document.createElement("div");
    overlay.id = "focusplant-fullscreen-overlay";
    overlay.style.cssText = `
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
      overflow-y: auto !important;
    `;

    document.documentElement.style.overflow = "hidden";
    if (document.body) document.body.style.overflow = "hidden";

    if (isStrict) {
      // -------------------------------------------------------------
      // STRICT MODE: NO "OK" BUTTON, IMPENETRABLE LOCK WITH COUNTDOWN
      // -------------------------------------------------------------
      overlay.innerHTML = `
        <div style="
          background: rgba(30, 30, 46, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 2px solid #f38ba8;
          border-radius: 24px;
          padding: 36px 30px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(243, 139, 168, 0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fpFadeIn 0.35s ease-out;
        ">
          <div style="margin-bottom: 16px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.5));">
            ${getWitheredSvg(130)}
          </div>

          <div style="
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            background: rgba(243, 139, 168, 0.2);
            border: 1.5px solid #f38ba8;
            border-radius: 20px;
            color: #f38ba8;
            font-size: 0.85rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 14px;
            box-shadow: 0 0 15px rgba(243, 139, 168, 0.3);
          ">
            ${t.strictBadge}
          </div>

          <h1 style="
            font-size: 1.8rem;
            margin: 0 0 10px 0;
            color: #f38ba8;
            font-weight: 800;
            line-height: 1.2;
          ">
            ${t.strictTitle}
          </h1>

          <p style="
            font-size: 0.95rem;
            margin: 0 0 16px 0;
            color: #bac2de;
            line-height: 1.45;
          ">
            ${t.openedSite} <span style="color: #f38ba8; font-weight: 700; background: rgba(243, 139, 168, 0.15); padding: 2px 6px; border-radius: 4px;">${blockedDomain || location.hostname}</span>.<br>
            ${t.strictDesc}
          </p>

          <!-- Live Countdown Box -->
          <div id="fp-strict-timer-box" style="
            background: #181825;
            border: 1px solid rgba(243, 139, 168, 0.4);
            border-radius: 14px;
            padding: 12px 20px;
            width: 100%;
            margin-bottom: 16px;
            box-sizing: border-box;
          ">
            <span style="font-size: 0.8rem; color: #a6adc8; display: block; margin-bottom: 4px;">${t.strictTimerLabel}</span>
            <div id="fp-strict-timer" style="
              font-size: 2.2rem;
              font-weight: 800;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              color: #f38ba8;
              letter-spacing: 2px;
            ">--:--</div>
          </div>

          <!-- Strict Notice (NO OK BUTTON) -->
          <div style="
            background: rgba(243, 139, 168, 0.1);
            border: 1px dashed rgba(243, 139, 168, 0.5);
            padding: 8px 12px;
            border-radius: 10px;
            color: #f9e2af;
            font-size: 0.78rem;
            margin-bottom: 20px;
            width: 100%;
            box-sizing: border-box;
          ">
            🚫 ${t.strictNoOkNotice}
          </div>

          <!-- Actions: Only Close Tab or Go Back -->
          <div style="display: flex; gap: 10px; width: 100%;">
            <button id="fp-fs-close-tab" style="
              flex: 1;
              padding: 12px 18px;
              background: linear-gradient(135deg, #f38ba8 0%, #eba0ac 100%);
              color: #11111b;
              border: none;
              border-radius: 12px;
              font-weight: 800;
              font-size: 0.92rem;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(243, 139, 168, 0.35);
            ">
              ${t.closeTab}
            </button>

            <button id="fp-fs-back" style="
              flex: 1;
              padding: 12px 18px;
              background: #313244;
              color: #cdd6f4;
              border: 1px solid #45475a;
              border-radius: 12px;
              font-weight: 700;
              font-size: 0.92rem;
              cursor: pointer;
            ">
              ${t.goBack}
            </button>
          </div>
        </div>
      `;
    } else {
      // -------------------------------------------------------------
      // REGULAR MODE: WITH "OK" BUTTON TO DISMISS NOTIFICATION
      // -------------------------------------------------------------
      overlay.innerHTML = `
        <div style="
          background: rgba(30, 30, 46, 0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(243, 139, 168, 0.35);
          border-radius: 24px;
          padding: 36px 30px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(243, 139, 168, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fpFadeIn 0.35s ease-out;
        ">
          <div style="margin-bottom: 20px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
            ${getWitheredSvg(135)}
          </div>

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
            margin-bottom: 14px;
          ">
            <span>⚠️</span> ${t.badge}
          </div>

          <h1 style="
            font-size: 1.85rem;
            margin: 0 0 10px 0;
            color: #f38ba8;
            font-weight: 800;
            line-height: 1.2;
          ">
            ${t.title}
          </h1>

          <p style="
            font-size: 0.95rem;
            margin: 0 0 16px 0;
            color: #bac2de;
            line-height: 1.45;
          ">
            ${t.openedSite} <span style="color: #f38ba8; font-weight: 700; background: rgba(243, 139, 168, 0.12); padding: 2px 6px; border-radius: 4px;">${blockedDomain || location.hostname}</span> ${t.duringFocus}
          </p>

          <div style="
            font-style: italic;
            font-size: 0.88rem;
            color: #a6adc8;
            background: #181825;
            border-left: 3px solid #f38ba8;
            padding: 10px 14px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 22px;
            text-align: left;
            width: 100%;
            box-sizing: border-box;
          ">
            ${t.quote}
          </div>

          <!-- PRIMARY ACTION: "OK" BUTTON TO REMOVE NOTIFICATION -->
          <div style="width: 100%; margin-bottom: 12px;">
            <button id="fp-fs-dismiss-ok" style="
              width: 100%;
              padding: 13px 20px;
              background: linear-gradient(135deg, #a6e3a1 0%, #94e2d5 100%);
              color: #11111b;
              border: none;
              border-radius: 12px;
              font-weight: 800;
              font-size: 1rem;
              cursor: pointer;
              box-shadow: 0 4px 14px rgba(166, 227, 161, 0.35);
              transition: transform 0.15s ease;
            ">
              ${t.okBtn}
            </button>
          </div>

          <!-- SECONDARY ACTIONS: Close Tab or Go Back -->
          <div style="display: flex; gap: 10px; width: 100%;">
            <button id="fp-fs-close-tab" style="
              flex: 1;
              padding: 10px 14px;
              background: #313244;
              color: #f38ba8;
              border: 1px solid rgba(243, 139, 168, 0.4);
              border-radius: 10px;
              font-weight: 700;
              font-size: 0.85rem;
              cursor: pointer;
            ">
              ${t.closeTab}
            </button>

            <button id="fp-fs-back" style="
              flex: 1;
              padding: 10px 14px;
              background: #313244;
              color: #cdd6f4;
              border: 1px solid #45475a;
              border-radius: 10px;
              font-weight: 600;
              font-size: 0.85rem;
              cursor: pointer;
            ">
              ${t.goBack}
            </button>
          </div>
        </div>
      `;
    }

    document.documentElement.appendChild(overlay);
    activeElementContainer = overlay;

    // Attach "OK" dismiss button (available in normal mode)
    const okBtn = document.getElementById("fp-fs-dismiss-ok");
    if (okBtn) {
      okBtn.addEventListener("click", () => {
        overlay.remove();
        activeElementContainer = null;
        document.documentElement.style.overflow = "";
        if (document.body) document.body.style.overflow = "";
      });
    }

    // Attach Close Tab button
    const closeBtn = document.getElementById("fp-fs-close-tab");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        ext.runtime.sendMessage({ action: "CLOSE_TAB" });
      });
    }

    // Attach Go Back button
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

    // Live countdown timer for Strict Mode
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
              <div style="color: #a6e3a1; font-weight: 700; font-size: 0.95rem; margin-bottom: 8px;">${t.strictUnlocked}</div>
              <button id="fp-strict-unblock-btn" style="
                background: linear-gradient(135deg, #a6e3a1 0%, #94e2d5 100%);
                color: #11111b;
                border: none;
                border-radius: 10px;
                padding: 10px 16px;
                font-weight: 700;
                cursor: pointer;
              ">${t.unblockBtn}</button>
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

  // Choose renderer based on user preference
  function showWarning(domain, style = "fullscreen", lang = "ru", isStrict = false, sessionEndTime = 0) {
    if (hasBlockedCurrentPage && activeElementContainer) return;
    hasBlockedCurrentPage = true;

    // In Strict mode, ALWAYS show the impenetrable fullscreen overlay without OK button!
    if (isStrict || style === "fullscreen") {
      renderFullscreenOverlay(domain, lang, isStrict, sessionEndTime);
    } else {
      renderCompactBanner(domain, lang);
    }
  }

  function applyBlockingLogic() {
    ext.storage.local.get([
      "timerState", "isTimerRunning", "blockedSites", "whiteListSites",
      "blockMode", "lang", "alertStyle", "strictMode", "sessionEndTime"
    ], (data) => {
      const isRunning = data.timerState === "running" || data.isTimerRunning === true;
      if (!isRunning) {
        // If timer is not running, clean up any active strict overlay
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
