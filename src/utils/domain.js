// Focus Plant Pro - Domain & URL Matching Utilities

function cleanDomain(site) {
  if (!site || typeof site !== "string") return "";
  return site
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .trim();
}

function matchesSiteList(url, siteList) {
  if (!url || !Array.isArray(siteList) || siteList.length === 0) return false;

  try {
    let hostname = "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      hostname = new URL(url).hostname.toLowerCase();
    } else if (typeof window !== "undefined" && window.location && window.location.hostname) {
      hostname = window.location.hostname.toLowerCase();
    } else {
      hostname = url.toLowerCase();
    }

    const lowerUrl = url.toLowerCase();

    return siteList.some(site => {
      const clean = cleanDomain(site);
      if (!clean) return false;
      return (
        hostname === clean ||
        hostname.endsWith("." + clean) ||
        lowerUrl.includes(clean)
      );
    });
  } catch (e) {
    return false;
  }
}

if (typeof window !== "undefined") {
  window.cleanDomain = cleanDomain;
  window.matchesSiteList = matchesSiteList;
  window.checkDomainMatch = matchesSiteList; // alias for content script
}
if (typeof globalThis !== "undefined") {
  globalThis.cleanDomain = cleanDomain;
  globalThis.matchesSiteList = matchesSiteList;
  globalThis.checkDomainMatch = matchesSiteList;
}
