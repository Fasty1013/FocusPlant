// Focus Plant Pro - Tree Skins & Procedural Renderer Compatibility Bridge
// Re-exports from src/constants/rarities.constants.js, src/graphics/skinsRegistry.js, and src/graphics/treeRenderer.js

var RARITIES = (typeof window !== "undefined" && window.RARITIES)
  || (typeof globalThis !== "undefined" ? globalThis.RARITIES : {});

var TREE_SKINS = (typeof window !== "undefined" && window.TREE_SKINS)
  || (typeof globalThis !== "undefined" ? globalThis.TREE_SKINS : {});

var renderTreeSVG = (typeof window !== "undefined" && window.renderTreeSVG)
  || (typeof globalThis !== "undefined" ? globalThis.renderTreeSVG : function() { return ""; });

var renderTreeSeedling = (typeof window !== "undefined" && window.renderTreeSeedling)
  || (typeof globalThis !== "undefined" ? globalThis.renderTreeSeedling : function() { return ""; });

var renderSproutSVG = (typeof window !== "undefined" && window.renderSproutSVG)
  || (typeof globalThis !== "undefined" ? globalThis.renderSproutSVG : function() { return ""; });

var renderTreePreview = (typeof window !== "undefined" && window.renderTreePreview)
  || (typeof globalThis !== "undefined" ? globalThis.renderTreePreview : function() { return ""; });

if (typeof window !== "undefined") {
  window.RARITIES = RARITIES;
  window.TREE_SKINS = TREE_SKINS;
  window.renderTreeSVG = renderTreeSVG;
  window.renderTreeSeedling = renderTreeSeedling;
  window.renderSproutSVG = renderSproutSVG;
  window.renderTreePreview = renderTreePreview;
}
if (typeof globalThis !== "undefined") {
  globalThis.RARITIES = RARITIES;
  globalThis.TREE_SKINS = TREE_SKINS;
  globalThis.renderTreeSVG = renderTreeSVG;
  globalThis.renderTreeSeedling = renderTreeSeedling;
  globalThis.renderSproutSVG = renderSproutSVG;
  globalThis.renderTreePreview = renderTreePreview;
}
