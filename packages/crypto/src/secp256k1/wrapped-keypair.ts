/**
 * @license Apache-2.0 Copyright © 2025 ReallyMe LLC
 *
 * Generate a secp256k1 keypair wrapped as a multikey (multicodec + multibase58btc).
 */

import { generateSecp256k1Keypair } from "@meproto/crypto-primitives";
import { encodeMultikey } from "@meproto/codec";

/**
 * Generate a secp256k1 keypair wrapped in multikey encoding.
 *
 * Returns:
 *   - secretKey           (raw 32-byte private key)
 *   - publicKey           (raw 33-byte compressed SEC1 public key)
 *   - publicKeyMultibase  (z... multikey string)
 */
export function generateSecp256k1MultikeyKeypair() {
  const { secretKey, publicKey } = generateSecp256k1Keypair();

  // Wrap public key using multicodec + multibase58btc
  const publicKeyMultibase = encodeMultikey("secp256k1-pub", publicKey);

  return {
    secretKey,
    publicKey,
    publicKeyMultibase,
  };
}