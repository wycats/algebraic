# Implementation Plan - Epoch 12: Framework Migration (Phase 1)

## Goal

Initialize the Svelte 5 environment within the Astro project and validate the migration path by porting foundational components.

## Proposed Changes

### 1. Infrastructure Setup

- [ ] Install `@astrojs/svelte` and `svelte` (v5).
- [ ] Update `astro.config.mjs` to include the Svelte integration.
- [ ] Verify `tsconfig.json` settings for Svelte support.

### 2. Layout Primitives Port

- [ ] Create `site/src/components/layout/Stack.svelte`.
- [ ] Create `site/src/components/layout/Cluster.svelte`.
- [ ] Ensure they match the API and behavior of the React versions.

### 3. Simple Component Port

- [ ] Port `ContrastBadge` to `site/src/components/builder/ContrastBadge.svelte`.
- [ ] Use this to test prop passing and basic logic in Svelte 5.

### 4. Verification

- [ ] Create a temporary test page (or use an existing one) to render the Svelte components.
- [ ] Verify that Svelte and Preact components coexist without issues in the Astro build.
