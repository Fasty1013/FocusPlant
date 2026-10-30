// Focus Plant Pro - Economy, Rewards & Pricing Constants

const ECONOMY_CONSTANTS = {
  REWARDS: {
    BASE_COMPLETION_COINS: 20,
    DURATION_DIVISOR: 3, // + floor(minutes / 3) coins
    XP_MULTIPLIER: 2 // duration * 2 XP
  },
  SELLING: {
    DEFAULT_TREE_PRICE: 15,
    WITHERED_TREE_PRICE: 5,
    DUPLICATE_PRICE_RATIO: 0.45,
    RARITY_MIN_SELL_PRICES: {
      common: 15,
      uncommon: 35,
      rare: 80,
      epic: 160,
      legendary: 300,
      mythic: 500
    }
  }
};

if (typeof window !== "undefined") {
  window.ECONOMY_CONSTANTS = ECONOMY_CONSTANTS;
}
if (typeof globalThis !== "undefined") {
  globalThis.ECONOMY_CONSTANTS = ECONOMY_CONSTANTS;
}

