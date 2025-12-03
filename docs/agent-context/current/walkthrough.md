# Walkthrough: Reactive Pipeline Architecture

## Overview

In this phase, we refactored the CSS engine to support "Late-Binding" color resolution. This allows utilities like `.text-subtle` and `.hue-brand` to be composed dynamically.

## Key Changes

### 1. Indirection Variables

We introduced a layer of indirection in `css/engine.css`. Instead of calculating colors directly from tokens, the engine now calculates them from "Source Variables":

- `--text-lightness-source` (Defaults to `--axm-text-high-token`)
- `--text-chroma-source` (Defaults to `--base-chroma`)
- `--text-hue-source` (Defaults to `--base-hue`)

### 2. Utility Logic

Utilities now modify these _inputs_ rather than setting `color` directly.

- **`.text-subtle`**: Sets `--text-lightness-source: var(--axm-text-subtle-token)`.
- **`.hue-brand`**: Sets `--text-hue-source` and `--text-chroma-source`.

### 3. The Calculation

The engine re-calculates the final color whenever these inputs change:

```css
--computed-fg-color: oklch(
  from var(--text-lightness-source) l var(--computed-fg-C) var(--computed-fg-H)
);
```

This ensures that `.text-subtle` inside a `.hue-brand` context correctly picks up the brand hue while maintaining the subtle lightness.

### 4. Presets & Typography

We implemented a mathematical typography scale using Cubic Bezier interpolation.

- **Configuration**: Added `TypeScaleConfig` to `SolverConfig`.
- **Logic**: `generateTypeScale` calculates font sizes based on a curve, allowing for fluid scaling from `minSize` to `maxSize`.
- **Output**: Generates `--axm-preset-text-*` variables and corresponding utility classes (`.text-sm`, `.text-xl`, etc.).

### 5. Border Refactor

We separated border definitions into structural and cosmetic components.

- **Structure**: `--axm-preset-border-width` and `--axm-preset-border-style`.
- **Utilities**:
  - `.preset-bordered`: Applies the structural variables.
  - `.bordered`: Applies the cosmetic color (legacy/simple usage).

## Verification

We verified the changes by regenerating `css/theme.css` and inspecting the output. The generated CSS now contains the correct variable assignments.
