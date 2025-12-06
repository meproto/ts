/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Base64URL utilities (RFC 4648 §5) — URL-safe, no padding.
 *
 */

import { bytesToBase64, base64ToBytes } from "./base64.js";

/**
 * Encode bytes → Base64URL (unpadded)
 */
export function bytesToBase64Url(bytes: Uint8Array): string {
  return bytesToBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

/**
 * Decode Base64URL (with or without padding) → bytes
 */
export function base64UrlToBytes(b64url: string): Uint8Array {
  // Convert URL-safe alphabet back to standard Base64 alphabet
  const base64 = b64url.replace(/-/g, "+").replace(/_/g, "/");

  // Add correct padding (RFC: must be multiple of 4)
  const needed = (4 - (base64.length % 4)) % 4;
  const padded = base64 + "=".repeat(needed);

  return base64ToBytes(padded);
}