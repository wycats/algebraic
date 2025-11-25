# Philosophy

The color system is designed to be **Platform-Native**, **Adaptive**, and **Automated**.

## Semantics Derived from Accessibility

Our semantic roles (like "Surface", "Action", "Link") are not arbitrary choices. They are derived directly from the **fundamental semantics of the web platform**, specifically the System Colors used by Forced Colors and High Contrast modes.

By aligning our taxonomy with these platform primitives (e.g., `Canvas`, `ButtonFace`, `Highlight`), we ensure that accessibility is not an "add-on" or a "special case." It is the **foundation** of the design. When you design with these concepts, you are designing with the grain of the web, ensuring your application feels native and works perfectly for every user, regardless of their device or settings.

1.  **Semantic:** You pick roles that map to platform primitives.
2.  **Adaptive:** Because the roles are native, the system adapts to Light, Dark, High Contrast, and Forced Colors automatically.
3.  **Automated:** Lightness values are calculated by a solver to guarantee accessible contrast within those roles.
