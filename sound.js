// Focus Plant Pro - Procedural Audio Compatibility Bridge
// Re-exports from src/audio/soundEngine.js

var soundManager = (typeof window !== "undefined" && window.soundManager)
  || (typeof globalThis !== "undefined" ? globalThis.soundManager : null);

if (typeof window !== "undefined") {
  window.soundManager = soundManager;
}
if (typeof globalThis !== "undefined") {
  globalThis.soundManager = soundManager;
}
