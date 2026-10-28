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

  // Withered SVG Tree HTML String (High Detail Botanical with Glowing Embers)
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
        <!-- Atmospheric Aura -->
        <circle cx="120" cy="120" r="100" fill="url(#fpWitherGlow)"/>

        <!-- Ground Mound with Stone Details -->
        <ellipse cx="120" cy="206" rx="85" ry="15" fill="url(#fpMoundGrad)"/>
        <ellipse cx="120" cy="206" rx="70" ry="9" fill="#11111b" opacity="0.8"/>
        <path d="M72 206L94 203M146 208L168 205M108 207L126 209" stroke="#585b70" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Trunk & Bare Branches -->
        <path d="M116 206 C114 172 102 146 110 118 C115 98 117 78 120 68" stroke="url(#fpTrunkGrad)" stroke-width="16" stroke-linecap="round"/>
        <path d="M124 206 C122 172 110 146 118 118 C123 98 125 78 128 68" stroke="#45475a" stroke-width="7" stroke-linecap="round"/>

        <!-- Left Main Branch -->
        <path d="M110 118 C95 106 78 108 65 94 C58 86 54 74 48 64" stroke="url(#fpTrunkGrad)" stroke-width="8" stroke-linecap="round"/>
        <path d="M78 108 C74 92 60 88 52 78" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>

        <!-- Right Main Branch -->
        <path d="M120 106 C138 98 162 103 174 88 C182 78 186 66 192 54" stroke="url(#fpTrunkGrad)" stroke-width="8" stroke-linecap="round"/>
        <path d="M150 100 C162 88 178 83 186 70" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>

        <!-- Snapped Top Twigs -->
        <path d="M118 84 C108 67 110 51 105 39" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>
        <path d="M120 68 C130 52 138 43 144 30" stroke="url(#fpTrunkGrad)" stroke-width="5" stroke-linecap="round"/>

        <!-- Fallen Leaves & Glowing Embers on Ground -->
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

  // 2. RENDER FULLSCREEN OVERLAY (Crisp, High-Quality Aesthetic Presentation)
  function renderFullscreenOverlay(blockedDomain, lang = "ru", isStrict = false, sessionEndTime = 0) {
    if (activeElementContainer) activeElementContainer.remove();
    if (strictTimerInterval) {
      clearInterval(strictTimerInterval);
      strictTimerInterval = null;
    }

    try {
      if (window.stop) window.stop();
      document.querySelectorAll('video, audio').forEach(el => { try { el.pause(); } catch(e){} });
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
      background: radial-gradient(ellipse at 50% 25%, #252438 0%, #161622 55%, #0d0d15 100%) !important;
      color: #cdd6f4 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 2147483647 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      text-rendering: optimizeLegibility !important;
      text-align: center !important;
      padding: 24px !important;
      box-sizing: border-box !important;
      overflow-y: auto !important;
    `;

    document.documentElement.style.background = "#0d0d15";
    document.documentElement.style.overflow = "hidden";
    if (document.body) document.body.style.overflow = "hidden";

    const commonStyles = `
      <style>
        @keyframes fpFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fpFloatTree {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fpGlowPulse {
          0%, 100% { filter: drop-shadow(0 8px 24px rgba(243, 139, 168, 0.35)); }
          50% { filter: drop-shadow(0 12px 36px rgba(243, 139, 168, 0.65)); }
        }
        .fp-btn-primary {
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .fp-btn-primary:hover {
          transform: translateY(-2px) scale(1.01) !important;
          box-shadow: 0 8px 28px rgba(16, 185, 129, 0.45) !important;
        }
        .fp-btn-danger {
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .fp-btn-danger:hover {
          transform: translateY(-2px) scale(1.01) !important;
          box-shadow: 0 8px 28px rgba(243, 139, 168, 0.45) !important;
        }
        .fp-btn-secondary {
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .fp-btn-secondary:hover {
          background: rgba(69, 71, 90, 0.95) !important;
          transform: translateY(-2px) !important;
          color: #ffffff !important;
        }
      </style>
    `;

    if (isStrict) {
      // -------------------------------------------------------------
      // STRICT MODE: NO "OK" BUTTON, IMPENETRABLE LOCK WITH COUNTDOWN
      // -------------------------------------------------------------
      overlay.innerHTML = `
        ${commonStyles}
        <div style="
          background: rgba(24, 24, 37, 0.82);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(243, 139, 168, 0.3);
          border-radius: 32px;
          padding: 44px 38px;
          max-width: 640px;
          width: 92%;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(243, 139, 168, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fpFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        ">
          <!-- Withered Tree with Soft Float Animation -->
          <div style="margin-bottom: 18px; animation: fpFloatTree 5s ease-in-out infinite;">
            ${getWitheredSvg(175)}
          </div>

          <!-- Strict Badge Capsule -->
          <div style="
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 6px 18px;
            background: rgba(243, 139, 168, 0.15);
            border: 1.5px solid rgba(243, 139, 168, 0.45);
            border-radius: 30px;
            color: #f38ba8;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 14px;
            box-shadow: 0 0 20px rgba(243, 139, 168, 0.25);
          ">
            <span>🔒</span> ${t.strictBadge}
          </div>

          <!-- Title with Gradient Glow -->
          <h1 style="
            font-size: 2.2rem;
            margin: 0 0 12px 0;
            font-weight: 900;
            letter-spacing: -0.5px;
            line-height: 1.2;
            background: linear-gradient(135deg, #ffffff 10%, #f5c2e7 55%, #f38ba8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">
            ${t.strictTitle}
          </h1>

          <!-- Description & Blocked Site Pill -->
          <p style="
            font-size: 1.02rem;
            margin: 0 0 20px 0;
            color: #bac2de;
            line-height: 1.55;
            max-width: 520px;
          ">
            ${t.openedSite} <span style="
              color: #f5c2e7;
              font-weight: 700;
              background: rgba(243, 139, 168, 0.18);
              border: 1px solid rgba(243, 139, 168, 0.4);
              padding: 3px 10px;
              border-radius: 8px;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            ">${blockedDomain || location.hostname}</span>.<br>
            ${t.strictDesc}
          </p>

          <!-- Live Chronometer HUD Box -->
          <div id="fp-strict-timer-box" style="
            background: linear-gradient(180deg, rgba(20, 20, 32, 0.95) 0%, rgba(14, 14, 23, 0.95) 100%);
            border: 1px solid rgba(243, 139, 168, 0.32);
            border-radius: 20px;
            padding: 18px 28px;
            width: 100%;
            max-width: 460px;
            margin-bottom: 16px;
            box-sizing: border-box;
            box-shadow: inset 0 2px 12px rgba(0,0,0,0.5), 0 8px 30px rgba(243, 139, 168, 0.12);
          ">
            <span style="
              font-size: 0.8rem;
              color: #a6adc8;
              display: block;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 1.2px;
              font-weight: 700;
            ">${t.strictTimerLabel}</span>
            <div id="fp-strict-timer" style="
              font-size: 3.3rem;
              font-weight: 900;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'SF Pro Display', sans-serif !important;
              font-variant-numeric: tabular-nums;
              font-feature-settings: 'tnum' 1;
              color: #f38ba8;
              letter-spacing: 5px;
              text-shadow: 0 0 24px rgba(243, 139, 168, 0.65), 0 0 45px rgba(243, 139, 168, 0.3);
            ">--:--</div>
          </div>

          <!-- Strict Notice Pill (No OK Button) -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: rgba(243, 139, 168, 0.08);
            border: 1px solid rgba(243, 139, 168, 0.25);
            padding: 10px 16px;
            border-radius: 12px;
            color: #f9e2af;
            font-size: 0.82rem;
            font-weight: 500;
            margin-bottom: 24px;
            width: 100%;
            max-width: 460px;
            box-sizing: border-box;
          ">
            <span>🚫</span> ${t.strictNoOkNotice}
          </div>

          <!-- Actions: Only Close Tab or Go Back -->
          <div style="display: flex; gap: 12px; width: 100%; max-width: 460px;">
            <button id="fp-fs-close-tab" class="fp-btn-danger" style="
              flex: 1;
              padding: 14px 20px;
              background: linear-gradient(135deg, #f38ba8 0%, #e06c88 100%);
              color: #11111b;
              border: none;
              border-radius: 14px;
              font-weight: 800;
              font-size: 0.95rem;
              cursor: pointer;
              box-shadow: 0 4px 18px rgba(243, 139, 168, 0.35);
              font-family: inherit;
            ">
              ${t.closeTab}
            </button>

            <button id="fp-fs-back" class="fp-btn-secondary" style="
              flex: 1;
              padding: 14px 20px;
              background: rgba(49, 50, 68, 0.8);
              color: #cdd6f4;
              border: 1px solid rgba(69, 71, 90, 0.8);
              border-radius: 14px;
              font-weight: 700;
              font-size: 0.95rem;
              cursor: pointer;
              font-family: inherit;
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
        ${commonStyles}
        <div style="
          background: rgba(24, 24, 37, 0.82);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(243, 139, 168, 0.3);
          border-radius: 32px;
          padding: 44px 38px;
          max-width: 640px;
          width: 92%;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(243, 139, 168, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fpFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        ">
          <!-- Withered Tree with Soft Float Animation -->
          <div style="margin-bottom: 20px; animation: fpFloatTree 5s ease-in-out infinite;">
            ${getWitheredSvg(180)}
          </div>

          <!-- Alert Badge -->
          <div style="
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 6px 18px;
            background: rgba(243, 139, 168, 0.15);
            border: 1.5px solid rgba(243, 139, 168, 0.45);
            border-radius: 30px;
            color: #f38ba8;
            font-size: 0.82rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 14px;
          ">
            <span>⚠️</span> ${t.badge}
          </div>

          <!-- Title with Gradient Glow -->
          <h1 style="
            font-size: 2.25rem;
            margin: 0 0 12px 0;
            font-weight: 900;
            letter-spacing: -0.5px;
            line-height: 1.2;
            background: linear-gradient(135deg, #ffffff 10%, #f5c2e7 55%, #f38ba8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">
            ${t.title}
          </h1>

          <!-- Info text -->
          <p style="
            font-size: 1.02rem;
            margin: 0 0 18px 0;
            color: #bac2de;
            line-height: 1.55;
            max-width: 520px;
          ">
            ${t.openedSite} <span style="
              color: #f5c2e7;
              font-weight: 700;
              background: rgba(243, 139, 168, 0.18);
              border: 1px solid rgba(243, 139, 168, 0.4);
              padding: 3px 10px;
              border-radius: 8px;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            ">${blockedDomain || location.hostname}</span> ${t.duringFocus}
          </p>

          <!-- Philosophical quote -->
          <div style="
            font-style: italic;
            font-size: 0.9rem;
            color: #a6adc8;
            background: #181825;
            border-left: 3px solid #f38ba8;
            padding: 12px 18px;
            border-radius: 0 12px 12px 0;
            margin-bottom: 26px;
            text-align: left;
            width: 100%;
            max-width: 480px;
            box-sizing: border-box;
            line-height: 1.5;
          ">
            ${t.quote}
          </div>

          <!-- PRIMARY ACTION: PROMINENT "OK" BUTTON TO REMOVE NOTIFICATION -->
          <div style="width: 100%; max-width: 480px; margin-bottom: 12px;">
            <button id="fp-fs-dismiss-ok" class="fp-btn-primary" style="
              width: 100%;
              padding: 15px 24px;
              background: linear-gradient(135deg, #a6e3a1 0%, #10b981 100%);
              color: #11111b;
              border: none;
              border-radius: 16px;
              font-weight: 800;
              font-size: 1.05rem;
              cursor: pointer;
              box-shadow: 0 6px 24px rgba(16, 185, 129, 0.35);
              font-family: inherit;
            ">
              ${t.okBtn}
            </button>
          </div>

          <!-- SECONDARY ACTIONS: Close Tab or Go Back -->
          <div style="display: flex; gap: 12px; width: 100%; max-width: 480px;">
            <button id="fp-fs-close-tab" class="fp-btn-danger" style="
              flex: 1;
              padding: 12px 18px;
              background: rgba(49, 50, 68, 0.8);
              color: #f38ba8;
              border: 1px solid rgba(243, 139, 168, 0.4);
              border-radius: 14px;
              font-weight: 700;
              font-size: 0.9rem;
              cursor: pointer;
              font-family: inherit;
            ">
              ${t.closeTab}
            </button>

            <button id="fp-fs-back" class="fp-btn-secondary" style="
              flex: 1;
              padding: 12px 18px;
              background: rgba(49, 50, 68, 0.8);
              color: #cdd6f4;
              border: 1px solid rgba(69, 71, 90, 0.8);
              border-radius: 14px;
              font-weight: 600;
              font-size: 0.9rem;
              cursor: pointer;
              font-family: inherit;
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
              <div style="color: #a6e3a1; font-weight: 700; font-size: 1rem; margin-bottom: 10px;">${t.strictUnlocked}</div>
              <button id="fp-strict-unblock-btn" class="fp-btn-primary" style="
                background: linear-gradient(135deg, #a6e3a1 0%, #10b981 100%);
                color: #11111b;
                border: none;
                border-radius: 14px;
                padding: 12px 22px;
                font-weight: 800;
                font-size: 0.95rem;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
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
