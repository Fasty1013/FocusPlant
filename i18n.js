// Focus Plant Pro - Internationalization & Achievements Compatibility Bridge
// Re-exports from src/locales/i18nManager.js and src/constants/achievements.constants.js

var i18n = (typeof window !== "undefined" && window.i18n)
  || (typeof globalThis !== "undefined" ? globalThis.i18n : {});

var DEFAULT_ACHIEVEMENTS = (typeof window !== "undefined" && window.DEFAULT_ACHIEVEMENTS)
  || (typeof globalThis !== "undefined" ? globalThis.DEFAULT_ACHIEVEMENTS : []);

var i18nManager = (typeof window !== "undefined" && window.i18nManager)
  || (typeof globalThis !== "undefined" ? globalThis.i18nManager : null);

if (typeof window !== "undefined") {
  window.i18n = i18n;
  window.DEFAULT_ACHIEVEMENTS = DEFAULT_ACHIEVEMENTS;
  window.i18nManager = i18nManager;
}
if (typeof globalThis !== "undefined") {
  globalThis.i18n = i18n;
  globalThis.DEFAULT_ACHIEVEMENTS = DEFAULT_ACHIEVEMENTS;
  globalThis.i18nManager = i18nManager;
}
