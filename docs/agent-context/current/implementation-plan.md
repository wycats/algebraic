# Implementation Plan - Epoch 19: Phase 3 - Verification & Publish

**Goal**: Ensure the rebranded package `@axiomatic-design/color` is correctly configured, builds properly, and is ready for distribution on NPM.

## 1. Package Audit

- [ ] **Metadata Review**
  - Verify `package.json` name is `@axiomatic-design/color`.
  - Verify repository links, homepage, and bugs URL.
  - Verify `exports` field configuration.
- [ ] **Publint Check**
  - Run `publint` to verify package exports are spec-compliant.

## 2. Build Verification

- [ ] **Clean Build**
  - Run `pnpm clean` (if available) or manually remove `dist/`.
  - Run `pnpm build`.
- [ ] **Artifact Inspection**
  - Verify `dist/index.js` (ESM) exists.
  - Verify `dist/index.cjs` (CJS) exists.
  - Verify `dist/index.d.ts` (Types) exists.
  - Verify `dist/cli/index.js` exists and is executable.

## 3. Release Preparation

- [ ] **Dry Run**
  - Run `pnpm publish --dry-run`.
  - Inspect the tarball contents to ensure no unnecessary files are included.
- [ ] **Workflow Review**
  - Review `.github/workflows/publish.yml` to ensure it uses the correct package name and secrets.
