/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// Ed25519 (EdDSA) JWS Signing & Verification
// ------------------------------------------------------------
export {
  signEd25519Jws,
} from "./sign-jws.js";

export {
  verifyEd25519Jws,
} from "./verify-jws.js";

// ------------------------------------------------------------
// Ed25519 Multikey Wrapper
// ------------------------------------------------------------
export {
  generateEd25519MultikeyKeypair,
} from "./wrapped-keypair.js";

// ------------------------------------------------------------
// Ed25519 JWK (OKP) Encoding Helpers
// ------------------------------------------------------------
export {
  ed25519PublicKeyToJwk,
  ed25519PublicKeyToJwkJcs,
  type Ed25519Jwk,
} from "./jwk.js";

// ------------------------------------------------------------
// Ed25519 Plugin (for universal plugin-based crypto API)
// ------------------------------------------------------------
export { ed25519Plugin } from "./plugin.js";