/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateMlKem1024MultikeyKeypair } from "../../src/ml-kem-1024/wrapped-keypair.js";

describe("generateMlKem1024MultikeyKeypair", () => {
  it("creates wrapped ML-KEM-1024 keypair with multibase public key", () => {
    const kp = generateMlKem1024MultikeyKeypair();

    expect(kp.secretKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey.length).toBe(1568);

    expect(typeof kp.publicKeyMultibase).toBe("string");
    expect(kp.publicKeyMultibase.startsWith("z")).toBe(true);
  });
});