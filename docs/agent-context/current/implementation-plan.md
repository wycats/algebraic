# Implementation Plan: Epoch 19 - Rebranding to Axiomatic Color

**Goal:** Update the codebase, configuration, and documentation to reflect the new identity: **Axiomatic Color**.

## The New Identity

- **Product Name:** Axiomatic Color
- **Design System Name:** Axiomatic Design (or just "Axiomatic")
- **NPM Package:** `@axiomatic-design/color`
- **CLI Command:** `axiomatic`

## Scope of Work

### 1. Configuration & Code (`package.json`, `src/cli`)

- [ ] Update `package.json` name to `@axiomatic-design/color`.
- [ ] Update the `bin` entry to `axiomatic`.
- [ ] Update `src/cli/index.ts` help text and headers.
- [ ] Ensure the executable works with the new command name.

### 2. Documentation (`README.md`, `docs/`)

- [ ] **README:**
  - Update title to "Axiomatic Color".
  - Update installation instructions (`npm install @axiomatic-design/color`).
  - Update tagline: "An Axiomatic approach to color. Automated contrast, platform-native adaptation, and mathematically guaranteed accessibility."
- [ ] **Personas (`docs/design/personas.md`):**
  - Replace "Algebraic Color System" with "Axiomatic Color".
  - Refine descriptions to align with the new name.
- [ ] **Concepts/Axioms (`concepts.md`, `docs/design/axioms.md`):**
  - Shift terminology from "The System" to "The Axioms".
  - Ensure "Algebraic" is reserved for internal math/solver context.

### 3. Site & Demo

- [ ] Update `site/astro.config.mjs` title.
- [ ] Update the header in the Theme Builder (`site/src/components/builder/`) to display "Axiomatic Color".
- [ ] Update any hardcoded package references in the site content.

## Constraints

- "Algebraic" is acceptable for internal solver math/implementation details.
- **Product** is always "Axiomatic Color".
- "Axiomatic" refers to the color system in this context.
