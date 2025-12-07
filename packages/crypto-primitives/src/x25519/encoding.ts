/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * X25519 encoding helpers.
 *
 * X25519 public keys are always 32 bytes.
 */

/**
 * Validate that a value is a 32-byte X25519 public key.
 */
export function assertX25519PublicKey(pub: Uint8Array): Uint8Array {
  if (!(pub instanceof Uint8Array) || pub.length !== 32) {
    throw new Error(
      `assertX25519PublicKey: expected 32-byte X25519 public key, got length=${pub?.length}`
    );
  }
  return pub;
}

/**
 * Identity encoder.
 */
export function encodeX25519PublicKey(pub: Uint8Array): Uint8Array {
  return assertX25519PublicKey(pub);
}

/**
 * Identity decoder.
 */
export function decodeX25519PublicKey(pub: Uint8Array): Uint8Array {
  return assertX25519PublicKey(pub);
}