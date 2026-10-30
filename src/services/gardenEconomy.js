// Focus Plant Pro - Garden Economy & Selling Calculations

function getTreeSellPrice(tree) {
  if (!tree) return 15;
  if (tree.status === "withered") return 5;

  const skins = (typeof TREE_SKINS !== "undefined") ? TREE_SKINS : {};
  const skin = skins[tree.skin];
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

function getForestDuplicatesSummary(forest) {
  if (!Array.isArray(forest)) return { duplicateCount: 0, totalSellCoins: 0 };

  const skinCounts = {};
  forest.forEach(f => {
    if (f.status !== "withered") {
      skinCounts[f.skin] = (skinCounts[f.skin] || 0) + 1;
    }
  });

  let duplicateCount = 0;
  let totalSellCoins = 0;

  const skins = (typeof TREE_SKINS !== "undefined") ? TREE_SKINS : {};

  Object.entries(skinCounts).forEach(([skinKey, count]) => {
    if (count > 1) {
      const excess = count - 1;
      duplicateCount += excess;
      const sObj = skins[skinKey] || {};
      const sampleTree = { skin: skinKey, rarity: sObj.rarity, status: "completed" };
      totalSellCoins += excess * getTreeSellPrice(sampleTree);
    }
  });

  return { duplicateCount, totalSellCoins };
}

if (typeof window !== "undefined") {
  window.getTreeSellPrice = getTreeSellPrice;
  window.getForestDuplicatesSummary = getForestDuplicatesSummary;
}
if (typeof globalThis !== "undefined") {
  globalThis.getTreeSellPrice = getTreeSellPrice;
  globalThis.getForestDuplicatesSummary = getForestDuplicatesSummary;
}
