/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

export interface CryptoPlugin {
  // Cryptosystem identifiers
  alg: string;                 // JWS alg: "ES256", "EdDSA", "ES256K", "ML-DSA-87", "ML-KEM-1024"
  curve: string;               // "P-256", "Ed25519", "secp256k1", "X25519", etc.
  multikeyCodec: string;       // e.g. "p256-pub"
  multicodecPrefix: Uint8Array;// prefix bytes from MULTICODEC_TABLE

  // Key compression/decompression
  compressPublicKey: (raw: Uint8Array) => Uint8Array;
  decompressPublicKey: (compressed: Uint8Array) => Uint8Array;

  // Optional: signing
  sign?: (payload: Uint8Array, secretKey: Uint8Array) => Uint8Array;
  verify?: (signature: Uint8Array, payload: Uint8Array, publicKey: Uint8Array) => boolean;

  // Optional: ECDH
  deriveSharedSecret?: (
    secretKey: Uint8Array,
    publicKey: Uint8Array
  ) => Uint8Array;

  // Optional: KEM (post-quantum)
  encapsulate?: (
    publicKey: Uint8Array
  ) => { sharedSecret: Uint8Array; cipherText: Uint8Array };

  decapsulate?: (
    cipherText: Uint8Array,
    secretKey: Uint8Array
  ) => Uint8Array;

  // JWK helpers
  toJwk: (publicKey: Uint8Array) => Record<string, any>;
  toJwkJcs: (publicKey: Uint8Array) => string;

  // DID formatting
  formatDidKey: (publicKey: Uint8Array) => string;
}