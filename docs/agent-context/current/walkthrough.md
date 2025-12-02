# Phase 3 Walkthrough: Release Automation & Rebranding

## Rebranding

- Renamed package to `@axiomatic-design/color`.
- Updated `bin` entry to `axiomatic`.
- Updated `CHANGELOG.md` to reflect the new name and version `0.1.0`.

## Release Automation

We have transitioned to an automated release process using `release-plan`.

### Workflow

1. **Plan Release**:
   - Triggered on push to `main` or label on PR.
   - Runs `release-plan prepare` to calculate version bumps.
   - Creates a "Prepare Release" PR with the new version and changelog.
2. **Publish**:
   - Triggered when the "Prepare Release" PR is merged.
   - Runs `pnpm release-plan publish` to publish to NPM.

### Configuration

- Installed `release-plan` and `@release-plan/actions`.
- Created `.github/workflows/plan-release.yml` and `.github/workflows/publish.yml`.
- Created `RELEASE.md` to document the process.
- **Important**: Enabled "Allow GitHub Actions to create and approve pull requests" in repository settings to allow the workflow to create the PR.

## Verification

- Verified package exports using `publint`.
- Verified CLI functionality (`axiomatic init`).
- Verified site build.
- Reset git tags to `v0.0.0` to ensure `release-plan` correctly detects the new release.
- **Status**: The "Prepare Release" PR (#7) is created and correctly proposes `v0.1.0`.
- **Next Step**: Merge PR #7 to publish the package.

## Publishing

- **Manual Bootstrap**: Due to initial authentication issues with npm (OTP requirements), we manually published `v0.1.0` from the local environment.
- **OIDC Configuration**: We successfully configured OIDC Trusted Publishing for future releases.
  - Updated `publish.yml` to use `NPM_CONFIG_PROVENANCE: true`.
  - Removed the classic `NPM_TOKEN` secret.
  - Configured the Trusted Publisher on npmjs.com for the `design-axioms/color` repository.
- **Cleanup**: Removed the `.release-plan.json` file to reset the release state for the next cycle.

## Conclusion

The project is now fully rebranded as `@axiomatic-design/color`, the first version `0.1.0` is live on npm, and the automated release pipeline is secure and ready for future use.
