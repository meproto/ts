/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateSecp256k1Keypair,
} from "../../src/secp256k1/index.js";

describe("generateSecp256k1Keypair", () => {
  it("produces a 32-byte secret key and 33-byte compressed public key", () => {
    const { secretKey, publicKey } = generateSecp256k1Keypair();

    expect(secretKey instanceof Uint8Array).toBe(true);
    expect(publicKey instanceof Uint8Array).toBe(true);

    expect(secretKey.length).toBe(32);
    expect(publicKey.length).toBe(33);

    const prefix = publicKey[0];
    expect(prefix === 0x02 || prefix === 0x03).toBe(true);
  });

  it("produces unique keypairs", () => {
    const a = generateSecp256k1Keypair();
    const b = generateSecp256k1Keypair();

    expect(Buffer.compare(a.secretKey, b.secretKey)).not.toBe(0);
    expect(Buffer.compare(a.publicKey, b.publicKey)).not.toBe(0);
  });
});