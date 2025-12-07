/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * X25519 key agreement (ECDH).
 *
 * sharedSecret = X25519(privateKeyA, publicKeyB)
 */

import { x25519 } from "@noble/curves/ed25519.js";

/**
 * Compute an X25519 shared secret.
 *
 * @param secretKey   32-byte private key
 * @param publicKey   32-byte public key
 *
 * @returns 32-byte shared secret
 */
export function deriveX25519SharedSecret(
  secretKey: Uint8Array,
  publicKey: Uint8Array
): Uint8Array {
  return x25519.getSharedSecret(secretKey, publicKey);
}