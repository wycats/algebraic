# Implementation Plan - Epoch 5: Phase 4 - Demo & Documentation Alignment

## Goal
Update the Demo App and Documentation to reflect the recent system advancements: P3 Gamut support, Browser Integration (`ThemeManager`), and Accessibility features. Ensure the "Theme Builder" UI exposes all new configuration options and educational visualizations.

## 1. Demo App Refactor
- [ ] **Adopt `ThemeManager`**:
  - Replace manual `ThemeContext` logic in `App.tsx` with the `ThemeManager` class from `src/lib/browser.ts`.
  - Verify automatic `meta theme-color` and favicon syncing.
  - Ensure `color-scheme` is correctly applied to the root.
- [ ] **Update `SurfaceManager`**:
  - Add a control for `targetChroma` (Slider: 0 - 0.4).
  - Visualize the chroma effect in the preview area.
- [ ] **High Contrast Simulation**:
  - Add a toggle in the global controls to simulate `prefers-contrast: more`.
  - Since the HC variant is generated at build time (or via `toHighContrast` at runtime), we need to ensure the `LiveThemeInjector` can handle this.
  - *Strategy*: Update `LiveThemeInjector` to optionally generate and append the HC block when a toggle is active.

## 2. New Educational Components
- [ ] **`ContextVisualizer`**:
  - Create a component that explicitly demonstrates surface nesting and polarity switching.
  - Structure: `Page -> Card (Page) -> Spotlight (Inverted) -> Card (Page relative to Spotlight)`.
  - Goal: Show how the *same* surface slug (`card`) adapts to its parent context.
- [ ] **`GamutComparator`**:
  - Create a split-view component comparing sRGB (clamped) vs P3 (vibrant) rendering.
  - Use a high-chroma color (e.g., Neon Purple) to highlight the difference.
  - *Implementation*: Use `color-gamut` media queries or a forced sRGB calculation for the "Standard" side.
- [ ] **`LightnessScale`**:
  - Create a visualization of the Anchor ranges (0-100% Lightness bar).
  - Plot the current surfaces on this scale to show where they land relative to the anchors.
  - Integrate this into the `AnchorsEditor` or `ThemeBuilder` sidebar.

## 3. UI Polish & Terminology
- [ ] **Rename "Solver Playground"**: Change the component name and title to "Hue Shift Visualizer" to distinguish it from the main Theme Builder.
- [ ] **Visual Feedback**:
  - Add a visual indicator when P3 colors are being rendered (e.g., a "P3" badge if the browser supports it).

## 4. Documentation Alignment
- [ ] **Review Embedded Demos**: Check if `docs/guide/src/css/color-system.css` needs a fresh build (it was updated in the last phase, but we should double-check).
- [ ] **Update Screenshots**: (Manual task for later) Identify which screenshots in the docs are outdated.

## 5. Verification
- [ ] **Browser Check**: Verify the demo works in Chrome, Firefox, and Safari.
- [ ] **P3 Check**: Verify that increasing `targetChroma` actually produces vibrant colors on a P3 display (or at least changes the CSS values).
