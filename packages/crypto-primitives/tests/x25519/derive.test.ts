/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateX25519Keypair,
  deriveX25519SharedSecret,
} from "../../src/x25519/index.js";

describe("deriveX25519SharedSecret", () => {
  it("computes a 32-byte shared secret", () => {
    const a = generateX25519Keypair();
    const b = generateX25519Keypair();

    const shared1 = deriveX25519SharedSecret(a.secretKey, b.publicKey);
    const shared2 = deriveX25519SharedSecret(b.secretKey, a.publicKey);

    expect(shared1 instanceof Uint8Array).toBe(true);
    expect(shared1.length).toBe(32);
    expect(shared2.length).toBe(32);
  });

  it("shared secrets derived by A and B match", () => {
    const a = generateX25519Keypair();
    const b = generateX25519Keypair();

    const shared1 = deriveX25519SharedSecret(a.secretKey, b.publicKey);
    const shared2 = deriveX25519SharedSecret(b.secretKey, a.publicKey);

    expect(Buffer.compare(shared1, shared2)).toBe(0);
  });
});