import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2022',
  dts: true,
  splitting: false,
  external: [
    '@noble/curves/secp256k1',
    '@noble/curves/*'
  ],
});