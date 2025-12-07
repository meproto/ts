/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Low-level Ed25519 signing.
 * - Accepts raw Uint8Array message
 * - Returns raw Ed25519 signature bytes
 * - Deterministic (Ed25519 always deterministic)
 */

import { ed25519 } from "@noble/curves/ed25519.js";

/**
 * Sign a message with Ed25519.
 * Returns a 64-byte signature.
 */
export function signEd25519(
  message: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return ed25519.sign(message, secretKey);
}