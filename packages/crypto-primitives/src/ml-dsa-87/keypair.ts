/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * ML-DSA-87 keypair generation.
 *
 * Produces:
 *   - secretKey: raw ML-DSA-87 secret key
 *   - publicKey: raw ML-DSA-87 public key
 */

import { ml_dsa87 } from "@noble/post-quantum/ml-dsa.js";
import { randomBytes } from "../utils/randomBytes.js";

export interface MlDsa87Keypair {
  secretKey: Uint8Array;
  publicKey: Uint8Array;
}

/**
 * Generate an ML-DSA-87 keypair.
 * 
 * If a 32-byte seed is supplied, the keypair is deterministic.
 * If omitted, a secure random seed is generated.
 */
export function generateMlDsa87Keypair(seed?: Uint8Array): MlDsa87Keypair {
  const s = seed ?? randomBytes(32); // 32-byte seed for keygen
  const kp = ml_dsa87.keygen(s);

  return {
    secretKey: kp.secretKey,
    publicKey: kp.publicKey,
  };
}