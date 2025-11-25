# Changelog

## Epoch 1: Packaging & Consumption

**Focus:** Transforming the project from a local workspace into a distributable NPM package.

### Key Changes

- **Build Configuration**: Introduced `tsup` for efficient bundling and `.d.ts` generation.
- **CLI Enhancements**: Added `init` command, argument support, and CWD awareness.
- **Package Metadata**: Updated `package.json` for proper distribution.

### Verification

- Verified `color-system init` scaffolds config.
- Verified `color-system` generates correct CSS.

## Phase: System Robustness & Animation Architecture

**Focus:** Hardening the core engine for "Fearless Injection" and smooth animations.

### Key Changes

- **Animation Architecture**: Shifted transition logic to computed properties (`@property`) to handle `light-dark()` snapping smoothly.
- **Fearless Injector**: Verified runtime theme injection works with the new architecture.
- **Solver Playground**: Improved math layout and theme awareness.

## Epoch 2: The Theme Builder

**Focus:** Building a visual, interactive editor for the color system.

### Key Changes

- **Isomorphic Runtime**: Refactored core logic to run in both Node.js and Browser, enabling "Live Solving".
- **Theme Builder UI**:
  - **Global Controls**: Sliders for Anchors, Key Colors, and Hue Shift.
  - **Surface Management**: CRUD interface for Groups and Surfaces.
  - **Live Preview**: Instant feedback via `FearlessInjector`.
- **UX Refinements**: Mode-aware controls and dynamic surface preview.
- **Export**: Added JSON download and CSS copy functionality.

## Epoch 3: Polish & Persistence

**Focus:** Refining the Theme Builder into a production-grade tool.

### Key Changes

- **Persistence**:
  - Implemented `localStorage` saving for `SolverConfig`.
  - Added "Reset to Default" functionality.
- **Templates & Presets**:
  - Introduced a Preset system with "Default", "High Contrast", and "Soft" themes.
  - Added a `PresetSelector` to the Theme Builder UI.
- **Contrast Validation**:
  - Integrated APCA contrast calculation.
  - Added real-time contrast badges (Lc scores) to the Surface Manager.
  - Badges provide visual feedback (Red/Orange/Green) based on accessibility guidelines.
- **Deferred**:
  - Framework Integration (React/Vue hooks) was deferred to keep the core library lightweight.
