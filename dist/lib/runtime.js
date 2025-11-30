import { solve, getKeyColorStats } from '../chunk-GSAJWB6E.js';
import '../chunk-JY54TZUI.js';
import '../chunk-LBEWBWXX.js';
import { generateTokensCss } from '../chunk-JSZ6EFMC.js';
export { toHighContrast } from '../chunk-JSZ6EFMC.js';
import '../chunk-7LUK7J7M.js';
import '../chunk-W5IKP2D6.js';
import '../chunk-A2CSS6V4.js';
import '../chunk-G3PMV62Z.js';

// src/lib/runtime.ts
function generateTheme(config, selector) {
  const theme = solve(config);
  const stats = getKeyColorStats(config.anchors.keyColors);
  let css = generateTokensCss(
    config.groups,
    theme,
    config.borderTargets,
    selector
  );
  if (stats.chroma !== void 0 || stats.hue !== void 0) {
    const vars = [];
    if (stats.chroma !== void 0)
      vars.push(`  --chroma-brand: ${stats.chroma};`);
    if (stats.hue !== void 0) vars.push(`  --hue-brand: ${stats.hue};`);
    if (vars.length > 0) {
      const scope = selector || ":root";
      css = `${scope} {
${vars.join("\n")}
}

` + css;
    }
  }
  return css;
}
function injectTheme(css, target, existingElement) {
  const style = existingElement || document.createElement("style");
  style.textContent = css;
  if (!existingElement) {
    if (target) {
      target.appendChild(style);
    } else {
      document.head.appendChild(style);
    }
  }
  return style;
}

export { generateTheme, injectTheme };
//# sourceMappingURL=runtime.js.map
//# sourceMappingURL=runtime.js.map