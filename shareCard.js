// Focus Plant Pro - Shareable Focus Card Compatibility Bridge
// Re-exports from src/modules/shareCardController.js

var initShareCard = (typeof window !== "undefined" && window.initShareCard)
  || (typeof globalThis !== "undefined" ? globalThis.initShareCard : function() {});

var openShareModal = (typeof window !== "undefined" && window.openShareModal)
  || (typeof globalThis !== "undefined" ? globalThis.openShareModal : function() {});

var drawShareCard = (typeof window !== "undefined" && window.drawShareCard)
  || (typeof globalThis !== "undefined" ? globalThis.drawShareCard : function() {});

if (typeof window !== "undefined") {
  window.initShareCard = initShareCard;
  window.openShareModal = openShareModal;
  window.drawShareCard = drawShareCard;
}
if (typeof globalThis !== "undefined") {
  globalThis.initShareCard = initShareCard;
  globalThis.openShareModal = openShareModal;
  globalThis.drawShareCard = drawShareCard;
}
