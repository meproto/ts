/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  multibaseToBytes,
  bytesToMultibase58btc,
  bytesToMultibaseBase64url,
} from "../src/multibase.js";

describe("multibase dispatcher", () => {
  const bytes = new Uint8Array([1, 2, 3]);

  it("encodes base58btc", () => {
    expect(bytesToMultibase58btc(bytes).startsWith("z")).toBe(true);
  });

  it("encodes base64url", () => {
    expect(bytesToMultibaseBase64url(bytes).startsWith("u")).toBe(true);
  });

  it("decodes base58btc", () => {
    const encoded = bytesToMultibase58btc(bytes);
    expect(multibaseToBytes(encoded)).toEqual(bytes);
  });

  it("decodes base64url", () => {
    const encoded = bytesToMultibaseBase64url(bytes);
    expect(multibaseToBytes(encoded)).toEqual(bytes);
  });

  it("rejects unsupported prefix", () => {
    expect(() => multibaseToBytes("x123")).toThrow();
  });
});