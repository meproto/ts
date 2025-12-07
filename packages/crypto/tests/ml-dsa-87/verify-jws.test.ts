/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { signMlDsa87Jws } from "../../src/ml-dsa-87/sign-jws.js";
import { verifyMlDsa87Jws } from "../../src/ml-dsa-87/verify-jws.js";
import { generateMlDsa87Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";
import { tamperBase64UrlSignature } from "../helpers/tamper.js";


describe("verifyMlDsa87Jws", () => {
  it("verifies a valid ML-DSA-87 JWS", () => {
    const { secretKey, publicKey } = generateMlDsa87Keypair();
    const jws = signMlDsa87Jws(secretKey, "hello");

    expect(verifyMlDsa87Jws(jws, publicKey)).toBe(true);
  });

  it("rejects tampered payload", () => {
    const { secretKey, publicKey } = generateMlDsa87Keypair();
    const jws = signMlDsa87Jws(secretKey, "hello");

    const parts = jws.split(".");
    parts[1] = parts[1].replace(/.$/, "A"); // mutate payload

    expect(verifyMlDsa87Jws(parts.join("."), publicKey)).toBe(false);
  });


  it("rejects tampered signature", () => {
    const { secretKey, publicKey } = generateMlDsa87Keypair();

    const jws = signMlDsa87Jws(secretKey, "hello world");
    const parts = jws.split(".");

    // Decode
    const sig = base64UrlToBytes(parts[2]);

    // Flip a real bit guaranteed to change signature meaning
    sig[50] ^= 0xff;

    // Re-encode
    parts[2] = tamperBase64UrlSignature(parts[2]);

    expect(verifyMlDsa87Jws(parts.join("."), publicKey)).toBe(false);
  });
});