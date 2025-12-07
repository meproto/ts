/**
 * @license Apache-2.0 © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// P-256 (ES256) JWS Signing & Verification
// ------------------------------------------------------------
export {
  signP256Jws,
} from "./sign-jws.js";

export {
  verifyP256Jws,
} from "./verify-jws.js";

// ------------------------------------------------------------
// P-256 Multikey Wrapper
// ------------------------------------------------------------
export {
  generateP256MultikeyKeypair,
} from "./wrapped-keypair.js";

// ------------------------------------------------------------
// P-256 JWK (EC) Encoding Helpers
// ------------------------------------------------------------
export {
  p256PublicKeyToJwk,
  p256PublicKeyToJwkJcs,
  type P256Jwk,
} from "./jwk.js";

// ------------------------------------------------------------
// P-256 Plugin (for universal plugin-based crypto API)
// ------------------------------------------------------------
export { p256Plugin } from "./plugin.js";