/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateMlDsa87Keypair,
  signMlDsa87,
  verifyMlDsa87,
} from "../../src/ml-dsa-87/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("verifyMlDsa87", () => {
  it("verifies a valid signature", () => {
    const { secretKey, publicKey } = generateMlDsa87Keypair();
    const msg = randomBytes(32);

    const sig = signMlDsa87(msg, secretKey);

    expect(verifyMlDsa87(sig, msg, publicKey)).toBe(true);
  });

  it("rejects signatures over a different message", () => {
    const { secretKey, publicKey } = generateMlDsa87Keypair();

    const msg1 = randomBytes(32);
    const msg2 = randomBytes(32);

    const sig = signMlDsa87(msg1, secretKey);

    expect(verifyMlDsa87(sig, msg2, publicKey)).toBe(false);
  });

  it("rejects signatures with wrong public key", () => {
    const { secretKey } = generateMlDsa87Keypair();
    const { publicKey: wrongPub } = generateMlDsa87Keypair();

    const msg = randomBytes(32);
    const sig = signMlDsa87(msg, secretKey);

    expect(verifyMlDsa87(sig, msg, wrongPub)).toBe(false);
  });
});