# Enhancement Implementation Plan

## Goal

Implement recommended improvements from the post-refactor analysis.

**Current Status:** Most phases are complete. Remaining work is focused on final documentation polish.

---

## Remaining Tasks

### Phase 5: Documentation

#### `docs/solver-architecture.md`

**Status:** Complete.

Added Mermaid diagram and pipeline explanation.

### Phase 9: System Completeness (New)

**Goal:** Fill the gaps identified in the "System-Native Authenticity" review.

- [ ] **Missing Primitives**:
  - Implement `.text-link` utility.
  - Implement `.state-disabled` utility.
  - Implement `.state-selected` utility.
- [ ] **Forced Colors Support**:
  - Add `@media (forced-colors: active)` blocks to `base.css`.
  - Map semantic tokens to System Colors (`ButtonFace`, `Highlight`, etc.).

### Phase 10: Project Identity (New)

**Goal:** Transition from "scripts" to "library" to support the Live Solver use case.

- [ ] **Refactor Directory Structure**:
  - Move `scripts/solver` to `src/lib` (or similar).
  - Ensure `demo` imports from the new location.
- [ ] **Package Configuration**:
  - Update `package.json` to export the solver as a library.
  - Add `types` definition.

---

## Completed Tasks

### Phase 1: Cleanup (Done)

- [x] `css/logic.css` deleted
- [x] `scripts/debug-contrast.ts` deleted

### Phase 2: Testing Infrastructure (Done)

- [x] Vitest configured (`vitest.config.ts`)
- [x] Tests created: `math.test.ts`, `generator.test.ts`, `build.test.ts`

### Phase 3: TypeScript + ESLint (Done)

- [x] `tsconfig.json` strict mode verified
- [x] `eslint.config.js` created and configured

### Phase 4: Performance Optimization (Skipped)

- [~] Memoization skipped (Build time ~0.4s is sufficient)

### Phase 5: Documentation (Partial)

- [x] `README.md` updated
- [x] `docs/hue-shift-rationale.md` created

### Phase 6: Robustness & Integration (Done)

- [x] Generator snapshot tests created
- [x] End-to-End build test created
- [x] CI workflow (`.github/workflows/ci.yml`) created

### Phase 7: Demo Enhancements (Done)

- [x] Live Solver Integration (`apca-w3`, `culori` in demo)
- [x] `ContrastTrap` component created
- [x] `Playground` component created

### Phase 8: Experience Lab (Done)

- [x] `ExperienceLab` component created
- [x] `IntentPlayground` component created
- [x] `FearlessInjector` component created
- [x] `ContextPortal` deleted
