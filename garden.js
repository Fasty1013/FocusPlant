// Focus Plant Pro - Virtual 3D Isometric Garden Compatibility Bridge
// Re-exports from src/modules/gardenController.js

var renderGardenTab = (typeof window !== "undefined" && window.renderGardenTab)
  || (typeof globalThis !== "undefined" ? globalThis.renderGardenTab : function() {});

var openHqModal = (typeof window !== "undefined" && window.openHqModal)
  || (typeof globalThis !== "undefined" ? globalThis.openHqModal : function() {});

var renderLivingMeadow = (typeof window !== "undefined" && window.renderLivingMeadow)
  || (typeof globalThis !== "undefined" ? globalThis.renderLivingMeadow : function() {});

var initGardenTab = (typeof window !== "undefined" && window.initGardenTab)
  || (typeof globalThis !== "undefined" ? globalThis.initGardenTab : function() {});

if (typeof window !== "undefined") {
  window.renderGardenTab = renderGardenTab;
  window.openHqModal = openHqModal;
  window.renderLivingMeadow = renderLivingMeadow;
  window.initGardenTab = initGardenTab;
}
if (typeof globalThis !== "undefined") {
  globalThis.renderGardenTab = renderGardenTab;
  globalThis.openHqModal = openHqModal;
  globalThis.renderLivingMeadow = renderLivingMeadow;
  globalThis.initGardenTab = initGardenTab;
}
