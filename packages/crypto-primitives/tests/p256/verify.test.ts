/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { signP256DerPrehash, verifyP256DerPrehash, generateP256Keypair } from "../../src/p256/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("verifyP256DerPrehash", () => {
  it("verifies a valid signature", () => {
    const { secretKey, publicKey } = generateP256Keypair();
    const msg = randomBytes(32);

    const sig = signP256DerPrehash(msg, secretKey);

    const ok = verifyP256DerPrehash(sig, msg, publicKey);
    expect(ok).toBe(true);
  });

  it("rejects a signature for the wrong message", () => {
    const { secretKey, publicKey } = generateP256Keypair();
    const msg = randomBytes(32);
    const other = randomBytes(32);

    const sig = signP256DerPrehash(msg, secretKey);

    const ok = verifyP256DerPrehash(sig, other, publicKey);
    expect(ok).toBe(false);
  });

  it("rejects a signature when using wrong public key", () => {
    const { secretKey } = generateP256Keypair();
    const { publicKey: pub2 } = generateP256Keypair();

    const msg = randomBytes(32);
    const sig = signP256DerPrehash(msg, secretKey);

    const ok = verifyP256DerPrehash(sig, msg, pub2);
    expect(ok).toBe(false);
  });
});