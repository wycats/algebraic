# Friction Log - Epoch 24: Fresh Eyes Simulation

**Date**: 2025-12-03
**Persona**: The Product Engineer
**Scenario**: Zero to One (Fresh Install)

## Summary

The installation and initialization process is smooth and works as expected. The CLI commands function correctly, and the generated assets are valid. However, there are minor inconsistencies in the documentation regarding package manager syntax.

## Findings

### 1. Package Manager Inconsistency (Nit)

- **Location**: `guides/quick-start.mdx`
- **Observation**: The "Install & Initialize" section uses tabs to show `npm` vs `pnpm` commands. However, the "Generate Assets" section immediately following it uses a single code block with `npx`.
- **Impact**: A user using `pnpm` might copy-paste `npx` and get a "command not found" or install a separate version if they don't have `npx` aliased or configured.
- **Recommendation**: Use the `<Tabs>` component for the "Generate Assets" section as well, or stick to a generic syntax (though `npx` is standard, `pnpm exec` is safer for pnpm users).
- **Status**: Fixed (Tabs added to "Generate Assets" section).

### 2. HTML Example Context (Friction)

- **Location**: `guides/quick-start.mdx` -> "Build a Card"
- **Observation**: The HTML example shows how to link the stylesheet (`<link rel="stylesheet" href="/theme.css">`) but assumes the user knows how to serve it. In a Vite/Astro context, importing it in JS/Frontmatter is preferred over a raw link tag which might miss processing.
- **Impact**: A user might try to use the `<link>` tag in a component and fail to load the styles if the build tool doesn't copy the file to the public root.
- **Recommendation**: Add a note about importing CSS in JS/TS files for bundlers.
- **Status**: Fixed (Note added).

### 3. Variable Naming Divergence (Violation)

- **Location**: `guides/quick-start.mdx`
- **Observation**: The HTML example uses raw CSS variables (`--axm-text-high-token`), while the React/Svelte examples use the typed `tokens` object.
- **Impact**: This violates the core axiom about using class-based tokens (utilities) rather than raw variables.
- **Recommendation**: Update the HTML example to use `.text-strong` and `.text-subtle` utilities.
- **Status**: Fixed in Epoch 25.

### 4. Stale Distribution (Blocker/Process)

- **Location**: `pnpm pack`
- **Observation**: Running `pnpm pack` does not automatically run `pnpm build`. If `dist/` is stale or missing files (like `utilities.js` being bundled incorrectly or missing types), the packed tarball is broken.
- **Impact**: A user (or CI) might publish a broken package if they don't run build explicitly.
- **Recommendation**: Add `prepack` script to `package.json` to ensure `build` runs before packing.
- **Status**: Fixed (`prepack` script exists in `package.json`).

## Technical Verification

- **Install**: ✅ Works (simulated with `pnpm pack`)
- **Init**: ✅ Works (`color-config.json` created)
- **Build**: ✅ Works (`theme.css` generated with correct content)
- **Export**: ✅ Works (`theme.ts` generated)
- **Runtime**: ✅ Works (CSS variables resolve correctly in built HTML)
