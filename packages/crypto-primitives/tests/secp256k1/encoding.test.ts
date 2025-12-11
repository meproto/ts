/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";

import {
  assertSecp256k1PublicKey,
  encodeSecp256k1PublicKey,
  decodeSecp256k1PublicKey,
  decompressSecp256k1PublicKey,
  generateSecp256k1Keypair,
} from "../../src/secp256k1/index.js";

describe("secp256k1 encoding helpers", () => {
  // Synthetic key for prefix/length validation tests
  const synthetic = new Uint8Array(33);
  synthetic[0] = 0x02;

  it("assertSecp256k1PublicKey validates a correct compressed key", () => {
    expect(assertSecp256k1PublicKey(synthetic)).toBe(synthetic);
  });

  it("assertSecp256k1PublicKey rejects wrong length", () => {
    expect(() => assertSecp256k1PublicKey(new Uint8Array(32))).toThrow();
    expect(() => assertSecp256k1PublicKey(new Uint8Array(34))).toThrow();
  });

  it("assertSecp256k1PublicKey rejects invalid prefix", () => {
    const bad = new Uint8Array(33).fill(1);
    bad[0] = 0x04;
    expect(() => assertSecp256k1PublicKey(bad)).toThrow();
  });

  it("encodeSecp256k1PublicKey is an identity function", () => {
    expect(encodeSecp256k1PublicKey(synthetic)).toBe(synthetic);
  });

  it("decodeSecp256k1PublicKey is an identity function", () => {
    expect(decodeSecp256k1PublicKey(synthetic)).toBe(synthetic);
  });

  it("decompressSecp256k1PublicKey returns x and y coordinates", () => {
    // Use your own key generator — guaranteed to be valid
    const { publicKey } = generateSecp256k1Keypair();

    const { x, y } = decompressSecp256k1PublicKey(publicKey);

    expect(x).toBeInstanceOf(Uint8Array);
    expect(y).toBeInstanceOf(Uint8Array);
    expect(x.length).toBe(32);
    expect(y.length).toBe(32);
  });
});