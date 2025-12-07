/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Ed25519 encoding helpers.
 *
 * Ed25519 public keys are always 32 bytes.
 */

/**
 * Validate that a value is a 32-byte Ed25519 public key.
 * Returns the key unchanged if valid.
 */
export function assertEd25519PublicKey(pub: Uint8Array): Uint8Array {
  if (!(pub instanceof Uint8Array) || pub.length !== 32) {
    throw new Error(
      `assertEd25519PublicKey: expected 32-byte Ed25519 public key, got length=${pub?.length}`
    );
  }
  return pub;
}

/**
 * Identity function for encoding.
 */
export function encodeEd25519PublicKey(pub: Uint8Array): Uint8Array {
  return assertEd25519PublicKey(pub);
}

/**
 * Identity function for decoding.
 */
export function decodeEd25519PublicKey(pub: Uint8Array): Uint8Array {
  return assertEd25519PublicKey(pub);
}