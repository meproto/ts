/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * ES256 JWS compact signing using P-256.
 */

import { signP256DerPrehash } from "@meproto/crypto-primitives";
import { bytesToBase64Url } from "@meproto/codec";

const encoder = new TextEncoder();

/**
 * Produce a compact JWS string signed with ES256 (P-256).
 * Format: BASE64URL(header).BASE64URL(payload).BASE64URL(signature)
 */
export function signP256Jws(secretKey: Uint8Array, payloadText: string): string {
  const headerJson = `{"alg":"ES256"}`;
  const headerBytes = encoder.encode(headerJson);
  const headerB64 = bytesToBase64Url(headerBytes);

  const payloadBytes = encoder.encode(payloadText);
  const payloadB64 = bytesToBase64Url(payloadBytes);

  const signingInput = encoder.encode(`${headerB64}.${payloadB64}`);

  const signatureDER = signP256DerPrehash(signingInput, secretKey);
  const sigB64 = bytesToBase64Url(signatureDER);

  return `${headerB64}.${payloadB64}.${sigB64}`;
}