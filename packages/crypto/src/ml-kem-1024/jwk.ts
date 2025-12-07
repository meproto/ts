/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Predicted JWK encoding for ML-KEM-1024 (Kyber-1024).
 *
 * There is no official JOSE JWK definition yet for post-quantum KEM keys,
 * but OKP mapping is the closest and safest alignment with Ed25519/X25519.
 *
 * {
 *   "kty": "OKP",
 *   "crv": "ML-KEM-1024",
 *   "x": "<base64url public key>",
 *   "alg": "ML-KEM-1024",   // optional
 *   "use": "enc"            // optional (key agreement / encryption)
 * }
 */

import { bytesToBase64Url, canonicalizeJSON } from "@meproto/codec";

export interface MlKem1024Jwk {
  kty: "OKP";
  crv: "ML-KEM-1024";
  x: string;
  alg?: "ML-KEM-1024";
  use?: "enc";
  kid?: string;
}

/**
 * Convert a raw ML-KEM-1024 public key (1568 bytes) into a predicted JWK.
 */
export function mlKem1024PublicKeyToJwk(
  publicKey: Uint8Array,
  options: { alg?: boolean; use?: boolean } = {}
): MlKem1024Jwk {
  if (!(publicKey instanceof Uint8Array) || publicKey.length !== 1568) {
    throw new Error(
      `mlKem1024PublicKeyToJwk: expected 1568-byte ML-KEM-1024 public key, got length=${publicKey?.length}`
    );
  }

  const jwk: MlKem1024Jwk = {
    kty: "OKP",
    crv: "ML-KEM-1024",
    x: bytesToBase64Url(publicKey),
  };

  if (options.alg) jwk.alg = "ML-KEM-1024";
  if (options.use) jwk.use = "enc";

  return jwk;
}

/**
 * Produce a JCS-canonicalized JWK (RFC 8785).
 */
export function mlKem1024PublicKeyToJwkJcs(publicKey: Uint8Array): string {
  const jwk = mlKem1024PublicKeyToJwk(publicKey);
  return canonicalizeJSON(jwk);
}