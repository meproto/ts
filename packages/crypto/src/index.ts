/**
 * @license Apache-2.0 © 2025 ReallyMe LLC
 *
 * High-level cryptographic operations for Me Protocol.
 *
 * Includes:
 *  • Plugin architecture for supported algorithms
 *  • Multikey parsing and encoding
 *  • DID:key support (did:me:z…)
 *  • JWS signing (unified signJws)
 *  • JWS verification (unified verifyJws)
 *  • Curve-specific helpers (P-256, Ed25519, secp256k1, X25519, ML-DSA-87, ML-KEM-1024)
 *  • JWK and JCS helpers
 */

// ------------------------------------------------------------
// Plugin System
// ------------------------------------------------------------
export type { CryptoPlugin } from "./plugin-interface.js";

export {
  plugins,
  getPluginByAlg,
  getPluginByPrefix,
} from "./plugins.js";

// ------------------------------------------------------------
// Universal Multikey
// ------------------------------------------------------------
export { formatMultikey, parseMultikey } from "./multikey.js";

// ------------------------------------------------------------
// Universal JWS Signing & Verification (plugin-driven)
// ------------------------------------------------------------
export { signJws } from "./sign.js";
export { verifyJws } from "./verify.js";

// ------------------------------------------------------------
// P-256 (ES256) high-level operations
// ------------------------------------------------------------
export {
  signP256Jws,
  verifyP256Jws,
  generateP256MultikeyKeypair,
  p256PublicKeyToJwk,
  p256PublicKeyToJwkJcs,
  type P256Jwk,
  p256Plugin,
} from "./p256/index.js";

// ------------------------------------------------------------
// Ed25519 (EdDSA) high-level operations
// ------------------------------------------------------------
export {
  signEd25519Jws,
  verifyEd25519Jws,
  generateEd25519MultikeyKeypair,
  ed25519PublicKeyToJwk,
  ed25519PublicKeyToJwkJcs,
  type Ed25519Jwk,
  ed25519Plugin,
} from "./ed25519/index.js";

// ------------------------------------------------------------
// secp256k1 (ES256K) high-level operations
// ------------------------------------------------------------
export {
  signSecp256k1Jws,
  verifySecp256k1Jws,
  generateSecp256k1MultikeyKeypair,
  secp256k1PublicKeyToJwk,
  secp256k1PublicKeyToJwkJcs,
  type Secp256k1Jwk,
  secp256k1Plugin,
} from "./secp256k1/index.js";

// ------------------------------------------------------------
// X25519 (ECDH) high-level operations
// ------------------------------------------------------------
export {
  generateX25519MultikeyKeypair,
  x25519PublicKeyToJwk,
  x25519PublicKeyToJwkJcs,
  verifyX25519Vm,
  type X25519Jwk,
  x25519Plugin,
} from "./x25519/index.js";

// ------------------------------------------------------------
// ML-DSA-87 (Post-Quantum Signature) high-level operations
// ------------------------------------------------------------
export {
  signMlDsa87Jws,
  verifyMlDsa87Jws,
  generateMlDsa87MultikeyKeypair,
  mldsa87PublicKeyToJwk,
  mldsa87PublicKeyToJwkJcs,
  type MlDsa87Jwk,
  mldsa87Plugin,
} from "./ml-dsa-87/index.js";

// ------------------------------------------------------------
// ML-KEM-1024 (Post-Quantum KEM) high-level operations
// ------------------------------------------------------------
export {
  generateMlKem1024MultikeyKeypair,
  mlKem1024PublicKeyToJwk,
  mlKem1024PublicKeyToJwkJcs,
  verifyMlKem1024Vm,
  type MlKem1024Jwk,
  mlkem1024Plugin,
} from "./ml-kem-1024/index.js";