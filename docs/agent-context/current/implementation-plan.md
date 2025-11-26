# Implementation Plan - Epoch 6: Phase 3 (Theme Builder UX/UI Polish)

This phase focuses on refining the Theme Builder into a professional, ergonomic tool. We will address layout issues, improve navigation, and add visual polish.

## Goals

- **Layout Restructure**: Move to a "Sticky Toolbar + Sidebar" layout to maximize screen real estate and prevent scrolling issues.
- **Navigation Fixes**: Eliminate nested scroll areas.
- **Preset UX**: Improve the "Load Preset" experience (persistence, selection state).
- **Visual Polish**: Use Lucide icons, add shadows to buttons, and compact the UI.
- **Feature Parity**: Expose the new `PaletteConfig` in the UI.

## Proposed Changes

### 1. Layout & Navigation

- **Refactor `App.tsx`**:
  - Move global actions (Export, Reset, Preset) to a top **Sticky Toolbar**.
  - Move Anchors and Key Colors to the Toolbar (compact popovers or expandable sections).
  - Keep the **Sidebar** dedicated to the Surface List.
  - Ensure the **Main Preview** area scrolls independently but doesn't trap scroll.
- **CSS**: Use `position: sticky` and `height: 100vh` correctly to manage scrolling.

### 2. Preset Management

- **Update `useSolvedTheme`**:
  - Add `selectedPreset` state.
  - Persist `selectedPreset` to `localStorage`.
  - Default to "Default" preset on first load.
- **Update `PresetSelector`**:
  - Show the currently selected preset in the dropdown/button.
- **File Loading**:
  - Add ability to upload a JSON config file to restore a custom theme.

### 3. Visual Polish

- **Icons**: Install `lucide-preact` and replace text labels with icons where appropriate (e.g., Export, Reset, GitHub).
- **Components**:
  - **Compact Anchors**: Redesign the Anchor sliders to be more compact (maybe inside a "Tuner" panel in the toolbar).
  - **Button Styles**: Apply the new shadow primitives (`--shadow-sm`) to buttons and inputs.

### 4. Palette Configuration

- **New Component**: Create `PaletteConfigurator` in the Theme Builder.
  - Allow editing `targetChroma` and `targetContrast`.
  - (Optional) Allow reordering/editing hues? (Maybe defer to JSON for now, just show the list).

### 5. Routing

- **Library**: Install `wouter` for lightweight routing.
- **Implementation**:
  - Sync selected demo page (Theme Builder, Showcase, etc.) to URL.
  - Ensure reloading preserves the current view.

## Task List

- [x] **Setup**
  - [x] Install `lucide-preact` and `wouter`.
- [x] **Layout Refactor**
  - [x] Create `Toolbar` component.
  - [x] Move Global Actions to Toolbar.
  - [x] Move Anchors/Key Colors to Toolbar (or a "Settings" panel).
  - [x] Fix scrolling (remove nested scrollbars).
- [x] **Routing**
  - [x] Implement `wouter` in `App.tsx`.
  - [x] Update navigation to use `Link` or `useLocation`.
- [x] **Preset UX**
  - [x] Update `ConfigContext` to track/persist `presetId`.
  - [x] Update `PresetSelector` UI.
  - [x] Add File Upload support.
- [x] **Palette UI**
  - [x] Add `PaletteConfigurator` to the Sidebar or Toolbar.
- [x] **Visuals**
  - [x] Replace text buttons with Icon Buttons (Lucide).
  - [x] Add shadows/polish to UI elements.
  - [x] Fix Toolbar font and duplicate settings.
