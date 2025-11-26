import { SolverConfig, SurfaceGroup, Mode, ColorSpec, BorderTargets, PaletteConfig } from './types.js';

declare function toHighContrast(config: SolverConfig): SolverConfig;
declare function generateTokensCss(groups: SurfaceGroup[], backgrounds: Map<string, Record<Mode, ColorSpec>>, borderTargets?: BorderTargets, selector?: string, palette?: PaletteConfig): string;

export { generateTokensCss, toHighContrast };
