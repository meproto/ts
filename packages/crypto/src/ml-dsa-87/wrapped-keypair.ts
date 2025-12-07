/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Generate an ML-DSA-87 keypair wrapped as a multikey.
 */

import { generateMlDsa87Keypair } from "@meproto/crypto-primitives";
import { encodeMultikey } from "@meproto/codec";

/**
 * Generate an ML-DSA-87 wrapped keypair.
 *
 * Returns:
 *   - secretKey           raw ML-DSA-87 secret key
 *   - publicKey           raw ML-DSA-87 public key
 *   - publicKeyMultibase  multikey-encoded public key (z...)
 */
export function generateMlDsa87MultikeyKeypair() {
  const { secretKey, publicKey } = generateMlDsa87Keypair();

  const publicKeyMultibase = encodeMultikey("mldsa-87-pub", publicKey);

  return {
    secretKey,
    publicKey,
    publicKeyMultibase,
  };
}