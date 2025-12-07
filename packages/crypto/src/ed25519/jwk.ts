/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Ed25519 → JWK helpers for Me Protocol / EUDI alignment.
 *
 * Transforms a raw 32-byte Ed25519 public key into a JSON Web Key (JWK):
 *
 * {
 *   "kty": "OKP",
 *   "crv": "Ed25519",
 *   "x": "<base64url>",
 *   "alg": "EdDSA",
 *   "use": "sig"
 * }
 *
 * Notes:
 * - Ed25519 keys are always 32 bytes.
 * - No compression/decompression required.
 * - JWK output aligns with WebCrypto, JOSE, DID, and EUDI specs.
 */

import { bytesToBase64Url, canonicalizeJSON } from "@meproto/codec";

export interface Ed25519Jwk {
  kty: "OKP";
  crv: "Ed25519";
  x: string;
  alg?: "EdDSA";
  use?: "sig";
  kid?: string;
}

/**
 * Convert a raw 32-byte Ed25519 public key into a JWK.
 *
 * @param publicKey - 32-byte Ed25519 public key
 * @param options.alg - include `"alg": "EdDSA"` (default: true)
 * @param options.use - include `"use": "sig"` (default: true)
 */
export function ed25519PublicKeyToJwk(
  publicKey: Uint8Array,
  options: { alg?: boolean; use?: boolean } = { alg: true, use: true }
): Ed25519Jwk {
  if (!(publicKey instanceof Uint8Array) || publicKey.length !== 32) {
    throw new Error(
      `ed25519PublicKeyToJwk: expected 32-byte Ed25519 public key, got length=${publicKey?.length}`
    );
  }

  const jwk: Ed25519Jwk = {
    kty: "OKP",
    crv: "Ed25519",
    x: bytesToBase64Url(publicKey),
  };

  if (options.alg !== false) jwk.alg = "EdDSA";
  if (options.use !== false) jwk.use = "sig";

  return jwk;
}

/**
 * Produce a JCS-canonicalized JWK (RFC 8785).
 *
 * Ensures deterministic encoding for EUDI Wallets and DID Documents.
 */
export function ed25519PublicKeyToJwkJcs(publicKey: Uint8Array): string {
  const jwk = ed25519PublicKeyToJwk(publicKey);
  return canonicalizeJSON(jwk);
}