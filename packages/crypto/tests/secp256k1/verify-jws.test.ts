/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { signSecp256k1Jws } from "../../src/secp256k1/sign-jws.js";
import { verifySecp256k1Jws } from "../../src/secp256k1/verify-jws.js";
import { generateSecp256k1Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";
import { tamperBase64UrlSignature } from "../helpers/tamper.js";



describe("verifySecp256k1Jws", () => {
  it("verifies a valid ES256K JWS", () => {
    const { secretKey, publicKey } = generateSecp256k1Keypair();
    const jws = signSecp256k1Jws(secretKey, "hello");

    expect(verifySecp256k1Jws(jws, publicKey)).toBe(true);
  });

  it("rejects tampered payload", () => {
    const { secretKey, publicKey } = generateSecp256k1Keypair();
    const jws = signSecp256k1Jws(secretKey, "hello");

    const parts = jws.split(".");
    parts[1] = parts[1].replace(/.$/, "A");

    expect(verifySecp256k1Jws(parts.join("."), publicKey)).toBe(false);
  });

  it("rejects tampered signature", () => {
    const { secretKey, publicKey } = generateSecp256k1Keypair();
    const jws = signSecp256k1Jws(secretKey, "hello");

    const parts = jws.split(".");

    // Decode raw compact signature (64 bytes)
    const sig = base64UrlToBytes(parts[2]);

    // Flip a byte inside R or S (guaranteed to break signature)
    sig[10] ^= 0xff;

    // Re-encode
    parts[2] = tamperBase64UrlSignature(parts[2]);

    expect(verifySecp256k1Jws(parts.join("."), publicKey)).toBe(false);
  });
});