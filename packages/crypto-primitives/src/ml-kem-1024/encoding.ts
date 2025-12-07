/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * ML-KEM-1024 encoding helpers.
 *
 * ML-KEM-1024 public keys are fixed-length byte strings:
 *   - publicKey length MUST be 1568 bytes (FIPS-203)
 */

/**
 * Validate that a value is a 1568-byte ML-KEM-1024 public key.
 * Returns the key unchanged if valid.
 */
export function assertMlKem1024PublicKey(pub: Uint8Array): Uint8Array {
  if (!(pub instanceof Uint8Array)) {
    throw new Error("assertMlKem1024PublicKey: expected Uint8Array");
  }
  if (pub.length !== 1568) {
    throw new Error(
      `assertMlKem1024PublicKey: expected 1568-byte ML-KEM-1024 public key, got length=${pub.length}`
    );
  }
  return pub;
}

/**
 * Identity encoder for ML-KEM-1024 public keys.
 */
export function encodeMlKem1024PublicKey(pub: Uint8Array): Uint8Array {
  return assertMlKem1024PublicKey(pub);
}

/**
 * Identity decoder for ML-KEM-1024 public keys.
 */
export function decodeMlKem1024PublicKey(pub: Uint8Array): Uint8Array {
  return assertMlKem1024PublicKey(pub);
}