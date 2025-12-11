/**
 * @license Apache-2.0 Copyright © 2025 ReallyMe LLC
 *
 *
 * Produces a JSON Web Key (JWK) of the form:
 *
 * {
 *   "kty": "EC",
 *   "crv": "secp256k1",
 *   "x": "<base64url>",
 *   "y": "<base64url>",
 *   "alg": "ES256K",
 *   "use": "sig"
 * }
 *
 * Notes:
 * - Input must be a 33-byte compressed SEC1 key (0x02/0x03 + X)
 * - Decompression is delegated to @noble/curves/sec256k1
 * - JWK format is official and interoperable (unlike PQC keys)
 */

import { bytesToBase64Url, canonicalizeJSON } from "@meproto/codec";
import { decompressSecp256k1PublicKey } from "@meproto/crypto-primitives";



export interface Secp256k1Jwk {
  kty: "EC";
  crv: "secp256k1";
  x: string;
  y: string;
  alg?: "ES256K";
  use?: "sig";
  kid?: string;
}

/**
 * Convert a compressed SEC1 secp256k1 public key into a JWK.
 *
 * @param publicKeySEC1 - 33-byte (0x02/0x03 + X) compressed key
 * @param options.alg   - include "alg": "ES256K" (default: true)
 * @param options.use   - include "use": "sig" (default: true)
 */

export function secp256k1PublicKeyToJwk(
  publicKeySEC1: Uint8Array,
  options: { alg?: boolean; use?: boolean } = { alg: true, use: true }
): Secp256k1Jwk {

  const { x, y } = decompressSecp256k1PublicKey(publicKeySEC1);

  const jwk: Secp256k1Jwk = {
    kty: "EC",
    crv: "secp256k1",
    x: bytesToBase64Url(x),
    y: bytesToBase64Url(y)
  };

  if (options.alg !== false) jwk.alg = "ES256K";
  if (options.use !== false) jwk.use = "sig";

  return jwk;
}

export function secp256k1PublicKeyToJwkJcs(publicKeySEC1: Uint8Array): string {
  return canonicalizeJSON(secp256k1PublicKeyToJwk(publicKeySEC1));
}