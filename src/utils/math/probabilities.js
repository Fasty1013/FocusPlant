// Focus Plant Pro - Drop Chances & Probabilities Engine

function calculateDropChances(minutes) {
  const m = Math.max(5, Math.min(180, Number(minutes) || 25));

  if (m <= 15) {
    return { common: 75, uncommon: 22, rare: 3, epic: 0, legendary: 0, mythic: 0 };
  } else if (m <= 25) {
    return { common: 55, uncommon: 30, rare: 12, epic: 3, legendary: 0, mythic: 0 };
  } else if (m <= 45) {
    return { common: 35, uncommon: 32, rare: 22, epic: 9, legendary: 2, mythic: 0 };
  } else if (m <= 60) {
    return { common: 18, uncommon: 28, rare: 30, epic: 17, legendary: 6, mythic: 1 };
  } else if (m <= 90) {
    return { common: 8, uncommon: 20, rare: 32, epic: 26, legendary: 11, mythic: 3 };
  } else {
    return { common: 3, uncommon: 12, rare: 28, epic: 32, legendary: 18, mythic: 7 };
  }
}

function rollTreeByDuration(minutes, pools = null) {
  const chances = calculateDropChances(minutes);
  const roll = Math.random() * 100;

  let chosenRarity = "common";
  let accum = 0;
  const order = ["mythic", "legendary", "epic", "rare", "uncommon", "common"];
  for (const r of order) {
    accum += chances[r];
    if (roll <= accum) {
      chosenRarity = r;
      break;
    }
  }

  const defaultPools = (typeof RARITY_POOLS !== "undefined") ? RARITY_POOLS : {
    common: ["oak", "birch"],
    uncommon: ["pine", "apple", "orange_tree"],
    rare: ["sakura", "bamboo", "jacaranda"],
    epic: ["wisteria", "autumn_maple", "golden_ginkgo"],
    legendary: ["world_tree", "crystal"],
    mythic: ["mystic", "cosmic"]
  };

  const activePools = pools || defaultPools;
  const pool = activePools[chosenRarity] || ["oak"];
  const skin = pool[Math.floor(Math.random() * pool.length)] || "oak";

  return { skin, rarity: chosenRarity };
}

if (typeof window !== "undefined") {
  window.calculateDropChances = calculateDropChances;
  window.getDropChances = calculateDropChances; // alias
  window.rollTreeByDuration = rollTreeByDuration;
}
if (typeof globalThis !== "undefined") {
  globalThis.calculateDropChances = calculateDropChances;
  globalThis.getDropChances = calculateDropChances;
  globalThis.rollTreeByDuration = rollTreeByDuration;
}
