# Walkthrough: Round-Trip DTCG Import

## Overview

This phase focused on implementing the ability to import Design Tokens Community Group (DTCG) format JSON files into the Axiomatic system. The challenge was mapping "flat" or "palette-based" tokens to the "constraint-based" Axiomatic configuration.

## Key Decisions

### Heuristic Mapping

Instead of requiring a strict schema match, we implemented a heuristic importer that infers intent from common naming conventions.

1.  **Key Colors**: We scan for semantic keywords (`brand`, `success`, `danger`) and extract a representative color. We prefer tokens named `500`, `main`, or `base`, falling back to the color with the highest Chroma.
2.  **Anchors**: We identify neutral scales (e.g., `gray`, `neutral`) and use their min/max lightness values to define the `page` and `inverted` context ranges. This ensures the imported system respects the original contrast boundaries.
3.  **Surfaces**: We look for tokens grouped under `surface` or containing `bg`/`background`. These are mapped to `SurfaceConfig` entries.

### CLI Integration

We added a new `import` command to the CLI:
`axiomatic import <file> [--out <file>] [--dry-run]`

This allows users to quickly bootstrap a configuration from an existing design system export.

## Implementation Details

- **`src/lib/importers/dtcg.ts`**: The core logic class. It uses `culori` to analyze color values (Lightness/Chroma) for better inference.
- **`src/cli/commands/import.ts`**: The command handler that orchestrates the file I/O and calls the importer.
- **`src/cli/index.ts`**: Updated to route the `import` command.

## Verification

We verified the importer using a sample `examples/tokens.json` file containing a typical Tailwind-like structure. The output correctly identified the brand color, the neutral range, and the surface tokens.
