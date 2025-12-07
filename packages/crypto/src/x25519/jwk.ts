/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * X25519 → JWK helpers for Me Protocol / JOSE OKP.
 *
 * Transforms a raw 32-byte X25519 public key into a JSON Web Key (JWK):
 *
 * {
 *   "kty": "OKP",
 *   "crv": "X25519",
 *   "x": "<base64url>",
 *   "alg": "ECDH-ES",   // optional
 *   "use": "enc"        // optional
 * }
 *
 * Notes:
 * - X25519 keys are always 32 bytes.
 * - JWK output aligns with JOSE OKP specs (RFC 8037 + IETF CFRG guidance).
 */

import { bytesToBase64Url, canonicalizeJSON } from "@meproto/codec";

export interface X25519Jwk {
  kty: "OKP";
  crv: "X25519";
  x: string;
  alg?: "ECDH-ES";   // optional JOSE alg for OKP key agreement
  use?: "enc";       // optional JOSE use: encryption/key agreement
  kid?: string;
}

/**
 * Convert a raw 32-byte X25519 public key into a JWK.
 *
 * @param publicKey - 32-byte X25519 public key
 * @param options.alg - include `"alg": "ECDH-ES"` (default: false)
 * @param options.use - include `"use": "enc"`   (default: false)
 */
export function x25519PublicKeyToJwk(
  publicKey: Uint8Array,
  options: { alg?: boolean; use?: boolean } = {}
): X25519Jwk {
  if (!(publicKey instanceof Uint8Array) || publicKey.length !== 32) {
    throw new Error(
      `x25519PublicKeyToJwk: expected 32-byte X25519 public key, got length=${publicKey?.length}`
    );
  }

  const jwk: X25519Jwk = {
    kty: "OKP",
    crv: "X25519",
    x: bytesToBase64Url(publicKey),
  };

  if (options.alg) jwk.alg = "ECDH-ES";
  if (options.use) jwk.use = "enc";

  return jwk;
}

/**
 * Produce a JCS-canonicalized JWK (RFC 8785).
 *
 * Ensures deterministic encoding for DID Documents, EUDI wallet payloads, and key registries.
 */
export function x25519PublicKeyToJwkJcs(publicKey: Uint8Array): string {
  const jwk = x25519PublicKeyToJwk(publicKey);
  return canonicalizeJSON(jwk);
}