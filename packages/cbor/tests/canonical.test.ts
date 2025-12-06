/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Canonical DAG-CBOR codec
 *
 * - Deterministic ordering of map keys (UTF-8 sorted)
 * - No floats
 * - Only major types 0–5 and selected simple values in major type 7:
 *       false (0xf4), true (0xf5), null (0xf6)
 */

import { describe, it, expect } from "vitest";
import { encodeCanonical, decodeCanonical } from "../src/canonical.js";

describe("canonical DAG-CBOR encoder/decoder", () => {
  it("encodes and decodes null", () => {
    const bytes = encodeCanonical(null);
    const value = decodeCanonical(bytes);
    expect(value).toBe(null);
  });

  it("encodes and decodes booleans", () => {
    expect(decodeCanonical(encodeCanonical(true))).toBe(true);
    expect(decodeCanonical(encodeCanonical(false))).toBe(false);
  });

  it("encodes and decodes integers", () => {
    expect(decodeCanonical(encodeCanonical(0))).toBe(0);
    expect(decodeCanonical(encodeCanonical(42))).toBe(42);
    expect(decodeCanonical(encodeCanonical(-1))).toBe(-1);
    expect(decodeCanonical(encodeCanonical(-1000))).toBe(-1000);
  });

  it("rejects floats", () => {
    expect(() => encodeCanonical(1.23)).toThrow();
  });

  it("encodes and decodes strings", () => {
    const str = "hello";
    expect(decodeCanonical(encodeCanonical(str))).toBe(str);
  });

  it("encodes and decodes byte strings", () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const decoded = decodeCanonical(encodeCanonical(bytes));
    expect(decoded).toEqual(bytes);
  });

  it("encodes and decodes arrays", () => {
    const arr = [1, true, "x", null];
    expect(decodeCanonical(encodeCanonical(arr))).toEqual(arr);
  });

  it("encodes maps in UTF-8 sorted order", () => {
    const obj = { b: 2, a: 1 };
    const encoded = encodeCanonical(obj);

    // Re-decode and confirm order is not changed semantically
    expect(decodeCanonical(encoded)).toEqual({ a: 1, b: 2 });

    // Internal ordering: "a" comes before "b"
    // Check prefix pattern: MT_MAP + "a" then MT_MAP + "b"
    const aIndex = encoded.indexOf("a".charCodeAt(0));
    const bIndex = encoded.indexOf("b".charCodeAt(0));
    expect(aIndex < bIndex).toBe(true);
  });

  it("rejects numeric-origin keys", () => {
    expect(() => encodeCanonical({ 1: "x" } as any)).toThrow();
    expect(() => encodeCanonical({ "-5": "x" })).toThrow();
  });

  it("round-trip encode/decode for nested objects", () => {
    const obj = {
      a: [1, 2, { x: true }],
      b: null,
      c: new Uint8Array([9, 9, 9]),
    };
    const out = decodeCanonical(encodeCanonical(obj));
    expect(out).toEqual(obj);
  });

  it("throws on trailing bytes", () => {
    const bytes = encodeCanonical(42);
    const withGarbage = new Uint8Array([...bytes, 0x00]);
    expect(() => decodeCanonical(withGarbage)).toThrow();
  });

  it("sorts map keys by UTF-8 byte order even for multibyte keys", () => {
    const obj = {
      "á": 1,   // C3 A1
      "a": 2,   // 61
      "😀": 3,  // F0 9F 98 80
    };

    const encoded = encodeCanonical(obj);

    const enc = new TextEncoder();

    const positions = {
      a: encoded.indexOf(enc.encode("a")[0]),
      á: encoded.indexOf(enc.encode("á")[0]),
      d: encoded.indexOf(enc.encode("😀")[0]),
    };

    expect(positions.a < positions["á"]).toBe(true);
    expect(positions["á"] < positions.d).toBe(true);
  });

  it("rejects floats nested inside arrays or maps", () => {
    expect(() => encodeCanonical({ a: [1, 2, 3.14] })).toThrow();
    expect(() => encodeCanonical([1, { x: 2.71 }])).toThrow();
  });

  it("rejects disallowed simple values", () => {
    const bad = new Uint8Array([0xf7]); 
    expect(() => decodeCanonical(bad)).toThrow();
  });

  it("rejects major type 6 (semantic tags)", () => {
    // CBOR header: 0xC0 means tag(0)
    const bad = new Uint8Array([0xC0, 0x00]);
    expect(() => decodeCanonical(bad)).toThrow();
  });

  it("rejects integers too large for canonical uint32", () => {
    expect(() => encodeCanonical(0x1_0000_0000)).toThrow();
  });

  it("rejects negative integers beyond int32 encoding", () => {
    expect(() => encodeCanonical(-0x1_0000_0001)).toThrow();
  });

  it("rejects maps that are not in canonical UTF-8 order", () => {
    const manual = new Uint8Array([
      0xA2,             // map(2)
      0x61, 0x62, 0x01, // "b": 1
      0x61, 0x61, 0x02, // "a": 2 (out of order)
    ]);

    expect(() => decodeCanonical(manual)).toThrow();
  });

  it("round-trips deeply nested hierarchical objects", () => {
    const obj = {
      a: { b: { c: { d: { e: [1, 2, 3, { x: true }] }}}}
    };

    const decoded = decodeCanonical(encodeCanonical(obj));
    expect(decoded).toEqual(obj);
  });
});