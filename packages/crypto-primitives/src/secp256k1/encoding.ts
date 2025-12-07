/**
 * @license Apache-2.0 Copyright © 2025 ReallyMe LLC
 *
 * secp256k1 encoding helpers.
 *
 * secp256k1 public keys are expected to be 33-byte compressed SEC1 format:
 *   0x02 || X (32 bytes)
 *   0x03 || X (32 bytes)
 *
 * No compression or decompression helpers are needed here.
 */

/**
 * Validate that a value is a compressed 33-byte secp256k1 public key.
 * Returns the key unchanged if valid.
 */
export function assertSecp256k1PublicKey(pub: Uint8Array): Uint8Array {
  if (!(pub instanceof Uint8Array)) {
    throw new Error("assertSecp256k1PublicKey: expected Uint8Array");
  }
  if (pub.length !== 33) {
    throw new Error(
      `assertSecp256k1PublicKey: expected 33-byte compressed secp256k1 key, got length=${pub.length}`
    );
  }
  const prefix = pub[0];
  if (prefix !== 0x02 && prefix !== 0x03) {
    throw new Error(
      `assertSecp256k1PublicKey: invalid prefix 0x${prefix.toString(
        16
      )} (expected 0x02 or 0x03)`
    );
  }
  return pub;
}

/**
 * Identity encoder.
 */
export function encodeSecp256k1PublicKey(pub: Uint8Array): Uint8Array {
  return assertSecp256k1PublicKey(pub);
}

/**
 * Identity decoder.
 */
export function decodeSecp256k1PublicKey(pub: Uint8Array): Uint8Array {
  return assertSecp256k1PublicKey(pub);
}