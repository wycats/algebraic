# Walkthrough - Epoch 5: Phase 2 - Accessibility & High Contrast

## Goal
The goal of this phase was to ensure the Color System is robust and accessible in various challenging environments: Windows High Contrast (Forced Colors), user-preferred High Contrast (`prefers-contrast: more`), and Print.

## Key Changes

### 1. Forced Colors Support (Windows High Contrast)
We audited and refined the `forced-colors` support in `css/engine.css`.
- **System Color Mapping**: Verified that surfaces map to standard system colors (`Canvas`, `ButtonFace`, `Highlight`).
- **Interactive States**: Added overrides for `::selection` and `:focus-visible` to ensure they use the `Highlight` system color, which is critical for visibility in this mode.
- **Borders**: Confirmed that all surfaces enforce a border in forced colors mode (since backgrounds often disappear).

### 2. High Contrast Preference (`prefers-contrast: more`)
We implemented a **Build-time Algorithmic Enhancement** strategy.
- **No Runtime Cost**: Instead of using JavaScript to detect the preference and re-solve, we generate a high-contrast variant of the theme during the build process.
- **`toHighContrast` Utility**: Created a new utility in `src/lib/generator.ts` that:
  - **Widens Anchors**: Pushes background and foreground anchors to 0% (Black) and 100% (White) to maximize dynamic range.
  - **Desaturates**: The generated CSS block forces `--base-chroma: 0`, ensuring text and surfaces are grayscale for maximum sharpness.
- **CLI Update**: The `color-system` CLI now automatically generates this variant and appends it to `theme.css` inside a `@media (prefers-contrast: more)` block.

### 3. Print Styles
We added a `@media print` block to `css/engine.css`.
- **Ink Saving**: Forces `color-scheme: light` and removes background colors from main surfaces (`.surface-card`, etc.).
- **Legibility**: Ensures text is black.
- **Cleanup**: Hides interactive elements like `.surface-action` to produce a clean document.

### 4. Documentation
- Created a new **Accessibility** guide (`docs/guide/src/usage/accessibility.md`) detailing these features and how to test them.
- Added the guide to the `SUMMARY.md`.

## Verification
- **Tests**: All unit tests passed.
- **Lint**: Codebase is lint-free.
- **Manual Verification**:
  - `theme.css` contains the `@media (prefers-contrast: more)` block with widened anchors (White/Black tokens).
  - `engine.css` contains the `@media print` and `@media (forced-colors: active)` blocks.
