import { PolarityAnchors, SolverConfig, Theme } from './types.js';
export { ThemeManager, ThemeManagerOptions, ThemeMode, updateFavicon, updateThemeColor } from './browser.js';
export { SURFACES } from './constants.js';
export { DEFAULT_CONFIG } from './defaults.js';
export { toHighContrast } from './generator.js';
export { contrastForBackground, roundLightness, solveBackgroundForContrast } from './math.js';
export { PRESETS, Preset } from './presets.js';

declare function getKeyColorStats(keyColors?: Record<string, string>): {
    lightness?: number;
    chroma?: number;
    hue?: number;
};
declare function syncDarkToLight(anchors: PolarityAnchors, polarity: "page" | "inverted", adjustProperty?: "start" | "end"): void;
declare function solve(config: SolverConfig): Theme;

export { getKeyColorStats, solve, syncDarkToLight };
