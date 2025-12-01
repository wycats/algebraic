# Walkthrough: Epoch 19 - Rebranding

## Phase 1: Package & CLI Updates

We have successfully initiated the rebranding from "Algebraic Color" to "Axiomatic Color".

### Key Changes

1.  **Package Renaming**:
    - Updated `package.json` name to `@axiomatic-design/color`.
    - This aligns with the broader "Axiomatic Design" system.

2.  **CLI Command Update**:
    - The CLI binary has been renamed from `color-system` (or implicit) to `axiomatic`.
    - Users can now run `pnpm exec axiomatic` or `npx axiomatic`.
    - Updated the CLI help text in `src/cli/index.ts` to reflect the new name and usage.

3.  **Verification**:
    - Verified that `pnpm exec axiomatic --help` returns the correct branding and usage information.
    - Verified that the build process (`pnpm build`) correctly generates the artifacts with the new metadata.

### Next Steps

The codebase now reflects the new identity, but the documentation and site content are still using the old terminology. The next phase will focus on updating `README.md`, design documents, and the Astro site to match the new branding.
