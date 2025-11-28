# Walkthrough - Epoch 12: Framework Migration (Phase 1)

## Goal

Initialize the Svelte 5 environment within the Astro project and validate the migration path by porting foundational components.

## Changes

### Infrastructure

- Installed `svelte@latest` (v5) and `@astrojs/svelte`.
- Updated `astro.config.mjs` to include the `svelte()` integration.
- Verified `tsconfig.json` compatibility.

### Component Porting

- **Layout Primitives**: Ported `Stack` and `Cluster` from React to Svelte 5.
  - Used Svelte 5 snippets (`{@render children()}`) for slot content.
  - Reused existing CSS classes for consistency.
- **ContrastBadge**: Ported to Svelte 5.
  - Used `$props()` for props definition.
  - Used `$derived` and `$derived.by` for reactive logic.
  - Implemented pure prop-based API (accepting `solved` theme) to avoid Context dependency during migration.

### Fixes

- **Restored Missing Components**: Recreated `ContextVisualizer` and `HueShiftVisualizer` which were missing from the codebase (likely deleted in a previous cleanup) but referenced in documentation.
- **Fixed Imports**: Updated import paths in `SystemDemo.tsx`, `HueShiftDemo.tsx`, and MDX files to resolve build errors caused by the removal of the `demo` alias/directory.
- **Theme Builder Layout**: Fixed a layout regression in the Theme Builder documentation page by wrapping it in a `.not-content` div. This prevents Starlight's prose styles from interfering with the application layout and ensures correct text contrast.

## Verification

- Created a temporary `svelte-test.astro` page to render the new components.
- Successfully built the site (`pnpm build`), confirming that Svelte components are compiled correctly and coexist with Preact components.
