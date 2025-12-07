/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateMlDsa87MultikeyKeypair } from "../../src/ml-dsa-87/wrapped-keypair.js";

describe("generateMlDsa87MultikeyKeypair", () => {
  it("creates wrapped ML-DSA-87 keypair with multibase public key", () => {
    const kp = generateMlDsa87MultikeyKeypair();

    expect(kp.secretKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey instanceof Uint8Array).toBe(true);
    expect(typeof kp.publicKeyMultibase).toBe("string");
    expect(kp.publicKeyMultibase.startsWith("z")).toBe(true);
  });
});