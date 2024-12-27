import chroma from "chroma-js";

export function getProgressColor(value: number): string {

  const clampedValue = Math.min(1, Math.max(0, value));
  const colorScale = chroma.scale(['red', 'orange', 'green']);
  return colorScale(clampedValue).hex();
}