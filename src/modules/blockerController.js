// Focus Plant Pro - Blocker & Website Restriction Controller

function initBlockerTab() {
  const ext = (typeof browser !== "undefined" && browser.runtime) ? browser : chrome;
  const blockModeSelect = document.getElementById("blockModeSelect");
  const alertStyleSelect = document.getElementById("alertStyle");
  const siteInput = document.getElementById("siteInput");
  const addSiteBtn = document.getElementById("addSiteBtn");
  const chipBtns = document.querySelectorAll(".chip-btn");

  if (blockModeSelect) {
    blockModeSelect.addEventListener("change", (e) => {
      ext.storage.local.set({ blockMode: e.target.value }, () => {
        renderBlockerTab();
      });
    });
  }

  if (alertStyleSelect) {
    alertStyleSelect.addEventListener("change", (e) => {
      ext.storage.local.set({ alertStyle: e.target.value });
    });
  }

  function addSite(site) {
    if (!site) return;
    const clean = (typeof cleanDomain === "function") ? cleanDomain(site) : site.trim().toLowerCase();
    if (!clean) return;

    ext.storage.local.get(["blockMode", "blacklist", "whitelist"], (data) => {
      const mode = data.blockMode || "blacklist";
      const key = (mode === "whitelist") ? "whitelist" : "blacklist";
      const list = Array.isArray(data[key]) ? [...data[key]] : [];

      if (!list.includes(clean)) {
        list.push(clean);
        ext.storage.local.set({ [key]: list }, () => {
          if (siteInput) siteInput.value = "";
          renderBlockerTab();
        });
      }
    });
  }

  if (addSiteBtn && siteInput) {
    addSiteBtn.addEventListener("click", () => addSite(siteInput.value));
    siteInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addSite(siteInput.value);
    });
  }

  chipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      addSite(btn.dataset.site);
    });
  });
}

function renderBlockerTab() {
  const ext = (typeof browser !== "undefined" && browser.runtime) ? browser : chrome;
  const blockModeSelect = document.getElementById("blockModeSelect");
  const alertStyleSelect = document.getElementById("alertStyle");
  const siteListContainer = document.getElementById("siteListContainer");
  if (!siteListContainer) return;

  ext.storage.local.get(["blockMode", "alertStyle", "blacklist", "whitelist"], (data) => {
    const mode = data.blockMode || "blacklist";
    const alertStyle = data.alertStyle || "banner";
    const blacklist = Array.isArray(data.blacklist) ? data.blacklist : [];
    const whitelist = Array.isArray(data.whitelist) ? data.whitelist : [];

    if (blockModeSelect) blockModeSelect.value = mode;
    if (alertStyleSelect) alertStyleSelect.value = alertStyle;

    const activeList = (mode === "whitelist") ? whitelist : blacklist;
    const storageKey = (mode === "whitelist") ? "whitelist" : "blacklist";

    siteListContainer.innerHTML = "";

    if (activeList.length === 0) {
      siteListContainer.innerHTML = `<span style="font-size: 0.75rem; color: #6c7086; padding: 4px;">Список пуст</span>`;
      return;
    }

    activeList.forEach(site => {
      const tag = document.createElement("div");
      tag.className = "site-item";
      tag.innerHTML = `
        <span class="site-name">${site}</span>
        <button class="site-del-btn" data-site="${site}">✕</button>
      `;
      siteListContainer.appendChild(tag);
    });

    siteListContainer.querySelectorAll(".site-del-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetSite = btn.dataset.site;
        const updated = activeList.filter(s => s !== targetSite);
        ext.storage.local.set({ [storageKey]: updated }, () => {
          renderBlockerTab();
        });
      });
    });
  });
}

if (typeof window !== "undefined") {
  window.initBlockerTab = initBlockerTab;
  window.renderBlockerTab = renderBlockerTab;
}
if (typeof globalThis !== "undefined") {
  globalThis.initBlockerTab = initBlockerTab;
  globalThis.renderBlockerTab = renderBlockerTab;
}
