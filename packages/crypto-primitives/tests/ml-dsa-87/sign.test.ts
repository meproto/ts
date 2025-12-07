/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateMlDsa87Keypair,
  signMlDsa87,
} from "../../src/ml-dsa-87/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("signMlDsa87", () => {
  it("produces a Uint8Array signature", () => {
    const { secretKey } = generateMlDsa87Keypair();
    const msg = randomBytes(32);

    const sig = signMlDsa87(msg, secretKey);

    expect(sig instanceof Uint8Array).toBe(true);
    expect(sig.length).toBeGreaterThan(0);
  });

  it("produces different signatures for same key + message", () => {
    const { secretKey } = generateMlDsa87Keypair();
    const msg = randomBytes(32);

    const s1 = signMlDsa87(msg, secretKey);
    const s2 = signMlDsa87(msg, secretKey);

    // ML-DSA is NOT deterministic — probabilistic signatures should differ
    expect(Buffer.compare(s1, s2)).not.toBe(0);
  });
});