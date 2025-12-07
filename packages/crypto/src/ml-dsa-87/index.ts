/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// ML-DSA-87 JWS Signing & Verification
// ------------------------------------------------------------
export {
  signMlDsa87Jws,
} from "./sign-jws.js";

export {
  verifyMlDsa87Jws,
} from "./verify-jws.js";

// ------------------------------------------------------------
// ML-DSA-87 Multikey Wrapper
// ------------------------------------------------------------
export {
  generateMlDsa87MultikeyKeypair,
} from "./wrapped-keypair.js";

// ------------------------------------------------------------
// ML-DSA-87 JWK (Predicted OKP Format)
// ------------------------------------------------------------
export {
  mldsa87PublicKeyToJwk,
  mldsa87PublicKeyToJwkJcs,
  type MlDsa87Jwk,
} from "./jwk.js";

// ------------------------------------------------------------
// ML-DSA-87 Plugin (for universal plugin-based crypto API)
// ------------------------------------------------------------
export { mldsa87Plugin } from "./plugin.js";