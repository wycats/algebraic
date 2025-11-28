# Implementation Plan - Epoch 10: Ecosystem & Interoperability

## Phase 2: Tailwind CSS Integration

## Goal

Generate a Tailwind CSS configuration (preset) that allows users to use the color system's tokens as utility classes (e.g., `text-subtle`, `border-dec`, `bg-surface-card`).

## Objectives

1.  **CLI Export Command**: Extend the `export` command to support `--format tailwind`.
2.  **Tailwind Exporter**: Implement logic to map the internal `Theme` object to a Tailwind theme configuration object.
3.  **Verification**: Verify the output structure matches Tailwind's expected format and works in a sample environment.

## Proposed Changes

### CLI (`src/cli/`)

- Update `src/cli/commands/export.ts` to handle `tailwind` format.
- Output file should default to `tailwind.preset.js`.

### Library (`src/lib/`)

- Create `src/lib/exporters/tailwind.ts`:
  - Function `toTailwind(theme: Theme): Record<string, any>`.
  - **Contextual Tokens**: Map text and border colors to the CSS variables provided by the system's runtime.
    - `colors.text.high` -> `var(--text-high-token)`
    - `colors.text.subtle` -> `var(--text-subtle-token)`
    - `colors.text.subtlest` -> `var(--text-subtlest-token)`
    - `colors.border.dec` -> `var(--border-dec-token)`
    - `colors.border.int` -> `var(--border-int-token)`
  - **Global Tokens**: Map global system tokens.
    - `colors.focus` -> `var(--focus-ring-color)`
    - `colors.chart.*` -> `var(--chart-*)`
  - **Surface Colors**: Map surface backgrounds to their calculated `light-dark()` values.
    - `colors.surface[slug]` -> `light-dark(oklch(...), oklch(...))`
    - *Rationale*: This allows users to use `bg-surface-card` or `border-surface-card` for one-off styling, even though the preferred method is using the `.surface-card` class (which sets context).
  - **Shadows**: Map system shadows to Tailwind's `boxShadow` theme.
    - `boxShadow.sm` -> `var(--shadow-sm)`
    - `boxShadow.md` -> `var(--shadow-md)`
    - ...

### Testing

- Add unit tests for the Tailwind exporter in `src/lib/exporters/__tests__/tailwind.test.ts`.
- Verify the generated JS object structure.

## Future Phases (For Context)

- **Phase 3**: DX Improvements (JSON Schema).
- **Phase 4**: Documentation & Guides.
