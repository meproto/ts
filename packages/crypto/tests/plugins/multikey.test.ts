/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  formatMultikey,
  parseMultikey,
} from "../../src/multikey.js";

import { generateP256Keypair } from "@meproto/crypto-primitives";

describe("multikey (plugin-based)", () => {
  it("round-trips through formatMultikey → parseMultikey", () => {
    const { publicKey } = generateP256Keypair();

    const mk = formatMultikey("ES256", publicKey);
    const parsed = parseMultikey(mk);

    expect(parsed.alg).toBe("ES256");
    expect(parsed.curve).toBe("P-256");

    // parsed.publicKey is UNCOMPRESSED; original is COMPRESSED
    const recompressed = parsed.plugin.compressPublicKey(parsed.publicKey);
    expect(recompressed).toEqual(publicKey);
  });

  it("throws on unknown prefix", () => {
    expect(() => parseMultikey("zBadMultikey")).toThrow();
  });
});