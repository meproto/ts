/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// secp256k1 Signing
// ------------------------------------------------------------
export {
  signSecp256k1,
} from "./sign.js";

// ------------------------------------------------------------
// secp256k1 Verification
// ------------------------------------------------------------
export {
  verifySecp256k1,
} from "./verify.js";

// ------------------------------------------------------------
// secp256k1 Keypair Generation
// ------------------------------------------------------------
export {
  generateSecp256k1Keypair,
  type Secp256k1Keypair,
} from "./keypair.js";

// ------------------------------------------------------------
// secp256k1 Encoding Helpers (compressed SEC1 validation)
// ------------------------------------------------------------
export {
  assertSecp256k1PublicKey,
  encodeSecp256k1PublicKey,
  decodeSecp256k1PublicKey,
} from "./encoding.js";