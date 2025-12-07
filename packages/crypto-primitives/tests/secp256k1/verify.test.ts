/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateSecp256k1Keypair,
  signSecp256k1,
  verifySecp256k1,
} from "../../src/secp256k1/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("verifySecp256k1", () => {
  it("verifies a valid signature", () => {
    const { secretKey, publicKey } = generateSecp256k1Keypair();
    const msg = randomBytes(32);

    const sig = signSecp256k1(msg, secretKey);

    expect(verifySecp256k1(sig, msg, publicKey)).toBe(true);
  });

  it("rejects a signature over a different message", () => {
    const { secretKey, publicKey } = generateSecp256k1Keypair();
    const msg = randomBytes(32);
    const other = randomBytes(32);

    const sig = signSecp256k1(msg, secretKey);

    expect(verifySecp256k1(sig, other, publicKey)).toBe(false);
  });

  it("rejects a signature with the wrong public key", () => {
    const { secretKey } = generateSecp256k1Keypair();
    const { publicKey: wrong } = generateSecp256k1Keypair();

    const msg = randomBytes(32);
    const sig = signSecp256k1(msg, secretKey);

    expect(verifySecp256k1(sig, msg, wrong)).toBe(false);
  });
});