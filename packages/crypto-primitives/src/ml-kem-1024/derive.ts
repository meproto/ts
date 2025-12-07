/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * ML-KEM-1024 key encapsulation / decapsulation.
 */

import { ml_kem1024 } from "@noble/post-quantum/ml-kem.js";
import { randomBytes } from "../utils/randomBytes.js";

export interface MlKem1024Encapsulated {
  sharedSecret: Uint8Array;
  cipherText: Uint8Array; 
}

/**
 * Encapsulate a shared secret to a recipient's ML-KEM-1024 public key.
 */
export function mlKem1024Encapsulate(
  publicKey: Uint8Array,
  seed?: Uint8Array
): MlKem1024Encapsulated {
  const s = seed ?? randomBytes(32);

  // Noble returns: { sharedSecret, cipherText }
  const { sharedSecret, cipherText } = ml_kem1024.encapsulate(publicKey, s);

  return { sharedSecret, cipherText };
}

/**
 * Decapsulate a shared secret using the ML-KEM-1024 secret key.
 */
export function mlKem1024Decapsulate(
  cipherText: Uint8Array,
  secretKey: Uint8Array
): Uint8Array {
  return ml_kem1024.decapsulate(cipherText, secretKey);
}