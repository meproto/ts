/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * Structural validation only for verification methods.
 */

import { parseMultikey, validateVMWithMultikey } from "@meproto/codec";

/**
 * Validate that a Verification Method entry contains a valid X25519 multikey.
 *
 * @returns true if structurally valid; throws on error.
 */
export function verifyX25519Vm(vm: any): true {
  if (!vm || typeof vm !== "object") {
    throw new Error("verifyX25519Vm: invalid VM object");
  }

  if (!vm.publicKeyMultibase) {
    throw new Error("verifyX25519Vm: missing VM.publicKeyMultibase");
  }

  const parsed = parseMultikey(vm.publicKeyMultibase);

  // Check Veification Method type and parsed.algorithm match
  validateVMWithMultikey(vm, parsed);

  if (parsed.algorithm !== "X25519") {
    throw new Error(
      `verifyX25519Vm: codec mismatch — expected X25519, got ${parsed.algorithm}`
    );
  }

  if (parsed.publicKey.length !== 32) {
    throw new Error(
      `verifyX25519Vm: X25519 public key must be 32 bytes, got ${parsed.publicKey.length}`
    );
  }

  return true;
}