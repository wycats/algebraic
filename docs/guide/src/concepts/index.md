# Core Concepts

This section details the fundamental building blocks of the color system.

- **[Anchors](./anchors.md)**: The fixed points that define the contrast range.
- **[Surfaces](./surfaces.md)**: The containers that create context.
- **[Context](./context.md)**: How polarity and mode affect color calculation.

## Surfaces & Context

Everything sits on a **Surface**. A surface is not just a background color; it creates a **Context** for everything inside it.

- **`surface-page`**: The application background.
- **`surface-card`**: A contained content area.
- **`surface-action`**: A clickable interactive area (e.g., a button).
- **`surface-spotlight`**: An inverted or high-emphasis area.

When you nest surfaces (e.g., a Card on a Page), the system automatically adjusts the context so that text and borders maintain perfect contrast.

## Foregrounds (Text & Icons)

Text utilities consume the **Context** provided by the surface. You don't need to know _which_ surface you are on; you just declare the hierarchy.

- **`text-strong`** (Default): Primary content. High contrast.
- **`text-subtle`**: Secondary content. Medium contrast.
- **`text-subtler`**: Meta-data or low-emphasis content.
- **`text-link`**: Interactive navigation elements. Uses the brand hue.

## States

Interactive elements have standard states that work across all surfaces.

- **`hover` / `active`**: Interaction feedback.
- **`state-selected`**: For chosen items (e.g., a selected list option). Maps to System Highlight.
- **`state-disabled`**: For non-interactive items. Maps to System GrayText.

## Borders

Borders also consume the surface context.

- **`bordered`**: Adds a decorative border (low contrast) to define the edge of a surface.
- **`border-interactive`**: A higher contrast border for inputs or active elements.
