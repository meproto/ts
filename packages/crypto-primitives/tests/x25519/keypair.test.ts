/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateX25519Keypair } from "../../src/x25519/index.js";

describe("generateX25519Keypair", () => {
  it("produces 32-byte secret and public keys", () => {
    const { secretKey, publicKey } = generateX25519Keypair();

    expect(secretKey instanceof Uint8Array).toBe(true);
    expect(publicKey instanceof Uint8Array).toBe(true);

    expect(secretKey.length).toBe(32);
    expect(publicKey.length).toBe(32);
  });

  it("produces unique keypairs", () => {
    const a = generateX25519Keypair();
    const b = generateX25519Keypair();

    expect(Buffer.compare(a.secretKey, b.secretKey)).not.toBe(0);
    expect(Buffer.compare(a.publicKey, b.publicKey)).not.toBe(0);
  });
});