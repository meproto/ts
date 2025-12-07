/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Convert Uint8Array → ArrayBuffer for WebCrypto.
 * Always returns a true ArrayBuffer (never SharedArrayBuffer),
 * because .slice() forces a copy into a new ArrayBuffer.
 */

export function asArrayBuffer(u8: Uint8Array): ArrayBuffer {
  // Force a real ArrayBuffer copy — guarantees type correctness
  return u8.buffer.slice(
    u8.byteOffset,
    u8.byteOffset + u8.byteLength
  ) as ArrayBuffer;
}