/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { signEd25519Jws } from "../../src/ed25519/sign-jws.js";
import { verifyEd25519Jws } from "../../src/ed25519/verify-jws.js";
import { generateEd25519Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";
import { tamperBase64UrlSignature } from "../helpers/tamper.js";


describe("verifyEd25519Jws", () => {
  it("verifies a valid EdDSA JWS", () => {
    const { secretKey, publicKey } = generateEd25519Keypair();
    const jws = signEd25519Jws(secretKey, "msg");
    expect(verifyEd25519Jws(jws, publicKey)).toBe(true);
  });

  it("rejects tampered payload", () => {
    const { secretKey, publicKey } = generateEd25519Keypair();
    const jws = signEd25519Jws(secretKey, "hello");

    const parts = jws.split(".");
    parts[1] = parts[1].replace(/.$/, "A");

    expect(verifyEd25519Jws(parts.join("."), publicKey)).toBe(false);
  });

  it("rejects tampered signature", () => {
    const { secretKey, publicKey } = generateEd25519Keypair();

    const jws = signEd25519Jws(secretKey, "hello world");
    const parts = jws.split(".");

    // Decode the real signature
    const sig = base64UrlToBytes(parts[2]);

    // Flip a meaningful bit inside R || S
    sig[10] ^= 0xff;

    // Re-encode
    parts[2] = tamperBase64UrlSignature(parts[2]);
    
    expect(verifyEd25519Jws(parts.join("."), publicKey)).toBe(false);
  });
});