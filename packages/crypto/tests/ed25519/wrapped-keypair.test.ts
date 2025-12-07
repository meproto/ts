/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateEd25519MultikeyKeypair } from "../../src/ed25519/wrapped-keypair.js";

describe("generateEd25519MultikeyKeypair", () => {
  it("creates wrapped keypair with multibase public key", () => {
    const kp = generateEd25519MultikeyKeypair();

    expect(kp.secretKey.length).toBe(32);
    expect(kp.publicKey.length).toBe(32);
    expect(typeof kp.publicKeyMultibase).toBe("string");
    expect(kp.publicKeyMultibase.startsWith("z")).toBe(true);
  });
});