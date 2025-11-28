import { formatHex } from "culori";
import type { Theme, ColorSpec, Mode } from "../types.ts";

interface DTCGToken {
  $type: "color" | "dimension" | "fontFamily" | "fontWeight" | "number";
  $value: string | number;
  $description?: string;
  $extensions?: Record<string, unknown>;
}

interface DTCGGroup {
  [key: string]: DTCGToken | DTCGGroup;
}

export function toDTCG(theme: Theme): Record<string, DTCGGroup> {
  const tokens: Record<string, DTCGGroup> = {
    light: {},
    dark: {},
  };

  // Helper to format color
  const formatColor = (spec: ColorSpec): string => {
    const hex = formatHex({ mode: "oklch", l: spec.l, c: spec.c, h: spec.h });
    return hex || "#000000";
  };

  // Helper to format foreground color (assuming neutral for now)
  const formatFg = (lightness: number): string => {
    const hex = formatHex({ mode: "oklch", l: lightness, c: 0, h: 0 });
    return hex || "#000000";
  };

  for (const mode of ["light", "dark"] as Mode[]) {
    const modeGroup: DTCGGroup = {};

    // 1. Surfaces
    const surfaceGroup: DTCGGroup = {};
    const onSurfaceGroup: DTCGGroup = {};

    for (const surface of theme.surfaces) {
      const bgSpec = theme.backgrounds.get(surface.slug)?.[mode];
      if (!bgSpec) continue;

      // Background Token
      surfaceGroup[surface.slug] = {
        $type: "color",
        $value: formatColor(bgSpec),
        $description: surface.description || surface.label,
      };

      // Foreground Tokens
      const fgSpec = surface.computed?.[mode];
      if (fgSpec) {
        const fgTokens: DTCGGroup = {};
        
        // Map internal names to semantic names if needed, or just use keys
        // "fg-high", "fg-strong", etc.
        for (const [key, lightness] of Object.entries(fgSpec)) {
            if (key === 'background') continue; // Skip background as it's redundant
            
            // Clean up key name: "fg-high" -> "high"
            const cleanKey = key.replace('fg-', '');
            
            fgTokens[cleanKey] = {
                $type: "color",
                $value: formatFg(lightness),
            };
        }
        
        onSurfaceGroup[surface.slug] = fgTokens;
      }
    }

    modeGroup["surface"] = surfaceGroup;
    modeGroup["on-surface"] = onSurfaceGroup;

    tokens[mode] = modeGroup;
  }

  return tokens;
}
