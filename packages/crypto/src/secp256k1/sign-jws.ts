/**
 * @license Apache-2.0 Copyright © 2025 ReallyMe LLC
 *
 * ES256K JWS compact signing using secp256k1.
 */

import { signSecp256k1 } from "@meproto/crypto-primitives";
import { bytesToBase64Url } from "@meproto/codec";

const encoder = new TextEncoder();

/**
 * Produce a compact JWS string signed with ES256K (secp256k1).
 * Format: BASE64URL(header).BASE64URL(payload).BASE64URL(signature)
 *
 * - Signature = compact 64-byte (r||s)
 * - JWS header MUST use {"alg":"ES256K"}
 * - Message must be UTF-8 encoded text
 */
export function signSecp256k1Jws(
  secretKey: Uint8Array,
  payloadText: string
): string {
  const headerJson = `{"alg":"ES256K"}`;
  const headerBytes = encoder.encode(headerJson);
  const headerB64 = bytesToBase64Url(headerBytes);

  const payloadBytes = encoder.encode(payloadText);
  const payloadB64 = bytesToBase64Url(payloadBytes);

  // JWS signing input: "<header>.<payload>"
  const signingInput = encoder.encode(`${headerB64}.${payloadB64}`);

  // Raw 64-byte compact secp256k1 signature (R||S)
  const signature = signSecp256k1(signingInput, secretKey);

  const sigB64 = bytesToBase64Url(signature);

  return `${headerB64}.${payloadB64}.${sigB64}`;
}