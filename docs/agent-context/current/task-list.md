# Task List - Epoch 8 Extension: Fresh Eyes Overhaul

- [x] **Phase 1: Strategy & Structure**

  - [x] Audit current `SUMMARY.md` / Sidebar structure against "Ideal Flow" <!-- id: 1 -->
  - [x] Identify "Dead" content (concepts that are no longer relevant) <!-- id: 2 -->
  - [x] Identify "Missing" content (new features not yet documented) <!-- id: 3 -->
  - [x] **Action**: Reorganized file structure and updated `astro.config.mjs`.

- [x] **Phase 2: Content Rewrite (Iterative)**

  - [x] **Introduction & Philosophy**: Rewrite `index.mdx` and `philosophy.md` to be punchy and modern. <!-- id: 4 -->
  - [x] **The Mental Model**: Rewrite `concepts/*.mdx`. <!-- id: 5 -->
    - [x] `thinking-in-surfaces.mdx` (Merged with Context)
    - [x] `physics-of-light.md` (Formerly Anchors)
    - [x] `accessibility-first.md` (Formerly Accessibility)
  - [x] **Getting Started**: Rewrite `guides/*.md`. <!-- id: 6 -->
    - [x] `installation.md` (CLI & Setup)
    - [x] `theme-builder.md` (Visual Tool)
    - [x] `integration.md` (CSS Usage)
  - [x] **The Catalog**: Rewrite `catalog/*.md`. <!-- id: 7 -->
    - [x] `surfaces.mdx` (Surfaces & Elevation)
    - [x] `actions.md` (Interactive & Focus)
    - [x] `typography.md` (Text Hierarchy)
    - [x] `data-viz.md` (Charts)
  - [x] **Advanced & Reference**: Rewrite `advanced/*.md` and `reference/*.md`. <!-- id: 8 -->

- [x] **Phase 3: Visual & Interactive Polish**

  - [x] Audit all embedded components for relevance and styling. <!-- id: 8 -->
  - [x] Fix Starlight style interference (wrap in `.not-content`).
  - [x] Create new diagrams/visuals if a concept is hard to explain with text. <!-- id: 9 -->
    - [x] Added `DataVizDemo` to visualize chart palettes.

- [ ] **Phase 4: Dogfooding & Robustness**
  - [x] **Strategy**: Define how the docs site consumes the system's own tokens. <!-- id: 11 -->
  - [x] **Refactor**: Replace hardcoded hex values in components (e.g., `DynamicRange`) with system tokens. <!-- id: 12 -->
  - [ ] **Linting**: Explore tooling to forbid hardcoded colors in the `site/` directory. <!-- id: 13 -->

- [ ] **Phase 5: Final Review**
  - [ ] Full read-through for tone and consistency. <!-- id: 10 -->
