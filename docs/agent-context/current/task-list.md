# Task List - Epoch 19: Phase 3 - Verification & Publish

## 1. Package Audit

- [ ] **Metadata Review** <!-- id: 1 -->
  - Verify `package.json` name is `@axiomatic-design/color`.
  - Verify repository links, homepage, and bugs URL.
  - Verify `exports` field configuration.
- [ ] **Publint Check** <!-- id: 2 -->
  - Run `publint` to verify package exports are spec-compliant.

## 2. Build Verification

- [ ] **Clean Build** <!-- id: 3 -->
  - Run `pnpm clean` (if available) or manually remove `dist/`.
  - Run `pnpm build`.
- [ ] **Artifact Inspection** <!-- id: 4 -->
  - Verify `dist/index.js` (ESM) exists.
  - Verify `dist/index.cjs` (CJS) exists.
  - Verify `dist/index.d.ts` (Types) exists.
  - Verify `dist/cli/index.js` exists and is executable.

## 3. Release Preparation

- [ ] **Dry Run** <!-- id: 5 -->
  - Run `pnpm publish --dry-run`.
  - Inspect the tarball contents to ensure no unnecessary files are included.
- [ ] **Workflow Review** <!-- id: 6 -->
  - Review `.github/workflows/publish.yml` to ensure it uses the correct package name and secrets.
