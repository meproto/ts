/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { bytesToBase64Url, base64UrlToBytes } from "../src/base64url.js";

describe("base64url (RFC4648 §5)", () => {
  it("round-trips bytes", () => {
    const bytes = new Uint8Array([1, 2, 3, 200, 255]);
    const url = bytesToBase64Url(bytes);
    expect(base64UrlToBytes(url)).toEqual(bytes);
  });

  it("removes padding", () => {
    const bytes = new TextEncoder().encode("hi");
    const s = bytesToBase64Url(bytes);
    expect(s.endsWith("=")).toBe(false);
  });

  it("decodes with or without missing padding", () => {
    expect(
      base64UrlToBytes("aGk") // missing padding version
    ).toEqual(new TextEncoder().encode("hi"));
  });
});