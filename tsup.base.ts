import { defineConfig } from "tsup";

export const baseConfig = defineConfig({
  format: ["esm"],
  target: "es2022",
  splitting: false,
  sourcemap: true,
  dts: true,
  clean: true,
});