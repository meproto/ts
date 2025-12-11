import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true
  },
  optimizeDeps: {
    include: [
      "@noble/curves/secp256k1",
      "@noble/curves/ed25519",
      "@noble/curves/nist"
    ]
  }
});