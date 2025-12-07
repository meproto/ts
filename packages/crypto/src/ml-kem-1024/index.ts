/**
 * @license Apache-2.0
 * © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// ML-KEM-1024 Multikey Wrapper
// ------------------------------------------------------------
export {
  generateMlKem1024MultikeyKeypair,
} from "./wrapped-keypair.js";

// ------------------------------------------------------------
// ML-KEM-1024 JWK Encoding Helpers (predicted OKP format)
// ------------------------------------------------------------
export {
  mlKem1024PublicKeyToJwk,
  mlKem1024PublicKeyToJwkJcs,
  type MlKem1024Jwk,
} from "./jwk.js";

// ------------------------------------------------------------
// ML-KEM-1024 Verification Method Structural Validation
// ------------------------------------------------------------
export {
  verifyMlKem1024Vm,
} from "./verify-vm.js";

// ------------------------------------------------------------
// ML-KEM-1024 Plugin (for universal plugin-based crypto API)
// ------------------------------------------------------------
export { mlkem1024Plugin } from "./plugin.js";