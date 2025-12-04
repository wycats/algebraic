# Epoch 25: The Grand Simulation

## Overview

This phase focused on validating the system's robustness by simulating the workflows of our four key personas in a realistic, isolated environment. We created a "Grand Simulation" project (`examples/grand-simulation`) to test the end-to-end experience of installing, configuring, building, and exporting a theme.

## Simulation Setup

1.  **Environment**: A fresh Node.js project in `examples/grand-simulation`.
2.  **Installation**: We packed the library (`pnpm pack`) and installed it locally to mimic a real user installation.
3.  **Configuration**: We created a "Cyberpunk" theme (`color-config.json`) to test extreme values (Neon Pink/Green, High Chroma).

## Findings & Fixes

### 1. CLI Argument Parsing Bug

**Issue**: The `axiomatic init` command failed silently when run via `npx` or directly in the simulation directory.
**Root Cause**: The `isMain` detection logic in `src/cli/index.ts` was fragile. It compared `process.argv[1]` to the file path, which behaves differently depending on how the script is invoked (e.g., via `bin` wrapper vs. direct node execution). It also incorrectly sliced `process.argv` based on this check.
**Fix**: We simplified the logic to remove the `isMain` check and rely on standard argument parsing. We also ensured `process.argv` is sliced correctly (removing the first two arguments) before passing to the command handler.

### 2. Persona Validation

#### Alex (The Visual Tinkerer)

- **Goal**: Create a unique, high-impact theme.
- **Result**: Successfully configured a Cyberpunk theme with Neon Pink (`#FF00FF`) and Green (`#00FF00`) key colors. The system correctly handled the high chroma targets (0.3) and generated vibrant surfaces.

#### Jordan (The Accessibility Champion)

- **Goal**: Ensure accessibility compliance.
- **Result**:
  - `axiomatic audit` passed.
  - Verified that the generated CSS includes a `@media (prefers-contrast: more)` block.
  - Confirmed that inside this block, surface lightness values are forced to 0 (Black) or 1 (White) to maximize contrast, satisfying the "High Contrast" requirement.

#### Dr. Chen (The Color Scientist)

- **Goal**: Verify P3 Gamut support.
- **Result**: Inspected `theme.css` and confirmed that `oklch` values retain their high chroma (e.g., `0.3225`), exceeding the sRGB limit (~0.2). This proves the system is "P3-ready" and does not prematurely clamp values.

#### Marcus (The System Architect)

- **Goal**: Export tokens for external tools.
- **Result**:
  - **Tailwind**: Generated `tailwind.preset.js` with `light-dark()` colors. Note: These colors are hardcoded (static) and do not use the Reactive Pipeline variables, which is a valid trade-off for a "dumb" preset.
  - **DTCG**: Generated `tokens.json` in a valid format, splitting `light` and `dark` modes into top-level groups.

## Documentation: The Algebra of Composition

We formalized the system's composition logic in `site/src/content/docs/advanced/composition-algebra.mdx`. This document defines the system using algebraic notation ($\Sigma, \Phi, S, I, M$) and includes interactive visualizations for each concept.

### Visualizations Created (Brilliant-Style)

1.  **State Vector ($\Sigma$)**: `StateVectorDemo.svelte` features an interactive equation where users can scrub values directly in the math notation to see real-time updates.
2.  **Surface Operator ($S$)**: `SurfaceOperatorDemo.svelte` uses a "Glass Box" metaphor where users drag an element across a boundary to see the Intent reset while Context persists.
3.  **Orthogonality**: `OrthogonalityDemo.svelte` allows users to swap the order of CSS classes in a live code block to prove that the visual result is identical.
4.  **Contrast Preservation**: `ContrastStabilityDemo.svelte` provides an interactive graph comparing the flat contrast curve of OKLCH against the wavy, unpredictable curve of HSL.

## Conclusion

The "Grand Simulation" was a success, validating the system's core mechanics. The formalization of the "Algebra of Composition" provides a solid theoretical backing for the system's design, ensuring that future features align with the core invariants.

# Epoch 26: The Hard Flip

## Overview

This phase addressed the "Soft Flip" limitation where native UI elements (scrollbars, checkboxes) inside inverted surfaces did not respect the inverted theme because the browser's `color-scheme` property was not being updated. We implemented a "Hard Flip" mechanism using a `MutationObserver` to force the correct `color-scheme` on inverted surfaces.

## Implementation Details

### 1. CSS Variable Beacon

We updated the CSS generator (`src/lib/generator.ts`) to emit a new CSS variable, `--axm-inverted-surfaces`, in the `:root` block. This variable contains a comma-separated list of selectors for all surfaces with `polarity: "inverted"`.

```css
:root {
  --axm-inverted-surfaces: ".surface-spotlight, .surface-inverse";
}
```

This "beacon" allows the JavaScript runtime to discover the configuration without needing a separate JSON file or build artifact, keeping the integration clean and CSS-driven.

### 2. Runtime Observer

We updated the `ThemeManager` in `src/lib/browser.ts` to:

1.  **Read Configuration**: On initialization, it reads the `--axm-inverted-surfaces` variable from the computed style of the document root.
2.  **Observe DOM**: It sets up a `MutationObserver` to watch for added nodes and class attribute changes.
3.  **Apply Hard Flip**: When an element matches one of the inverted selectors, the manager forces its `color-scheme` style property to the _opposite_ of the current resolved mode.
    - If Global Mode is **Light**, Inverted Surface gets `style="color-scheme: dark"`.
    - If Global Mode is **Dark**, Inverted Surface gets `style="color-scheme: light"`.

### 3. Cleanup

We removed the obsolete logic in `src/cli/commands/build.ts` that was attempting to generate a `src/lib/constants.ts` file, as the CSS beacon strategy renders it unnecessary.

## Verification

- **Build**: Ran `pnpm build` and `pnpm solve` to verify that the CSS is generated correctly with the new variable.
- **Output**: Confirmed that `css/theme.css` contains the `--axm-inverted-surfaces` variable with the correct selectors.

This solution ensures that native controls inside inverted surfaces render correctly, providing a seamless experience across all contexts.

# Epoch 27: Documentation Polish & MathML

## Overview

This phase focused on refining the documentation's visual presentation, specifically targeting the rendering of mathematical formulas and the readability of complex concepts.

## Key Changes

### 1. Native MathML Styling

We enabled native MathML rendering (via `rehype-katex` and `rehype-mathjax` experimentation, settling on a clean native approach) and implemented custom CSS overrides in `site/src/styles/starlight-custom.css` to ensure consistent display:

- **Margins**: Reset margins on internal MathML elements (`math * { margin: initial }`) to prevent layout shifts.
- **Centering**: Added rules to center block-level math equations (`math[display="block"]`) for better visual hierarchy.
- **Fonts**: Configured a robust font stack for math, prioritizing "Erewhon Math", "Libertinus Math", and "STIX Two Math".

### 2. Content Restructuring

We audited `site/src/content/docs/advanced/composition-algebra.mdx` to improve clarity:

- **Removed Visual Clutter**: Deleted redundant "TeX side-by-side" comparison grids, favoring the clean MathML output.
- **"In Plain English" Callouts**: Converted standard blockquotes (`> **In Plain English**: ...`) into Starlight Admonitions (`:::tip[In Plain English]`) to make these crucial analogies stand out.

### 3. Inline Code Surfaces

We added a CSS override to treat inline code blocks as "surfaces":

```css
.sl-markdown-content code:not(:where(.not-content *)) {
  background-color: var(--axm-surface-token);
  border: 1px solid var(--axm-border-dec-token);
}
```

This ensures that inline code snippets respect the system's surface tokens and decorative borders, integrating them seamlessly into the design language.

### 4. Font Comparison Lab

We moved the "Font Comparison Lab" from the main `composition-algebra.mdx` document to a dedicated test page (`font-test.mdx`) to keep the core documentation focused on the concepts.

### 5. Infrastructure Hardening

We performed a comprehensive cleanup of the codebase to ensure stability before the phase transition:

- **Verification Script**: Fixed `scripts/agent/verify-phase.sh` to correctly locate the workspace root and run checks reliably.
- **Linting**: Resolved 50+ ESLint errors across the Svelte components (`ContrastStabilityDemo`, `PortalStack`, etc.) and test files, enforcing strict type safety and accessibility standards.
- **Testing**: Updated `src/lib/__tests__/browser.test.ts` to mock `getComputedStyle(...).getPropertyValue`, fixing a runtime error in the test suite.
- **Configuration**: Updated `tsconfig.json` to include the `tests/` directory and refined `eslint.config.js` to properly ignore build artifacts and temporary files.
