/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { signP256Jws } from "../../src/p256/sign-jws.js";
import { generateP256Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("signP256Jws", () => {
  it("produces a valid compact JWS with ES256 header", () => {
    const { secretKey } = generateP256Keypair();

    const jws = signP256Jws(secretKey, "hello");

    const parts = jws.split(".");
    expect(parts.length).toBe(3);

    const header = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(parts[0]))
    );
    expect(header.alg).toBe("ES256");
  });

  it("produces deterministic signatures for same input", () => {
    const { secretKey } = generateP256Keypair();

    const j1 = signP256Jws(secretKey, "hi");
    const j2 = signP256Jws(secretKey, "hi");

    expect(j1).toBe(j2);
  });
});