// Focus Plant Pro - Tasks, Quests & Achievements Controller

function initTasksTab() {
  const ext = (typeof browser !== "undefined" && browser.runtime) ? browser : chrome;
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");

  function addTodo() {
    if (!todoInput) return;
    const text = todoInput.value.trim();
    if (!text) return;

    ext.storage.local.get(["todos"], (data) => {
      const todos = Array.isArray(data.todos) ? data.todos : [];
      todos.push({ id: Date.now(), text: text, done: false });
      ext.storage.local.set({ todos: todos }, () => {
        todoInput.value = "";
        renderTasksTab();
      });
    });
  }

  if (addTodoBtn) {
    addTodoBtn.addEventListener("click", addTodo);
  }
  if (todoInput) {
    todoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addTodo();
    });
  }
}

function renderTasksTab() {
  const ext = (typeof browser !== "undefined" && browser.runtime) ? browser : chrome;
  const questList = document.getElementById("questList");
  const todoList = document.getElementById("todoList");
  const coinsCount = document.getElementById("coinsCount");
  const achievementsGrid = document.getElementById("achievementsGrid");
  const achievementsCountBadge = document.getElementById("achievementsCountBadge");

  ext.storage.local.get(["quests", "todos", "coins", "achievements", "unlockedSkins", "forest", "stats", "strictStreak"], (data) => {
    const quests = Array.isArray(data.quests) ? data.quests : [];
    const todos = Array.isArray(data.todos) ? data.todos : [];
    const coins = data.coins || 0;
    const lang = (typeof currentLang !== "undefined") ? currentLang : "ru";
    const t = (typeof i18n !== "undefined" && i18n[lang]) ? i18n[lang] : {};

    // 1. Daily Quests
    if (questList) {
      questList.innerHTML = "";
      quests.forEach(q => {
        const item = document.createElement("div");
        item.className = "quest-item";
        const progressPct = Math.min(100, Math.round((q.current / q.target) * 100));

        let questDesc = q.desc;
        if (q.id === 1 && t.quest1) questDesc = t.quest1;
        if (q.id === 2 && t.quest2) questDesc = t.quest2;
        if (q.id === 3 && t.quest3) questDesc = t.quest3;

        item.innerHTML = `
          <div class="quest-item-header">
            <span>${questDesc} (${q.current}/${q.target})</span>
            <span class="quest-reward">+${q.reward} 🪙</span>
          </div>
          <div class="quest-progress-bg">
            <div class="quest-progress-bar" style="width: ${progressPct}%;"></div>
          </div>
          ${
            q.done && !q.claimed
              ? `<button class="quest-claim-btn" data-qid="${q.id}">${t.claimReward || "Забрать"} +${q.reward} 🪙</button>`
              : q.claimed
                ? `<span style="font-size: 0.7rem; color: #a6e3a1; align-self: flex-end;">${t.claimedReward || "✓ Получено"}</span>`
                : ""
          }
        `;
        questList.appendChild(item);
      });

      questList.querySelectorAll(".quest-claim-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const qid = parseInt(btn.dataset.qid, 10);
          const quest = quests.find(q => q.id === qid);
          if (!quest) return;

          quest.claimed = true;
          const newCoins = coins + quest.reward;

          ext.storage.local.set({ quests: quests, coins: newCoins }, () => {
            if (coinsCount) coinsCount.textContent = newCoins;
            if (typeof soundManager !== "undefined" && soundManager.playCompleteChime) {
              soundManager.playCompleteChime();
            }
            renderTasksTab();
          });
        });
      });
    }

    // 2. Achievements & Medals
    if (achievementsGrid) {
      let achievements = Array.isArray(data.achievements) ? [...data.achievements] : [];
      const unlockedSkins = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const forest = Array.isArray(data.forest) ? data.forest : [];
      const strictStreak = data.strictStreak || 0;
      const defaultAchievements = (typeof DEFAULT_ACHIEVEMENTS !== "undefined") ? DEFAULT_ACHIEVEMENTS : [];

      defaultAchievements.forEach(defAch => {
        const found = achievements.find(a => a.id === defAch.id);
        if (!found) achievements.push({ ...defAch });
      });

      // Passive retroactive unlock checks
      let hasUpdates = false;
      achievements = achievements.map(ach => {
        let changed = false;
        let shouldUnlock = false;
        let currentVal = ach.current || 0;

        if (ach.id === "grove_master") {
          currentVal = unlockedSkins.length;
          if (unlockedSkins.length >= 10 && !ach.unlocked) shouldUnlock = true;
          changed = true;
        } else if (ach.id === "iron_will") {
          currentVal = Math.max(currentVal, strictStreak);
          if (strictStreak >= 5 && !ach.unlocked) shouldUnlock = true;
          changed = true;
        } else if (ach.id === "first_sprout") {
          if (forest.some(t => t.status === "completed") && !ach.unlocked) {
            shouldUnlock = true;
            currentVal = 1;
            changed = true;
          }
        } else if (ach.id === "mythic_botanist") {
          if (forest.some(t => t.rarity === "mythic" && t.status === "completed") && !ach.unlocked) {
            shouldUnlock = true;
            currentVal = 1;
            changed = true;
          }
        }

        if (shouldUnlock && !ach.unlocked) {
          hasUpdates = true;
          return {
            ...ach,
            current: Math.max(currentVal, ach.target),
            unlocked: true,
            unlockedDate: new Date().toISOString()
          };
        }

        if (changed && ach.current !== currentVal) {
          hasUpdates = true;
          return { ...ach, current: currentVal };
        }

        return ach;
      });

      if (hasUpdates) {
        ext.storage.local.set({ achievements: achievements });
      }

      const unlockedCount = achievements.filter(a => a.unlocked).length;
      if (achievementsCountBadge) {
        achievementsCountBadge.textContent = `${unlockedCount}/${achievements.length}`;
      }

      achievementsGrid.innerHTML = "";
      achievements.forEach(ach => {
        const card = document.createElement("div");
        const statusClass = ach.claimed ? "claimed" : ach.unlocked ? "unlocked" : "locked";
        card.className = `achievement-badge-card ${statusClass}`;

        const achTitle = (ach.title && (ach.title[lang] || ach.title.ru)) || ach.id;
        const achDesc = (ach.desc && (ach.desc[lang] || ach.desc.ru)) || "";
        const progressPct = Math.min(100, Math.round(((ach.current || 0) / ach.target) * 100));

        card.innerHTML = `
          <div class="achievement-badge-icon">
            <span class="badge-emoji">${ach.icon || "🏆"}</span>
          </div>
          <div class="achievement-badge-details">
            <div class="achievement-badge-title-row">
              <span class="achievement-badge-title">${achTitle}</span>
            </div>
            <span class="achievement-badge-desc">${achDesc}</span>
            <div class="achievement-badge-progress-wrap">
              <div class="achievement-progress-bg">
                <div class="achievement-progress-bar" style="width: ${progressPct}%;"></div>
              </div>
              <span class="achievement-progress-text">${ach.current || 0}/${ach.target}</span>
            </div>
          </div>
          <div class="achievement-badge-action">
            ${
              ach.claimed
                ? `<span class="achievement-claimed-pill">✓ ${t.claimedReward || "Получено"}</span>`
                : ach.unlocked
                  ? `<button class="achievement-claim-btn" data-achid="${ach.id}">+${ach.reward} 🪙</button>`
                  : `<span class="achievement-locked-pill">🔒 +${ach.reward} 🪙</span>`
            }
          </div>
        `;
        achievementsGrid.appendChild(card);
      });

      achievementsGrid.querySelectorAll(".achievement-claim-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const achId = btn.dataset.achid;
          const targetAch = achievements.find(a => a.id === achId);
          if (!targetAch || !targetAch.unlocked || targetAch.claimed) return;

          targetAch.claimed = true;
          const rewardAmount = targetAch.reward || 50;
          const newCoins = coins + rewardAmount;

          ext.storage.local.set({ achievements: achievements, coins: newCoins }, () => {
            if (coinsCount) coinsCount.textContent = newCoins;
            if (typeof soundManager !== "undefined" && soundManager.playCompleteChime) {
              soundManager.playCompleteChime();
            }
            if (typeof showToast === "function") {
              const toastMsg = t.achievementUnlockedToast
                ? t.achievementUnlockedToast((targetAch.title[lang] || targetAch.title.ru), rewardAmount)
                : `🏆 Достижение «${targetAch.title.ru}» получено! +${rewardAmount} 🪙`;
              showToast(toastMsg);
            }
            renderTasksTab();
          });
        });
      });
    }

    // 3. Todo List
    if (todoList) {
      todoList.innerHTML = "";
      todos.forEach(item => {
        const li = document.createElement("li");
        li.className = `todo-item ${item.done ? "done" : ""}`;

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = item.text;
        span.addEventListener("click", () => {
          item.done = !item.done;
          ext.storage.local.set({ todos: todos }, () => renderTasksTab());
        });

        const delBtn = document.createElement("button");
        delBtn.className = "todo-delete-btn";
        delBtn.textContent = "✖";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const filtered = todos.filter(t => t.id !== item.id);
          ext.storage.local.set({ todos: filtered }, () => renderTasksTab());
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
      });
    }
  });
}

if (typeof window !== "undefined") {
  window.initTasksTab = initTasksTab;
  window.renderTasksTab = renderTasksTab;
}
if (typeof globalThis !== "undefined") {
  globalThis.initTasksTab = initTasksTab;
  globalThis.renderTasksTab = renderTasksTab;
}
