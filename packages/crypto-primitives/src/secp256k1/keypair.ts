/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * secp256k1 keypair generation.
 *
 * Produces:
 *   - secretKey: 32-byte private key (0 < sk < n)
 *   - publicKey: 33-byte compressed SEC1 public key
 */

import { secp256k1 } from "@noble/curves/secp256k1.js";

export interface Secp256k1Keypair {
  secretKey: Uint8Array;
  publicKey: Uint8Array;
}

/**
 * Generate a secp256k1 keypair.
 * Uses utils.randomSecretKey() to ensure valid scalar (< n).
 */
export function generateSecp256k1Keypair(): Secp256k1Keypair {
  const secretKey = secp256k1.utils.randomSecretKey(); // ALWAYS valid (< n)
  const publicKey = secp256k1.getPublicKey(secretKey, true); // compressed SEC1 (33 bytes)

  return {
    secretKey,
    publicKey,
  };
}