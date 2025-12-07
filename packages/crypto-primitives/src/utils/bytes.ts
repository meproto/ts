/**
 * @license Apache-2.0
 * Copyright © 2025
 * ReallyMe LLC
 */

/**
 * Concatenate two Uint8Arrays.
 */
export function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

/**
 * Constant-time byte comparison.
 * Returns true iff the arrays are equal.
 */
export function equalBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * Convert a hex string (with or without 0x prefix) into bytes.
 * Throws on malformed hex.
 */
export function hexToBytes(hex: string): Uint8Array {
  let h = hex.toLowerCase().replace(/^0x/, "");
  if (h.length % 2 !== 0) h = "0" + h;

  // Validate hex characters
  if (!/^[0-9a-f]*$/.test(h)) {
    throw new Error(`Invalid hex string: "${hex}"`);
  }

  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/**
 * Convert bytes to lowercase hex string (no 0x prefix).
 */
export function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

