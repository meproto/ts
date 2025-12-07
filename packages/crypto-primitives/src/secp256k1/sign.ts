/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Low-level secp256k1 signing.
 *
 * - SHA-256 prehashing
 * - Compact 64-byte (r||s) signatures
 * - Enforces low-S normalization for ES256K compatibility
 */

import { secp256k1 } from "@noble/curves/secp256k1.js";
import { sha256 } from "@noble/hashes/sha2.js";

export function signSecp256k1(
  message: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  const digest = sha256(message);
  // sign() returns a Uint8Array(64) directly in Noble v2
  return secp256k1.sign(digest, secretKey, { lowS: true });
}