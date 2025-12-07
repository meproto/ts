/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateEd25519Keypair,
} from "../../src/ed25519/index.js";

describe("generateEd25519Keypair", () => {
  it("produces a 32-byte secret and 32-byte public key", () => {
    const { secretKey, publicKey } = generateEd25519Keypair();

    expect(secretKey instanceof Uint8Array).toBe(true);
    expect(publicKey instanceof Uint8Array).toBe(true);

    expect(secretKey.length).toBe(32);
    expect(publicKey.length).toBe(32);
  });

  it("produces unique keypairs", () => {
    const a = generateEd25519Keypair();
    const b = generateEd25519Keypair();

    expect(Buffer.compare(a.secretKey, b.secretKey)).not.toBe(0);
    expect(Buffer.compare(a.publicKey, b.publicKey)).not.toBe(0);
  });
});