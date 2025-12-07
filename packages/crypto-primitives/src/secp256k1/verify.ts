/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Low-level secp256k1 verification.
 *
 * Accepts:
 *   - 64-byte compact signature (r||s)
 *   - raw Uint8Array message
 *   - raw 33-byte compressed SEC1 public key
 */

import { secp256k1 } from "@noble/curves/secp256k1.js";
import { sha256 } from "@noble/hashes/sha2.js";

export function verifySecp256k1(
  signature: Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array
): boolean {
  try {
    const digest = sha256(message);
    return secp256k1.verify(signature, digest, publicKey);
  } catch {
    return false;
  }
}