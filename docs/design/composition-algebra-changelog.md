# Changelog: The Algebra of Color Design

## 2025-12-05

### Major Revisions

- **Renamed Document**: Changed title from "Algebra of Composition" to "The Algebra of Color Design" to better reflect its scope.
- **Operator Formalization**: Completely rewrote **Section 3: The Operators** to resolve ambiguities in the "Reactive Pipeline" draft.
  - **Container Operator ($K$)**: Defined as the identity operator ($K(\Sigma) = \Sigma$) to formalize the behavior of layout primitives.
  - **Surface Topology**: Split the generic Surface operator ($S$) into two distinct topological types:
    - **Glass ($S_{glass}$)**: Preserves context ($H, C$) while resetting intent.
    - **Solid ($S_{solid}$)**: Resets both context (to neutral) and intent.
  - **Math Syntax**: Fixed LaTeX rendering issues (replaced `_{` with `_ {` and fixed block math delimiters) to ensure compatibility with GitHub Markdown and MathJax.
- **Tooling**: Added `lint:math` script to CI/CD to prevent future regression of LaTeX syntax.

### Minor Updates

- Added "In Plain English" analogies (Frosted Glass vs. Opaque Paper) to make the math accessible.
- Synced content with the MDX version on the documentation site.
