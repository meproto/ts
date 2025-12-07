/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { asArrayBuffer } from "../../src/utils/asArrayBuffer.js";

describe("asArrayBuffer", () => {
  it("converts a Uint8Array into an ArrayBuffer", () => {
    const u8 = new Uint8Array([1, 2, 3]);
    const buf = asArrayBuffer(u8);
    expect(buf).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(buf)).toEqual(u8);
  });

  it("returns a *copy* of the buffer, not a view into the original", () => {
    const u8 = new Uint8Array([9, 9, 9]);
    const buf = asArrayBuffer(u8);

    // modify original
    u8[0] = 123;

    // buffer contents should NOT change
    expect(new Uint8Array(buf)).toEqual(new Uint8Array([9, 9, 9]));
  });
});