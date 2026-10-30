// Focus Plant Pro - Achievements Evaluation Service

function evaluateAchievements(currentAchievements, context) {
  const {
    isHealthy = true,
    durationMin = 25,
    completionHour = new Date().getHours(),
    strictStreak = 0,
    rolledRarity = "common",
    unlockedCount = 1
  } = context;

  const defaultList = (typeof DEFAULT_ACHIEVEMENTS !== "undefined") ? DEFAULT_ACHIEVEMENTS : [];
  let storedAchievements = Array.isArray(currentAchievements) ? [...currentAchievements] : [];

  defaultList.forEach(defAch => {
    const existing = storedAchievements.find(a => a.id === defAch.id);
    if (!existing) {
      storedAchievements.push({ ...defAch });
    }
  });

  let newlyUnlockedAch = null;

  const updatedAchievements = storedAchievements.map(ach => {
    if (ach.unlocked) return ach;

    let shouldUnlock = false;
    let newCurrent = ach.current || 0;

    if (ach.id === "night_owl") {
      if (isHealthy && (completionHour >= 23 || completionHour < 4)) {
        shouldUnlock = true;
        newCurrent = 1;
      }
    } else if (ach.id === "marathon") {
      if (isHealthy && durationMin >= 90) {
        shouldUnlock = true;
        newCurrent = 1;
      }
    } else if (ach.id === "iron_will") {
      newCurrent = strictStreak;
      if (strictStreak >= 5) {
        shouldUnlock = true;
      }
    } else if (ach.id === "mythic_botanist") {
      if (isHealthy && rolledRarity === "mythic") {
        shouldUnlock = true;
        newCurrent = 1;
      }
    } else if (ach.id === "first_sprout") {
      if (isHealthy) {
        shouldUnlock = true;
        newCurrent = 1;
      }
    } else if (ach.id === "grove_master") {
      newCurrent = unlockedCount;
      if (unlockedCount >= 10) {
        shouldUnlock = true;
      }
    }

    if (shouldUnlock) {
      const unlockedAch = {
        ...ach,
        current: Math.max(newCurrent, ach.target),
        unlocked: true,
        unlockedDate: new Date().toISOString()
      };
      newlyUnlockedAch = unlockedAch;
      return unlockedAch;
    }

    return { ...ach, current: newCurrent };
  });

  return { updatedAchievements, newlyUnlockedAch };
}

if (typeof window !== "undefined") {
  window.evaluateAchievements = evaluateAchievements;
}
if (typeof globalThis !== "undefined") {
  globalThis.evaluateAchievements = evaluateAchievements;
}
