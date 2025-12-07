import { defineConfig } from "tsup";
import { baseConfig } from "../../tsup.base";

export default defineConfig({
  ...baseConfig,
  entry: ["src/index.ts"],

  external: [
    "@noble/curves",
    "@noble/curves/*",
    "@noble/hashes",
    "@noble/hashes/*",
    "@noble/post-quantum",
    "@noble/post-quantum/*",
  ],
});