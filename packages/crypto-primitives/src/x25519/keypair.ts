/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * X25519 keypair generation.
 *
 * Produces:
 *   - secretKey: 32-byte private key
 *   - publicKey: 32-byte public key
 */

import { x25519 } from "@noble/curves/ed25519.js";

export interface X25519Keypair {
  secretKey: Uint8Array;
  publicKey: Uint8Array;
}

/**
 * Generate an X25519 keypair.
 * X25519 is used for ECDH key agreement (not signing).
 */
export function generateX25519Keypair(): X25519Keypair {
  const { secretKey, publicKey } = x25519.keygen();
  return { secretKey, publicKey };
}