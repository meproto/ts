/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Low-level ML-DSA-87 signing primitive.
 *
 * - Accepts raw Uint8Array message
 * - Accepts raw ML-DSA-87 secret key (as returned by ml_dsa87.keygen)
 * - Returns raw ML-DSA-87 signature bytes
 */

import { ml_dsa87 } from "@noble/post-quantum/ml-dsa.js";

/**
 * Produce a raw ML-DSA-87 signature over a message.
 *
 * @param message   Arbitrary bytes (Uint8Array)
 * @param secretKey ML-DSA-87 secret key (Uint8Array)
 *
 * @returns signature (Uint8Array)
 */
export function signMlDsa87(
  message: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return ml_dsa87.sign(message, secretKey);
}