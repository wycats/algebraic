import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { solve } from "../../lib/index.ts";
import { toDTCG } from "../../lib/exporters/dtcg.ts";
import type { SolverConfig } from "../../lib/types.ts";

export function exportCommand(args: string[], cwd: string): void {
  // Simple arg parsing
  // color-system export --config <file> --out <file> --format <format>
  
  let configPath = "color-config.json";
  let outPath = "tokens.json";
  let format = "dtcg";

  for (let i = 0; i < args.length; i++) {
    const nextArg = args[i + 1];
    if (args[i] === "--config" && nextArg) {
      configPath = nextArg;
      i++;
    } else if (args[i] === "--out" && nextArg) {
      outPath = nextArg;
      i++;
    } else if (args[i] === "--format" && nextArg) {
      format = nextArg;
      i++;
    }
  }

  const absConfigPath = resolve(cwd, configPath);
  const absOutPath = resolve(cwd, outPath);

  if (format !== "dtcg") {
    console.error(`Error: Unsupported format '${format}'. Only 'dtcg' is supported.`);
    process.exit(1);
  }

  console.log(`Reading config from: ${absConfigPath}`);
  let config: SolverConfig;
  try {
    config = JSON.parse(readFileSync(absConfigPath, "utf8")) as SolverConfig;
  } catch (e) {
    console.error(`Error reading config file: ${String(e)}`);
    process.exit(1);
  }

  console.log("Solving theme...");
  const theme = solve(config);

  console.log(`Exporting to ${format.toUpperCase()}...`);
  const tokens = toDTCG(theme);

  console.log(`Writing to: ${absOutPath}`);
  writeFileSync(absOutPath, JSON.stringify(tokens, null, 2));
  console.log("Done!");
}
