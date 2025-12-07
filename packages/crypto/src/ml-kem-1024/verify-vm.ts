/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Structural validation only for ML-KEM-1024 verification methods.
 */

import { parseMultikey, validateVMWithMultikey } from "@meproto/codec";

/**
 * Validate that a Verification Method entry contains a valid ML-KEM-1024 multikey.
 *
 * Returns true if structurally valid; throws on error.
 */
export function verifyMlKem1024Vm(vm: any): true {
  if (!vm || typeof vm !== "object") {
    throw new Error("verifyMlKem1024Vm: invalid VM object");
  }

  if (!vm.publicKeyMultibase) {
    throw new Error("verifyMlKem1024Vm: missing VM.publicKeyMultibase");
  }

  const parsed = parseMultikey(vm.publicKeyMultibase);

  // Validate VM.type / VM.algorithm coherence
  validateVMWithMultikey(vm, parsed);

  if (parsed.algorithm !== "ML-KEM-1024") {
    throw new Error(
      `verifyMlKem1024Vm: codec mismatch — expected ML-KEM-1024, got ${parsed.algorithm}`
    );
  }

  if (parsed.publicKey.length !== 1568) {
    throw new Error(
      `verifyMlKem1024Vm: ML-KEM-1024 public key must be 1568 bytes, got ${parsed.publicKey.length}`
    );
  }

  return true;
}