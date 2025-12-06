/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { base58btcEncode, base58btcDecode } from "../src/multibase.js";

describe("base58btc", () => {
  it("encodes and decodes simple bytes", () => {
    const bytes = new Uint8Array([0, 0, 1, 2, 3]);
    const encoded = base58btcEncode(bytes);
    const decoded = base58btcDecode(encoded);
    expect(decoded).toEqual(bytes);
  });

  it("handles empty array", () => {
    expect(base58btcEncode(new Uint8Array())).toBe("");
    expect(base58btcDecode("")).toEqual(new Uint8Array());
  });

  it("throws on invalid chars", () => {
    expect(() => base58btcDecode("0")).toThrow();
    expect(() => base58btcDecode("O0")).toThrow();
  });
});