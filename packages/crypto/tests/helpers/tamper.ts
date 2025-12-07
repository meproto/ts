/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

export function tamperBase64UrlSignature(b64: string): string {
  const binary = Uint8Array.from(
    atob(b64.replace(/-/g, "+").replace(/_/g, "/")),
    c => c.charCodeAt(0)
  );

  binary[10] ^= 0xff; // deterministic destructive mutation

  return btoa(String.fromCharCode(...binary))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}