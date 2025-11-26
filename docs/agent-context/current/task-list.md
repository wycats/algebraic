# Task List - Epoch 5: Phase 2 - Accessibility & High Contrast

## 1. Forced Colors (Windows High Contrast)
- [ ] **Audit System Colors**: Check `engine.css` against the standard list of CSS System Colors. Ensure we aren't missing `Field`, `Mark`, `SelectedItem`, etc.
- [ ] **Verify Interactive States**: Ensure hover, focus, and active states are distinct and visible in Forced Colors mode.
- [ ] **Refine Mappings**: Update `engine.css` with any missing or improved mappings.
- [ ] **Documentation**: Add a guide on how to test and verify Forced Colors support.

## 2. Prefers Contrast (`prefers-contrast: more`)
- [ ] **Implement `toHighContrast` Utility**: Create a function in `src/lib/generator.ts` that takes a `SolverConfig` and returns a high-contrast version.
    - [ ] Widen anchors to 0% and 100% lightness.
    - [ ] Force text chroma to 0.
- [ ] **Update Generator**: Modify the CSS generation logic to:
    - [ ] Solve the high-contrast config.
    - [ ] Generate CSS variables for the high-contrast theme.
    - [ ] Wrap them in a `@media (prefers-contrast: more)` block.
    - [ ] Append to the output `theme.css`.
- [ ] **Verification**: Verify that `theme.css` contains the media query and that it activates correctly in the browser.

## 3. Print Styles
- [ ] **Implement Print Overrides**: Add a `@media print` block to `engine.css` (or a new `print.css`).
    - [ ] Force "Light Mode" variables.
    - [ ] Remove background colors from non-essential surfaces to save ink.
    - [ ] Ensure text is black/dark gray.
    - [ ] Hide interactive elements (buttons, navs) if irrelevant.
- [ ] **Verification**: Use browser "Print Preview" to verify the styles.
