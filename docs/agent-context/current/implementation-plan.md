# Implementation Plan - Epoch 10: Phase 3 - DX Improvements

**Goal**: Improve the Developer Experience (DX) for consumers of the `color-system` by providing robust tooling and documentation for integration.

## 1. JSON Schema for Configuration

We want to provide Intellisense and validation for `color-config.json` files.

- [ ] **Add Schema Generator**: Install `ts-json-schema-generator` as a dev dependency.
- [ ] **Generate Schema**: Create a script `scripts/generate-schema.ts` (or just a package.json script) to generate `color-config.schema.json` from the `SolverConfig` type in `src/lib/types.ts`.
- [ ] **Automate**: Add the schema generation to the `build` script to ensure it stays up to date.
- [ ] **Distribute**: Include the schema in the published package.
- [ ] **Usage Guide**: Document how to use the schema in VS Code (via `$schema` property).

## 2. Figma Integration Guide

We want to explain how to use the exported tokens in design tools.

- [ ] **Research**: Verify the DTCG export format against common Figma plugins (like Tokens Studio).
- [ ] **Documentation**: Create `docs/guide/src/ecosystem/figma.mdx`.
  - Explain the workflow: `color-system export --format dtcg` -> Import to Figma.
  - Recommend plugins (if applicable).
  - Explain limitations (if any).

## 3. CLI Improvements (Optional/Stretch)

- [ ] **Schema Init**: Update `color-system init` to automatically add the `$schema` property to the generated `color-config.json`.

## 4. Verification

- [ ] **Test Schema**: Create a test `color-config.json` and verify that VS Code (or a validator) correctly flags errors and provides completions.
- [ ] **Test Figma Flow**: Manually verify that the DTCG output can be imported into a Figma token plugin.
