import { SolverConfig, SurfaceGroup, Theme, BorderTargets } from './types.js';

declare function toHighContrast(config: SolverConfig): SolverConfig;
declare function generateTokensCss(groups: SurfaceGroup[], theme: Theme, borderTargets?: BorderTargets, selector?: string): string;

export { generateTokensCss, toHighContrast };
