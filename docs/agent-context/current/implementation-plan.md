# Implementation Plan - Epoch 8 Extension: The "Fresh Eyes" Documentation Overhaul

## Goal

Conduct a comprehensive review and rewrite of the entire documentation suite. The objective is not just to "port" content, but to re-author it as if writing for the first time, ensuring it fully reflects the current system's capabilities, philosophy, and the new interactive possibilities of the Astro platform.

## Philosophy: "Greenfield Mindset"

We will approach the documentation with a "Greenfield Mindset". Instead of asking "How do I migrate this file?", we ask:
*   "If I were explaining this system today, how would I do it?"
*   "Does this concept still matter?"
*   "Can this wall of text be replaced by a live component?"
*   "Is the narrative flow logical for a new user?"

## Scope

All content within `site/src/content/docs/`.

## Strategy

1.  **Audit & Outline**:
    *   Review the current structure.
    *   Draft an "Ideal Table of Contents" based on the system *as it exists now*.
    *   Identify legacy artifacts or "mdbook-isms" to remove.

2.  **Section-by-Section Rewrite**:
    *   **Introduction**: Hook the reader. Why does this system exist?
    *   **Concepts**: Explain the "Physics" of the system (Anchors, Surfaces, Context) using the new visualizers.
    *   **Usage**: Practical guides for developers and designers.
    *   **Internals**: Deep dives for contributors (APCA, Solver logic).

3.  **Visual Integration**:
    *   Ensure every concept is backed by a visual or interactive demo.
    *   Use the `SystemDemo` and `ContextVisualizer` components aggressively to show, not just tell.

## Success Criteria

*   The documentation feels cohesive and native to the new platform.
*   No "legacy" phrasing (e.g., referencing old CLI commands that changed).
*   Interactive components are woven naturally into the narrative.

