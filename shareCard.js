// Focus Plant Pro - Shareable Focus Card Generator Engine (Stories, Telegram, VK & Socials)
// Generates 800x1000 HiDPI custom botanical postcard with tree art, focus stats and quotes

const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;
let currentShareCardData = null;

  // -------------------------------------------------------------
  // 📸 SHAREABLE FOCUS CARD GENERATOR ENGINE (Stories, TG & Socials)
  // -------------------------------------------------------------
  function hexToRgba(hex, alpha) {
    if (!hex || typeof hex !== "string") return `rgba(16, 185, 129, ${alpha})`;
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const num = parseInt(c, 16);
    if (isNaN(num)) return `rgba(16, 185, 129, ${alpha})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function roundRectPath(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  function drawShareCard(cardData, callback) {
    if (!shareCardCanvas) return;
    const ctx = shareCardCanvas.getContext("2d");
    if (!ctx) return;

    const w = 800;
    const h = 1000;
    shareCardCanvas.width = w;
    shareCardCanvas.height = h;

    // Background Gradient (deep night forest)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#0b0f19");
    bgGrad.addColorStop(0.35, "#131826");
    bgGrad.addColorStop(0.7, "#161b2c");
    bgGrad.addColorStop(1, "#0a0e17");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Ambient background glowing orbs
    const glowTop = ctx.createRadialGradient(680, 150, 20, 680, 150, 320);
    glowTop.addColorStop(0, "rgba(16, 185, 129, 0.16)");
    glowTop.addColorStop(1, "rgba(16, 185, 129, 0)");
    ctx.fillStyle = glowTop;
    ctx.fillRect(0, 0, w, h);

    const glowBot = ctx.createRadialGradient(120, 850, 30, 120, 850, 360);
    glowBot.addColorStop(0, "rgba(139, 92, 246, 0.14)");
    glowBot.addColorStop(1, "rgba(139, 92, 246, 0)");
    ctx.fillStyle = glowBot;
    ctx.fillRect(0, 0, w, h);

    // Subtle background stars / sparkles
    const sparkles = [
      [100, 140, 2, 0.5], [720, 280, 3, 0.7], [660, 420, 2, 0.4],
      [80, 480, 2.5, 0.6], [740, 720, 2, 0.5], [140, 780, 3, 0.8],
      [690, 880, 2, 0.6], [220, 220, 1.5, 0.35], [580, 180, 2, 0.4]
    ];
    sparkles.forEach(([sx, sy, sr, sa]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${sa})`;
      ctx.shadowColor = "#94e2d5";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Outer Card Border
    ctx.strokeStyle = "rgba(148, 226, 213, 0.3)";
    ctx.lineWidth = 3;
    roundRectPath(ctx, 24, 24, w - 48, h - 48, 32, false, true);

    // Inner subtle hairline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    roundRectPath(ctx, 34, 34, w - 68, h - 68, 24, false, true);

    // Brand Header
    ctx.textAlign = "left";
    ctx.font = "800 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#10b981";
    ctx.fillText("🌿 FOCUS PLANT PRO", 60, 85);

    ctx.font = "500 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Deep Work & Pomodoro Botanical Sanctuary", 60, 112);

    // Date
    const now = new Date();
    const dateOptions = { day: "numeric", month: "long", year: "numeric" };
    const dateStr = cardData.date || now.toLocaleDateString(currentLang === "en" ? "en-US" : (currentLang === "ja" ? "ja-JP" : "ru-RU"), dateOptions);

    ctx.textAlign = "right";
    ctx.font = "600 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(dateStr, w - 60, 95);

    // Tree Rarity & Skin
    const rarityObj = RARITIES[cardData.rarity] || RARITIES.common;
    const skinObj = TREE_SKINS[cardData.skin] || TREE_SKINS.oak;
    const treeGlowColor = rarityObj.color || "#10b981";

    // Tree Aura Glow
    const aura = ctx.createRadialGradient(400, 310, 40, 400, 310, 240);
    aura.addColorStop(0, hexToRgba(treeGlowColor, 0.35));
    aura.addColorStop(0.5, hexToRgba(treeGlowColor, 0.12));
    aura.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(400, 310, 240, 0, Math.PI * 2);
    ctx.fill();

    // Pedestal disk
    ctx.beginPath();
    ctx.ellipse(400, 450, 170, 30, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fill();
    ctx.strokeStyle = "rgba(148, 226, 213, 0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Render Tree SVG via Image
    let svg = renderTreeSVG(cardData.skin, 5, cardData.isWithered);
    if (!svg.includes("xmlns")) {
      svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"');
    } else if (!svg.includes("width=")) {
      svg = svg.replace("<svg", '<svg width="400" height="400"');
    }

    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const treeW = 320;
      const treeH = 320;
      ctx.drawImage(img, 400 - treeW / 2, 450 - treeH + 30, treeW, treeH);
      URL.revokeObjectURL(url);

      // Rarity Badge Pill
      const stars = rarityObj.stars || "★";
      const rarityName = (rarityObj.name[currentLang] || rarityObj.name.ru || "Обычный").toUpperCase();
      const rarityLabel = `${stars} ${rarityName}`;

      ctx.font = "800 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      const badgeMetrics = ctx.measureText(rarityLabel);
      const badgeW = badgeMetrics.width + 36;
      const badgeH = 32;
      const badgeX = 400 - badgeW / 2;
      const badgeY = 515;

      ctx.fillStyle = rarityObj.bg || "rgba(148, 226, 213, 0.15)";
      ctx.strokeStyle = rarityObj.border || "rgba(148, 226, 213, 0.4)";
      ctx.lineWidth = 1.5;
      roundRectPath(ctx, badgeX, badgeY, badgeW, badgeH, 16, true, true);

      ctx.textAlign = "center";
      ctx.fillStyle = rarityObj.color || "#94e2d5";
      ctx.fillText(rarityLabel, 400, badgeY + 21);

      // Tree Title
      const treeTitle = `${skinObj.name[currentLang] || skinObj.name.ru} ${skinObj.emoji || "🌳"}`;
      ctx.font = "800 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 10;
      ctx.fillText(treeTitle, 400, 585);
      ctx.shadowBlur = 0;

      // Stats Cards Grid
      const cardY = 620;
      const cardH = 105;
      const cardW = 210;
      const gap = 20;
      const totalW = 3 * cardW + 2 * gap;
      const startX = (w - totalW) / 2;

      ext.storage.local.get(["forest"], (data) => {
        const forest = data.forest || [];
        const gardenCount = forest.length || 1;

        const statItems = [
          {
            label: (currentLang === "en" ? "FOCUS TIME" : (currentLang === "ja" ? "集中時間" : (currentLang === "uz" ? "DIQQAT VAQTI" : "ВРЕМЯ ФОКУСА"))),
            val: `${cardData.duration || 25} ${currentLang === "en" ? "min" : (currentLang === "ja" ? "分" : (currentLang === "uz" ? "daq" : "мин"))}`,
            icon: "⏱",
            color: "#94e2d5"
          },
          {
            label: (currentLang === "en" ? "REWARD" : (currentLang === "ja" ? "獲得コイン" : (currentLang === "uz" ? "MUKOFOT" : "НАГРАДА"))),
            val: `+${cardData.coins || 30} 🪙`,
            icon: "🪙",
            color: "#f9e2af"
          },
          {
            label: (currentLang === "en" ? "TOTAL GARDEN" : (currentLang === "ja" ? "ガーデンの木" : (currentLang === "uz" ? "BOG'DAGI DARAXTLAR" : "ДЕРЕВЬЯ В САДУ"))),
            val: `${gardenCount} ${currentLang === "en" ? "trees" : (currentLang === "ja" ? "本" : (currentLang === "uz" ? "daraxt" : "шт."))}`,
            icon: "🌲",
            color: "#a6e3a1"
          }
        ];

        statItems.forEach((st, idx) => {
          const cx = startX + idx * (cardW + gap);
          ctx.fillStyle = "rgba(30, 30, 46, 0.85)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1.5;
          roundRectPath(ctx, cx, cardY, cardW, cardH, 18, true, true);

          ctx.textAlign = "center";
          ctx.font = "700 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          ctx.fillStyle = "#94a3b8";
          ctx.fillText(`${st.icon} ${st.label}`, cx + cardW / 2, cardY + 34);

          ctx.font = "800 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
          ctx.fillStyle = st.color;
          ctx.fillText(st.val, cx + cardW / 2, cardY + 74);
        });

        // Motivational Quote Box
        const quoteY = 750;
        const quoteH = 95;
        const quoteW = w - 130;
        const quoteX = 65;

        ctx.fillStyle = "rgba(16, 185, 129, 0.07)";
        ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
        ctx.lineWidth = 1.5;
        roundRectPath(ctx, quoteX, quoteY, quoteW, quoteH, 18, true, true);

        ctx.font = "italic 36px Georgia, serif";
        ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
        ctx.fillText("“", quoteX + 35, quoteY + 45);

        const quotes = {
          ru: "Каждая минута осознанного фокуса взращивает твою силу воли и внутренний сад.",
          en: "Every minute of mindful focus nurtures your willpower and blooms your inner sanctuary.",
          uz: "Har bir ongli diqqat daqiqasi irodangizni va ichki bog'ingizni gullatadi.",
          ja: "意識的な集中の1分1分が、あなたの意志力と心の中の庭を豊かに育てます。"
        };
        const quoteText = quotes[currentLang] || quotes.ru;

        ctx.textAlign = "center";
        ctx.font = "italic 500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(quoteText, 400, quoteY + 52);

        // Footer Divider & Social Tag
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(65, 875);
        ctx.lineTo(w - 65, 875);
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.font = "600 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillStyle = "#64748b";
        ctx.fillText("#FocusPlant  #DeepWork  #Productivity  #DigitalWellbeing", 65, 915);

        ctx.textAlign = "right";
        ctx.font = "700 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillStyle = "#10b981";
        ctx.fillText("🌱 focusplant.app", w - 65, 915);

        if (typeof callback === "function") callback();
      });
    };

    img.onerror = (e) => {
      console.error("SVG Tree render failed for canvas", e);
      URL.revokeObjectURL(url);
      if (typeof callback === "function") callback();
    };

    img.src = url;
  }

  function openShareModal(cardData) {
    currentShareCardData = cardData;
    if (!shareCardModal) return;
    shareCardModal.style.display = "flex";
    drawShareCard(cardData);
  }


function initShareCard() {
  const closeShareModalBtn = document.getElementById("closeShareModalBtn");
  const shareCardModal = document.getElementById("shareCardModal");
  const shareCardCanvas = document.getElementById("shareCardCanvas");
  const btnDownloadShareCard = document.getElementById("btnDownloadShareCard");
  const btnCopyShareCard = document.getElementById("btnCopyShareCard");
  const btnTelegramShare = document.getElementById("btnTelegramShare");
  const dropShareBtn = document.getElementById("dropShareBtn");
  const timerShareBtn = document.getElementById("timerShareBtn");

  if (closeShareModalBtn) {
    closeShareModalBtn.addEventListener("click", () => {
      if (shareCardModal) shareCardModal.style.display = "none";
    });
  }

  if (shareCardModal) {
    shareCardModal.addEventListener("click", (e) => {
      if (e.target === shareCardModal) {
        shareCardModal.style.display = "none";
      }
    });
  }

  if (btnDownloadShareCard) {
    btnDownloadShareCard.addEventListener("click", () => {
      if (!shareCardCanvas) return;
      const skinName = currentShareCardData?.skin || "tree";
      const link = document.createElement("a");
      link.download = `FocusPlant_${skinName}_${Date.now()}.png`;
      link.href = shareCardCanvas.toDataURL("image/png");
      link.click();
      soundManager.playClick();
    });
  }

  if (btnCopyShareCard) {
    btnCopyShareCard.addEventListener("click", () => {
      if (!shareCardCanvas) return;
      const t = i18n[currentLang] || i18n.ru;
      if (navigator.clipboard && window.ClipboardItem && shareCardCanvas.toBlob) {
        shareCardCanvas.toBlob((blob) => {
          if (!blob) return;
          navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]).then(() => {
            showToast(t.shareCardCopied || "📋 Открытка скопирована в буфер обмена!");
            soundManager.playCompleteChime();
          }).catch((err) => {
            console.warn("Clipboard copy failed, downloading instead", err);
            btnDownloadShareCard.click();
          });
        }, "image/png");
      } else {
        btnDownloadShareCard.click();
      }
    });
  }

  if (btnTelegramShare) {
    btnTelegramShare.addEventListener("click", () => {
      const skinObj = TREE_SKINS[currentShareCardData?.skin] || TREE_SKINS.oak;
      const treeName = skinObj.name[currentLang] || skinObj.name.ru;
      const mins = currentShareCardData?.duration || 25;
      const t = i18n[currentLang] || i18n.ru;
      const shareText = t.shareTelegramText
        ? t.shareTelegramText(treeName, mins)
        : `🌿 Я только что вырастил «${treeName}» в Focus Plant! ⏱ ${mins} мин глубокой концентрации без единого срыва. Взращивай свой сад вместе со мной! #FocusPlant #DeepWork`;
      const tgUrl = `https://t.me/share/url?url=${encodeURIComponent("https://focusplant.app")}&text=${encodeURIComponent(shareText)}`;
      window.open(tgUrl, "_blank");
    });
  }

  if (dropShareBtn) {
    dropShareBtn.addEventListener("click", () => {
      ext.storage.local.get(["lastDrop", "sessionDuration"], (data) => {
        const drop = data.lastDrop || {};
        const dur = Math.round((data.sessionDuration || 1500) / 60);
        openShareModal({
          skin: drop.skin || "oak",
          rarity: drop.rarity || "common",
          duration: dur,
          coins: drop.earnedCoins || 30,
          xp: drop.earnedXp || 50,
          isWithered: false
        });
      });
    });
  }

  if (timerShareBtn) {
    timerShareBtn.addEventListener("click", () => {
      ext.storage.local.get(["lastDrop", "selectedSkin", "sessionDuration"], (data) => {
        const drop = data.lastDrop || {};
        const skin = drop.skin || data.selectedSkin || "oak";
        const dur = Math.round((data.sessionDuration || 1500) / 60);
        openShareModal({
          skin: skin,
          rarity: drop.rarity || (TREE_SKINS[skin] && TREE_SKINS[skin].rarity) || "common",
          duration: dur,
          coins: drop.earnedCoins || 30,
          xp: drop.earnedXp || 50,
          isWithered: false
        });
      });
    });
  }
}

// Global exports on window
window.initShareCard = initShareCard;
window.openShareModal = openShareModal;
window.drawShareCard = drawShareCard;
