/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * did:me multicodec prefixes for supported public key types.
 * Each entry describes:
 *   - alg: human-readable algorithm name
 *   - codec: multicodec varint prefix bytes
 *   - keyLength: expected length of raw key bytes AFTER the prefix
 */

export interface CodecSpec {
  alg: string;
  codec: number[];
  keyLength: number;
}

export const MULTICODEC_TABLE: Record<string, CodecSpec> = {
  "ed25519-pub": {
    alg: "Ed25519",
    codec: [0xed, 0x01],
    keyLength: 32,
  },

  "x25519-pub": {
    alg: "X25519",
    codec: [0xec, 0x01],
    keyLength: 32,
  },

  "p256-pub": {
    alg: "ES256",
    codec: [0x80, 0x24],   // varint(0x1200)
    keyLength: 33,
  },

  "secp256k1-pub": {
    alg: "secp256k1",
    codec: [0xe7, 0x01],
    keyLength: 33,
  },

  "mldsa-87-pub": {
    alg: "ML-DSA-87",
    codec: [0x92, 0x24],   // varint(0x1212)
    keyLength: 2592,
  },

  "mlkem-1024-pub": {
    alg: "ML-KEM-1024",
    codec: [0x8d, 0x24],   // varint(0x120d)
    keyLength: 1568,
  },
} as const;


//
// Lookup codec prefix → return codec metadata
//
export interface CodecLookupResult extends CodecSpec {
  name: string;
}

export function lookupCodecPrefix(bytes: Uint8Array): CodecLookupResult | null {
  for (const [name, spec] of Object.entries(MULTICODEC_TABLE)) {
    const prefix = spec.codec;
    if (
      bytes.length >= prefix.length &&
      prefix.every((b, i) => bytes[i] === b)
    ) {
      return { name, ...spec };
    }
  }
  return null;
}

//
// Strip multicodec prefix → raw key bytes
//

export function stripCodecPrefix(bytes: Uint8Array): Uint8Array {
  const found = lookupCodecPrefix(bytes);
  if (!found) return bytes;
  return bytes.slice(found.codec.length);
}