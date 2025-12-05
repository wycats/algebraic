# Implementation Plan - Epoch 30: Developer Tooling

**Goal**: Empower developers with tools to understand, debug, and leverage the Axiomatic Color system effectively, focusing on "Editor DX" and "CI Safety" rather than new toolchains.

## Phase 1: AI Context (`llms.txt`) (Completed)

**Goal**: Create a standardized context file for AI coding assistants (Cursor, Copilot) to improve their ability to generate Axiomatic code.

- [x] **Content Aggregation**: Write a script to aggregate MDX content from `site/src/content/docs`.
- [x] **Summarization**: Create a condensed `public/llms.txt` focusing on high-level concepts and key APIs.
- [x] **Full Context**: Create `public/llms-full.txt` with the complete documentation text.
- [x] **Verification**: Test by feeding the file to an LLM and asking it to "Build a Card component".

## Phase 2: The CI Gatekeeper (`axiomatic audit`)

**Goal**: Harden the existing `audit` command to serve as a comprehensive "System Integrity" check for CI/CD pipelines.

- [x] **Schema Validation**: Integrate `ajv` (or similar) to validate `color-config.json` against the generated schema at runtime.
- [ ] **Dead Token Detection**: Analyze the config to identify defined surfaces or keys that are not generating CSS output. (Deferred: User focus shifted to Editor DX)
- [x] **Exit Codes**: Ensure the command returns proper exit codes (0 for pass, 1 for fail) for CI integration.
- [x] **Reporting**: Improve the output format to be human-readable (and potentially machine-readable via `--json`).

## Phase 3: The Editor Companion (VS Code Extension)

**Goal**: Provide immediate feedback and autocomplete within the editor using a robust, AST-based approach.

- [x] **Grammar Spec**: Define the formal Tree-sitter queries for detecting class names in HTML, JSX, Svelte, and Vue.
- [x] **Scaffold**: Initialize a new VS Code extension project in `packages/vscode-extension`.
- [x] **Infrastructure**: Set up `web-tree-sitter` and download necessary WASM grammars.
- [x] **Language Server**: Implement the `CompletionItemProvider` using the defined queries.
- [x] **Autocomplete**: Provide completion items for all generated tokens.
- [x] **Decorators**: Render color swatches (squares) next to known token classes or variables.
