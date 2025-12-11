/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Me Protocol cryptography primitives.
 *
 * This package provides:
 *   - Secure random byte generation
 *   - Byte utilities (hex encode/decode, constant-time compare, concat)
 *   - ArrayBuffer conversion for WebCrypto
 *   - Raw cryptographic primitives for:
 *       • P-256 (ES256)
 *       • Ed25519 (EdDSA)
 *       • secp256k1 (ES256K)
 *       • ML-DSA-87 (PQ signatures)
 *       • X25519 (ECDH / key agreement)
 *       • ML-KEM-1024 (PQ key encapsulation)
 *
 */

// ------------------------------------------------------------
// Utilities
// ------------------------------------------------------------
export * from "./utils/index.js";

// ------------------------------------------------------------
// P-256 (secp256r1) primitives
// ------------------------------------------------------------
export {
  signP256DerPrehash,
  verifyP256DerPrehash,
  generateP256Keypair,
  compress,
  decompressP256,
} from "./p256/index.js";

// ------------------------------------------------------------
// Ed25519 primitives
// ------------------------------------------------------------
export {
  generateEd25519Keypair,
  signEd25519,
  verifyEd25519,
  assertEd25519PublicKey,
  encodeEd25519PublicKey,
  decodeEd25519PublicKey,
} from "./ed25519/index.js";

// ------------------------------------------------------------
// secp256k1 (ES256K) primitives
// ------------------------------------------------------------
export {
  generateSecp256k1Keypair,
  signSecp256k1,
  verifySecp256k1,
  assertSecp256k1PublicKey,
  encodeSecp256k1PublicKey,
  decodeSecp256k1PublicKey,
  decompressSecp256k1PublicKey,
  type Secp256k1Keypair,
} from "./secp256k1/index.js";

// ------------------------------------------------------------
// ML-DSA-87 (Post-Quantum Signature) primitives
// ------------------------------------------------------------
export {
  generateMlDsa87Keypair,
  signMlDsa87,
  verifyMlDsa87,
  assertMlDsa87PublicKey,
  encodeMlDsa87PublicKey,
  decodeMlDsa87PublicKey,
  type MlDsa87Keypair,
} from "./ml-dsa-87/index.js";

// ------------------------------------------------------------
// X25519 (ECDH / key agreement) primitives
// ------------------------------------------------------------
export {
  generateX25519Keypair,
  deriveX25519SharedSecret,
  assertX25519PublicKey,
  encodeX25519PublicKey,
  decodeX25519PublicKey,
  type X25519Keypair,
} from "./x25519/index.js";

// ------------------------------------------------------------
// ML-KEM-1024 (Post-Quantum KEM) primitives
// ------------------------------------------------------------
export {
  generateMlKem1024Keypair,
  mlKem1024Encapsulate,
  mlKem1024Decapsulate,
  assertMlKem1024PublicKey,
  encodeMlKem1024PublicKey,
  decodeMlKem1024PublicKey,
  type MlKem1024Keypair,
  type MlKem1024Encapsulated,
} from "./ml-kem-1024/index.js";
