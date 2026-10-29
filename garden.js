// Focus Plant Pro - 3D Isometric Virtual Garden, Island Renderer & Almanac
// Living 2.5D meadow island, tree inspector modal, HQ preview and duplicate selling system

const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

let activeMeadowFilter = "my";
function initGardenTab() {
  // -------------------------------------------------------------
  // TAB 2: 3D ISOMETRIC VIRTUAL GARDEN & RARITIES ALMANAC
  // -------------------------------------------------------------
  let activeMeadowFilter = "my";

  const btnFilterMyTrees = document.getElementById("btnFilterMyTrees");
  const btnFilterShowcase = document.getElementById("btnFilterShowcase");
  const inspectorCloseBtn = document.getElementById("inspectorCloseBtn");
  const treeInspectorModal = document.getElementById("treeInspectorModal");
  const meadowViewport = document.getElementById("meadowViewport");
  const goToGardenBtn = document.getElementById("goToGardenBtn");

  if (goToGardenBtn) {
    goToGardenBtn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      const gBtn = document.getElementById("tGardenBtn");
      if (gBtn) gBtn.classList.add("active");
      const gTab = document.getElementById("tabGarden");
      if (gTab) gTab.classList.add("active");
      activeTab = "tabGarden";
      renderGardenTab();
    });
  }

  if (btnFilterMyTrees) {
    btnFilterMyTrees.addEventListener("click", () => {
      activeMeadowFilter = "my";
      btnFilterMyTrees.classList.add("active");
      if (btnFilterShowcase) btnFilterShowcase.classList.remove("active");
      renderGardenTab();
    });
  }

  if (btnFilterShowcase) {
    btnFilterShowcase.addEventListener("click", () => {
      activeMeadowFilter = "showcase";
      btnFilterShowcase.classList.add("active");
      if (btnFilterMyTrees) btnFilterMyTrees.classList.remove("active");
      renderGardenTab();
    });
  }

  if (inspectorCloseBtn) {
    inspectorCloseBtn.addEventListener("click", () => {
      if (treeInspectorModal) treeInspectorModal.style.display = "none";
      document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
    });
  }

  if (meadowViewport) {
    meadowViewport.addEventListener("click", (e) => {
      if (!e.target.closest(".iso-tree-sprite") && !e.target.closest(".iso-tile-poly") && !e.target.closest(".tree-inspector-modal")) {
        if (treeInspectorModal) treeInspectorModal.style.display = "none";
        document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
      }
    });
  }

}

  // Helper: Price of selling a duplicate tree
  function getTreeSellPrice(tree) {
    if (!tree) return 15;
    if (tree.status === "withered") return 5;
    const skin = TREE_SKINS[tree.skin];
    if (!skin) return 15;
    const rarityMin = {
      common: 15,
      uncommon: 35,
      rare: 80,
      epic: 160,
      legendary: 300,
      mythic: 500
    };
    const base = skin.price ? Math.round(skin.price * 0.45) : 0;
    return Math.max(rarityMin[skin.rarity] || 15, base);
  }

  // Helper: Calculate total duplicates in user's forest
  function getForestDuplicatesSummary(forest) {
    const skinCounts = {};
    forest.forEach(f => {
      if (f.status !== "withered") {
        skinCounts[f.skin] = (skinCounts[f.skin] || 0) + 1;
      }
    });

    let duplicateCount = 0;
    let totalSellCoins = 0;

    Object.entries(skinCounts).forEach(([skinKey, count]) => {
      if (count > 1) {
        const excess = count - 1;
        duplicateCount += excess;
        const sObj = TREE_SKINS[skinKey] || {};
        const sampleTree = { skin: skinKey, rarity: sObj.rarity, status: "completed" };
        totalSellCoins += excess * getTreeSellPrice(sampleTree);
      }
    });

    return { duplicateCount, totalSellCoins };
  }

  // Toast Notification System
  function showToast(message) {
    let toast = document.getElementById("fpToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fpToast";
      toast.style.position = "fixed";
      toast.style.top = "18px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%) translateY(-24px)";
      toast.style.background = "linear-gradient(135deg, rgba(24, 24, 37, 0.98) 0%, rgba(30, 30, 46, 0.98) 100%)";
      toast.style.border = "1.5px solid var(--accent-mint)";
      toast.style.color = "#fff";
      toast.style.padding = "8px 16px";
      toast.style.borderRadius = "20px";
      toast.style.fontSize = "0.78rem";
      toast.style.fontWeight = "700";
      toast.style.zIndex = "99999";
      toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.65), 0 0 16px rgba(148, 226, 213, 0.35)";
      toast.style.transition = "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
      toast.style.opacity = "0";
      toast.style.pointerEvents = "none";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-24px)";
    }, 2800);
  }

  // Sell individual duplicate tree
  function sellDuplicateTree(tree, sellPrice) {
    const t = i18n[currentLang] || i18n.ru;
    ext.storage.local.get(["forest", "coins"], (data) => {
      let forest = Array.isArray(data.forest) ? [...data.forest] : [];
      let currentCoins = Number(data.coins) || 0;

      let targetIdx = -1;
      if (tree.id) {
        targetIdx = forest.findIndex(f => f.id === tree.id);
      }
      if (targetIdx === -1) {
        if (tree.status === "withered") {
          targetIdx = forest.findIndex(f => f.skin === tree.skin && f.status === "withered");
        } else {
          targetIdx = forest.findIndex(f => f.skin === tree.skin && f.status !== "withered");
        }
      }

      if (targetIdx !== -1) {
        forest.splice(targetIdx, 1);
        const newCoins = currentCoins + sellPrice;

        ext.storage.local.set({ forest, coins: newCoins }, () => {
          if (typeof soundManager !== "undefined" && soundManager.playCoinSound) {
            soundManager.playCoinSound();
          }
          if (coinsCount) coinsCount.textContent = newCoins;

          const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
          const treeName = skinObj.name[currentLang] || skinObj.name.ru;
          showToast(t.toastSoldSuccess ? t.toastSoldSuccess(treeName, sellPrice) : `+${sellPrice} 🪙`);

          if (treeInspectorModal) treeInspectorModal.style.display = "none";
          const hqModal = document.getElementById("hqTreeModal");
          if (hqModal) hqModal.style.display = "none";

          renderGardenTab();
        });
      }
    });
  }

  // Open Full High-Quality Detail Modal (HQ Zoom View)
  function openHqTreeModal(tree, isWithered, fullDateStr, duplicateCount, sellPrice) {
    const hqModal = document.getElementById("hqTreeModal");
    const hqRarity = document.getElementById("hqRarityBadge");
    const hqTitle = document.getElementById("hqTreeTitle");
    const hqDesc = document.getElementById("hqTreeDesc");
    const hqHero = document.getElementById("hqTreeHero");
    const hqGlow = document.getElementById("hqAmbientGlow");
    const hqDate = document.getElementById("hqTreeDate");
    const hqDur = document.getElementById("hqTreeDuration");
    const hqDup = document.getElementById("hqTreeDuplicates");
    const hqVal = document.getElementById("hqTreeValue");
    const hqSell = document.getElementById("hqSellBtn");
    const hqSellText = document.getElementById("hqSellBtnText");
    const hqClose = document.getElementById("hqCloseBtn");
    const hqBack = document.getElementById("hqBackBtn");
    const t = i18n[currentLang] || i18n.ru;

    if (!hqModal) return;

    const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
    const rarityObj = RARITIES[tree.rarity] || RARITIES.common;

    if (hqRarity) {
      hqRarity.textContent = `${rarityObj.stars} ${rarityObj.name[currentLang] || rarityObj.name.ru}`.toUpperCase();
      hqRarity.style.background = rarityObj.bg;
      hqRarity.style.color = rarityObj.color;
      hqRarity.style.border = `1px solid ${rarityObj.border}`;
    }

    if (hqTitle) {
      hqTitle.textContent = `${skinObj.name[currentLang] || skinObj.name.ru} ${skinObj.emoji}`;
    }

    if (hqDesc) {
      hqDesc.textContent = (skinObj.desc && (skinObj.desc[currentLang] || skinObj.desc.ru)) || "";
    }

    if (hqHero) {
      hqHero.innerHTML = renderTreeSVG(tree.skin, 5, isWithered);
    }

    if (hqGlow) {
      const glowColor = rarityObj.color || "#a6e3a1";
      hqGlow.style.background = `radial-gradient(circle, ${glowColor} 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)`;
    }

    if (hqDate) hqDate.textContent = fullDateStr || "—";
    if (hqDur) hqDur.textContent = `${tree.duration || 0} ${t.minuteUnit}`;
    if (hqDup) hqDup.textContent = t.duplicateCount ? t.duplicateCount(duplicateCount) : `${duplicateCount} шт.`;
    if (hqVal) hqVal.textContent = `+${sellPrice} 🪙`;

    if (hqSell) {
      if (!tree.isShowcase && !tree.isStarter && (duplicateCount > 1 || isWithered)) {
        hqSell.style.display = "inline-flex";
        if (hqSellText) {
          hqSellText.textContent = isWithered
            ? (t.recycleWitheredBtn ? t.recycleWitheredBtn(sellPrice) : `Убрать завядшее (+${sellPrice} 🪙)`)
            : (t.sellDuplicateBtn ? t.sellDuplicateBtn(sellPrice) : `Продать дубликат (+${sellPrice} 🪙)`);
        }
        hqSell.onclick = (e) => {
          e.stopPropagation();
          sellDuplicateTree(tree, sellPrice);
          hqModal.style.display = "none";
        };
      } else {
        hqSell.style.display = "none";
      }
    }

    const closeHq = () => { hqModal.style.display = "none"; };
    if (hqClose) hqClose.onclick = closeHq;
    if (hqBack) hqBack.onclick = closeHq;

    const hqShare = document.getElementById("hqShareBtn");
    if (hqShare) {
      hqShare.onclick = (e) => {
        e.stopPropagation();
        openShareModal({
          skin: tree.skin,
          rarity: tree.rarity || (TREE_SKINS[tree.skin] && TREE_SKINS[tree.skin].rarity) || "common",
          duration: tree.duration || 25,
          coins: sellPrice || 30,
          xp: Math.round((tree.duration || 25) * 2),
          isWithered: isWithered,
          date: fullDateStr
        });
      };
    }

    hqModal.style.display = "flex";
  }

  // 3D Isometric 2.5D Island Garden Renderer
  function renderLivingMeadow(forest, t, selectedSkin = "oak") {
    const cliffBase = document.getElementById("isoCliffBase");
    const tilesGroup = document.getElementById("isoTilesGroup");
    const treesContainer = document.getElementById("isoTreesContainer");
    const stageBadge = document.getElementById("meadowStageBadge");
    const modal = document.getElementById("treeInspectorModal");
    const previewEl = document.getElementById("inspectorTreePreview");
    const pillEl = document.getElementById("inspectorRarityPill");
    const titleEl = document.getElementById("inspectorTreeTitle");
    const dateEl = document.getElementById("inspectTreeDate");
    const durEl = document.getElementById("inspectTreeDuration");
    const statusEl = document.getElementById("inspectTreeStatus");

    if (!cliffBase || !tilesGroup || !treesContainer) return;

    cliffBase.innerHTML = "";
    tilesGroup.innerHTML = "";
    treesContainer.innerHTML = "";
    if (modal) modal.style.display = "none";

    const isShowcase = activeMeadowFilter === "showcase";
    const totalGrown = forest.length;

    // Stage milestone calculation
    if (stageBadge) {
      if (isShowcase) {
        stageBadge.textContent = `✨ ${t.showcaseBadge || "Все 12 видов деревьев"}`;
      } else {
        let stageName = t.meadowStage0 || "🌱 Начальный сад";
        if (totalGrown >= 16) stageName = t.meadowStage5 || "🏰 Заповедник";
        else if (totalGrown >= 10) stageName = t.meadowStage4 || "🌲 Густой лес";
        else if (totalGrown >= 5) stageName = t.meadowStage3 || "🌳 Роща";
        else if (totalGrown >= 2) stageName = t.meadowStage2 || "🌿 Полянка";
        else if (totalGrown === 1) stageName = t.meadowStage1 || "🌱 Росток";

        stageBadge.textContent = `${stageName} (${totalGrown}/16)`;
      }
    }

    // Bulk Sell All Duplicates Button in header
    const btnSellAllDuplicates = document.getElementById("btnSellAllDuplicates");
    if (btnSellAllDuplicates) {
      if (!isShowcase && totalGrown > 1) {
        const dupSummary = getForestDuplicatesSummary(forest);
        if (dupSummary.duplicateCount > 0) {
          btnSellAllDuplicates.style.display = "inline-flex";
          btnSellAllDuplicates.textContent = t.sellAllDuplicatesBtn
            ? t.sellAllDuplicatesBtn(dupSummary.duplicateCount, dupSummary.totalSellCoins)
            : `💰 Продать дубликаты (${dupSummary.duplicateCount})`;

          btnSellAllDuplicates.onclick = () => {
            const confirmMsg = t.confirmSellAll
              ? t.confirmSellAll(dupSummary.duplicateCount, dupSummary.totalSellCoins)
              : `Продать все ${dupSummary.duplicateCount} дубликатов за +${dupSummary.totalSellCoins} монет?`;
            if (confirm(confirmMsg)) {
              ext.storage.local.get(["forest", "coins"], (data) => {
                let fList = Array.isArray(data.forest) ? [...data.forest] : [];
                let currentCoins = Number(data.coins) || 0;
                const keptSkins = new Set();
                const newForest = [];
                let removedCount = 0;

                fList.forEach(item => {
                  if (item.status === "withered") {
                    newForest.push(item);
                  } else if (!keptSkins.has(item.skin)) {
                    keptSkins.add(item.skin);
                    newForest.push(item);
                  } else {
                    removedCount++;
                  }
                });

                const newCoins = currentCoins + dupSummary.totalSellCoins;
                ext.storage.local.set({ forest: newForest, coins: newCoins }, () => {
                  if (typeof soundManager !== "undefined" && soundManager.playCoinSound) {
                    soundManager.playCoinSound();
                  }
                  if (coinsCount) coinsCount.textContent = newCoins;
                  showToast(t.toastSoldAllSuccess ? t.toastSoldAllSuccess(removedCount, dupSummary.totalSellCoins) : `+${dupSummary.totalSellCoins} 🪙`);
                  renderGardenTab();
                });
              });
            }
          };
        } else {
          btnSellAllDuplicates.style.display = "none";
        }
      } else {
        btnSellAllDuplicates.style.display = "none";
      }
    }

    // Bulk Sell All Withered Trees Button in header
    const btnSellAllWithered = document.getElementById("btnSellAllWithered");
    if (btnSellAllWithered) {
      if (!isShowcase) {
        const witheredTrees = forest.filter(f => f.status === "withered");
        const witheredCount = witheredTrees.length;
        if (witheredCount > 0) {
          const totalWitheredCoins = witheredCount * 5;
          btnSellAllWithered.style.display = "inline-flex";
          btnSellAllWithered.textContent = t.sellAllWitheredBtn
            ? t.sellAllWitheredBtn(witheredCount, totalWitheredCoins)
            : `🥀 Продать засохшие (${witheredCount} шт. • +${totalWitheredCoins} 🪙)`;

          btnSellAllWithered.onclick = () => {
            const confirmMsg = t.confirmSellAllWithered
              ? t.confirmSellAllWithered(witheredCount, totalWitheredCoins)
              : `Убрать и переработать все ${witheredCount} засохших деревьев за +${totalWitheredCoins} монет?`;
            if (confirm(confirmMsg)) {
              ext.storage.local.get(["forest", "coins"], (data) => {
                let fList = Array.isArray(data.forest) ? [...data.forest] : [];
                let currentCoins = Number(data.coins) || 0;
                const newForest = fList.filter(item => item.status !== "withered");
                const newCoins = currentCoins + totalWitheredCoins;

                ext.storage.local.set({ forest: newForest, coins: newCoins }, () => {
                  if (typeof soundManager !== "undefined" && soundManager.playCoinSound) {
                    soundManager.playCoinSound();
                  }
                  if (coinsCount) coinsCount.textContent = newCoins;
                  showToast(t.toastSoldWitheredSuccess ? t.toastSoldWitheredSuccess(witheredCount, totalWitheredCoins) : `+${totalWitheredCoins} 🪙`);
                  renderGardenTab();
                });
              });
            }
          };
        } else {
          btnSellAllWithered.style.display = "none";
        }
      } else {
        btnSellAllWithered.style.display = "none";
      }
    }

    // Determine what trees to place on the 16 tiles (4x4)
    let tilesData = new Array(16).fill(null);

    if (isShowcase) {
      // Showcase all 16 unique tree varieties (full 4x4 grid!)
      const showcaseSkins = [
        "oak", "birch", "pine", "apple", "orange_tree",
        "sakura", "bamboo", "jacaranda",
        "wisteria", "autumn_maple", "golden_ginkgo", "cyber_neon",
        "world_tree", "crystal", "volcano_magma", "celestial_starlight"
      ];
      showcaseSkins.forEach((skinKey, i) => {
        const sObj = TREE_SKINS[skinKey] || TREE_SKINS.oak;
        tilesData[i] = {
          skin: skinKey,
          rarity: sObj.rarity,
          status: "completed",
          duration: 30 + (i * 10),
          date: new Date().toISOString(),
          isShowcase: true
        };
      });
    } else {
      // Real user forest: if 0 trees, plant active tree in center tile (tile 5)
      if (forest.length === 0) {
        const activeObj = TREE_SKINS[selectedSkin] || TREE_SKINS.oak;
        tilesData[5] = {
          skin: selectedSkin,
          rarity: activeObj.rarity,
          status: "completed",
          duration: 25,
          date: new Date().toISOString(),
          isStarter: true
        };
      } else {
        // Place recent trees into the grid
        const recent = [...forest].slice(-16);
        recent.forEach((tree, i) => {
          tilesData[i] = tree;
        });
      }
    }

    // Render 3D Earth / Cliff Extrusion under the island
    cliffBase.innerHTML = `
      <!-- Deep 3D Left Cliff Wall -->
      <polygon points="36,126 188,206 188,238 36,158" fill="url(#cliffLeft)" />
      <!-- Deep 3D Right Cliff Wall -->
      <polygon points="188,206 340,126 340,158 188,238" fill="url(#cliffRight)" />
      <!-- Cliff Strata Accent Lines -->
      <polygon points="36,134 188,214 188,220 36,140" fill="#1e293b" opacity="0.6" />
      <polygon points="188,214 340,134 340,140 188,220" fill="#0f172a" opacity="0.6" />
      <!-- Mossy Grass Overhang Lip -->
      <path d="M 36,126 Q 74,148 112,165 Q 150,188 188,206 Q 226,188 264,165 Q 302,148 340,126 L 340,131 Q 302,153 264,170 Q 226,193 188,211 Q 150,193 112,170 Q 74,153 36,131 Z" fill="#059669" opacity="0.9" />
    `;

    // Render 16 Isometric Grass Diamond Tiles & Standing Trees
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const i = r * 4 + c;
        const tree = tilesData[i];

        // Isometric projection formulas:
        const cx = 188 + (c - r) * 38;
        const cy = 66 + (c + r) * 20;

        // Diamond vertices: (top, right, bottom, left)
        const pTop = `${cx},${cy - 20}`;
        const pRight = `${cx + 38},${cy}`;
        const pBottom = `${cx},${cy + 20}`;
        const pLeft = `${cx - 38},${cy}`;
        const polyPoints = `${pTop} ${pRight} ${pBottom} ${pLeft}`;

        const fillGrad = (r + c) % 2 === 0 ? "url(#grassGradA)" : "url(#grassGradB)";

        // SVG Diamond Polygon
        const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        poly.setAttribute("points", polyPoints);
        poly.setAttribute("fill", fillGrad);
        poly.setAttribute("stroke", "rgba(255, 255, 255, 0.28)");
        poly.setAttribute("stroke-width", "1");
        poly.setAttribute("class", "iso-tile-poly");
        poly.dataset.slot = i + 1;
        tilesGroup.appendChild(poly);

        // Center Soil Plot Ellipse
        const plot = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        plot.setAttribute("cx", cx);
        plot.setAttribute("cy", cy);
        plot.setAttribute("rx", "16");
        plot.setAttribute("ry", "8");
        plot.setAttribute("fill", "rgba(6, 78, 59, 0.45)");
        plot.setAttribute("stroke", "rgba(255, 255, 255, 0.2)");
        plot.setAttribute("stroke-width", "1");
        plot.setAttribute("stroke-dasharray", "2,2");
        plot.setAttribute("class", "iso-tile-plot");
        tilesGroup.appendChild(plot);

        // Click handler on plot/tile when empty
        if (!tree) {
          poly.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
            if (modal) {
              modal.style.display = "block";
              if (previewEl) previewEl.innerHTML = renderStage1(selectedSkin);
              if (pillEl) {
                pillEl.textContent = "СВОБОДНЫЙ УЧАСТОК";
                pillEl.style.background = "rgba(166, 227, 161, 0.15)";
                pillEl.style.color = "#a6e3a1";
                pillEl.style.border = "1px solid #a6e3a1";
              }
              if (titleEl) titleEl.textContent = `Грядка #${i + 1} 🌱`;
              if (dateEl) dateEl.textContent = "Ждёт семян";
              if (durEl) durEl.textContent = "—";
              if (statusEl) {
                statusEl.textContent = "Запустите таймер фокуса, чтобы посадить здесь дерево!";
                statusEl.className = "inspector-status-badge";
              }

              // Hide duplicate info and buttons for empty plots
              const duplicatesRowEl = document.getElementById("inspectDuplicatesRow");
              if (duplicatesRowEl) duplicatesRowEl.style.display = "none";
              const btnSell = document.getElementById("btnSellDuplicate");
              if (btnSell) btnSell.style.display = "none";
              const btnOpenHq = document.getElementById("btnOpenHqModal");
              if (btnOpenHq) btnOpenHq.style.display = "none";
            }
          });
        } else {
          // Tree is planted on this tile
          const isWithered = tree.status === "withered";
          const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
          const rarityObj = RARITIES[tree.rarity] || RARITIES.common;

          // Glow class based on rarity
          let glowClass = "";
          if (tree.rarity === "rare") glowClass = "rare-neon";
          else if (tree.rarity === "epic") glowClass = "epic-crystal";
          else if (["legendary", "mythic"].includes(tree.rarity)) glowClass = "legendary-cosmic";

          // Tree Sprite DOM Element (Upright in 2D Screen Space, NO Squashing!)
          const treeSprite = document.createElement("div");
          treeSprite.className = `iso-tree-sprite ${glowClass}`;
          treeSprite.dataset.slot = i + 1;
          treeSprite.style.left = `${cx}px`;
          treeSprite.style.top = `${cy}px`;
          // Depth sort: tiles further down the screen (larger r+c) occlude tiles in back
          treeSprite.style.zIndex = (r + c) * 10 + 5;

          // Staggered wind sway animation
          const swayDelay = -((i * 0.45) % 3.8).toFixed(2);
          treeSprite.style.animationDelay = `${swayDelay}s`;

          // Tree contact shadow directly under the trunk
          const shadowEl = document.createElement("div");
          shadowEl.className = "tree-contact-shadow";
          treeSprite.appendChild(shadowEl);

          // Full SVG Tree Graphics
          const svgWrap = document.createElement("div");
          svgWrap.style.width = "100%";
          svgWrap.style.height = "100%";
          svgWrap.innerHTML = renderTreeSVG(tree.skin, 5, isWithered);
          treeSprite.appendChild(svgWrap);

          treesContainer.appendChild(treeSprite);

          // Date & Time formatting
          const dateStr = tree.date ? new Date(tree.date).toLocaleDateString() : "";
          const timeStr = tree.date ? new Date(tree.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
          const fullDateStr = `${dateStr} ${timeStr}`.trim();

          // Inspection function
          const triggerInspect = (e) => {
            e.stopPropagation();
            document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
            treeSprite.classList.add("inspected");

            if (modal) {
              modal.style.display = "block";
              if (previewEl) {
                previewEl.innerHTML = renderTreeSVG(tree.skin, 5, isWithered);
              }
              if (pillEl) {
                pillEl.textContent = `${rarityObj.stars} ${rarityObj.name[currentLang] || rarityObj.name.ru}`.toUpperCase();
                pillEl.style.background = rarityObj.bg;
                pillEl.style.color = rarityObj.color;
                pillEl.style.border = `1px solid ${rarityObj.border}`;
              }
              if (titleEl) {
                titleEl.textContent = `${skinObj.name[currentLang] || skinObj.name.ru} ${skinObj.emoji}`;
              }
              if (dateEl) {
                dateEl.textContent = fullDateStr || "—";
              }
              if (durEl) {
                durEl.textContent = `${tree.duration || 0} ${t.minuteUnit}`;
              }
              if (statusEl) {
                statusEl.textContent = isWithered
                  ? (tree.reason ? `🥀 ${t.withered}: ${tree.reason}` : `🥀 ${t.inspectStatusWithered}`)
                  : (tree.isStarter ? `🌱 Ваш саженец (готов к росту!)` : `🌱 ${t.inspectStatusGrown}`);
                statusEl.className = `inspector-status-badge ${isWithered ? "withered" : ""}`;
              }

              // Duplicates Count Display
              const sameSkinTrees = forest.filter(f => f.skin === tree.skin && f.status !== "withered");
              const duplicateCount = sameSkinTrees.length;
              const duplicatesValEl = document.getElementById("inspectDuplicatesVal");
              const duplicatesRowEl = document.getElementById("inspectDuplicatesRow");
              if (duplicatesValEl && duplicatesRowEl) {
                if (isShowcase || tree.isStarter) {
                  duplicatesRowEl.style.display = "none";
                } else {
                  duplicatesRowEl.style.display = "flex";
                  duplicatesValEl.textContent = t.duplicateCount ? t.duplicateCount(duplicateCount) : `${duplicateCount} шт.`;
                }
              }

              // Sell Duplicate Button
              const btnSell = document.getElementById("btnSellDuplicate");
              const lblSell = document.getElementById("lblSellDuplicate");
              const sellPrice = getTreeSellPrice(tree);
              if (btnSell) {
                if (!isShowcase && !tree.isStarter && (duplicateCount > 1 || isWithered)) {
                  btnSell.style.display = "inline-flex";
                  const btnText = isWithered
                    ? (t.recycleWitheredBtn ? t.recycleWitheredBtn(sellPrice) : `Убрать завядшее (+${sellPrice} 🪙)`)
                    : (t.sellDuplicateBtn ? t.sellDuplicateBtn(sellPrice) : `Продать дубликат (+${sellPrice} 🪙)`);
                  if (lblSell) lblSell.textContent = btnText;
                  else btnSell.textContent = `💰 ${btnText}`;

                  btnSell.onclick = (ev) => {
                    ev.stopPropagation();
                    sellDuplicateTree(tree, sellPrice);
                  };
                } else {
                  btnSell.style.display = "none";
                }
              }

              // Open HQ Zoom View Handlers
              const openHqAction = (ev) => {
                ev.stopPropagation();
                openHqTreeModal(tree, isWithered, fullDateStr, duplicateCount, sellPrice);
              };

              const btnZoom = document.getElementById("btnInspectZoom");
              const btnOpenHq = document.getElementById("btnOpenHqModal");
              const previewWrap = document.getElementById("inspectorPreviewWrap");

              if (btnZoom) btnZoom.onclick = openHqAction;
              if (btnOpenHq) {
                btnOpenHq.style.display = "inline-flex";
                btnOpenHq.onclick = openHqAction;
              }
              if (previewWrap) previewWrap.onclick = openHqAction;
            }
          };

          treeSprite.addEventListener("click", triggerInspect);
          poly.addEventListener("click", triggerInspect);
        }
      }
    }
  }

  function renderGardenTab() {
    ext.storage.local.get(["forest", "stats", "unlockedSkins", "selectedSkin"], (data) => {
      const forest = Array.isArray(data.forest) ? data.forest : [];
      const stats = data.stats || {
        totalSessions: 0,
        completedSessions: 0,
        witheredSessions: 0,
        totalFocusMinutes: 0,
        dailyStats: [0, 0, 0, 0, 0, 0, 0]
      };
      const unlocked = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const currentSelected = data.selectedSkin || "oak";
      const t = i18n[currentLang] || i18n.ru;

      const grown = stats.completedSessions || 0;
      const withered = stats.witheredSessions || 0;
      const total = grown + withered;
      const rate = total > 0 ? Math.round((grown / total) * 100) : 100;

      statGrown.textContent = grown;
      statWithered.textContent = withered;
      statMinutes.textContent = `${stats.totalFocusMinutes || 0}m`;
      statRate.textContent = `${rate}%`;

      // Render Interactive 3D Isometric Living Meadow Island
      renderLivingMeadow(forest, t, currentSelected);

      // Render Rarities Almanac
      const allSkins = Object.values(TREE_SKINS);
      almanacCounter.textContent = `${unlocked.length} / ${allSkins.length} ${t.almanacUnlocked}`;
      almanacGrid.innerHTML = "";

      allSkins.forEach(skin => {
        const isOwned = unlocked.includes(skin.id);
        const isEquipped = currentSelected === skin.id;
        const rarityObj = RARITIES[skin.rarity] || RARITIES.common;

        const item = document.createElement("div");
        item.className = `almanac-item ${isOwned ? "" : "locked"} ${isEquipped ? "equipped" : ""}`;
        item.style.borderColor = isOwned ? rarityObj.border : "var(--border-color)";

        item.innerHTML = `
          <div class="almanac-icon">${isOwned ? skin.emoji : "🔒"}</div>
          <div class="almanac-name">${skin.name[currentLang] || skin.name.ru}</div>
          <span class="almanac-rarity" style="background:${rarityObj.bg};color:${rarityObj.color};">${rarityObj.stars}</span>
        `;

        item.title = isOwned
          ? `${skin.name[currentLang] || skin.name.ru} (${rarityObj.name[currentLang] || rarityObj.name.ru})\n${skin.desc[currentLang] || skin.desc.ru}\n${t.almanacClickEquip}`
          : skin.exclusiveShop
            ? `${skin.name[currentLang] || skin.name.ru}\n${t.exclusiveShopDesc || "💎 Эксклюзив магазина (нельзя выбить, только в магазине)"}`
            : `${t.almanacLockedHint}\n[${rarityObj.name[currentLang] || rarityObj.name.ru}]`;

        if (isOwned) {
          item.addEventListener("click", () => {
            ext.storage.local.set({ selectedSkin: skin.id }, () => {
              soundManager.playCompleteChime();
              renderGardenTab();
              syncTimerFromStorage();
            });
          });
        }

        almanacGrid.appendChild(item);
      });

      // Render 7-day Bar Chart
      statsChart.innerHTML = "";
      const daily = Array.isArray(stats.dailyStats) ? stats.dailyStats : [0, 0, 0, 0, 0, 0, 0];
      const maxVal = Math.max(...daily, 15);

      daily.forEach(val => {
        const col = document.createElement("div");
        col.className = "bar-column";
        const heightPct = Math.min(100, Math.max(6, Math.round((val / maxVal) * 100)));
        col.style.height = `${heightPct}%`;
        col.title = `${val} ${t.minuteUnit}`;
        statsChart.appendChild(col);
      });

      // Render Forest Gallery
      forestGrid.innerHTML = "";
      if (forest.length === 0) {
        forestGrid.innerHTML = `<div class="empty-state">${t.forestEmpty}</div>`;
      } else {
        const recent = [...forest].reverse().slice(0, 36);
        recent.forEach(tree => {
          const cell = document.createElement("div");
          const isWithered = tree.status === "withered";
          cell.className = `forest-cell ${isWithered ? "withered" : ""}`;

          const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
          const icon = isWithered ? "🥀" : skinObj.emoji;
          cell.textContent = icon;

          const dateStr = tree.date ? new Date(tree.date).toLocaleDateString() : "";
          const durStr = `${tree.duration || 0} ${t.minuteUnit}`;
          const reasonStr = isWithered ? `\n${tree.reason}` : "";
          const rarityName = tree.rarity ? ` [${RARITIES[tree.rarity]?.name[currentLang] || ""}]` : "";
          cell.title = `${isWithered ? t.withered : t.grown}: ${skinObj.name[currentLang] || skinObj.name.ru}${rarityName}\n${durStr} • ${dateStr}${reasonStr}`;

          cell.addEventListener("click", () => {
            const sameSkinTrees = forest.filter(f => f.skin === tree.skin && f.status !== "withered");
            const dupCount = sameSkinTrees.length;
            const sPrice = getTreeSellPrice(tree);
            openHqTreeModal(tree, isWithered, dateStr, dupCount, sPrice);
          });

          forestGrid.appendChild(cell);
        });
      }
    });
  }


// Global exports on window
window.initGardenTab = initGardenTab;
window.renderGardenTab = renderGardenTab;
window.openHqModal = openHqModal;
window.renderLivingMeadow = renderLivingMeadow;
window.getTreeSellPrice = getTreeSellPrice;
window.getForestDuplicatesSummary = getForestDuplicatesSummary;
