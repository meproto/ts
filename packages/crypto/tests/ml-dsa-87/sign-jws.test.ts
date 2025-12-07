/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { signMlDsa87Jws } from "../../src/ml-dsa-87/sign-jws.js";
import { generateMlDsa87Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

const decoder = new TextDecoder();

describe("signMlDsa87Jws", () => {
  it("creates a JWS with alg ML-DSA-87", () => {
    const { secretKey } = generateMlDsa87Keypair();
    const jws = signMlDsa87Jws(secretKey, "hello");

    const [headerB64] = jws.split(".");
    const header = JSON.parse(decoder.decode(base64UrlToBytes(headerB64)));

    expect(header.alg).toBe("ML-DSA-87");
  });

  it("produces different signatures for the same key + message", () => {
    const { secretKey } = generateMlDsa87Keypair();

    const j1 = signMlDsa87Jws(secretKey, "hello");
    const j2 = signMlDsa87Jws(secretKey, "hello");

    // ML-DSA signatures are probabilistic, so these should differ
    expect(j1 === j2).toBe(false);
  });
});