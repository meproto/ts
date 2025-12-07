/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// ML-KEM-1024 Keypair Generation
// ------------------------------------------------------------
export {
  generateMlKem1024Keypair,
  type MlKem1024Keypair,
} from "./keypair.js";

// ------------------------------------------------------------
// ML-KEM-1024 Key Encapsulation / Decapsulation
// ------------------------------------------------------------
export {
  mlKem1024Encapsulate,
  mlKem1024Decapsulate,
  type MlKem1024Encapsulated,
} from "./derive.js";

// ------------------------------------------------------------
// ML-KEM-1024 Encoding Helpers (identity / validation)
// ------------------------------------------------------------
export {
  assertMlKem1024PublicKey,
  encodeMlKem1024PublicKey,
  decodeMlKem1024PublicKey,
} from "./encoding.js";