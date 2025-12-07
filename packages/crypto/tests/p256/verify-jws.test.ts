/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { signP256Jws } from "../../src/p256/sign-jws.js";
import { verifyP256Jws } from "../../src/p256/verify-jws.js";
import { generateP256Keypair } from "@meproto/crypto-primitives";
import { tamperBase64UrlSignature } from "../helpers/tamper.js";


describe("verifyP256Jws", () => {
  it("verifies a valid ES256 JWS", () => {
    const { secretKey, publicKey } = generateP256Keypair();

    const jws = signP256Jws(secretKey, "hello world");

    expect(verifyP256Jws(jws, publicKey)).toBe(true);
  });

  it("fails when payload is modified", () => {
    const { secretKey, publicKey } = generateP256Keypair();

    const jws = signP256Jws(secretKey, "hello world");
    const parts = jws.split(".");

    parts[1] = parts[1].replace(/.$/, "A"); // mutate payload a tiny bit

    const tampered = parts.join(".");
    expect(verifyP256Jws(tampered, publicKey)).toBe(false);
  });

  it("fails when signature is modified", () => {
    const { secretKey, publicKey } = generateP256Keypair();
    const jws = signP256Jws(secretKey, "hello world");

    const parts = jws.split(".");
    parts[2] = tamperBase64UrlSignature(parts[2]);

    expect(verifyP256Jws(parts.join("."), publicKey)).toBe(false);
  });
});