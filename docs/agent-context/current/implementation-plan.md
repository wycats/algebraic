# Implementation Plan: Epoch 14 (Svelte 5 + Astro Hydration)

## Goal
Establish a reliable, documented pattern for using Svelte 5 interactive components within the Astro Starlight documentation site, resolving the persistent `TypeError: Cannot read properties of undefined (reading 'call')` hydration error.

## Strategy
We will move from "trial and error" to "first principles debugging". We need to understand *why* the hydration fails before we try to fix it again.

## Phase 1: Isolation & Diagnosis
1.  **Dependency Audit**: Ensure we don't have conflicting Svelte versions (already checked, but need to be 100% sure about peer deps).
2.  **Minimal Reproduction**:
    - We already have `DebugVisualizer`.
    - We need to test it in isolation from `StateProvider` and other context wrappers.
    - We need to test if *any* Svelte component works (e.g., a simple `<div>Hello</div>`).
3.  **Configuration Audit**:
    - Review `astro.config.mjs`.
    - Review `tsconfig.json` (compiler options).
    - Review `svelte.config.js` (if it exists, or lack thereof).

## Phase 2: The Playbook
Once we find the working configuration, we will document it in `docs/design/svelte-astro-playbook.md`. This will cover:
- **Directives**: When to use `client:load`, `client:only`, `client:visible`.
- **Wrappers**: The necessity of `<div>` wrappers for Astro Islands.
- **State**: How to safely share state between islands using `svelte/store` or Runes in `.svelte.ts` files.

## Phase 3: Restoration
1.  Apply the fix to `HueShiftVisualizer`.
2.  Uncomment the component in `advanced/hue-shifting.mdx`.
3.  Verify no regression in `ContextVisualizer`.
