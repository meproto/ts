/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Low-level Ed25519 verification primitive.
 *
 * - Accepts raw 64-byte Ed25519 signatures
 * - Accepts raw 32-byte Ed25519 public keys
 * - Message is raw Uint8Array bytes
 */

import { ed25519 } from "@noble/curves/ed25519.js";

/**
 * Verify an Ed25519 signature.
 *
 * @param signature  64-byte signature
 * @param message    message bytes
 * @param publicKey  32-byte Ed25519 public key
 *
 * @returns boolean
 */
export function verifyEd25519(
  signature: Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array
): boolean {
  return ed25519.verify(signature, message, publicKey);
}