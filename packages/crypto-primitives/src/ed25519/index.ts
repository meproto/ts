/**
 * @license Apache-2.0
 * Copyright © 2025 by ReallyMe LLC
 */


// ------------------------------------------------------------
// Ed25519 Signing
// ------------------------------------------------------------
export {
  signEd25519,
} from "./sign.js";

// ------------------------------------------------------------
// Ed25519 Verification
// ------------------------------------------------------------
export {
  verifyEd25519,
} from "./verify.js";

// ------------------------------------------------------------
// Ed25519 Keypair Generation
// ------------------------------------------------------------
export {
  generateEd25519Keypair,
} from "./keypair.js";

// ------------------------------------------------------------
// Ed25519 Encoding Helpers (identity / validation)
// ------------------------------------------------------------
export {
  assertEd25519PublicKey,
  encodeEd25519PublicKey,
  decodeEd25519PublicKey,
} from "./encoding.js";