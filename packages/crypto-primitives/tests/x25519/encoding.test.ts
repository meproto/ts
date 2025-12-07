/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  assertX25519PublicKey,
  encodeX25519PublicKey,
  decodeX25519PublicKey,
} from "../../src/x25519/index.js";

describe("X25519 encoding helpers", () => {
  const valid = new Uint8Array(32).fill(7);

  it("assertX25519PublicKey validates a correct key", () => {
    expect(assertX25519PublicKey(valid)).toBe(valid);
  });

  it("assertX25519PublicKey rejects incorrect key length", () => {
    expect(() => assertX25519PublicKey(new Uint8Array(31))).toThrow();
    expect(() => assertX25519PublicKey(new Uint8Array(33))).toThrow();
  });

  it("encodeX25519PublicKey is an identity function", () => {
    expect(encodeX25519PublicKey(valid)).toBe(valid);
  });

  it("decodeX25519PublicKey is an identity function", () => {
    expect(decodeX25519PublicKey(valid)).toBe(valid);
  });
});