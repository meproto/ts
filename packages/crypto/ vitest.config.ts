import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
  optimizeDeps: {
    include: [
      "@noble/curves/secp256k1",
      "@noble/curves/secp256k1.js",
      "@noble/curves/ed25519",
      "@noble/curves/ed25519.js",
      "@noble/curves/nist",
      "@noble/curves/nist.js",
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
});