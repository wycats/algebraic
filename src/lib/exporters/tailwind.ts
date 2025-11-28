import type { ColorSpec, Theme } from "../types.ts";

const toNumber = (n: number): number => parseFloat(n.toFixed(4));

const formatOklch = (spec: ColorSpec): string => {
  return `oklch(${toNumber(spec.l)} ${toNumber(spec.c)} ${toNumber(spec.h)})`;
};

export function toTailwind(theme: Theme): Record<string, unknown> {
  const colors: Record<string, unknown> = {
    // Contextual Text Colors (map to CSS variables)
    text: {
      high: "var(--text-high-token)",
      subtle: "var(--text-subtle-token)",
      subtlest: "var(--text-subtlest-token)",
    },
    // Contextual Border Colors (map to CSS variables)
    border: {
      dec: "var(--border-dec-token)",
      int: "var(--border-int-token)",
    },
    // Global Focus Ring
    focus: "var(--focus-ring-color)",
    // Surface Colors (map to light-dark values)
    surface: {} as Record<string, string>,
    // Chart Colors (map to CSS variables)
    chart: {} as Record<string, string>,
  };

  // 1. Generate Surface Colors
  const surfaceColors = colors.surface as Record<string, string>;
  for (const surface of theme.surfaces) {
    const bgLight = theme.backgrounds.get(surface.slug)?.light;
    const bgDark = theme.backgrounds.get(surface.slug)?.dark;

    if (bgLight && bgDark) {
      surfaceColors[surface.slug] = `light-dark(${formatOklch(
        bgLight
      )}, ${formatOklch(bgDark)})`;
    }
  }

  // 2. Generate Chart Colors (1-10)
  // We assume these are generated as --chart-1, --chart-2, etc.
  const chartColors = colors.chart as Record<string, string>;
  for (let i = 1; i <= 10; i++) {
    chartColors[i.toString()] = `var(--chart-${i})`;
  }

  return {
    theme: {
      extend: {
        colors,
        boxShadow: {
          sm: "var(--shadow-sm)",
          md: "var(--shadow-md)",
          lg: "var(--shadow-lg)",
          xl: "var(--shadow-xl)",
        },
      },
    },
  };
}
