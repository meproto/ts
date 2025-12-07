/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { signSecp256k1Jws } from "../../src/secp256k1/sign-jws.js";
import { generateSecp256k1Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("signSecp256k1Jws", () => {
  it("creates a JWS with alg ES256K", () => {
    const { secretKey } = generateSecp256k1Keypair();
    const jws = signSecp256k1Jws(secretKey, "hello");

    const [headerB64] = jws.split(".");
    const header = JSON.parse(new TextDecoder().decode(base64UrlToBytes(headerB64)));

    expect(header.alg).toBe("ES256K");
  });

  it("is deterministic for same key & message", () => {
    const { secretKey } = generateSecp256k1Keypair();
    const j1 = signSecp256k1Jws(secretKey, "hi");
    const j2 = signSecp256k1Jws(secretKey, "hi");

    expect(j1).toBe(j2);
  });
});