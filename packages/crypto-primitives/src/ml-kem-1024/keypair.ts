/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * ML-KEM-1024 keypair generation.
 *
 * Produces:
 *   - publicKey:  ML-KEM-1024 public key (1568 bytes per FIPS-203)
 *   - secretKey:  ML-KEM-1024 secret key
 */

import { ml_kem1024 } from "@noble/post-quantum/ml-kem.js";
import { randomBytes } from "../utils/randomBytes.js";

export interface MlKem1024Keypair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

/**
 * Generate an ML-KEM-1024 keypair.
 *
 * If a seed is provided, key generation is deterministic.
 * If omitted, a 64-byte random seed is used.
 */
export function generateMlKem1024Keypair(seed?: Uint8Array): MlKem1024Keypair {
  const s = seed ?? randomBytes(64);
  const kp = ml_kem1024.keygen(s);

  return {
    publicKey: kp.publicKey,
    secretKey: kp.secretKey,
  };
}