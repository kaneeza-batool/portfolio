/** --g0…--g4 from styles.css as sRGB, for canvases (and browsers that can't parse oklch()). */
export const GRAPH_HEX = ["#e6dcd0", "#f2ccd6", "#dc9caf", "#c5718c", "#9e4766"];

/** Darken a #rrggbb colour by a factor (0–1), for shaded faces. */
export function shade(hex: string, f: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v * f)));
  return `rgb(${c((n >> 16) & 255)}, ${c((n >> 8) & 255)}, ${c(n & 255)})`;
}
