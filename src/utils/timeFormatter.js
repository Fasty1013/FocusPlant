// Focus Plant Pro - Time & Date Formatting Utilities

function formatMinutesSeconds(seconds) {
  const s = Math.max(0, Math.floor(Number(seconds) || 0));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function formatLocalDate(dateObj, lang = "ru") {
  const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
  if (isNaN(d.getTime())) return "—";

  const localeMap = {
    ru: "ru-RU",
    en: "en-US",
    uz: "uz-UZ",
    ja: "ja-JP"
  };

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  return d.toLocaleDateString(localeMap[lang] || "ru-RU", options);
}

function formatFullDateTime(dateObj, lang = "ru") {
  const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
  if (isNaN(d.getTime())) return "—";

  const localeMap = {
    ru: "ru-RU",
    en: "en-US",
    uz: "uz-UZ",
    ja: "ja-JP"
  };

  const options = {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  };

  return d.toLocaleDateString(localeMap[lang] || "ru-RU", options);
}

if (typeof window !== "undefined") {
  window.formatMinutesSeconds = formatMinutesSeconds;
  window.formatLocalDate = formatLocalDate;
  window.formatFullDateTime = formatFullDateTime;
}
if (typeof globalThis !== "undefined") {
  globalThis.formatMinutesSeconds = formatMinutesSeconds;
  globalThis.formatLocalDate = formatLocalDate;
  globalThis.formatFullDateTime = formatFullDateTime;
}
