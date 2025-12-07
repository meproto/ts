/**
 * @license Apache-2.0 Copyright © 2025 ReallyMe LLC
 *
 * ES256K JWS compact verification using secp256k1.
 * Bridges @meproto/crypto-primitives (primitives) and @meproto/codec (encodings).
 */

import { verifySecp256k1 } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Verify a compact ES256K JWS signed with secp256k1.
 *
 * @param jws A compact JWS string: "<header>.<payload>.<signature>"
 * @param publicKey 33-byte compressed SEC1 secp256k1 public key
 *
 * @returns true if signature and header.alg are valid, false otherwise
 */
export function verifySecp256k1Jws(
  jws: string,
  publicKey: Uint8Array
): boolean {
  const parts = jws.split(".");
  if (parts.length !== 3) return false;

  const [hB64, pB64, sB64] = parts;

  try {
    // Parse and decode header
    const headerBytes = base64UrlToBytes(hB64);
    const header = JSON.parse(decoder.decode(headerBytes));

    // Must match JOSE ES256K algorithm identifier
    if (header.alg !== "ES256K") return false;

    // JWS signing input reconstruction
    const signingInput = encoder.encode(`${hB64}.${pB64}`);

    // Decode compact 64-byte R||S signature
    const signature = base64UrlToBytes(sB64);

    // Verify with raw secp256k1 primitive
    return verifySecp256k1(signature, signingInput, publicKey);
  } catch {
    return false;
  }
}