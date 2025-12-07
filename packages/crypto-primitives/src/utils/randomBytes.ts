/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

export function randomBytes(bytesLength = 32): Uint8Array {
  const cr = typeof globalThis === 'object' ? (globalThis as any).crypto : null;
  if (typeof cr?.getRandomValues !== 'function')
    throw new Error('crypto.getRandomValues must be defined');
  return cr.getRandomValues(new Uint8Array(bytesLength));
}