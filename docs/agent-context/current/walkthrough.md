# Walkthrough - Epoch 10: Phase 2 (Tailwind Integration)

## Overview

This phase focuses on integrating the Color System with Tailwind CSS by generating a preset that maps system tokens to Tailwind utilities.

## Key Decisions

- **Contextual vs. Global**: We map text/border tokens to CSS variables (`var(--text-high-token)`) to preserve the system's contextual logic.
- **Surface Colors**: We map surface colors to their calculated values (`light-dark(...)`) to allow for flexible usage (e.g., `bg-surface-card`), while acknowledging that this bypasses the context system.
- **Output Format**: The CLI exports a CommonJS module (`module.exports = ...`) so it can be directly required in `tailwind.config.js`.

## Implementation Details

### `src/lib/exporters/tailwind.ts`

The `toTailwind` function generates a configuration object with:
- `theme.extend.colors`:
  - `text.*`: Maps to `--text-*-token`.
  - `border.*`: Maps to `--border-*-token`.
  - `surface.*`: Maps to `light-dark(...)` values for each surface.
  - `chart.*`: Maps to `--chart-*` variables.
- `theme.extend.boxShadow`:
  - Maps `sm`, `md`, `lg`, `xl` to `--shadow-*` variables.

### CLI Update

The `export` command now accepts `--format tailwind`. It defaults to outputting `tailwind.preset.js`.

## Verification

- **Unit Tests**: Added `src/lib/exporters/__tests__/tailwind.test.ts` to verify the structure of the generated object.
- **Manual Test**: Ran the CLI against `site/color-config.json` and verified the output file contains the expected keys and values.
