/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { signJws } from "../../src/sign.js";
import { verifyJws } from "../../src/verify.js";
import {
  generateP256Keypair,
  generateEd25519Keypair,
  generateSecp256k1Keypair,
} from "@meproto/crypto-primitives";
import { tamperBase64UrlSignature } from "../helpers/tamper.js";

describe("unified JWS (plugin-based)", () => {
  it("signs and verifies ES256", () => {
    const { secretKey, publicKey } = generateP256Keypair();
    const jws = signJws("ES256", secretKey, "hello");
    expect(verifyJws(jws, publicKey)).toBe(true);
  });

  it("signs and verifies EdDSA", () => {
    const { secretKey, publicKey } = generateEd25519Keypair();
    const jws = signJws("EdDSA", secretKey, "hello");
    expect(verifyJws(jws, publicKey)).toBe(true);
  });

  it("rejects tampered ES256K signature", () => {
    const { secretKey, publicKey } = generateSecp256k1Keypair();
    const jws = signJws("ES256K", secretKey, "hello");
    const parts = jws.split(".");
    parts[2] = tamperBase64UrlSignature(parts[2]);
    expect(verifyJws(parts.join("."), publicKey)).toBe(false);
  });
});