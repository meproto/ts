/**
 * @license Apache-2.0
 * Copyright © 2025 by ReallyMe LLC
 */

import { p256 as P256 } from "@noble/curves/nist.js";

/**
 * Low-level P-256 ECDSA signing.
 * - Returns DER-encoded signature.
 * - Uses SHA-256 prehashing.
 */
export function signP256DerPrehash(
  message: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return P256.sign(message, secretKey, {
    format: "der",
    prehash: true,
  });
}