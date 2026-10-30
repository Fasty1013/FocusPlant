// Focus Plant Pro - Tasks, Quests & Achievements Controller
(function() {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  function initTasksTab() {
    const todoInput = document.getElementById("todoInput");
    const addTodoBtn = document.getElementById("addTodoBtn");

    function handleAddTodo() {
      if (!todoInput) return;
      const text = todoInput.value.trim();
      if (!text) return;

      ext.storage.local.get(["todos"], (data) => {
        const todos = Array.isArray(data.todos) ? data.todos : [];
        todos.push({ id: Date.now(), text, done: false, rewarded: false });

        ext.storage.local.set({ todos: todos }, () => {
          todoInput.value = "";
          renderTasksTab();
        });
      });
    }

    if (addTodoBtn && !addTodoBtn._boundTasks) {
      addTodoBtn.addEventListener("click", handleAddTodo);
      addTodoBtn._boundTasks = true;
    }
    if (todoInput && !todoInput._boundTasks) {
      todoInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleAddTodo();
      });
      todoInput._boundTasks = true;
    }
  }

  function renderTasksTab() {
    const questList = document.getElementById("questList");
    const todoList = document.getElementById("todoList");
    const coinsCount = document.getElementById("coinsCount");
    const achievementsGrid = document.getElementById("achievementsGrid");
    const achievementsCountBadge = document.getElementById("achievementsCountBadge");

    ext.storage.local.get([
      "quests", "todos", "coins", "achievements", "unlockedSkins",
      "forest", "stats", "strictStreak"
    ], (data) => {
      const quests = Array.isArray(data.quests) ? data.quests : [];
      const todos = Array.isArray(data.todos) ? data.todos : [];
      const coins = data.coins || 0;

      const currentLang = (typeof window.currentLang !== 'undefined')
        ? window.currentLang
        : ((document.getElementById("langSelect") && document.getElementById("langSelect").value) || "ru");

      const i18n = window.i18n || {};
      const t = i18n[currentLang] || i18n.ru || {};

      // 1. Quests Rendering
      if (questList) {
        questList.innerHTML = "";
        quests.forEach(q => {
          const item = document.createElement("div");
          item.className = "quest-item";
          const progressPct = Math.min(100, Math.round((q.current / q.target) * 100));

          let questDesc = q.desc;
          if (q.id === 1) questDesc = t.quest1 || q.desc;
          if (q.id === 2) questDesc = t.quest2 || q.desc;
          if (q.id === 3) questDesc = t.quest3 || q.desc;

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

      // 2. Achievements & Medals Rendering
      let achievements = Array.isArray(data.achievements) ? [...data.achievements] : [];
      const defaultAchievements = window.DEFAULT_ACHIEVEMENTS || [];
      const unlockedSkins = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const forest = Array.isArray(data.forest) ? data.forest : [];
      const strictStreak = data.strictStreak || 0;

      defaultAchievements.forEach(defAch => {
        const found = achievements.find(a => a.id === defAch.id);
        if (!found) achievements.push({ ...defAch });
      });

      let hasAchievementUpdates = false;
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
        } else if (ach.id === "marathon") {
          if (forest.some(t => t.duration >= 90 && t.status === "completed") && !ach.unlocked) {
            shouldUnlock = true;
            currentVal = 1;
            changed = true;
          }
        }

        if (shouldUnlock && !ach.unlocked) {
          hasAchievementUpdates = true;
          return {
            ...ach,
            current: Math.max(currentVal, ach.target),
            unlocked: true,
            unlockedDate: ach.unlockedDate || new Date().toISOString()
          };
        }

        if (changed && currentVal !== ach.current) {
          hasAchievementUpdates = true;
          return { ...ach, current: currentVal };
        }

        return ach;
      });

      if (hasAchievementUpdates) {
        ext.storage.local.set({ achievements: achievements });
      }

      if (achievementsGrid) {
        achievementsGrid.innerHTML = "";
        let unlockedCount = 0;

        achievements.forEach(ach => {
          if (ach.unlocked) unlockedCount++;
          const card = document.createElement("div");
          const isClaimed = !!ach.claimed;
          const isUnlocked = !!ach.unlocked;

          let stateClass = "locked";
          if (isClaimed) stateClass = "claimed";
          else if (isUnlocked) stateClass = "unlocked";

          card.className = `achievement-badge-card ${stateClass}`;

          const titleStr = (ach.title && (ach.title[currentLang] || ach.title.ru)) || ach.id;
          const descStr = (ach.desc && (ach.desc[currentLang] || ach.desc.ru)) || "";

          let progressHtml = "";
          if (ach.target > 1 && !isUnlocked) {
            const pct = Math.min(100, Math.round(((ach.current || 0) / ach.target) * 100));
            progressHtml = `
              <div class="achievement-badge-progress-wrap">
                <div class="achievement-progress-bg">
                  <div class="achievement-progress-bar" style="width: ${pct}%;"></div>
                </div>
                <span class="achievement-progress-text">${ach.current || 0} / ${ach.target}</span>
              </div>
            `;
          }

          let actionHtml = "";
          if (isClaimed) {
            actionHtml = `<span class="achievement-claimed-pill">${t.claimedReward || "✓ Получено"}</span>`;
          } else if (isUnlocked) {
            actionHtml = `<button class="achievement-claim-btn" data-achid="${ach.id}">🎁 +${ach.reward} 🪙</button>`;
          } else {
            actionHtml = `<span class="achievement-locked-pill">🔒 +${ach.reward} 🪙</span>`;
          }

          card.innerHTML = `
            <div class="achievement-badge-icon">${ach.icon}</div>
            <div class="achievement-badge-details">
              <div class="achievement-badge-title-row">
                <span class="achievement-badge-title">${titleStr}</span>
              </div>
              <div class="achievement-badge-desc">${descStr}</div>
              ${progressHtml}
            </div>
            <div class="achievement-badge-action">
              ${actionHtml}
            </div>
          `;

          achievementsGrid.appendChild(card);
        });

        if (achievementsCountBadge) {
          achievementsCountBadge.textContent = `${unlockedCount} / ${achievements.length}`;
        }

        achievementsGrid.querySelectorAll(".achievement-claim-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const achId = btn.dataset.achid;
            const targetAch = achievements.find(a => a.id === achId);
            if (!targetAch || !targetAch.unlocked || targetAch.claimed) return;

            targetAch.claimed = true;
            const newCoins = coins + targetAch.reward;

            ext.storage.local.set({ achievements: achievements, coins: newCoins }, () => {
              if (coinsCount) coinsCount.textContent = newCoins;
              if (typeof soundManager !== "undefined" && soundManager.playCoinSound) {
                soundManager.playCoinSound();
              }
              const toastMsg = typeof t.achievementUnlockedToast === "function"
                ? t.achievementUnlockedToast(targetAch.title[currentLang] || targetAch.title.ru, targetAch.reward)
                : `🏆 Достижение «${targetAch.title.ru}» получено! +${targetAch.reward} 🪙`;
              if (typeof window.showToast === "function") {
                window.showToast(toastMsg);
              }
              renderTasksTab();
            });
          });
        });
      }

      // 3. Todos Rendering
      if (todoList) {
        todoList.innerHTML = "";
        todos.forEach((todo, idx) => {
          const li = document.createElement("li");
          li.className = `todo-item ${todo.done ? "done" : ""}`;
          li.innerHTML = `
            <div class="todo-item-left">
              <input type="checkbox" class="todo-checkbox" ${todo.done ? "checked" : ""}>
              <span>${todo.text}</span>
            </div>
            <button class="todo-del-btn" title="Delete">✖</button>
          `;

          li.querySelector(".todo-checkbox").addEventListener("change", (e) => {
            const checked = e.target.checked;
            todo.done = checked;

            let updatedCoins = coins;
            if (checked && !todo.rewarded) {
              todo.rewarded = true;
              updatedCoins += 5;
              if (coinsCount) coinsCount.textContent = updatedCoins;
              if (typeof soundManager !== "undefined" && soundManager.playCompleteChime) {
                soundManager.playCompleteChime();
              }
            }

            ext.storage.local.set({ todos: todos, coins: updatedCoins }, () => {
              renderTasksTab();
            });
          });

          li.querySelector(".todo-del-btn").addEventListener("click", () => {
            todos.splice(idx, 1);
            ext.storage.local.set({ todos: todos }, () => renderTasksTab());
          });

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
})();
