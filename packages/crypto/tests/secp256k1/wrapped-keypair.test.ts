/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateSecp256k1MultikeyKeypair } from "../../src/secp256k1/wrapped-keypair.js";

describe("generateSecp256k1MultikeyKeypair", () => {
  it("creates wrapped keypair with correct multibase string", () => {
    const kp = generateSecp256k1MultikeyKeypair();

    expect(kp.secretKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey.length).toBe(33);
    expect(typeof kp.publicKeyMultibase).toBe("string");
    expect(kp.publicKeyMultibase.startsWith("z")).toBe(true);
  });
});