/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { signEd25519Jws } from "../../src/ed25519/sign-jws.js";
import { generateEd25519Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("signEd25519Jws", () => {
  it("creates a JWS with alg EdDSA", () => {
    const { secretKey } = generateEd25519Keypair();
    const jws = signEd25519Jws(secretKey, "hello");

    const [headerB64] = jws.split(".");
    const header = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(headerB64))
    );

    expect(header.alg).toBe("EdDSA");
  });

  it("is deterministic for same key & message", () => {
    const { secretKey } = generateEd25519Keypair();
    const j1 = signEd25519Jws(secretKey, "hi");
    const j2 = signEd25519Jws(secretKey, "hi");

    expect(j1).toBe(j2);
  });
});