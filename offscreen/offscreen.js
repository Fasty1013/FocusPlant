// Focus Plant Pro - Offscreen Background Audio Controller
// Allows continuous ambient audio playback even when popup is closed or browser is minimized.

const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

ext.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.action) return false;

  switch (msg.action) {
    case "PLAY_AMBIENT": {
      if (typeof soundManager !== 'undefined') {
        soundManager.playAmbient(msg.soundType);
      }
      sendResponse({ success: true, playing: msg.soundType });
      return true;
    }

    case "STOP_AMBIENT": {
      if (typeof soundManager !== 'undefined') {
        soundManager.stopAmbient();
      }
      sendResponse({ success: true });
      return true;
    }

    case "PLAY_CHIME": {
      if (typeof soundManager !== 'undefined') {
        soundManager.playCompleteChime();
      }
      sendResponse({ success: true });
      return true;
    }

    case "PLAY_WILT": {
      if (typeof soundManager !== 'undefined') {
        soundManager.playWiltSound();
      }
      sendResponse({ success: true });
      return true;
    }

    case "GET_AUDIO_STATUS": {
      const active = (typeof soundManager !== 'undefined') ? soundManager.currentAmbient : "none";
      sendResponse({ active });
      return true;
    }

    default:
      return false;
  }
});

// On document load, check if ambient sound should already be playing
ext.storage.local.get(["ambientSound"], (data) => {
  if (data && data.ambientSound && data.ambientSound !== "none") {
    if (typeof soundManager !== 'undefined') {
      soundManager.playAmbient(data.ambientSound);
    }
  }
});

