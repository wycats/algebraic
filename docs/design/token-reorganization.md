# Design: Token Reorganization

## Current State Analysis

Our current DTCG export (`src/lib/exporters/dtcg.ts`) generates a structure like this:

```json
{
  "light": {
    "surface": { ... },
    "on-surface": { ... },
    "chart": { ... },
    "shadow": { ... }
  },
  "dark": {
    "surface": { ... },
    "on-surface": { ... },
    "chart": { ... },
    "shadow": { ... }
  }
}
```

This is a **"Mode-First"** structure.

## Ecosystem Alignment

### 1. Modes as Top-Level Groups vs. Files

The DTCG spec allows grouping, but tools like Tokens Studio often expect **separate files** (Token Sets) for modes, or a specific internal structure.

- **Current**: We export a single object with `light` and `dark` keys.
- **Recommendation**: We should offer an option to export **separate files** (e.g., `tokens/light.json`, `tokens/dark.json`, `tokens/global.json`). This aligns better with the "Token Sets" mental model.

### 2. Semantic vs. Primitive Separation

Our current export mixes everything into the mode groups. We don't explicitly separate "Primitives" (the raw palette) from "Semantic" tokens (the usage).

- **Current**: We calculate final values (e.g., `oklch(...)`) and export them directly.
- **Recommendation**: We should introduce a **Global/Primitive** layer.
  - Export `keyColors` as a global primitive set (e.g., `color.brand.main`).
  - Export `anchors` as a global primitive set (e.g., `color.neutral.0`, `color.neutral.1000`).
  - Have the mode-specific tokens **reference** these primitives where possible (though our solver calculates unique values per surface, so this might be tricky for surfaces, but valid for key colors).

### 3. Grouping Strategy

Our current grouping (`surface`, `on-surface`, `chart`) is logical but could be more standard.

- **Recommendation**:
  - Move `surface` and `on-surface` under a `color` top-level group to avoid polluting the root namespace.
  - Use `$type` at the group level to reduce repetition.

## Proposed Structure

### File: `primitives.json` (Global)

```json
{
  "color": {
    "brand": { "$value": "#..." },
    "neutral": { ... }
  }
}
```

### File: `light.json` (Mode)

```json
{
  "color": {
    "surface": {
      "page": { "$value": "..." },
      "card": { "$value": "..." }
    },
    "text": {
      "body": { "$value": "..." }
    }
  }
}
```

## Action Plan

1.  **Refactor Exporter**: Update `toDTCG` to return a `Map<string, DTCGGroup>` (filename -> content) instead of a single object.
2.  **CLI Update**: Update `export` command to write multiple files if the exporter returns a map.
3.  **Group Nesting**: Wrap all color tokens in a `color` root group.
