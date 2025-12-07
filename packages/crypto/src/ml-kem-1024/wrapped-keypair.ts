/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Generate an ML-KEM-1024 keypair wrapped as a multikey (multicodec + multibase58btc).
 */

import { generateMlKem1024Keypair } from "@meproto/crypto-primitives";
import { encodeMultikey } from "@meproto/codec";

/**
 * Generate an ML-KEM-1024 keypair wrapped in multikey encoding.
 *
 * Returns:
 *   - secretKey           ML-KEM-1024 secret key
 *   - publicKey           ML-KEM-1024 public key (1568 bytes)
 *   - publicKeyMultibase  z... multikey string
 */
export function generateMlKem1024MultikeyKeypair() {
  const { secretKey, publicKey } = generateMlKem1024Keypair();

  const publicKeyMultibase = encodeMultikey("mlkem-1024-pub", publicKey);

  return {
    secretKey,
    publicKey,
    publicKeyMultibase,
  };
}