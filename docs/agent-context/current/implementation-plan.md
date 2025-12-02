# Implementation Plan - Epoch 21: Theme Builder Aspirations (Phase 2: Prototyping)

**Goal**: Build the foundational state management and layout primitives for the new "Studio" interface of the Theme Builder V2.

## Phase 2: Prototyping

This phase focuses on code structure and basic UI scaffolding. We are not aiming for a polished design yet, but rather a functional skeleton that proves the architecture.

### 1. State Management (`BuilderState`)

- **Objective**: Create a dedicated state manager for the editor UI.
- **Tasks**:
  - Create `site/src/lib/state/BuilderState.svelte.ts`.
  - Implement selection state (`selectedSurfaceId`).
  - Implement view mode state (`viewMode`).
  - Implement "hover" state for "What-If" previews.
  - Integrate with `ConfigState` (ensure it can read/write to the config).

### 2. Studio Layout Scaffolding

- **Objective**: Create the three-pane layout structure.
- **Tasks**:
  - Create `site/src/components/builder-v2/StudioLayout.svelte`.
  - Implement resizable panes (optional for now, fixed width is fine for prototype).
  - Create placeholder components for:
    - `ContextTreePanel.svelte` (Zone A)
    - `StagePanel.svelte` (Zone B)
    - `InspectorPanel.svelte` (Zone C)
  - Create a new route `site/src/pages/studio.astro` to host the V2 builder (temporarily).

### 3. Context Tree Component

- **Objective**: Visualize the surface hierarchy.
- **Tasks**:
  - Create `site/src/components/builder-v2/ContextTree.svelte`.
  - Implement a recursive tree node component.
  - Connect it to `BuilderState` for selection.
  - **Challenge**: The `SolverConfig` stores surfaces in a flat list (grouped by category). We need a way to represent the _logical_ nesting.
  - **Solution**: For the prototype, we will hardcode a "Demo Hierarchy" (Page -> Card -> Button) that represents a typical UI, and map the config surfaces to these slots.

## Deliverables

- `BuilderState.svelte.ts`
- `StudioLayout.svelte`
- `ContextTree.svelte`
- A working `/studio` page showing the layout and interactive tree.
