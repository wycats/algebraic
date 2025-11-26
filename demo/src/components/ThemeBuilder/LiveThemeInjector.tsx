import {
  generateTheme,
  injectTheme,
  toHighContrast,
} from "color-system/runtime";
import { useEffect, useRef } from "preact/hooks";
import { useConfig } from "../../context/ConfigContext";

export function LiveThemeInjector({
  simulateHighContrast = false,
}: {
  simulateHighContrast?: boolean;
}) {
  const { config } = useConfig();
  const styleElementRef = useRef<HTMLStyleElement | undefined>(undefined);

  useEffect(() => {
    try {
      let css = generateTheme(config, "#theme-builder-preview");

      if (simulateHighContrast) {
        const hcConfig = toHighContrast(config);
        const hcCss = generateTheme(hcConfig, "#theme-builder-preview");
        // We wrap it in a layer or just append it?
        // Since we are simulating, we want it to apply *now*.
        // But usually HC is inside @media (prefers-contrast: more).
        // If we want to force it, we can just overwrite the CSS with the HC version.
        // OR we can append it with a class selector if we were using classes.
        // But here we are simulating the *system* preference.
        // The easiest way to simulate "prefers-contrast: more" without changing OS settings
        // is to just inject the HC theme *instead* of the normal one.
        css = hcCss;
      }

      styleElementRef.current = injectTheme(
        css,
        undefined,
        styleElementRef.current
      );
    } catch (e) {
      console.error("Solver failed:", e);
    }
  }, [config, simulateHighContrast]);

  useEffect(() => {
    return () => {
      if (styleElementRef.current) {
        styleElementRef.current.remove();
      }
    };
  }, []);

  return null;
}
