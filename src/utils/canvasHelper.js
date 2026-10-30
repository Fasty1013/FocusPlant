// Focus Plant Pro - Canvas 2D Drawing Utilities

function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== "string") return `rgba(16, 185, 129, ${alpha})`;
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map(x => x + x).join("");
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(16, 185, 129, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function roundRectPath(ctx, x, y, width, height, radius, fill = false, stroke = false) {
  if (!ctx) return;
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();

  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

if (typeof window !== "undefined") {
  window.hexToRgba = hexToRgba;
  window.roundRectPath = roundRectPath;
}
if (typeof globalThis !== "undefined") {
  globalThis.hexToRgba = hexToRgba;
  globalThis.roundRectPath = roundRectPath;
}

