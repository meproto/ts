/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * P-256 (secp256r1) keypair generation.
 *
 * Produces:
 *   - 32-byte secret key (raw private scalar)
 *   - 33-byte compressed public key (SEC1 format)
 *
 */

import { p256 as P256 } from "@noble/curves/nist.js";
import { randomBytes } from "../utils/randomBytes.js";

/**
 * Generate a P-256 keypair.
 * - secretKey: 32-byte scalar
 * - publicKey: 33-byte compressed SEC1 point
 */
export function generateP256Keypair() {
  const secretKey = randomBytes(32); // 32-byte scalar
  const publicKey = P256.getPublicKey(secretKey, true); // compressed SEC1

  return {
    secretKey,
    publicKey,
  };
}

