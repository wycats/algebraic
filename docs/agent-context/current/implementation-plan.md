# Implementation Plan - Epoch 21: Theme Builder Aspirations

**Goal**: Reimagine the Theme Builder as a learning environment and design tool, moving beyond a simple configuration utility. This epoch focuses on the design and conceptualization phase before jumping into implementation.

## Phase 1: Design & Concept

This phase is about research, design, and planning. We will not be writing production code yet, but rather exploring the "ideal state" for the Theme Builder.

### 1. Design Audit

- **Objective**: Evaluate the current Theme Builder against our core [Axioms](../../design/axioms.md) and [Personas](../../design/personas.md).
- **Tasks**:
  - Review `docs/design/axioms.md` and identify where the current builder falls short (e.g., "Physics of Light", "Context is King").
  - Review `docs/design/personas.md` (specifically Alex the Visual Tinkerer and Sarah the Overwhelmed Pragmatist) and identify friction points.
  - Document findings in `docs/agent-context/current/design-audit.md`.

### 2. Concept Exploration

- **Objective**: Sketch out the "Ideal Interaction Model" for a tool that _teaches_ while you use it.
- **Tasks**:
  - Brainstorm visualizations for "Context Flow" (how polarity/mode propagate).
  - Brainstorm representations for "Data Density" (showing LCH values, contrast ratios).
  - Explore "Direct Manipulation" controls (graphs, gradients) vs. abstract sliders.
  - Create a "Lo-Fi" concept document (text/mermaid/ascii) describing the new UI layout and flow.

### 3. Architecture Review

- **Objective**: Determine if the current Svelte 5 + State architecture can support the new vision.
- **Tasks**:
  - Analyze the current `ThemeState` and `ConfigState` implementation.
  - Identify any technical blockers for advanced visualizations (e.g., performance of real-time graph rendering).
  - Evaluate libraries for graphs/nodes (e.g., Svelte Flow, D3) vs. custom SVG.

## Deliverables

- `docs/agent-context/current/design-audit.md`: A critique of the current system.
- `docs/agent-context/current/concept-model.md`: A proposal for the new UI/UX.
- `docs/agent-context/current/architecture-review.md`: Technical feasibility assessment.
