# Implementation Plan - Phase 4: Dogfooding & Robustness

## Goal
Ensure the documentation site (`site/`) uses the system's own generated tokens (`theme.css`) for all its styling and visualizations, rather than hardcoded values. This serves as a continuous integration test for the system.

## Strategy

1.  **Token Generation**:
    - Ensure `site/theme.css` is generated from `site/color-config.json` during the build.
    - Verify `astro.config.mjs` imports this CSS.

2.  **Component Refactor**:
    - Audit `site/src/components/` for hardcoded colors (hex, rgb, hsl).
    - Replace them with `var(--surface-*)`, `var(--text-*)`, or `var(--chart-*)`.
    - Key components to check:
        - `DynamicRange.tsx`
        - `ContextVisualizer.tsx`
        - `HueShiftVisualizer.tsx`
        - `GamutComparator.tsx`

3.  **Linting (Exploration)**:
    - Investigate `stylelint` or `eslint` rules to forbid hex codes in `site/src/`.
    - If feasible, add a `lint:colors` script.

## Verification
- The docs site should look correct (light/dark mode) without any "flash of unstyled content" or mismatched colors.
- Changing `site/color-config.json` and regenerating should immediately update the docs visuals.
