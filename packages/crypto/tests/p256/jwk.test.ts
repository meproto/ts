/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import {
  p256PublicKeyToJwk,
  p256PublicKeyToJwkJcs,
} from "../../src/p256/jwk.js";
import { generateP256Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("p256PublicKeyToJwk", () => {
  it("converts a SEC1 public key into a JWK object", () => {
    const { publicKey } = generateP256Keypair();
    const jwk = p256PublicKeyToJwk(publicKey);

    expect(jwk.kty).toBe("EC");
    expect(jwk.crv).toBe("P-256");
    expect(typeof jwk.x).toBe("string");
    expect(typeof jwk.y).toBe("string");

    // x and y decode cleanly
    expect(base64UrlToBytes(jwk.x)).toBeInstanceOf(Uint8Array);
    expect(base64UrlToBytes(jwk.y)).toBeInstanceOf(Uint8Array);
  });

    it("produces JCS-canonicalized JSON string", () => {
      const { publicKey } = generateP256Keypair();
      const canonical = p256PublicKeyToJwkJcs(publicKey);

      expect(typeof canonical).toBe("string");

      // Parse canonical JSON
      const parsed = JSON.parse(canonical);
      const keys = Object.keys(parsed);

      // Strict JCS lexicographic key ordering
      expect(keys).toEqual(["alg", "crv", "kty", "use", "x", "y"]);
    });
});