/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// X25519 Multikey Wrapper
// ------------------------------------------------------------
export {
  generateX25519MultikeyKeypair,
} from "./wrapped-keypair.js";

// ------------------------------------------------------------
// X25519 JWK (OKP) Encoding Helpers
// ------------------------------------------------------------
export {
  x25519PublicKeyToJwk,
  x25519PublicKeyToJwkJcs,
  type X25519Jwk,
} from "./jwk.js";

// ------------------------------------------------------------
// X25519 Verification Method Structural Validation
// ------------------------------------------------------------
export {
  verifyX25519Vm,
} from "./verify-vm.js";

// ------------------------------------------------------------
// X25519 Plugin (for universal plugin-based crypto API)
// ------------------------------------------------------------
export { x25519Plugin } from "./plugin.js";