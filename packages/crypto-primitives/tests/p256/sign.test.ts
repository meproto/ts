/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { signP256DerPrehash, generateP256Keypair } from "../../src/p256/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("signP256DerPrehash", () => {
  it("creates a DER signature for a message", () => {
    const { secretKey } = generateP256Keypair();
    const msg = randomBytes(32);

    const sig = signP256DerPrehash(msg, secretKey);

    expect(sig instanceof Uint8Array).toBe(true);
    expect(sig.length).toBeGreaterThan(64); // typical DER size
  });

  it("is deterministic: same message + key => same signature", () => {
    const { secretKey } = generateP256Keypair();
    const msg = randomBytes(32);

    const s1 = signP256DerPrehash(msg, secretKey);
    const s2 = signP256DerPrehash(msg, secretKey);

    // Deterministic ECDSA: signatures must match
    expect(Buffer.compare(s1, s2)).toBe(0);
  });
});