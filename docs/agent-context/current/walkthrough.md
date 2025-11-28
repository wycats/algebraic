# Walkthrough - Epoch 10: Ecosystem & Interoperability

## Phase 1: DTCG Export

### Goal
Enable exporting the generated theme tokens in the W3C Design Tokens Format Module (DTCG) standard, allowing integration with tools like Figma (via Tokens Studio) and Style Dictionary.

### Implementation

#### 1. DTCG Exporter (`src/lib/exporters/dtcg.ts`)
We implemented a `toDTCG` function that takes a solved `Theme` object and converts it into a DTCG-compliant JSON structure.
- **Structure**: The output is grouped by mode (`light` / `dark`), then by semantic role (`surface` / `on-surface`).
- **Format**: Colors are converted to Hex strings for maximum compatibility.
- **Metadata**: Includes `$description` from the surface config.

#### 2. CLI Export Command (`src/cli/commands/export.ts`)
We added a new `export` command to the CLI.
- **Usage**: `color-system export --config <file> --out <file> --format dtcg`
- **Logic**: Loads the config, solves the theme using the core engine, and then passes the result to the exporter.

#### 3. Type Definitions
We formalized the `Theme` interface in `src/lib/types.ts` to ensure type safety across the exporter and CLI.

### Verification
- **Unit Tests**: Added `src/lib/exporters/__tests__/dtcg.test.ts` to verify the JSON structure.
- **Manual Test**: Verified that `color-system export` generates a valid JSON file with the expected tokens.
