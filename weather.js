// Focus Plant Pro - Weather Effects Compatibility Bridge
// Re-exports from src/modules/weatherController.js

var weatherEffects = (typeof window !== "undefined" && window.weatherEffects)
  || (typeof globalThis !== "undefined" ? globalThis.weatherEffects : null);

if (typeof window !== "undefined") {
  window.weatherEffects = weatherEffects;
}
if (typeof globalThis !== "undefined") {
  globalThis.weatherEffects = weatherEffects;
}
