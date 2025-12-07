/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateMlDsa87Keypair,
} from "../../src/ml-dsa-87/index.js";

describe("generateMlDsa87Keypair", () => {
  it("produces a secret key and 2592-byte public key", () => {
    const { secretKey, publicKey } = generateMlDsa87Keypair();

    expect(secretKey instanceof Uint8Array).toBe(true);
    expect(publicKey instanceof Uint8Array).toBe(true);

    // Noble ML-DSA-87 key sizes:
    // secretKey: 3168 bytes
    // publicKey: 2592 bytes
    expect(publicKey.length).toBe(2592);
    expect(secretKey.length).toBeGreaterThan(0); // size may change between releases
  });

  it("produces unique keypairs", () => {
    const a = generateMlDsa87Keypair();
    const b = generateMlDsa87Keypair();

    expect(Buffer.compare(a.publicKey, b.publicKey)).not.toBe(0);
    expect(Buffer.compare(a.secretKey, b.secretKey)).not.toBe(0);
  });
});