/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  assertMlKem1024PublicKey,
  encodeMlKem1024PublicKey,
  decodeMlKem1024PublicKey,
} from "../../src/ml-kem-1024/index.js";

describe("ML-KEM-1024 encoding helpers", () => {
  const valid = new Uint8Array(1568).fill(9);

  it("assertMlKem1024PublicKey validates a correct public key", () => {
    expect(assertMlKem1024PublicKey(valid)).toBe(valid);
  });

  it("assertMlKem1024PublicKey rejects incorrect key length", () => {
    expect(() => assertMlKem1024PublicKey(new Uint8Array(1567))).toThrow();
    expect(() => assertMlKem1024PublicKey(new Uint8Array(1569))).toThrow();
  });

  it("encodeMlKem1024PublicKey is an identity function", () => {
    expect(encodeMlKem1024PublicKey(valid)).toBe(valid);
  });

  it("decodeMlKem1024PublicKey is an identity function", () => {
    expect(decodeMlKem1024PublicKey(valid)).toBe(valid);
  });
});