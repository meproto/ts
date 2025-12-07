/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  x25519PublicKeyToJwk,
  x25519PublicKeyToJwkJcs,
} from "../../src/x25519/jwk.js";
import { generateX25519Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("x25519PublicKeyToJwk", () => {
  it("produces a valid OKP JWK for X25519", () => {
    const { publicKey } = generateX25519Keypair();

    const jwk = x25519PublicKeyToJwk(publicKey);

    expect(jwk.kty).toBe("OKP");
    expect(jwk.crv).toBe("X25519");
    expect(typeof jwk.x).toBe("string");

    expect(base64UrlToBytes(jwk.x)).toBeInstanceOf(Uint8Array);
  });

  it("produces JCS-canonicalized output", () => {
    const { publicKey } = generateX25519Keypair();
    const out = x25519PublicKeyToJwkJcs(publicKey);

    expect(typeof out).toBe("string");
    expect(out.startsWith("{\"crv\"")).toBe(true);
  });
});