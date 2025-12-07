/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Low-level ML-DSA-87 verification primitive.
 *
 * - Accepts raw Uint8Array signature
 * - Accepts raw Uint8Array message
 * - Accepts raw Uint8Array ML-DSA-87 public key
 *
 */

import { ml_dsa87 } from "@noble/post-quantum/ml-dsa.js";

/**
 * Verify an ML-DSA-87 signature over a message.
 *
 * @param signature  Raw ML-DSA-87 signature bytes
 * @param message    Message bytes
 * @param publicKey  Raw ML-DSA-87 public key
 *
 * @returns true if valid, false otherwise
 */
export function verifyMlDsa87(
  signature: Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array
): boolean {
  return ml_dsa87.verify(signature, message, publicKey);
}