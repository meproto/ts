/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { generateP256MultikeyKeypair } from "../../src/p256/wrapped-keypair.js";
import { parseMultikey } from "@meproto/codec";

describe("generateP256MultikeyKeypair", () => {
  it("returns a valid secretKey, publicKey, and multikey string", () => {
    const { secretKey, publicKey, publicKeyMultibase } =
      generateP256MultikeyKeypair();

    // Raw key sizes
    expect(secretKey instanceof Uint8Array).toBe(true);
    expect(publicKey instanceof Uint8Array).toBe(true);
    expect(secretKey.length).toBe(32);  // P-256 scalar
    expect(publicKey.length).toBe(33);  // compressed SEC1

    // Multikey string shape
    expect(typeof publicKeyMultibase).toBe("string");
    expect(publicKeyMultibase.startsWith("z")).toBe(true);
  });

  it("encodes a valid multikey that round-trips to the same public key", () => {
    const { publicKey, publicKeyMultibase } =
      generateP256MultikeyKeypair();

    const parsed = parseMultikey(publicKeyMultibase);

    // Algorithm & codec expectations from MULTICODEC_TABLE["p256-pub"]
    expect(parsed.algorithm).toBe("P-256");
    expect(parsed.codecName).toBe("p256-pub");

    // Public key bytes must match
    expect(parsed.publicKey).toEqual(publicKey);
  });
});