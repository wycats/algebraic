# Implementation Plan - Epoch 11: Phase 4 - Audit Fixes

## Goal

Address the critical and high-priority issues identified in the "Fresh Eyes Audit 3" to ensure the system is robust, accurate, and "Enterprise Ready".

## Scope

- **Documentation**: Fix the package name in `installation.md` and align Node version requirements.
- **Core Solver**: Refactor `solve()` to return a richer `Theme` object that includes Chart Colors and Primitives (Shadows, Focus).
- **Exporters**: Update `toDTCG` and `toTailwind` to consume the new `Theme` data, ensuring full fidelity exports.
- **CLI**: Improve the robustness of the `init` command's schema path.

## Deliverables

- **Corrected Docs**: `installation.md` points to `@algebraic-systems/color-system`.
- **Enhanced Solver**: `solve()` returns `charts` and `primitives`.
- **Complete Exports**: `tokens.json` (DTCG) and `tailwind.preset.js` include all system tokens.
- **Robust Init**: `color-system init` works reliably.

## Execution Steps

### 1. Documentation Fixes

- [ ] Update `site/src/content/docs/guides/installation.md` with correct package name (`@algebraic-systems/color-system`).
- [ ] Update `package.json` engines to `^24.0.0` (matching `AGENTS.md`).
- [ ] Update `site/src/content/docs/guides/installation.md` with correct Node version (v24+).

### 2. Core Solver Refactor

- [ ] Move Chart Color calculation from `generator.ts` to `src/lib/index.ts` (or `math.ts`).
- [ ] Move Primitive calculation (Shadows, Focus) from `generator.ts` to `src/lib/index.ts`.
- [ ] Update `Theme` interface in `src/lib/types.ts` to include `charts` and `primitives`.
- [ ] Update `solve()` to populate these new fields.

### 3. Exporter Updates

- [ ] Update `src/lib/exporters/dtcg.ts` to export `charts` and `primitives`.
- [ ] Update `src/lib/exporters/tailwind.ts` to export `charts` and `primitives`.
- [ ] Verify exports using `color-system export`.

### 4. CLI Improvements

- [ ] Update `src/cli/index.ts` to use a more robust path for `$schema` (or a URL).

### 5. Verification

- [ ] Run `pnpm build` to ensure types are correct.
- [ ] Run `color-system export` and inspect the output.
- [ ] Verify the documentation site builds.
