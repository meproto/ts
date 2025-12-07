/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  ed25519PublicKeyToJwk,
  ed25519PublicKeyToJwkJcs,
} from "../../src/ed25519/jwk.js";
import { generateEd25519Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("ed25519PublicKeyToJwk", () => {
  it("produces a valid OKP JWK", () => {
    const { publicKey } = generateEd25519Keypair();
    const jwk = ed25519PublicKeyToJwk(publicKey);

    expect(jwk.kty).toBe("OKP");
    expect(jwk.crv).toBe("Ed25519");
    expect(typeof jwk.x).toBe("string");

    expect(base64UrlToBytes(jwk.x)).toBeInstanceOf(Uint8Array);
  });

  it("produces JCS-canonical output", () => {
    const { publicKey } = generateEd25519Keypair();
    const canonical = ed25519PublicKeyToJwkJcs(publicKey);

    expect(typeof canonical).toBe("string");

    // Parse canonical JWK and inspect exact key ordering
    const parsed = JSON.parse(canonical);
    const keys = Object.keys(parsed);

    // JCS lexicographic order
    expect(keys).toEqual(["alg", "crv", "kty", "use", "x"]);
  });
});