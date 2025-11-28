# Implementation Plan - Phase 7: Theme Builder Refinement

## Goal

Polish the Theme Builder UI to address usability issues identified in the "Fresh Eyes" audit, specifically focusing on mobile responsiveness, layout conflicts, and code maintainability.

## Strategy

### 1. Fix Layout Conflict

-   **Problem**: `demo/src/app.css` applies a global `max-width` and `text-align: center` to the `#app` container. This forces the Theme Builder (which wants to be a full-screen tool) into a centered, constrained box.
-   **Solution**:
    -   Modify `demo/src/app.css` to remove the global constraints or scope them to non-builder routes.
    -   Alternatively, apply a specific class to the body/root when the builder is active (though this is harder with hash routing).
    -   **Preferred**: Use a CSS `:has()` selector or a route-based class on the main container to switch layouts.

### 2. Mobile Responsiveness

-   **Problem**: The Theme Builder has a fixed-width sidebar (`350px`) and uses `flex-direction: row`. On mobile, this squashes the preview area or causes overflow.
-   **Solution**:
    -   Implement a media query (breakpoint: `768px`).
    -   Switch flex direction to `column`.
    -   Make the sidebar width `100%` and potentially collapsible (or just stacked at the top/bottom).
    -   Ensure the preview area takes remaining height.

### 3. Refactor Inline Styles

-   **Problem**: The `ThemeBuilder` components rely heavily on `style={{ ... }}` props. This makes it hard to use media queries and maintain consistency.
-   **Solution**:
    -   Create `demo/src/components/ThemeBuilder/ThemeBuilder.css`.
    -   Extract layout styles (flex, width, height, padding) into CSS classes.
    -   Replace inline styles with `className` props.

## Deliverables

-   [ ] **Full-Width Layout**: The Theme Builder should occupy 100% of the viewport width on desktop.
-   [ ] **Mobile Layout**: The Theme Builder should stack vertically on mobile devices without horizontal scroll.
-   [ ] **Clean Code**: `ThemeBuilder.tsx` and sub-components should use CSS classes instead of inline styles for layout.
