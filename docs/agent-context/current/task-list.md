# Task List - Epoch 5: Phase 4 - Demo & Documentation Alignment

## 1. Demo Refactor
- [ ] **Integrate `ThemeManager`**:
  - [ ] Update `demo/src/context/ThemeContext.tsx` to use `ThemeManager`.
  - [ ] Remove manual DOM manipulation from `App.tsx`.
- [ ] **Update `SurfaceManager`**:
  - [ ] Add `targetChroma` slider to `SurfaceRow` component.
  - [ ] Pass `targetChroma` to the `updateSurface` handler.

## 2. Educational Components
- [ ] **Create `ContextVisualizer`**:
  - [ ] Implement nested surface structure.
  - [ ] Add labels explaining the polarity shifts.
- [ ] **Create `GamutComparator`**:
  - [ ] Implement side-by-side comparison.
  - [ ] Add controls for chroma intensity.
- [ ] **Create `LightnessScale`**:
  - [ ] Implement canvas or SVG based visualization.
  - [ ] Integrate into `AnchorsEditor`.

## 3. High Contrast Support
- [ ] **Runtime HC Generation**:
  - [ ] Update `LiveThemeInjector` to generate High Contrast CSS using `toHighContrast`.
  - [ ] Add a "Simulate High Contrast" toggle to the UI.

## 4. Cleanup
- [ ] **Rename Components**: Rename `SolverPlayground` to `HueShiftVisualizer`.
- [ ] **Verify**: Run the demo and check all new features.
