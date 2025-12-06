/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { bytesToBase64, base64ToBytes } from "../src/base64.js";

describe("base64 (RFC4648)", () => {
  it("round-trips random bytes", () => {
    const bytes = new Uint8Array([1, 2, 3, 255, 128, 64, 0]);
    const b64 = bytesToBase64(bytes);
    const decoded = base64ToBytes(b64);
    expect(decoded).toEqual(bytes);
  });

  it("produces correct base64", () => {
    const bytes = new TextEncoder().encode("hello");
    expect(bytesToBase64(bytes)).toBe("aGVsbG8=");
  });

  it("decodes standard base64 correctly", () => {
    const decoded = base64ToBytes("aGVsbG8=");
    expect(new TextDecoder().decode(decoded)).toBe("hello");
  });
});