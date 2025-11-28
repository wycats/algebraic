# Implementation Plan - Epoch 11: Phase 1 - The Constitution (Axioms)

**Goal**: Consolidate scattered design wisdom into a single, authoritative document: `docs/design/axioms.md`.

## 1. Analysis

We have several design documents that overlap or contain partial truths. We need to consolidate them into a single source of truth.

**Source Documents:**
- `docs/agent-context/design/system_goals.md`: High-level goals and "Constitution".
- `docs/agent-context/design/intuition.md`: The "why" behind the math.
- `docs/agent-context/design/hue-shift-rationale.md`: Specific logic for hue shifting.
- `concepts.md` (in root): Older conceptual overview.
- `docs/design/fresh-eyes-review.md`: Recent audit findings (contextual).

**Target Document:**
- `docs/design/axioms.md`: The new authoritative document.

## 2. Proposed Structure for `axioms.md`

### The Prime Directive
- **Accessibility is the Foundation of Aesthetics.** A design cannot be beautiful if it cannot be perceived. We reject the idea that accessibility and aesthetics are in conflict; instead, we treat accessibility as the physical medium upon which beauty is built.

### The Laws of Physics (Light)
- **Lightness is Relative**: A surface's lightness is defined by its context (Mode + Polarity).
- **Chroma is Expensive**: High chroma reduces available lightness contrast.
- **Hue Rotates**: Hue shifts naturally as lightness changes (Bezold-Brücke effect).

### The Laws of Architecture (Surfaces)
- **Surfaces are Containers**: Every element lives on a surface.
- **Context Flows Down**: A surface establishes the context for its children.
- **Text is Relative**: Text color is defined by the surface it sits on, not global variables.

### The Laws of Integration
- **The Code is the Source of Truth**: Design tools are downstream consumers.
- **No Magic Numbers**: All values are derived from the configuration (Anchors, Curves).

## 3. Execution Steps

- [ ] **Draft `docs/design/axioms.md`**:
    - Synthesize content from `system_goals.md` (The "Constitution" section).
    - Incorporate the "Physics" from `intuition.md` and `hue-shift-rationale.md`.
    - Integrate the "Architecture" from `concepts.md`.
- [ ] **Review & Refine**:
    - Ensure the tone is authoritative yet accessible.
    - Verify that all key concepts (Context, Polarity, Anchors) are defined as axioms.
- [ ] **Deprecate Old Files**:
    - Move `docs/agent-context/design/intuition.md`, `docs/agent-context/design/hue-shift-rationale.md`, and `docs/agent-context/design/system_goals.md` to `docs/agent-context/design/archive/`.
    - Update `concepts.md` to point to `axioms.md` (or decide if it should remain as a high-level summary).
- [ ] **Update References**:
    - Check for links to the moved files and update them to point to `axioms.md`.

## 4. Verification
- [ ] **Readability Check**: Ensure the new document flows logically.
- [ ] **Completeness Check**: Ensure no critical "why" information is lost during consolidation.
