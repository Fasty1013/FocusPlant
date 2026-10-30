// Focus Plant Pro - 2.5D Isometric Grid Mathematics

const ISOMETRIC_CONFIG = {
  ORIGIN_X: 188,
  ORIGIN_Y: 66,
  TILE_HALF_WIDTH: 38,
  TILE_HALF_HEIGHT: 20,
  GRID_ROWS: 4,
  GRID_COLS: 4,
  TOTAL_TILES: 16
};

function gridToIsometric(row, col, originX = ISOMETRIC_CONFIG.ORIGIN_X, originY = ISOMETRIC_CONFIG.ORIGIN_Y) {
  const cx = originX + (col - row) * ISOMETRIC_CONFIG.TILE_HALF_WIDTH;
  const cy = originY + (col + row) * ISOMETRIC_CONFIG.TILE_HALF_HEIGHT;
  return { cx, cy };
}

function getDiamondPoints(cx, cy, halfW = ISOMETRIC_CONFIG.TILE_HALF_WIDTH, halfH = ISOMETRIC_CONFIG.TILE_HALF_HEIGHT) {
  const pTop = `${cx},${cy - halfH}`;
  const pRight = `${cx + halfW},${cy}`;
  const pBottom = `${cx},${cy + halfH}`;
  const pLeft = `${cx - halfW},${cy}`;
  return `${pTop} ${pRight} ${pBottom} ${pLeft}`;
}

if (typeof window !== "undefined") {
  window.ISOMETRIC_CONFIG = ISOMETRIC_CONFIG;
  window.gridToIsometric = gridToIsometric;
  window.getDiamondPoints = getDiamondPoints;
}
if (typeof globalThis !== "undefined") {
  globalThis.ISOMETRIC_CONFIG = ISOMETRIC_CONFIG;
  globalThis.gridToIsometric = gridToIsometric;
  globalThis.getDiamondPoints = getDiamondPoints;
}
