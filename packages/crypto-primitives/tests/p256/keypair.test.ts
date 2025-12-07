/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { generateP256Keypair } from "../../src/p256/index.js";

describe("generateP256Keypair", () => {
  it("creates a valid 32-byte secret key and 33-byte compressed public key", () => {
    const kp = generateP256Keypair();

    expect(kp.secretKey instanceof Uint8Array).toBe(true);
    expect(kp.publicKey instanceof Uint8Array).toBe(true);

    expect(kp.secretKey.length).toBe(32);
    expect(kp.publicKey.length).toBe(33);
  });

  it("generates unique keypairs", () => {
    const a = generateP256Keypair();
    const b = generateP256Keypair();

    expect(Buffer.compare(a.secretKey, b.secretKey) !== 0).toBe(true);
    expect(Buffer.compare(a.publicKey, b.publicKey) !== 0).toBe(true);
  });
});