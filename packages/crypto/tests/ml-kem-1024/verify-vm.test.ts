/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateMlKem1024MultikeyKeypair } from "../../src/ml-kem-1024/wrapped-keypair.js";
import { verifyMlKem1024Vm } from "../../src/ml-kem-1024/verify-vm.js";

describe("verifyMlKem1024Vm", () => {
  it("accepts a valid ML-KEM-1024 VM", () => {
    const kp = generateMlKem1024MultikeyKeypair();

    const vm = {
      id: "#mlkem1024",
      type: "MLKEM1024Key2024",
      algorithm: "ML-KEM-1024",  
      publicKeyMultibase: kp.publicKeyMultibase,
    };

    expect(verifyMlKem1024Vm(vm)).toBe(true);
  });

  it("rejects VM with wrong algorithm", () => {
    const vm = {
      id: "#bad",
      type: "MlKem1024KeyAgreementKey2025",
      publicKeyMultibase: "zBadCodec",
    };

    expect(() => verifyMlKem1024Vm(vm)).toThrow();
  });
});