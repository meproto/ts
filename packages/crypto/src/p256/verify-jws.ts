/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * ES256 JWS compact verification using P-256.
 * Bridges @meproto/crypto-primitives (primitives) and @meproto/codec (encodings).
 */

import { verifyP256DerPrehash } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Verify a compact ES256 JWS signed with P-256.
 *
 * @param jws A compact JWS string: "<header>.<payload>.<signature>"
 * @param publicKeySEC1 Compressed or uncompressed SEC1 P-256 public key
 *
 * @returns true if signature and header.alg are valid, false otherwise
 */
export function verifyP256Jws(
  jws: string,
  publicKeySEC1: Uint8Array
): boolean {
  const parts = jws.split(".");
  if (parts.length !== 3) return false;

  const [hB64, pB64, sB64] = parts;

  try {
    const headerBytes = base64UrlToBytes(hB64);
    const header = JSON.parse(decoder.decode(headerBytes));

    if (header.alg !== "ES256") return false;

    const signingInput = encoder.encode(`${hB64}.${pB64}`);
    const sigDer = base64UrlToBytes(sB64);

    return verifyP256DerPrehash(sigDer, signingInput, publicKeySEC1);
  } catch {
    return false;
  }
}