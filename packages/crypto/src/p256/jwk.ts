/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * P-256 → JWK helpers for Me Protocol / EUDI alignment.
 *
 * Transforms a SEC1 P-256 public key into a JSON Web Key (JWK) of the form:
 *
 * {
 *   "kty": "EC",
 *   "crv": "P-256",
 *   "x": "<base64url>",
 *   "y": "<base64url>",
 *   "alg": "ES256",
 *   "use": "sig"
 * }
 *
 * Notes:
 * - Accepts compressed (33-byte) or uncompressed (65-byte) SEC1 public keys.
 * - Decompression is delegated to @meproto/crypto-primitives (Tonelli–Shanks exact P-256).
 * - x and y coordinates MUST be base64url encoded.
 * - JWK output is compatible with WebCrypto, Go, Swift CryptoKit, EUDI Wallet formats.
 */

import { decompressP256 } from "@meproto/crypto-primitives";
import { bytesToBase64Url, canonicalizeJSON } from "@meproto/codec";

export interface P256Jwk {
  kty: "EC";
  crv: "P-256";
  x: string;
  y: string;
  alg?: "ES256";
  use?: "sig";
  kid?: string;
}

/**
 * Convert a SEC1 P-256 public key (compressed or uncompressed) into a JWK.
 *
 * @param publicKeySEC1 - 33-byte (compressed) or 65-byte (uncompressed) SEC1 key
 * @param options.alg - include "alg": "ES256" (default: true)
 * @param options.use - include "use": "sig"  (default: true)
 */
export function p256PublicKeyToJwk(
  publicKeySEC1: Uint8Array,
  options: { alg?: boolean; use?: boolean } = { alg: true, use: true }
): P256Jwk {
  let uncompressed: Uint8Array;

  // 33-byte compressed SEC1
  if (
    publicKeySEC1.length === 33 &&
    (publicKeySEC1[0] === 0x02 || publicKeySEC1[0] === 0x03)
  ) {
    uncompressed = decompressP256(publicKeySEC1);

  // 65-byte uncompressed SEC1
  } else if (
    publicKeySEC1.length === 65 &&
    publicKeySEC1[0] === 0x04
  ) {
    uncompressed = publicKeySEC1;

  } else {
    throw new Error(
      `p256PublicKeyToJwk: expected compressed (33 bytes) or uncompressed (65 bytes) SEC1 key`
    );
  }

  // X and Y coordinates
  const xBytes = uncompressed.slice(1, 33);
  const yBytes = uncompressed.slice(33, 65);

  const jwk: P256Jwk = {
    kty: "EC",
    crv: "P-256",
    x: bytesToBase64Url(xBytes),
    y: bytesToBase64Url(yBytes),
  };

  if (options.alg !== false) jwk.alg = "ES256";
  if (options.use !== false) jwk.use = "sig";

  return jwk;
}

/**
 * Produce a JCS-canonicalized JWK (RFC 8785).
 *
 * Matches EUDI Wallet expectations for deterministic key encodings.
 */
export function p256PublicKeyToJwkJcs(publicKeySEC1: Uint8Array): string {
  const jwk = p256PublicKeyToJwk(publicKeySEC1);
  return canonicalizeJSON(jwk);
}