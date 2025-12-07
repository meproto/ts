/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * EdDSA JWS compact signing using Ed25519.
 */

import { signEd25519 } from "@meproto/crypto-primitives";
import { bytesToBase64Url } from "@meproto/codec";

const encoder = new TextEncoder();

/**
 * Produce a compact JWS string signed with Ed25519 ("EdDSA").
 * Format: BASE64URL(header).BASE64URL(payload).BASE64URL(signature)
 *
 * - Signature = raw 64-byte Ed25519 signature
 * - JWS header MUST use {"alg":"EdDSA"}
 * - Message must be UTF-8 encoded text
 */
export function signEd25519Jws(
  secretKey: Uint8Array,
  payloadText: string
): string {
  // JOSE header (RFC 8037)
  const headerJson = `{"alg":"EdDSA"}`;
  const headerBytes = encoder.encode(headerJson);
  const headerB64 = bytesToBase64Url(headerBytes);

  // Payload
  const payloadBytes = encoder.encode(payloadText);
  const payloadB64 = bytesToBase64Url(payloadBytes);

  // Signing input per JWS compact spec
  const signingInput = encoder.encode(`${headerB64}.${payloadB64}`);

  // Raw Ed25519 signature bytes (64 bytes)
  const signature = signEd25519(signingInput, secretKey);

  // Base64URL encoding for compact JWS
  const sigB64 = bytesToBase64Url(signature);

  return `${headerB64}.${payloadB64}.${sigB64}`;
}