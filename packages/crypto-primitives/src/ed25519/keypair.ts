/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Ed25519 keypair generation.
 *
 * Produces:
 *   - 32-byte secret key (raw seed/private scalar)
 *   - 32-byte public key (raw Ed25519 public key)
 */

import { ed25519 } from "@noble/curves/ed25519.js";
import { randomBytes } from "../utils/randomBytes.js";

/**
 * Generate an Ed25519 keypair.
 * - secretKey: 32-byte private scalar/seed
 * - publicKey: 32-byte Ed25519 public key
 */
export function generateEd25519Keypair() {
  const secretKey = randomBytes(32);          // 32-byte Ed25519 private scalar/seed
  const publicKey = ed25519.getPublicKey(secretKey); // 32-byte public key

  return {
    secretKey,
    publicKey,
  };
}