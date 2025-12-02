# Implementation Plan: Theme Builder Layout Polish

## Goal

Fix layout issues in the Theme Builder, specifically targeting Starlight CSS interference, responsiveness on 1366px screens, and vertical whitespace usage.

## Tasks

### 1. Style Isolation

- Wrap `StudioLayout` (or its contents) in the `<Diagram>` component.
- This component adds the `not-content` class which prevents Starlight's prose styles (like margins on lists) from leaking into the application UI.

### 2. Responsive Layout (1366px)

- The current `grid-template-columns: 1fr 1fr` in `ComponentView` might be too wide when combined with the sidebars.
- Add a media query or container query to switch to a single column or adjust gaps on narrower screens.
- Check `StudioLayout` sidebar widths and ensure the center stage has enough room.

### 3. Vertical Space Optimization

- The `stage-container` currently centers content vertically (`align-items: center`).
- Change this to `align-items: start` with a reasonable top margin/padding to avoid the "floating in the middle of nowhere" look on tall screens, or fill the space better.
- Reduce `gap` and `padding` in `ComponentView` to make it tighter.

## Verification

- Check that list items in the sidebar are not nudged down.
- Check that the layout fits comfortably on a 1366x768 viewport.
- Check that the center panel looks balanced (not too much whitespace).
