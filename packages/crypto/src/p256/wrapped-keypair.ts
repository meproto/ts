/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Generate a P-256 keypair wrapped as a multikey (multicodec + multibase58btc).
 *
 */

import { generateP256Keypair } from "@meproto/crypto-primitives";
import { encodeMultikey } from "@meproto/codec";

/**
 * Generate a P-256 keypair wrapped in multikey encoding.
 *
 * Returns:
 *   - secretKey          (raw scalar)
 *   - publicKey          (raw SEC1 compressed)
 *   - publicKeyMultibase (z... multikey string)
 */
export function generateP256MultikeyKeypair() {
  const { secretKey, publicKey } = generateP256Keypair();

  const publicKeyMultibase = encodeMultikey("p256-pub", publicKey);

  return {
    secretKey,
    publicKey,
    publicKeyMultibase,
  };
}