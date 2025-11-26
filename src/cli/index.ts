#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { generateTokensCss, toHighContrast } from "../lib/generator.ts";
import { getKeyColorStats, solve } from "../lib/index.ts";
import type { SolverConfig } from "../lib/types.ts";
import { DEFAULT_CONFIG } from "./default-config.ts";

const args = process.argv.slice(2);
const CWD = process.cwd();

if (import.meta.main) {
  if (args[0] === "init") {
    const targetPath = join(CWD, "color-config.json");
    if (existsSync(targetPath)) {
      console.error("Error: color-config.json already exists.");
      process.exit(1);
    }
    writeFileSync(targetPath, JSON.stringify(DEFAULT_CONFIG, null, 2));
    console.log("Created color-config.json");
    console.log("Run `color-system` to generate your theme.");
    process.exit(0);
  }

  const CONFIG_PATH = args[0]
    ? resolve(CWD, args[0])
    : join(CWD, "color-config.json");

  const BASE_CSS_PATH = args[1]
    ? resolve(CWD, args[1])
    : join(CWD, "theme.css");

  if (!args[0] && !args[1]) {
    // Check if default config exists, if not, warn
    try {
      readFileSync(CONFIG_PATH);
    } catch {
      console.error(
        "No config file found at default location: ./color-config.json"
      );
      console.error("Usage: color-system [config-file] [output-file]");
      console.error("   or: color-system init");
      process.exit(1);
    }
  }

  console.log("Reading config from:", CONFIG_PATH);
  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8")) as SolverConfig;

  console.log("Solving surfaces...");
  const { backgrounds } = solve(config);

  console.log("Generating CSS...");
  let css = generateTokensCss(config.groups, backgrounds, config.borderTargets);

  const stats = getKeyColorStats(config.anchors.keyColors);
  if (stats.chroma !== undefined || stats.hue !== undefined) {
    const vars: string[] = [];
    if (stats.chroma !== undefined)
      vars.push(`  --chroma-brand: ${stats.chroma};`);
    if (stats.hue !== undefined) vars.push(`  --hue-brand: ${stats.hue};`);

    if (vars.length > 0) {
      css = `:root {\n${vars.join("\n")}\n}\n\n` + css;
    }
  }

  // --- High Contrast Generation ---
  console.log("Generating High Contrast variant...");
  const hcConfig = toHighContrast(config);
  const { backgrounds: hcBackgrounds } = solve(hcConfig);
  const hcCss = generateTokensCss(
    hcConfig.groups,
    hcBackgrounds,
    hcConfig.borderTargets
  );

  // Wrap in media query and add overrides
  const hcBlock = `
@media (prefers-contrast: more) {
  :root {
    --base-chroma: 0;
    --surface-chroma-adjust: 0;
    --hue-adjust: 0;
    --chroma-brand: 0;
  }

${hcCss}
}
`;

  css += hcBlock;

  console.log("Writing CSS to:", BASE_CSS_PATH);
  writeFileSync(BASE_CSS_PATH, css);
  console.log("Done!");
}
