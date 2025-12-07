/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { generateP256Keypair, compress, decompressP256 } from "../../src/p256/index.js";

describe("P-256 SEC1 encoding helpers", () => {
  it("compresses and decompresses correctly", () => {
    const { publicKey } = generateP256Keypair();

    const uncompressed = decompressP256(publicKey);
    expect(uncompressed.length).toBe(65);
    expect(uncompressed[0]).toBe(0x04);

    const recompressed = compress(uncompressed);
    expect(Buffer.compare(publicKey, recompressed)).toBe(0);
  });

  it("decompressing invalid prefix throws", () => {
    const bad = new Uint8Array(33);
    bad[0] = 0x05;

    expect(() => decompressP256(bad)).toThrow();
  });

  it("compressing invalid key throws", () => {
    const bad = new Uint8Array(10);
    expect(() => compress(bad)).toThrow();
  });
});