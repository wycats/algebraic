# Implementation Plan - Epoch 10: Ecosystem & Interoperability

## Phase 1: DTCG Export (Design Tokens)

## Goal

Implement the ability to export the system's generated tokens in the W3C Design Tokens Format Module (DTCG) standard. This will allow the color system to be consumed by tools like Figma (via Tokens Studio) and Style Dictionary.

## Objectives

1.  **CLI Export Command**: Add a new `export` command to the CLI.
2.  **DTCG Mapper**: Implement logic to map the internal `Theme` and `ColorSpec` objects to the DTCG JSON structure.
3.  **Verification**: Verify the output against the DTCG spec and ensure it can be imported into a test tool (or at least validates).

## Proposed Changes

### CLI (`src/cli/`)

- Modify `src/cli/index.ts` to add the `export` command.
  - Options: `--format <format>` (defaulting to `dtcg` for now, or required), `--out <file>`.
- Create `src/cli/commands/export.ts` to handle the command logic.

### Library (`src/lib/`)

- Create `src/lib/exporters/` directory.
- Create `src/lib/exporters/dtcg.ts`:
  - Function `toDTCG(theme: Theme): DTCGTokenGroup`.
  - Map semantic surfaces (`--surface-primary`) to DTCG tokens.
  - Map primitives (if we want to expose them, though we mostly deal in semantic tokens).
  - Ensure types (color, dimension, etc.) are correct.

### Testing

- Add unit tests for the DTCG mapper in `src/lib/exporters/__tests__/dtcg.test.ts`.
- Add an integration test for the CLI command.

## Future Phases (For Context)

- **Phase 2**: Tailwind CSS Integration.
- **Phase 3**: DX Improvements (JSON Schema).
- **Phase 4**: Documentation & Guides.
