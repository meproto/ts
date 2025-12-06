/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Standard Base64 utilities (RFC4648) — NOT URL-safe.
 *
 */

export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
    return Buffer.from(bytes).toString("base64");
  }

  // Browser / Workers fallback
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  if (typeof btoa === "function") {
    return btoa(binary);
  }

  // Universal fallback
  return Buffer.from(binary, "latin1").toString("base64");
}

export function base64ToBytes(b64: string): Uint8Array {
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
    return new Uint8Array(Buffer.from(b64, "base64"));
  }

  // Browser / Workers fallback
  if (typeof atob === "function") {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      out[i] = bin.charCodeAt(i);
    }
    return out;
  }

  // Universal fallback
  const bin = Buffer.from(b64, "base64").toString("latin1");
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}