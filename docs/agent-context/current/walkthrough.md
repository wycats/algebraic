# Walkthrough: Epoch 34 - Phase 3 (Export & Validation)

## Overview

This phase focuses on making the system "Beta-Ready" by ensuring that users can trust the tools and the output. We are implementing a live export preview in the Theme Builder to bridge the gap between configuration and consumption, adding real-time validation to prevent invalid states, and ensuring our ecosystem tools (ESLint) support Svelte.

## Key Changes

### 1. Theme Builder Export Preview

We have implemented a live "Export Preview" feature in the Theme Builder. This allows users to see the generated theme tokens in various formats (CSS, DTCG JSON, Tailwind, TypeScript) and copy or download them.

**Implementation Details:**

- **State Management**: Updated `BuilderState` to include a new `viewMode` option: `"export"`. This allows switching the main stage area between the component preview and the export view.
- **Export View Component**: Created `site/src/components/builder-v2/stage/ExportView.svelte`. This component subscribes to `configState` and uses the core exporters (`toDTCG`, `toTailwind`, `toTypeScript`) to generate the output. It provides tabs to switch between formats and includes "Copy" and "Download" buttons.
- **Layout Integration**: Updated `site/src/components/builder-v2/StagePanel.svelte` to include a toggle in the toolbar. The toggle switches between "Preview" and "Export" modes.
- **Core Library Updates**: Exported the exporter functions (`toDTCG`, `toTailwind`, `toTypeScript`) and key types (`Theme`, `SolverConfig`) from the main package entry point (`src/lib/index.ts`) so they can be used by the site. Fixed an unused variable issue in `src/lib/inspector/overlay.ts` that was blocking the build.

### 2. Configuration Validation

_(Pending)_

### 3. ESLint Svelte Support

_(Pending)_
