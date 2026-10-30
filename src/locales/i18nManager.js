// Focus Plant Pro - Internationalization (i18n) Manager

const i18n = {
  ru: typeof ruLocale !== "undefined" ? ruLocale : {},
  en: typeof enLocale !== "undefined" ? enLocale : {},
  uz: typeof uzLocale !== "undefined" ? uzLocale : {},
  ja: typeof jaLocale !== "undefined" ? jaLocale : {}
};

let currentLang = "ru";

function setLanguage(lang) {
  if (i18n[lang]) {
    currentLang = lang;
    if (typeof window !== "undefined") window.currentLang = lang;
    if (typeof globalThis !== "undefined") globalThis.currentLang = lang;
  }
  return currentLang;
}

function getLanguage() {
  return currentLang;
}

function getTranslation(key, ...args) {
  const dict = i18n[currentLang] || i18n.ru;
  const val = dict[key];
  if (typeof val === "function") {
    return val(...args);
  }
  return val || key;
}

if (typeof window !== "undefined") {
  window.i18n = i18n;
  window.currentLang = currentLang;
  window.setLanguage = setLanguage;
  window.getLanguage = getLanguage;
  window.getTranslation = getTranslation;
}
if (typeof globalThis !== "undefined") {
  globalThis.i18n = i18n;
  globalThis.currentLang = currentLang;
  globalThis.setLanguage = setLanguage;
  globalThis.getLanguage = getLanguage;
  globalThis.getTranslation = getTranslation;
}
