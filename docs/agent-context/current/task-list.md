# Task List - Epoch 5: Phase 4 - Demo & Documentation Alignment

## 1. Demo Refactor

- [x] **Integrate `ThemeManager`**:
  - [x] Update `demo/src/context/ThemeContext.tsx` to use `ThemeManager`.
  - [x] Remove manual DOM manipulation from `App.tsx`.
- [x] **Update `SurfaceManager`**:
  - [x] Add `targetChroma` slider to `SurfaceRow` component.
  - [x] Pass `targetChroma` to the `updateSurface` handler.

## 2. Educational Components

- [x] **Create `ContextVisualizer`**:
  - [x] Implement nested surface structure.
  - [x] Add labels explaining the polarity shifts.
- [x] **Create `GamutComparator`**:
  - [x] Implement side-by-side comparison.
  - [x] Add controls for chroma intensity.
- [x] **Create `LightnessScale`**:
  - [x] Implement canvas or SVG based visualization.
  - [x] Integrate into `AnchorsEditor`.

## 3. High Contrast Support

- [x] **Runtime HC Generation**:
  - [x] Update `LiveThemeInjector` to generate High Contrast CSS using `toHighContrast`.
  - [x] Add a "Simulate High Contrast" toggle to the UI.

## 4. Cleanup

- [x] **Rename Components**: Rename `SolverPlayground` to `HueShiftVisualizer`.
- [x] **Verify**: Run the demo and check all new features.
