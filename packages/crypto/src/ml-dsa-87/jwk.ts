/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 * 
 * // No standard yet, this is a best efforts 
 */

import { bytesToBase64Url, canonicalizeJSON } from "@meproto/codec";

export interface MlDsa87Jwk {
  kty: "OKP";
  crv: "ML-DSA-87";
  x: string;
  alg?: "ML-DSA-87";
  use?: "sig";
  kid?: string;
}

/**
 * Convert a raw ML-DSA-87 public key (2592 bytes) into a predicted JWK format.
 */
export function mldsa87PublicKeyToJwk(
  publicKey: Uint8Array,
  options: { alg?: boolean; use?: boolean } = { alg: true, use: true }
): MlDsa87Jwk {
  if (!(publicKey instanceof Uint8Array) || publicKey.length !== 2592) {
    throw new Error(
      `mldsa87PublicKeyToJwk: expected 2592-byte ML-DSA-87 key, got length=${publicKey?.length}`
    );
  }

  const jwk: MlDsa87Jwk = {
    kty: "OKP",
    crv: "ML-DSA-87",
    x: bytesToBase64Url(publicKey),
  };

  if (options.alg !== false) jwk.alg = "ML-DSA-87";
  if (options.use !== false) jwk.use = "sig";

  return jwk;
}

export function mldsa87PublicKeyToJwkJcs(publicKey: Uint8Array): string {
  const jwk = mldsa87PublicKeyToJwk(publicKey);
  return canonicalizeJSON(jwk);
}