/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Low-level P-256 verification primitive.
 *
 * - Accepts DER-encoded ECDSA signatures
 * - Uses SHA-256 prehashing
 * - Accepts both low-S and high-S signatures (lowS: false)
 *   for compatibility with Secure Enclave / CryptoKit.
 */

import { p256 as P256 } from "@noble/curves/nist.js";

export function verifyP256DerPrehash(
  signatureDer: Uint8Array,
  message: Uint8Array,
  publicKeySEC1: Uint8Array
): boolean {
  return P256.verify(signatureDer, message, publicKeySEC1, {
    format: "der",
    prehash: true,
    // NOTE: Secure Enclave and CryptoKit do NOT guarantee low-S canonical ECDSA.
    // Noble v2 enforces low-S if lowS=true, which breaks valid iOS signatures.
    // did:me accepts both low-S and high-S, so we set lowS:false for compatibility.
    lowS: false,
  });
}