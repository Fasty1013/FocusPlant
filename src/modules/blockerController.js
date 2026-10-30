// Focus Plant Pro - Blocker & Website Restriction Controller
(function() {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  function addSiteToList(rawDomain) {
    if (!rawDomain) return;
    const clean = (typeof cleanDomain === "function")
      ? cleanDomain(rawDomain)
      : rawDomain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').trim();

    if (!clean) return;

    const siteInput = document.getElementById("siteInput");

    ext.storage.local.get(["blockMode", "blockedSites", "whiteListSites"], (data) => {
      const mode = data.blockMode || "blacklist";
      const list = mode === "blacklist" ? (data.blockedSites || []) : (data.whiteListSites || []);

      if (!list.includes(clean)) {
        list.push(clean);
        const update = mode === "blacklist" ? { blockedSites: list } : { whiteListSites: list };
        ext.storage.local.set(update, () => {
          if (siteInput) siteInput.value = "";
          renderBlockerTab();
        });
      }
    });
  }

  function initBlockerTab() {
    const blockModeSelect = document.getElementById("blockMode");
    const alertStyleSelect = document.getElementById("alertStyle");
    const siteInput = document.getElementById("siteInput");
    const addSiteBtn = document.getElementById("addSiteBtn");
    const chipBtns = document.querySelectorAll(".chip-btn");

    if (blockModeSelect && !blockModeSelect._boundBlocker) {
      blockModeSelect.addEventListener("change", (e) => {
        ext.storage.local.set({ blockMode: e.target.value }, () => renderBlockerTab());
      });
      blockModeSelect._boundBlocker = true;
    }

    if (alertStyleSelect && !alertStyleSelect._boundBlocker) {
      alertStyleSelect.addEventListener("change", (e) => {
        ext.storage.local.set({ alertStyle: e.target.value });
      });
      alertStyleSelect._boundBlocker = true;
    }

    if (addSiteBtn && !addSiteBtn._boundBlocker) {
      addSiteBtn.addEventListener("click", () => {
        if (siteInput) addSiteToList(siteInput.value);
      });
      addSiteBtn._boundBlocker = true;
    }

    if (siteInput && !siteInput._boundBlocker) {
      siteInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addSiteToList(siteInput.value);
      });
      siteInput._boundBlocker = true;
    }

    chipBtns.forEach(btn => {
      if (!btn._boundBlocker) {
        btn.addEventListener("click", () => addSiteToList(btn.dataset.site));
        btn._boundBlocker = true;
      }
    });
  }

  function renderBlockerTab() {
    const blockModeSelect = document.getElementById("blockMode");
    const alertStyleSelect = document.getElementById("alertStyle");
    const siteListContainer = document.getElementById("siteList");
    const siteCount = document.getElementById("siteCount");

    ext.storage.local.get(["blockMode", "blockedSites", "whiteListSites", "alertStyle"], (data) => {
      const mode = data.blockMode || "blacklist";
      if (blockModeSelect) blockModeSelect.value = mode;
      if (alertStyleSelect) alertStyleSelect.value = data.alertStyle || "fullscreen";

      const list = mode === "blacklist" ? (data.blockedSites || []) : (data.whiteListSites || []);
      if (siteCount) siteCount.textContent = `${list.length}`;

      if (siteListContainer) {
        siteListContainer.innerHTML = "";
        list.forEach((site, idx) => {
          const li = document.createElement("li");
          li.className = "site-item";
          li.innerHTML = `
            <span>${site}</span>
            <button class="site-del-btn" title="Delete">✖</button>
          `;

          li.querySelector(".site-del-btn").addEventListener("click", () => {
            list.splice(idx, 1);
            const update = mode === "blacklist" ? { blockedSites: list } : { whiteListSites: list };
            ext.storage.local.set(update, () => renderBlockerTab());
          });

          siteListContainer.appendChild(li);
        });
      }
    });
  }

  if (typeof window !== "undefined") {
    window.initBlockerTab = initBlockerTab;
    window.renderBlockerTab = renderBlockerTab;
    window.addSiteToList = addSiteToList;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.initBlockerTab = initBlockerTab;
    globalThis.renderBlockerTab = renderBlockerTab;
    globalThis.addSiteToList = addSiteToList;
  }
})();
