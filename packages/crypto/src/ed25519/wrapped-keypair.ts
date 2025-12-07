/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Generate an Ed25519 keypair wrapped as a multikey (multicodec + multibase58btc).
 */

import { generateEd25519Keypair } from "@meproto/crypto-primitives";
import { encodeMultikey } from "@meproto/codec";

/**
 * Generate an Ed25519 keypair wrapped in multikey encoding.
 *
 * Returns:
 *   - secretKey          (raw 32-byte private seed)
 *   - publicKey          (raw 32-byte Ed25519 public key)
 *   - publicKeyMultibase (z... multikey string)
 */
export function generateEd25519MultikeyKeypair() {
  const { secretKey, publicKey } = generateEd25519Keypair();

  // Wrap public key using multicodec + multibase58btc
  const publicKeyMultibase = encodeMultikey("ed25519-pub", publicKey);

  return {
    secretKey,
    publicKey,
    publicKeyMultibase,
  };
}