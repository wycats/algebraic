import { describe, expect, it } from "vitest";
import { generateTokensCss } from "../generator.ts";
import type { ColorSpec, Mode, SurfaceGroup, Theme } from "../types.ts";

describe("generateTokensCss", () => {
  it("generates correct CSS for a standard surface group", () => {
    const groups: SurfaceGroup[] = [
      {
        name: "Base Surfaces",
        surfaces: [
          {
            slug: "page",
            label: "Page",
            polarity: "page",
            states: [{ name: "hover", offset: 0 }],
          },
          {
            slug: "card",
            label: "Card",
            polarity: "page",
            states: [],
          },
        ],
      },
    ];

    const backgrounds = new Map<string, Record<Mode, ColorSpec>>();
    backgrounds.set("page", {
      light: { l: 0.98, c: 0, h: 0 },
      dark: { l: 0.1, c: 0, h: 0 },
    });
    backgrounds.set("page-hover", {
      light: { l: 0.95, c: 0, h: 0 },
      dark: { l: 0.15, c: 0, h: 0 },
    });
    backgrounds.set("card", {
      light: { l: 1.0, c: 0, h: 0 },
      dark: { l: 0.2, c: 0, h: 0 },
    });

    const borderTargets = {
      decorative: 0.2,
      interactive: 0.5,
      critical: 0.8,
    };

    const theme = {
      surfaces: [],
      backgrounds,
      charts: [],
      primitives: undefined,
    } as unknown as Theme;

    const css = generateTokensCss(groups, theme, borderTargets);

    expect(css).toMatchSnapshot();
  });

  it("handles missing background values gracefully", () => {
    const groups: SurfaceGroup[] = [
      {
        name: "Base Surfaces",
        surfaces: [
          {
            slug: "unknown",
            label: "Unknown",
            polarity: "page",
          },
        ],
      },
    ];

    const backgrounds = new Map<string, Record<Mode, ColorSpec>>();
    // "unknown" is missing

    const theme = {
      surfaces: [],
      backgrounds,
      charts: [],
      primitives: undefined,
    } as unknown as Theme;

    const css = generateTokensCss(groups, theme);
    expect(css).toMatchSnapshot();
  });

  it("generates palette tokens when configured", () => {
    const groups: SurfaceGroup[] = [];
    const backgrounds = new Map<string, Record<Mode, ColorSpec>>();
    backgrounds.set("page", {
      light: { l: 1, c: 0, h: 0 },
      dark: { l: 0, c: 0, h: 0 },
    });

    const charts = [
      {
        light: { l: 0.5, c: 0.15, h: 0 },
        dark: { l: 0.6, c: 0.15, h: 0 },
      },
      {
        light: { l: 0.5, c: 0.15, h: 120 },
        dark: { l: 0.6, c: 0.15, h: 120 },
      },
      {
        light: { l: 0.5, c: 0.15, h: 240 },
        dark: { l: 0.6, c: 0.15, h: 240 },
      },
    ];

    const theme = {
      surfaces: [],
      backgrounds,
      charts,
      primitives: undefined,
    } as unknown as Theme;

    const css = generateTokensCss(groups, theme, undefined, undefined);

    expect(css).toContain("--chart-1");
    expect(css).toContain("--chart-2");
    expect(css).toContain("--chart-3");
    expect(css).toContain("oklch(");
    expect(css).toMatchSnapshot();
  });
});
