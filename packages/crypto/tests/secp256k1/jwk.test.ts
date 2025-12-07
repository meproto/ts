/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  secp256k1PublicKeyToJwk,
  secp256k1PublicKeyToJwkJcs,
} from "../../src/secp256k1/jwk.js";
import { generateSecp256k1Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("secp256k1PublicKeyToJwk", () => {
  it("produces a valid ES256K JWK", () => {
    const { publicKey } = generateSecp256k1Keypair();
    const jwk = secp256k1PublicKeyToJwk(publicKey);

    expect(jwk.kty).toBe("EC");
    expect(jwk.crv).toBe("secp256k1");
    expect(typeof jwk.x).toBe("string");
    expect(typeof jwk.y).toBe("string");

    expect(base64UrlToBytes(jwk.x)).toBeInstanceOf(Uint8Array);
    expect(base64UrlToBytes(jwk.y)).toBeInstanceOf(Uint8Array);
  });

  it("produces JCS-canonical output", () => {
    const { publicKey } = generateSecp256k1Keypair();
    const canonical = secp256k1PublicKeyToJwkJcs(publicKey);

    expect(typeof canonical).toBe("string");
    const parsed = JSON.parse(canonical);
    const keys = Object.keys(parsed);
    expect(keys).toEqual(["alg", "crv", "kty", "use", "x", "y"]);
  });
});