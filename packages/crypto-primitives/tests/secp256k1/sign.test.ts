/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateSecp256k1Keypair,
  signSecp256k1,
} from "../../src/secp256k1/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("signSecp256k1", () => {
  it("produces a 64-byte compact signature", () => {
    const { secretKey } = generateSecp256k1Keypair();
    const msg = randomBytes(32);

    const sig = signSecp256k1(msg, secretKey);

    expect(sig instanceof Uint8Array).toBe(true);
    expect(sig.length).toBe(64);
  });

  it("is deterministic for same message and key", () => {
    const { secretKey } = generateSecp256k1Keypair();
    const msg = randomBytes(32);

    const s1 = signSecp256k1(msg, secretKey);
    const s2 = signSecp256k1(msg, secretKey);

    // RFC6979 ECDSA is deterministic → signatures must match
    expect(Buffer.compare(s1, s2)).toBe(0);
  });
});