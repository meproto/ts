/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * ML-DSA-87 JWS compact signing.
 *
 * Produces a compact JWS string:
 *   BASE64URL(header) + "." + BASE64URL(payload) + "." + BASE64URL(signature)
 *
 * Header uses:
 *   { "alg": "ML-DSA-87" }
 */

import { signMlDsa87 } from "@meproto/crypto-primitives";
import { bytesToBase64Url } from "@meproto/codec";

const encoder = new TextEncoder();

/**
 * Produce a compact JWS string signed with ML-DSA-87.
 *
 * @param secretKey   Raw ML-DSA-87 secret key
 * @param payloadText UTF-8 text payload to sign
 *
 * @returns compact JWS string: "<header>.<payload>.<signature>"
 */
export function signMlDsa87Jws(
  secretKey: Uint8Array,
  payloadText: string
): string {
  const headerJson = `{"alg":"ML-DSA-87"}`;
  const headerBytes = encoder.encode(headerJson);
  const headerB64 = bytesToBase64Url(headerBytes);

  const payloadBytes = encoder.encode(payloadText);
  const payloadB64 = bytesToBase64Url(payloadBytes);

  const signingInput = encoder.encode(`${headerB64}.${payloadB64}`);

  const signature = signMlDsa87(signingInput, secretKey);
  const sigB64 = bytesToBase64Url(signature);

  return `${headerB64}.${payloadB64}.${sigB64}`;
}