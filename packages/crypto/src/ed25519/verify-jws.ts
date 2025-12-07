/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * EdDSA JWS compact verification using Ed25519.
 * Bridges @meproto/crypto-primitives (primitives) and @meproto/codec (encodings).
 */

import { verifyEd25519 } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Verify a compact EdDSA JWS signed with Ed25519.
 *
 * @param jws A compact JWS string: "<header>.<payload>.<signature>"
 * @param publicKey 32-byte Ed25519 public key
 *
 * @returns true if signature and header.alg are valid, false otherwise
 */
export function verifyEd25519Jws(
  jws: string,
  publicKey: Uint8Array
): boolean {
  const parts = jws.split(".");
  if (parts.length !== 3) return false;

  const [hB64, pB64, sB64] = parts;

  try {
    // Parse header
    const headerBytes = base64UrlToBytes(hB64);
    const header = JSON.parse(decoder.decode(headerBytes));

    // Must match JOSE Ed25519 algorithm identifier
    if (header.alg !== "EdDSA") return false;

    // Reconstruct signing input exactly
    const signingInput = encoder.encode(`${hB64}.${pB64}`);

    // Signature bytes (raw 64-byte Ed25519 sig)
    const signature = base64UrlToBytes(sB64);

    // Verify using low-level Ed25519 primitive
    return verifyEd25519(signature, signingInput, publicKey);
  } catch {
    return false;
  }
}