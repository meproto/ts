/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import {
  concatBytes,
  equalBytes,
  hexToBytes,
  bytesToHex,
} from "../../src/utils/bytes.js";

describe("bytes utilities", () => {
  it("concatenates two Uint8Arrays", () => {
    const a = new Uint8Array([1, 2]);
    const b = new Uint8Array([3, 4]);
    expect(concatBytes(a, b)).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it("performs constant-time equality correctly", () => {
    const x = new Uint8Array([9, 9, 9]);
    const y = new Uint8Array([9, 9, 9]);
    const z = new Uint8Array([9, 9, 8]);
    expect(equalBytes(x, y)).toBe(true);
    expect(equalBytes(x, z)).toBe(false);
  });

  it("converts hex → bytes", () => {
    expect(hexToBytes("0a0b0c")).toEqual(new Uint8Array([0x0a, 0x0b, 0x0c]));
    expect(hexToBytes("0x0a0b")).toEqual(new Uint8Array([0x0a, 0x0b]));
  });

  it("throws on malformed hex", () => {
    expect(() => hexToBytes("0xZZ")).toThrow();
    expect(() => hexToBytes("gg")).toThrow();
  });

  it("converts bytes → hex", () => {
    const bytes = new Uint8Array([0x0a, 0x0b, 0x0c]);
    expect(bytesToHex(bytes)).toBe("0a0b0c");
  });

  it("hexToBytes(bytesToHex(x)) round-trips", () => {
    const bytes = new Uint8Array([1, 2, 3, 4, 255]);
    const hex = bytesToHex(bytes);
    const round = hexToBytes(hex);
    expect(round).toEqual(bytes);
  });
});