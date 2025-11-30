# Implementation Plan - Epoch 11: Phase 2 - Persona Refinement

**Goal**: Update `docs/design/personas.md` to reflect recent learnings from the "Fresh Eyes" audits and align with the newly established "Constitution" (Axioms).

## Context
Our personas drive our documentation and feature prioritization. The recent audits (Epoch 11) highlighted gaps between our personas' needs and the current reality (e.g., CLI mismatches for the Pragmatist, Export data loss for the Architect). We need to refine the personas to explicitly capture these needs so we can address them systematically.

## Proposed Changes

### 1. Update `docs/design/personas.md`
- **The Overwhelmed Pragmatist**:
    - Add specific pain points around "CLI reliability" and "Documentation accuracy" (based on Audit 2).
    - Emphasize the need for "Zero-Config" to truly mean *zero* friction.
- **The Visual Tinkerer**:
    - Explicitly mention the need for "Playgrounds" and "Immediate Feedback" (Theme Builder access).
- **The Accessibility Champion**:
    - Refine their need for "Compliance Evidence" (APCA vs WCAG mapping).
- **The Color Scientist**:
    - Link their interests to the new "Laws of Physics" axioms.
- **The System Architect**:
    - Add a specific need for "Lossless Interoperability" (P3 support in exports) and "Ecosystem Sync" (Figma/Tailwind).

### 2. Update Project Plan
- Mark Epoch 11, Phase 2 as "In Progress" in `docs/agent-context/plan-outline.md`.

## Verification Plan
- **Manual Review**: Ensure the updated personas accurately reflect the "Fresh Eyes" findings.
- **Alignment Check**: Verify that the personas' "Relationship to Axioms" section references the new `axioms.md` correctly.
