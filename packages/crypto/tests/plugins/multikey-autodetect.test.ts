/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { parseMultikey, formatMultikey } from "../../src/multikey.js";
import {
  generateP256Keypair,
  generateEd25519Keypair,
  generateSecp256k1Keypair,
} from "@meproto/crypto-primitives";

describe("multikey autodetection", () => {

  it("autodetects P-256 prefix", () => {
    const { publicKey } = generateP256Keypair();
    const mk = formatMultikey("ES256", publicKey);
    const parsed = parseMultikey(mk);

    expect(parsed.alg).toBe("ES256");
    expect(parsed.curve).toBe("P-256");
  });

  it("autodetects Ed25519 prefix", () => {
    const { publicKey } = generateEd25519Keypair();
    const mk = formatMultikey("EdDSA", publicKey);
    const parsed = parseMultikey(mk);

    expect(parsed.alg).toBe("EdDSA");
    expect(parsed.curve).toBe("Ed25519");
  });

  it("autodetects secp256k1 prefix", () => {
    const { publicKey } = generateSecp256k1Keypair();
    const mk = formatMultikey("ES256K", publicKey);
    const parsed = parseMultikey(mk);

    expect(parsed.alg).toBe("ES256K");
    expect(parsed.curve).toBe("secp256k1");
  });
});