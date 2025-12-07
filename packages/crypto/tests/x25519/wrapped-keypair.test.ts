/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateX25519MultikeyKeypair } from "../../src/x25519/wrapped-keypair.js";

describe("generateX25519MultikeyKeypair", () => {
  it("creates wrapped X25519 keypair with multibase public key", () => {
    const kp = generateX25519MultikeyKeypair();

    expect(kp.secretKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey.length).toBe(32);

    expect(typeof kp.publicKeyMultibase).toBe("string");
    expect(kp.publicKeyMultibase.startsWith("z")).toBe(true);
  });
});