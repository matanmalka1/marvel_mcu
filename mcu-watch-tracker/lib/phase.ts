/** One hue per release phase, tuned to read on the near-black background. */
const PHASE_COLORS: Record<number, string> = {
  1: "#5eb3ff",
  2: "#3ddc97",
  3: "#f5b83d",
  4: "#a98bff",
  5: "#ff6fb1",
  6: "#34d6e8",
};

const FALLBACK_COLOR = "#8f8f9a";

export function phaseColor(phase: number): string {
  return PHASE_COLORS[phase] ?? FALLBACK_COLOR;
}
