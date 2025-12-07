/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  mldsa87PublicKeyToJwk,
  mldsa87PublicKeyToJwkJcs,
} from "../../src/ml-dsa-87/jwk.js";
import { generateMlDsa87Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("mldsa87PublicKeyToJwk", () => {
  it("produces a predicted OKP JWK", () => {
    const { publicKey } = generateMlDsa87Keypair();
    const jwk = mldsa87PublicKeyToJwk(publicKey);

    expect(jwk.kty).toBe("OKP");
    expect(jwk.crv).toBe("ML-DSA-87");
    expect(typeof jwk.x).toBe("string");

    expect(base64UrlToBytes(jwk.x)).toBeInstanceOf(Uint8Array);
  });

  it("produces JCS-canonical output", () => {
    const { publicKey } = generateMlDsa87Keypair();
    const canonical = mldsa87PublicKeyToJwkJcs(publicKey);

    expect(typeof canonical).toBe("string");
    const parsed = JSON.parse(canonical);
    const keys = Object.keys(parsed);
    expect(keys).toEqual(["alg", "crv", "kty", "use", "x"]);
  });
});