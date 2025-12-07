/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * ML-DSA-87 JWS compact verification.
 */

import { verifyMlDsa87 } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Verify a compact ML-DSA-87 JWS.
 *
 * @param jws Compact JWS string "<header>.<payload>.<signature>"
 * @param publicKey Raw ML-DSA-87 public key
 */
export function verifyMlDsa87Jws(
  jws: string,
  publicKey: Uint8Array
): boolean {
  const parts = jws.split(".");
  if (parts.length !== 3) return false;

  const [hB64, pB64, sB64] = parts;

  try {
    const headerBytes = base64UrlToBytes(hB64);
    const header = JSON.parse(decoder.decode(headerBytes));

    // MUST be ML-DSA-87
    if (header.alg !== "ML-DSA-87") return false;

    // Construct signing input
    const signingInput = encoder.encode(`${hB64}.${pB64}`);

    const signature = base64UrlToBytes(sB64);

    return verifyMlDsa87(signature, signingInput, publicKey);
  } catch {
    return false;
  }
}