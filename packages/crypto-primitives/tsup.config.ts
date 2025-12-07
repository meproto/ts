import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  target: "es2022",
  external: [
    "@noble/curves",
    "@noble/curves/*",
    "@noble/hashes",
    "@noble/hashes/*",
    "@noble/post-quantum",
    "@noble/post-quantum/*"
  ],
});