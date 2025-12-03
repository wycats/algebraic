# Implementation Plan - Epoch 23: Presets & Utilities

## Goal

Refactor the utility generation system to support configurable presets for typography and borders, and ensure all color utilities are derived directly from standard tokens. This moves the system from hardcoded utility classes to a flexible, config-driven approach.

## Scope

- **Configuration**: Extend `SolverConfig` to include a `presets` section.
- **Typography**: Implement configurable font families and a Bezier-curve based type scale generator.
- **Borders**: Split border utilities into structural (`preset-bordered`) and cosmetic (`bordered`) classes.
- **Colors**: Auto-generate text color utilities (`.text-*`) from the generated tokens.
- **Generator**: Update `generateTokensCss` to consume the new configuration and output the refined CSS.

## Design

### 1. Configuration Schema (`src/lib/types.ts`)

We will add a `presets` object to `SolverConfig`:

```typescript
export interface TypographyPreset {
  family: string; // e.g. "ui-monospace, SFMono-Regular, ..."
  weights?: Record<string, number>; // e.g. { regular: 400, bold: 700 }
}

export interface TypeScaleConfig {
  steps: number; // Number of sizes to generate (e.g. 5 for xs, sm, base, lg, xl)
  minSize: number; // Base size in rem (e.g. 0.75)
  maxSize: number; // Max size in rem (e.g. 3.0)
  curve: BezierCurve; // Control points for the scaling curve
}

export interface PresetsConfig {
  typography: {
    fonts: {
      sans?: TypographyPreset;
      serif?: TypographyPreset;
      mono?: TypographyPreset;
    };
    scale: TypeScaleConfig;
  };
  borders: {
    width: string; // e.g. "1px"
    style: string; // e.g. "solid"
  };
}

// Update SolverConfig
export type SolverConfig = {
  // ... existing fields
  presets?: PresetsConfig;
};
```

### 2. Utility Generation Logic

#### Text Colors

We will update the engine to support an indirection variable for text lightness, allowing utilities to switch the source token without breaking the chroma/hue injection pipeline.

**Engine Update (Conceptual):**

```css
:where([class^="surface-"], [class*=" surface-"], body) {
  /* Default to high contrast text */
  --text-lightness-source: var(--axm-text-high-token);

  /* Calculate final color using the source lightness + computed chroma/hue */
  --computed-fg-color: oklch(
    from var(--text-lightness-source) l var(--computed-fg-C)
      var(--computed-fg-H)
  );

  color: var(--computed-fg-color);
}
```

**Utility Generation:**

- `.text-high` -> `--text-lightness-source: var(--axm-text-high-token);`
- `.text-subtle` -> `--text-lightness-source: var(--axm-text-subtle-token);`
- `.text-subtlest` -> `--text-lightness-source: var(--axm-text-subtlest-token);`

**Key Colors:**
For key colors (e.g. `.text-brand`), we want to override the hue and chroma entirely, while likely preserving the lightness of the text token (or using the key color's lightness if intended).

- `.text-[key]` ->
  - `--default-fg-hue: var(--axm-hue-[key]);`
  - `--override-fg-chroma: var(--axm-chroma-[key]);`
  - (Optional) `--text-lightness-source: var(--axm-key-[key]-color);` if we want the key color's lightness too.

#### Borders

- `.bordered`: Sets `border-color: var(--axm-border-dec-token)`.
- `.preset-bordered`: Sets `border: [width] [style] var(--axm-border-dec-token)`.

#### Typography

- **Families**: Generate `.font-sans`, `.font-serif`, `.font-mono` based on config.
- **Scale**:
  - Map linear domain `t = [0, 1]` to `[minSize, maxSize]` using cubic bezier.
  - Output: `.text-xs`, `.text-sm`, etc.

## Execution Steps

1.  **Update Types**: Modify `src/lib/types.ts` to include `PresetsConfig`.
2.  **Update Defaults**: Add default values in `src/lib/defaults.ts`.
3.  **Update Engine CSS**: Modify `css/engine.css` to use `--text-lightness-source`.
4.  **Refactor Generator**:
    - Implement `generateUtilityCss`.
    - Update `generateTokensCss` to include utilities.
5.  **Verify**:
    - Run `pnpm build`.
    - Check output CSS.
