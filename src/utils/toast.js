// Focus Plant Pro - Toast Notification Utility

function showToast(message, duration = 2800) {
  if (typeof document === "undefined") return;

  let toast = document.getElementById("fpToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "fpToast";
    toast.style.position = "fixed";
    toast.style.top = "18px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%) translateY(-24px)";
    toast.style.background = "linear-gradient(135deg, rgba(24, 24, 37, 0.98) 0%, rgba(30, 30, 46, 0.98) 100%)";
    toast.style.border = "1.5px solid #94e2d5";
    toast.style.color = "#ffffff";
    toast.style.padding = "8px 16px";
    toast.style.borderRadius = "20px";
    toast.style.fontSize = "0.78rem";
    toast.style.fontWeight = "700";
    toast.style.zIndex = "99999";
    toast.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.65), 0 0 16px rgba(148, 226, 213, 0.35)";
    toast.style.transition = "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
    toast.style.opacity = "0";
    toast.style.pointerEvents = "none";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";

  if (toast._timer) clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(-24px)";
  }, duration);
}

if (typeof window !== "undefined") {
  window.showToast = showToast;
}
if (typeof globalThis !== "undefined") {
  globalThis.showToast = showToast;
}
