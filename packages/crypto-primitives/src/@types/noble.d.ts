/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 *  Minimal shims so TypeScript's DTS step doesn't error on Noble ESM deep imports.
 */

declare module "@noble/curves/secp256k1.js" {
  export const secp256k1: any;
}

declare module "@noble/curves/ed25519.js" {
  export const ed25519: any;
  export const x25519: any;
}

declare module "@noble/curves/nist.js" {
  export const p256: any;
}

declare module "@noble/hashes/sha256.js" {
  export function sha256(msg: Uint8Array | string): Uint8Array;
}

declare module "@noble/post-quantum/ml-dsa.js" {
  export const ml_dsa87: any;
}

declare module "@noble/post-quantum/ml-kem.js" {
  export const ml_kem1024: any;
}