# Design: Runtime Debugging

> **Related Axiom**: [The Law of Late Binding](../axioms/05-engineering.md)

## The Problem: Invisibility

The "Reactive Pipeline" architecture is powerful because it uses CSS variables to perform "Late Binding" of colors.

- `--text-lightness-source` is set by a utility class.
- `--bg-surface` is set by a surface class.
- The final color is calculated in the `:where()` block.

This means that if you inspect an element in Chrome DevTools, you don't see a color value on the element itself. You see a calculation: `oklch(from var(--text-lightness-source) ... )`.

To understand _why_ a text is a certain color, you have to:

1.  Find the element setting `--text-lightness-source`.
2.  Find the parent surface setting `--bg-surface`.
3.  Mentally compute the result.

This is a high friction loop for debugging.

## The Solution: The Runtime Debugger (X-Ray)

We need a tool that visualizes the "Invisible Context".

### Features

1.  **Context Sensing**:
    - Hover over any element.
    - The tool traverses up the DOM to find the nearest "Context Root" (Surface).
    - It reads the computed values of the Indirection Variables.

2.  **Visual Overlay**:
    - Displays a tooltip/overlay.
    - **Surface**: "Card (Layer 2)"
    - **Polarity**: "Light Mode" / "Inverted"
    - **Intent**: "Subtle Text"
    - **Result**: The resolved OKLCH/Hex value.

3.  **"Why is this?"**:
    - Clicking the overlay could show the "Trace":
      - `text-subtle` (set lightness to 0.6)
      - `surface-card` (set base hue to 240)
      - `theme-dark` (inverted polarity)

### Implementation

- **Standalone Component**: A Svelte 5 component that can be injected into the app (like the Theme Builder).
- **Toggle**: Activated via keyboard shortcut or UI toggle.
- **Zero-Runtime Overhead**: When disabled, it should have 0 performance cost.
