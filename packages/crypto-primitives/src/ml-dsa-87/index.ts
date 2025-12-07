/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// ML-DSA-87 Signing
// ------------------------------------------------------------
export {
  signMlDsa87,
} from "./sign.js";

// ------------------------------------------------------------
// ML-DSA-87 Verification
// ------------------------------------------------------------
export {
  verifyMlDsa87,
} from "./verify.js";

// ------------------------------------------------------------
// ML-DSA-87 Keypair Generation
// ------------------------------------------------------------
export {
  generateMlDsa87Keypair,
  type MlDsa87Keypair,
} from "./keypair.js";

// ------------------------------------------------------------
// ML-DSA-87 Encoding Helpers (identity / validation)
// ------------------------------------------------------------
export {
  assertMlDsa87PublicKey,
  encodeMlDsa87PublicKey,
  decodeMlDsa87PublicKey,
} from "./encoding.js";