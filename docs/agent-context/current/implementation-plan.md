# Implementation Plan - Epoch 16 Phase 2: Framework Guides & Visual Consistency (Completed)

## Goal

Complete the documentation styling refactor by addressing framework guides and ensuring zero inline styles remain in the documentation source.

## Proposed Changes

### 1. Refactor Framework Guides (Completed)

- **Target Files**:
  - `site/src/content/docs/guides/frameworks/react.mdx`
  - `site/src/content/docs/guides/frameworks/svelte.mdx`
  - `site/src/content/docs/guides/frameworks/html.mdx`
- **Action**: Replace inline `style` attributes with semantic classes from `site/src/styles/docs.css`.
- **Consideration**: Ensure that code examples that _teach_ inline styles are preserved, but live components used for demonstration are styled via classes.

### 2. Global Style Audit (Completed)

- **Action**: Run a global search for `style=` in `site/src/content/docs` to catch any missed instances.
- **Refactor**: Move any remaining ad-hoc styles to `docs.css`.

### 3. Diagram Polish (Completed)

- **Action**: Review concept diagrams (e.g., in `concepts/`) to ensure they use the new utility classes (`.docs-swatch-grid`, etc.) and look consistent.

## Verification Plan (Completed)

- **Visual Check**: Manually verify the rendered pages for React, Svelte, and HTML guides.
- **Build Check**: Run `pnpm build:site` to ensure no regressions.
- **Audit Check**: Run `pnpm audit:theme` to ensure accessibility.
