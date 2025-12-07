/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Generate an X25519 keypair wrapped as a multikey (multicodec + multibase58btc).
 */

import { generateX25519Keypair } from "@meproto/crypto-primitives";
import { encodeMultikey } from "@meproto/codec";

/**
 * Generate an X25519 keypair wrapped in multikey encoding.
 *
 * Returns:
 *   - secretKey           raw 32-byte private key
 *   - publicKey           raw 32-byte X25519 public key
 *   - publicKeyMultibase  z... multikey string
 */
export function generateX25519MultikeyKeypair() {
  const { secretKey, publicKey } = generateX25519Keypair();

  // Wrap public key using multicodec + multibase58btc
  const publicKeyMultibase = encodeMultikey("x25519-pub", publicKey);

  return {
    secretKey,
    publicKey,
    publicKeyMultibase,
  };
}