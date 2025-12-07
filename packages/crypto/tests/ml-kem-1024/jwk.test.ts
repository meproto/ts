/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  mlKem1024PublicKeyToJwk,
  mlKem1024PublicKeyToJwkJcs,
} from "../../src/ml-kem-1024/jwk.js";
import { generateMlKem1024Keypair } from "@meproto/crypto-primitives";
import { base64UrlToBytes } from "@meproto/codec";

describe("mlKem1024PublicKeyToJwk", () => {
  it("produces a predicted OKP JWK for ML-KEM-1024", () => {
    const { publicKey } = generateMlKem1024Keypair();
    const jwk = mlKem1024PublicKeyToJwk(publicKey);

    expect(jwk.kty).toBe("OKP");
    expect(jwk.crv).toBe("ML-KEM-1024");
    expect(typeof jwk.x).toBe("string");

    expect(base64UrlToBytes(jwk.x)).toBeInstanceOf(Uint8Array);
  });

  it("produces JCS-canonical output", () => {
    const { publicKey } = generateMlKem1024Keypair();
    const out = mlKem1024PublicKeyToJwkJcs(publicKey);

    expect(typeof out).toBe("string");
    expect(out.startsWith("{\"crv\"")).toBe(true);
  });
});