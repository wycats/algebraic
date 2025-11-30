# Implementation Plan - Phase 2: Reproduction via Isolation

## Goal

Isolate the specific factor causing the Svelte 5 hydration error by systematically moving from a working environment (`src/pages/*.astro`) to the failing environment (`src/content/docs/*.mdx` + Starlight).

## Steps

1.  **Test Standalone MDX**:

    - Create `site/src/pages/repro-mdx.mdx`.
    - Include `HueShiftVisualizer` with `client:load`.
    - Verify if it works (tests MDX compilation without Starlight layout).

2.  **Test Starlight MDX**:

    - Create `site/src/content/docs/repro-doc.mdx`.
    - Include `HueShiftVisualizer` with `client:load`.
    - Verify if it fails (tests Starlight layout + MDX).

3.  **Isolate Factors**:

    - If Starlight MDX fails, try to simplify the component usage.
    - Check if `client:only` works in Starlight MDX (we know it does from the workaround).
    - Check if other Svelte components fail in Starlight MDX.

4.  **Root Cause Analysis**:
    - Compare the generated HTML/JS between the working `repro.astro` and the failing `repro-doc.mdx`.
