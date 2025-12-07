/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateX25519MultikeyKeypair } from "../../src/x25519/wrapped-keypair.js";
import { verifyX25519Vm } from "../../src/x25519/verify-vm.js";

describe("verifyX25519Vm", () => {
  it("accepts a valid X25519 VM", () => {
    const kp = generateX25519MultikeyKeypair();

    const vm = {
      id: "#x25519",
      type: "Multikey",
      publicKeyMultibase: kp.publicKeyMultibase,
    };

    expect(verifyX25519Vm(vm)).toBe(true);
  });

  it("rejects VM with wrong algorithm", () => {
    const vm = {
      id: "#bad",
      type: "X25519KeyAgreementKey2020",
      publicKeyMultibase: "zInvalidBadCodec",
    };

    expect(() => verifyX25519Vm(vm)).toThrow();
  });
});