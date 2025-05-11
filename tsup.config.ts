import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    clean: true,
    outDir: "dist",
  },
  {
    entry: ["bin/cli.ts"],
    format: ["esm"],
    dts: false,
    clean: false,
    splitting: false,
    outDir: "dist/bin",
    banner: { js: "#!/usr/bin/env node" },
  },
]);
