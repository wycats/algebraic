# Task List - Epoch 34: Phase 3 (Export & Validation)

## Theme Builder: Export Preview

- [x] **UI Scaffold**: Create an "Export" tab/panel in the Theme Builder UI.
- [x] **Integration**: Connect the `ConfigState` to the existing exporters (`toDTCG`, `toTailwind`, `generateTokensCss`).
- [x] **Display**: Render the generated output (JSON, JS, CSS) in syntax-highlighted code blocks.
- [x] **Interaction**: Add "Copy to Clipboard" and "Download" functionality.

## Theme Builder: Validation

- [ ] **Schema Integration**: Integrate `ajv` and the JSON schema into `ConfigState`.
- [ ] **Real-time Validation**: Implement debounced validation of the current configuration.
- [ ] **Error Reporting**: Display validation errors in the UI (e.g., status bar or error list).

## Ecosystem: ESLint

- [ ] **Svelte Support**: Update `eslint-plugin-axiomatic` to correctly parse and lint Svelte `style` attributes.
- [ ] **Verification**: Pass the `svelte-smoke.test.ts` test case.
