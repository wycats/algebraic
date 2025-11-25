# Walkthrough - Epoch 3: Polish & Persistence

## Phase 1: Persistence

**Goal:** Ensure the user's work is saved to `localStorage` so it persists across reloads.

### Changes

- **ConfigContext**:
  - Added `localStorage` persistence to the `config` state.
  - Initial state is now lazy-loaded from `localStorage` (key: `color-system-config`).
  - Added a `useEffect` to sync state changes back to `localStorage`.
  - `resetConfig` now effectively clears the persisted state by resetting to `DEFAULT_CONFIG`.

### Verification

- **Manual Check**:
  - Open the Theme Builder.
  - Make a change (e.g., add a group).
  - Reload the page.
  - Verify the change persists.
  - Click "Reset Config".
  - Verify it reverts to default.

## Phase 2: Templates & Presets

**Goal:** Provide users with starting points for their themes.

### Changes

- **Library**:
  - Created `src/lib/presets.ts` with `Default`, `High Contrast`, and `Soft` presets.
  - Exported `PRESETS` and `DEFAULT_CONFIG` from the main package entry point.
- **Theme Builder**:
  - Added `loadPreset` to `ConfigContext`.
  - Created `PresetSelector` component in the sidebar.
  - Users can now switch between presets (with a confirmation dialog).

### Verification

- **Manual Check**:
  - Open the Theme Builder.
  - Select "High Contrast" from the preset dropdown.
  - Confirm the dialog.
  - Verify the theme changes (e.g., higher contrast anchors).
  - Reload the page (persistence check).
  - Verify the "High Contrast" theme is still loaded.

## Phase 3: Contrast Validation

**Goal:** Ensure accessibility by providing real-time contrast feedback.

### Changes

- **Library**:
  - Exposed `solve` and `contrastForPair` from the main package.
- **Theme Builder**:
  - Created `useSolvedTheme` hook to access the solved theme values.
  - Created `ContrastBadge` component to display APCA contrast scores (Lc).
  - Integrated `ContrastBadge` into `SurfaceManager` rows.
  - Badges are color-coded (Red/Orange/Green) based on APCA guidelines.

### Verification

- **Manual Check**:
  - Open the Theme Builder.
  - Expand a surface in the Surface Manager.
  - Observe the "Lc XX" badge.
  - Change the mode (Light/Dark).
  - Verify the badge updates.
  - Adjust anchors to lower contrast.
  - Verify the badge changes color (Green -> Orange -> Red).
