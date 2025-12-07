/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  assertSecp256k1PublicKey,
  encodeSecp256k1PublicKey,
  decodeSecp256k1PublicKey,
} from "../../src/secp256k1/index.js";

describe("secp256k1 encoding helpers", () => {
  const valid = new Uint8Array(33);
  valid[0] = 0x02; // valid compressed prefix

  it("assertSecp256k1PublicKey validates a correct compressed key", () => {
    expect(assertSecp256k1PublicKey(valid)).toBe(valid);
  });

  it("assertSecp256k1PublicKey rejects wrong length", () => {
    expect(() => assertSecp256k1PublicKey(new Uint8Array(32))).toThrow();
    expect(() => assertSecp256k1PublicKey(new Uint8Array(34))).toThrow();
  });

  it("assertSecp256k1PublicKey rejects invalid prefix", () => {
    const bad = new Uint8Array(33).fill(1);
    bad[0] = 0x04; // invalid for compressed keys
    expect(() => assertSecp256k1PublicKey(bad)).toThrow();
  });

  it("encodeSecp256k1PublicKey is an identity function", () => {
    expect(encodeSecp256k1PublicKey(valid)).toBe(valid);
  });

  it("decodeSecp256k1PublicKey is an identity function", () => {
    expect(decodeSecp256k1PublicKey(valid)).toBe(valid);
  });
});