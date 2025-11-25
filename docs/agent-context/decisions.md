# Decision Log

This file tracks key architectural and design decisions made throughout the project. It serves as a reference to understand _why_ things are the way they are and prevents re-litigating settled issues without new information.

## Format

### [Date] Title of Decision

- **Context**: What was the problem or situation?
- **Decision**: What did we decide to do?
- **Rationale**: Why did we choose this path? What alternatives were considered?

### [2025-11-25] Defer Framework Integration

- **Context**: We planned to add React/Vue hooks in Epoch 3.
- **Decision**: Defer this work.
- **Rationale**: The core library should remain framework-agnostic. The hooks are trivial to implement by consumers (`useMemo(() => solve(config), [config])`). Adding them now would complicate the build/test setup without significant value.

### [2025-11-25] Vendor Mermaid.js for Documentation

- **Context**: We needed to render Mermaid diagrams in `mdbook`. The standard solution is `mdbook-mermaid`, a Rust binary.
- **Decision**: Vendor `mermaid.min.js` and inject it via a custom script.
- **Rationale**:
  - **Portability**: Avoids requiring a Rust toolchain (`cargo install`) for documentation contributors.
  - **Simplicity**: Keeps the project focused on Web technologies (JS/CSS).
  - **Control**: Allows us to update the script version easily via `scripts/update-mermaid.sh`.
