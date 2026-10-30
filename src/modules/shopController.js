// Focus Plant Pro - Shop & Tree Nursery Controller
(function() {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  function renderShopTab() {
    ext.storage.local.get(["coins", "unlockedSkins", "selectedSkin"], (data) => {
      const skinsGrid = document.getElementById("skinsGrid");
      const coinsCount = document.getElementById("coinsCount");
      if (!skinsGrid) return;

      const coins = data.coins || 0;
      const unlocked = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const currentSelected = data.selectedSkin || "oak";

      const currentLang = (typeof window.currentLang !== 'undefined')
        ? window.currentLang
        : ((document.getElementById("langSelect") && document.getElementById("langSelect").value) || "ru");

      const i18n = window.i18n || {};
      const t = i18n[currentLang] || i18n.ru || {};
      const skins = window.TREE_SKINS || {};
      const rarities = window.RARITIES || {};

      skinsGrid.innerHTML = "";

      Object.values(skins).forEach(skin => {
        const isOwned = unlocked.includes(skin.id);
        const isEquipped = currentSelected === skin.id;
        const rarityObj = rarities[skin.rarity] || rarities.common || {};

        const card = document.createElement("div");
        card.className = `skin-card ${isEquipped ? "selected" : ""}`;

        const previewSvg = (typeof renderTreeSVG === "function") ? renderTreeSVG(skin.id, 5, false) : "";
        const exclusiveBadge = skin.exclusiveShop
          ? `<span class="skin-exclusive-badge">💎 ${t.exclusiveShopBadge || "ЭКСКЛЮЗИВ"}</span>`
          : "";

        const skinName = (skin.name && (skin.name[currentLang] || skin.name.ru)) || skin.id;
        const skinDesc = (skin.desc && (skin.desc[currentLang] || skin.desc.ru)) || "";

        card.innerHTML = `
          <div class="skin-preview-box">${previewSvg}</div>
          <div class="skin-details">
            <div class="skin-name-row">
              <span class="skin-name">${skinName} ${skin.emoji || ""}</span>
            </div>
            <div class="skin-tags-row">
              <span class="skin-rarity-pill" style="background:${rarityObj.bg || 'transparent'};color:${rarityObj.color || '#94e2d5'};">${rarityObj.stars || "★"}</span>
              ${exclusiveBadge}
            </div>
            <div class="skin-desc">${skinDesc}</div>
          </div>
          <div class="skin-action">
            ${
              isEquipped
                ? `<button class="btn btn-sm btn-equipped" disabled>${t.equipped || "Выбрано"}</button>`
                : isOwned
                  ? `<button class="btn btn-sm btn-warning equip-btn" data-skin="${skin.id}">${t.equip || "Выбрать"}</button>`
                  : `<button class="btn btn-sm btn-primary buy-btn" data-skin="${skin.id}" data-price="${skin.price}">🪙 ${skin.price} ${t.buy || "Купить"}</button>`
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
            if (typeof window.syncTimerFromStorage === "function") {
              window.syncTimerFromStorage();
            }
          });
        });
      });

      skinsGrid.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const skinId = btn.dataset.skin;
          const price = parseInt(btn.dataset.price, 10);

          if (coins < price) {
            alert(t.notEnoughCoins || "Недостаточно монет для покупки этого скина!");
            return;
          }

          const newCoins = coins - price;
          const newUnlocked = [...unlocked, skinId];

          ext.storage.local.set({
            coins: newCoins,
            unlockedSkins: newUnlocked,
            selectedSkin: skinId
          }, () => {
            if (coinsCount) coinsCount.textContent = newCoins;
            if (typeof soundManager !== "undefined" && soundManager.playCompleteChime) {
              soundManager.playCompleteChime();
            }
            renderShopTab();
            if (typeof window.syncTimerFromStorage === "function") {
              window.syncTimerFromStorage();
            }
          });
        });
      });
    });
  }

  if (typeof window !== "undefined") {
    window.renderShopTab = renderShopTab;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.renderShopTab = renderShopTab;
  }
})();
