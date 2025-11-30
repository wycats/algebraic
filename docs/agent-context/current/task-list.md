# Task List: Epoch 14 (Svelte 5 + Astro Hydration Research)

## 🔴 Phase 1: Research & Reproduction
- [ ] Create a minimal reproduction of the hydration error.
  - [ ] Verify if `client:only` works in a fresh Astro + Svelte 5 project (mental check or quick test).
  - [ ] Identify if `pnpm` workspace hoisting is causing version conflicts (multiple svelte versions?).
  - [ ] Check `astro.config.mjs` for conflicting integrations.
- [ ] Document the "Split Test" results definitively.
- [ ] Determine the root cause (e.g., "Svelte 5 requires specific Astro adapter settings", "SVG namespace issues", "Shadow DOM conflicts").

## 🟡 Phase 2: The Playbook
- [ ] Create `docs/design/svelte-astro-playbook.md`.
- [ ] Document the "Golden Rules" for Svelte 5 components in this repo.
  - [ ] Rule: Handling `client:only` vs `client:load`.
  - [ ] Rule: Using `display: contents` wrappers.
  - [ ] Rule: State management across islands.

## 🟢 Phase 3: Remediation
- [ ] Fix `HueShiftVisualizer` using the new playbook.
- [ ] Restore `HueShiftVisualizer` to `advanced/hue-shifting.mdx`.
- [ ] Verify `ContextVisualizer` stability.
