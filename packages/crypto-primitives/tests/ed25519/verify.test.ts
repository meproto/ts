/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateEd25519Keypair,
  signEd25519,
  verifyEd25519,
} from "../../src/ed25519/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("verifyEd25519", () => {
  it("verifies a valid signature", () => {
    const { secretKey, publicKey } = generateEd25519Keypair();
    const msg = randomBytes(32);

    const sig = signEd25519(msg, secretKey);

    expect(verifyEd25519(sig, msg, publicKey)).toBe(true);
  });

  it("rejects signatures for a different message", () => {
    const { secretKey, publicKey } = generateEd25519Keypair();

    const msg1 = randomBytes(32);
    const msg2 = randomBytes(32);

    const sig = signEd25519(msg1, secretKey);

    expect(verifyEd25519(sig, msg2, publicKey)).toBe(false);
  });

  it("rejects signatures with wrong public key", () => {
    const { secretKey } = generateEd25519Keypair();
    const { publicKey: wrong } = generateEd25519Keypair();

    const msg = randomBytes(32);
    const sig = signEd25519(msg, secretKey);

    expect(verifyEd25519(sig, msg, wrong)).toBe(false);
  });
});