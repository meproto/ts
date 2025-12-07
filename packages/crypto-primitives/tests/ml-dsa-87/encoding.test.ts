/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  assertMlDsa87PublicKey,
  encodeMlDsa87PublicKey,
  decodeMlDsa87PublicKey,
} from "../../src/ml-dsa-87/index.js";

describe("ML-DSA-87 encoding helpers", () => {
  const valid = new Uint8Array(2592).fill(1);

  it("assertMlDsa87PublicKey validates a correct key", () => {
    expect(assertMlDsa87PublicKey(valid)).toBe(valid);
  });

  it("assertMlDsa87PublicKey rejects incorrect key length", () => {
    expect(() => assertMlDsa87PublicKey(new Uint8Array(2591))).toThrow();
    expect(() => assertMlDsa87PublicKey(new Uint8Array(2593))).toThrow();
  });

  it("encodeMlDsa87PublicKey is an identity function", () => {
    expect(encodeMlDsa87PublicKey(valid)).toBe(valid);
  });

  it("decodeMlDsa87PublicKey is an identity function", () => {
    expect(decodeMlDsa87PublicKey(valid)).toBe(valid);
  });
});