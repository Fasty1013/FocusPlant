// Focus Plant Pro - Shop & Tree Nursery Controller

function initShopTab() {
  // Event listeners for shop tab actions if any
}

function renderShopTab() {
  const ext = (typeof browser !== "undefined" && browser.runtime) ? browser : chrome;
  const skinsGrid = document.getElementById("skinsGrid");
  const coinsCount = document.getElementById("coinsCount");
  if (!skinsGrid) return;

  ext.storage.local.get(["coins", "unlockedSkins", "selectedSkin"], (data) => {
    const coins = data.coins || 0;
    const unlocked = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
    const currentSkin = data.selectedSkin || "oak";
    const lang = (typeof currentLang !== "undefined") ? currentLang : "ru";
    const t = (typeof i18n !== "undefined" && i18n[lang]) ? i18n[lang] : {};
    const skins = (typeof TREE_SKINS !== "undefined") ? TREE_SKINS : {};
    const rarities = (typeof RARITIES !== "undefined") ? RARITIES : {};

    skinsGrid.innerHTML = "";

    Object.values(skins).forEach(skin => {
      const isUnlocked = unlocked.includes(skin.id);
      const isEquipped = currentSkin === skin.id;
      const rarityObj = rarities[skin.rarity] || {};

      const card = document.createElement("div");
      card.className = `skin-card ${isEquipped ? "equipped" : ""} ${isUnlocked ? "unlocked" : "locked"}`;

      let treePreviewSvg = "";
      if (typeof renderTreeSVG === "function") {
        treePreviewSvg = renderTreeSVG(skin.id, 5, false);
      }

      const skinName = (skin.name && (skin.name[lang] || skin.name.ru)) || skin.id;
      const skinDesc = (skin.desc && (skin.desc[lang] || skin.desc.ru)) || "";
      const rarityName = (rarityObj.name && (rarityObj.name[lang] || rarityObj.name.ru)) || skin.rarity;

      card.innerHTML = `
        <div class="skin-preview">
          ${treePreviewSvg}
        </div>
        <div class="skin-details">
          <div class="skin-header-row">
            <h4 class="skin-name">${skinName}</h4>
            <span class="skin-rarity-pill" style="color: ${rarityObj.color || '#94e2d5'}; border-color: ${rarityObj.border || 'transparent'}; background: ${rarityObj.bg || 'transparent'};">
              ${rarityObj.stars || "★"} ${rarityName}
            </span>
            ${skin.exclusiveShop ? `<span class="skin-exclusive-badge" title="${t.exclusiveShopDesc || 'Эксклюзив магазина'}">💎 ${t.exclusiveShopBadge || 'ЭКСКЛЮЗИВ'}</span>` : ""}
          </div>
          <p class="skin-desc">${skinDesc}</p>
        </div>
        <div class="skin-action">
          ${
            isEquipped
              ? `<button class="btn btn-sm btn-success equipped-btn" disabled>${t.equipped || "✓ Выбрано"}</button>`
              : isUnlocked
                ? `<button class="btn btn-sm btn-primary equip-btn" data-skin="${skin.id}">${t.equip || "Выбрать"}</button>`
                : `<button class="btn btn-sm btn-warning buy-btn" data-skin="${skin.id}" data-price="${skin.price}">🪙 ${skin.price} ${t.buy || "Купить"}</button>`
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
          if (typeof syncTimerFromStorage === "function") {
            syncTimerFromStorage();
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
          if (typeof syncTimerFromStorage === "function") {
            syncTimerFromStorage();
          }
        });
      });
    });
  });
}

if (typeof window !== "undefined") {
  window.initShopTab = initShopTab;
  window.renderShopTab = renderShopTab;
}
if (typeof globalThis !== "undefined") {
  globalThis.initShopTab = initShopTab;
  globalThis.renderShopTab = renderShopTab;
}
