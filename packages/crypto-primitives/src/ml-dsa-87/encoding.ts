/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * ML-DSA-87 public key validation helpers.
 *
 * ML-DSA-87 public keys are fixed-length byte arrays (2592 bytes).
 * No compression or decompression is required.
 */

/**
 * Validate ML-DSA-87 public key length.
 * Returns the key unchanged if valid.
 */
export function assertMlDsa87PublicKey(pub: Uint8Array): Uint8Array {
  if (!(pub instanceof Uint8Array) || pub.length !== 2592) {
    throw new Error(
      `assertMlDsa87PublicKey: expected 2592-byte ML-DSA-87 public key, got length=${pub?.length}`
    );
  }
  return pub;
}

/**
 * Identity encoder (exists only for structural symmetry with P-256 & Ed25519).
 */
export function encodeMlDsa87PublicKey(pub: Uint8Array): Uint8Array {
  return assertMlDsa87PublicKey(pub);
}

/**
 * Identity decoder.
 */
export function decodeMlDsa87PublicKey(pub: Uint8Array): Uint8Array {
  return assertMlDsa87PublicKey(pub);
}