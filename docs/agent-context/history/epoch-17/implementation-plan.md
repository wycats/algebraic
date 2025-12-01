# Implementation Plan - Epoch 17: Theme Builder V2

## Goal

Overhaul the Theme Builder UI to be more educational, data-dense, and visually integrated with the documentation site. The goal is to transform it from a simple configuration tool into a "learning environment" that teaches the system's mechanics (Context, Surfaces, Anchors) through interaction.

## Proposed Changes

### 1. Architecture & Integration

- **Review**: Assess the current `site/src/components/builder` implementation.
- **Refactor**: Ensure the state management (`ThemeState`, `ConfigState`) supports the new visualization requirements (e.g., accessing intermediate solver values like contrast ratios and resolved hex codes).

### 2. Visualizer Graph (The "Why")

- **Goal**: Show how surfaces inherit and modify context.
- **Implementation**:
  - Create a node-based or layer-based visualization (using Svelte Flow or custom SVG).
  - Visualize the "Context" object flowing through the tree.
  - Show how `Polarity` and `Mode` affect each node.

### 3. Data Density (The "What")

- **Goal**: Show the math behind the colors.
- **Implementation**:
  - **Inline Values**: Display calculated Lightness (L\*), Chroma (C), and Hue (H) values next to surfaces.
  - **Contrast Badges**: Show APCA or WCAG contrast ratios against the parent surface.
  - **Hex Codes**: Allow copying resolved hex values.

### 4. Intuitive Controls (The "How")

- **Goal**: Make the controls reflect the constraints.
- **Implementation**:
  - **Gamut Sliders**: Replace standard range inputs with gradient sliders that show the available color space.
  - **Histograms**: Show where the current theme's surfaces sit on the lightness scale.

## Verification Plan

- **Visual Check**: Verify the new UI components in the browser.
- **Functional Check**: Ensure the solver still produces valid themes and the "Reset" function works.
- **Performance**: Ensure the new visualizations don't cause jank during live solving.
