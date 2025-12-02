# Walkthrough: Epoch 21 - Phase 1 (Design & Concept)

**Date**: 2025-12-02

## Overview

In this phase, we stepped back from the code to reimagine the **Theme Builder**. We identified that the current tool is a functional "Configuration Utility" but fails to be the "Design Studio" and "Learning Environment" we aspire to.

We conducted a design audit, explored new interaction models, and verified that our architecture can support this new vision.

## Key Deliverables

### 1. Design Audit (`design-audit.md`)

We evaluated the current builder against our **Axioms** and **Personas**.

- **Critical Finding**: The UI hides the most important concept: **Context**. Users cannot see the hierarchy or how context flows from parent to child.
- **Critical Finding**: The UI lacks **Direct Manipulation**. Users tweak abstract numbers instead of interacting with the "Physics of Light" (curves, gamuts).

### 2. Concept Model (`concept-model.md`)

We proposed a new "Studio" metaphor with three zones:

- **Zone A: The Context Tree**: A hierarchical view of the system (Page -> Card -> Button).
- **Zone B: The Stage**: A live preview canvas.
- **Zone C: The Inspector**: Context-sensitive controls and deep data visualization.

We also introduced the **"Vibe" Controller** for our "Overwhelmed Pragmatist" persona (Sarah), allowing high-level control over Contrast, Vibrancy, and Warmth.

### 3. Architecture Review (`architecture-review.md`)

We confirmed that the current **Svelte 5 + Runes** architecture is robust enough for V2.

- **New State**: We need a `BuilderState` class to manage selection and view modes.
- **Performance**: We will use **SVG + D3 Modules** for visualizations (Gamut Slice, Lightness Graph) to ensure performance without heavy dependencies.

## Next Steps

We are ready to move to **Phase 2: Prototyping**. In the next phase, we will:

1.  Set up the `BuilderState` class.
2.  Build the "Context Tree" component (Zone A).
3.  Build the basic "Stage" (Zone B).
