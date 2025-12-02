# Implementation Plan: Theme Builder V2 (Phase 4)

**Goal**: Transform the Theme Builder from a configuration utility into a "System Modeling" tool.

## 1. Context Tree Visualization

- **Objective**: Replace the flat list of surfaces with a hierarchical view.
- **Tasks**:
  - [ ] Refactor `ConfigState` to support hierarchical traversal (if not already implicit in groups).
  - [ ] Create `ContextTree` component to visualize `Page -> Group -> Surface`.
  - [ ] Connect selection state so clicking a node in the tree selects it in the Inspector.

## 2. Gamut Visualization

- **Objective**: Show where colors sit relative to the P3/sRGB boundary.
- **Tasks**:
  - [ ] Create `GamutSlice` component (Canvas or SVG).
  - [ ] Plot the P3 and sRGB boundaries on an L-C plane (for a given Hue).
  - [ ] Plot the current surface's position on this graph.

## 3. Direct Manipulation

- **Objective**: Allow users to drag curves/anchors directly.
- **Tasks**:
  - [ ] Update `AnchorGraph` to support dragging the curve control points (if we move to bezier) or the anchor handles (already partially done, need to refine).
  - [ ] Ensure updates reflect immediately in the preview.

## 4. Educational Overlays

- **Objective**: Explain _why_ a color is what it is.
- **Tasks**:
  - [ ] Implement a "Context Trace" tooltip.
  - [ ] When hovering a surface, show: `Base Lightness (Anchor) + Offset (Step) + Mode Adjustment`.

## 5. Vibe Controls (High Level)

- **Objective**: Provide "Sarah" (the pragmatist) with easy controls.
- **Tasks**:
  - [ ] Create a `VibeEngine` helper that maps high-level parameters (Contrast, Warmth) to low-level config (Anchors, Hue Shifts).
  - [ ] Add a "Vibe" panel to the UI.
