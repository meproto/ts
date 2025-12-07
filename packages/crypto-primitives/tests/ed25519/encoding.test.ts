/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  assertEd25519PublicKey,
  encodeEd25519PublicKey,
  decodeEd25519PublicKey,
} from "../../src/ed25519/index.js";

describe("Ed25519 encoding helpers", () => {
  const valid = new Uint8Array(32).fill(7);

  it("assertEd25519PublicKey validates a correct key", () => {
    expect(assertEd25519PublicKey(valid)).toBe(valid);
  });

  it("assertEd25519PublicKey rejects wrong length", () => {
    expect(() => assertEd25519PublicKey(new Uint8Array(31))).toThrow();
    expect(() => assertEd25519PublicKey(new Uint8Array(33))).toThrow();
  });

  it("encodeEd25519PublicKey is an identity function", () => {
    expect(encodeEd25519PublicKey(valid)).toBe(valid);
  });

  it("decodeEd25519PublicKey is an identity function", () => {
    expect(decodeEd25519PublicKey(valid)).toBe(valid);
  });
});