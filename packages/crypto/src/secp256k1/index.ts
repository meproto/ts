/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// secp256k1 (ES256K) JWS Signing & Verification
// ------------------------------------------------------------
export {
  signSecp256k1Jws,
} from "./sign-jws.js";

export {
  verifySecp256k1Jws,
} from "./verify-jws.js";

// ------------------------------------------------------------
// secp256k1 Multikey Wrapper
// ------------------------------------------------------------
export {
  generateSecp256k1MultikeyKeypair,
} from "./wrapped-keypair.js";

// ------------------------------------------------------------
// secp256k1 JWK (EC) Encoding Helpers
// ------------------------------------------------------------
export {
  secp256k1PublicKeyToJwk,
  secp256k1PublicKeyToJwkJcs,
  type Secp256k1Jwk,
} from "./jwk.js";

// ------------------------------------------------------------
// secp256k1 Plugin (for universal plugin-based crypto API)
// ------------------------------------------------------------
export { secp256k1Plugin } from "./plugin.js";