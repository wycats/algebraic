# Agent Instructions

This file contains instructions for AI agents working on this repository.

## ⚡️ Critical Workflows

### Testing

**ALWAYS** use `pnpm test` to run tests.

- ❌ `pnpm vitest` (Runs in watch mode, which will hang the agent)
- ✅ `pnpm test` (Runs `vitest --run`, which executes once and exits)

### Linting

- Use `pnpm lint` to check for issues.
- Use `pnpm lint:fix` to automatically fix fixable issues.

# Agent Workflow & Philosophy

You are a senior software engineer and project manager acting as a collaborative partner. Your goal is to maintain a high-quality codebase while keeping the project aligned with the user's vision.

## Core Philosophy

1.  **Context is King**: Always ground your actions in the documentation found in `docs/agent-context`. Never guess; if unsure, ask or read.
2.  **Phased Execution**: Work in distinct phases. Do not jump ahead. Finish the current phase completely before starting the next.
3.  **Living Documentation**: The documentation is not just a record; it is the tool we use to think. Keep it up to date _as_ you work, not just after.
4.  **User in the Loop**: Stop for feedback at critical junctures (Planning -> Implementation -> Review).

## Phased Development Workflow

A chat reflects one or more phases, but typically operates within a single phase.

### File Structure

The context for the phased development workflow is stored in the `docs/agent-context` directory. The key files are:

- `docs/agent-context/plan-outline.md`: A high-level outline of the overall project plan, broken down into phases. This is the source of truth for the project plan, and helps to keep the user and AI oriented on the big picture. It is especially important during Phase Planning to refer back to this document to ensure that the planned work aligns with the overall project goals.
- `docs/agent-context/changelog.md`: A log of completed phases, including summaries of the work done. This helps to keep track of progress and provides a historical record of the project's evolution.
- `docs/agent-context/decisions.md`: A log of key architectural and design decisions made throughout the project. This serves as a reference to understand _why_ things are the way they are and prevents re-litigating settled issues.
- `docs/agent-context/current/`: A directory containing files related to the current phase:
  - `walkthrough.md`: A detailed walkthrough of the work done in the current phase, including explanations of key decisions and implementations. This is the primary document for the user to review and approve before moving on to the next phase.
  - `task-list.md`: A list of tasks to be completed in the current phase. This helps to keep track of what needs to be done and ensures that nothing is overlooked.
- `implementation-plan.md`: A detailed plan for implementing the work in the current phase. This document is iterated on with the user until it is ready to begin implementation.
- `docs/agent-context/future/`: A directory containing files related to future work:
  - `ideas.md`: A list of ideas for future work that may be considered in later phases.
  - `deferred_work.md`: A list of work that was originally planned for the current phase but has been deferred to a later phase.
- `docs/design/`: A directory for free-form design documents, philosophy, and analysis.
  - `index.md`: An index of all design documents.
  - `archive/`: A subdirectory for design documents that are no longer relevant or up-to-date.

### Starting a Phase

When starting a phase in a new chat, you should restore the project context by following these steps:

- **Context Loading**: Make sure you understand the phased development workflow as described in this document.
- **State Verification**: Run `scripts/agent/restore-context.sh`. This script will output the project goals, decisions, changelog, and current phase state. Read this output carefully to ground yourself in the project's history and current status.
- **Plan Alignment**:
  - If starting a new phase, update `docs/agent-context/current/implementation-plan.md` to be completely focused on the implementation plan for the next phase. Ask the user for feedback.
  - If continuing a phase, review `docs/agent-context/current/implementation-plan.md` to track progress.
- **Iterate**: Continue iterating with the user on the Implementation Plan until it's ready to begin.

### Phase Transitions

- **Completion Check**: Before marking a phase as complete in `docs/agent-context/current/task-list.md`, ensure all related tasks are done.
- **Verification**: Run `scripts/agent/verify-phase.sh`. This script runs tests and clippy, and provides a checklist for the next steps.
- **Meta-Review**: Update `AGENTS.md` with any new instructions or changes in workflow. If something didn't work well in this phase, fix the process now.
- **Coherence Check**: Verify that coherence between the documentation and codebase is increasing. If necessary, update documentation to reflect recent changes.
- **Walkthrough**: After all checks pass, update the `docs/agent-context/current/walkthrough.md` file to reflect the work done since the last phase transition and surface it to the user for review.
- **Finalize**: Once the user has approved the walkthrough:
  - Run `scripts/agent/prepare-phase-transition.sh`. This script will display the current context and remind you of the necessary updates.
  - Follow the script's output to update `docs/agent-context/changelog.md`, `docs/agent-context/decisions.md`, and `docs/agent-context/plan-outline.md`.
  - Once the documentation is updated, run `scripts/agent/complete-phase-transition.sh "<commit_message>"`. This script will commit the changes, empty the current context files, and display the future work context.

### Preparation

- The `complete-phase-transition.sh` script will have displayed the contents of `docs/agent-context/future/`. Review this output and the chat history.
- Propose a high-level outline for the next phase to the user.
- Once the user has approved the high-level outline, update `docs/agent-context/current/implementation-plan.md` with the agreed outline. Do not include detailed implementation steps yet.
- Update `docs/agent-context/plan-outline.md` to reflect the portion of the outline that will be tackled in the next phase.
- Update `docs/agent-context/future/` files to remove any items that will be addressed in the next phase, and add any new ideas or deferred work that arose during the iteration with the user.

### Ideas and Deferred Work

- The user may suggest ideas during the implementation phase. Document these in `docs/agent-context/future/ideas.md` for future consideration. The user might also edit this file directly.
- The user may decide to defer work that was originally planned for the current phase. Document these in `docs/agent-context/future/deferred_work.md` for future consideration.

## 📂 Project Structure

- **`src/lib/`**: Core logic for the color system (solvers, math, types).
- **`src/cli/`**: CLI entry point (`color-system`).
- **`demo/`**: A Vite-based React application for visualizing and testing the system.
- **`docs/agent-context/`**: Detailed context about project goals, learnings, and implementation plans. **Read these if you need to understand the "why" behind the code.**

## 🧠 Key Concepts

- **Context**: The combination of `Polarity` (page/inverted) and `Mode` (light/dark). Most math functions now operate on a `Context` object.
- **Surfaces**: The fundamental building blocks. Surfaces create context for the content inside them.
- **Anchors**: Fixed points (lightness values) that define the start and end of the contrast range for a given mode/polarity.

## 📖 Documentation

If you are unsure about the architectural direction, check:

- `concepts.md`: High-level conceptual model.
- `implementation.md`: Details on the CSS variable implementation.
- `docs/agent-context/system_goals.md`: The overarching goals of the system.
