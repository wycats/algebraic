import { SolverConfig, Theme } from './types.js';
export { ThemeManager, ThemeManagerOptions, ThemeMode, updateFavicon, updateThemeColor } from './browser.js';
export { SURFACES } from './constants.js';
export { DEFAULT_CONFIG } from './defaults.js';
export { toHighContrast } from './generator.js';
export { PRESETS, Preset } from './presets.js';

declare function getKeyColorStats(keyColors?: Record<string, string>): {
    lightness?: number;
    chroma?: number;
    hue?: number;
};
declare function solve(config: SolverConfig): Theme;

export { getKeyColorStats, solve };
