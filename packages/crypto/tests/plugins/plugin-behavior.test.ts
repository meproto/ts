/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  p256Plugin,
  ed25519Plugin,
  secp256k1Plugin,
  x25519Plugin,
  mldsa87Plugin,
  mlkem1024Plugin,
} from "../../src/index.js";

describe("plugin behaviors", () => {
  it("P-256 plugin exposes expected fields", () => {
    expect(p256Plugin.alg).toBe("ES256");
    expect(p256Plugin.sign).toBeTypeOf("function");
    expect(p256Plugin.verify).toBeTypeOf("function");
  });

  it("Ed25519 plugin exposes EdDSA behavior", () => {
    expect(ed25519Plugin.alg).toBe("EdDSA");
    expect(ed25519Plugin.sign).toBeDefined();
    expect(ed25519Plugin.verify).toBeDefined();
  });

  it("secp256k1 plugin exposes ES256K behavior", () => {
    expect(secp256k1Plugin.alg).toBe("ES256K");
  });

  it("X25519 plugin exposes deriveSharedSecret only", () => {
    expect(x25519Plugin.sign).toBeUndefined();
    expect(x25519Plugin.verify).toBeUndefined();
    expect(x25519Plugin.deriveSharedSecret).toBeDefined();
  });

  it("ML-DSA-87 plugin supports signatures", () => {
    expect(mldsa87Plugin.sign).toBeDefined();
    expect(mldsa87Plugin.verify).toBeDefined();
  });

  it("ML-KEM-1024 plugin supports encapsulate/decapsulate", () => {
    expect(mlkem1024Plugin.sign).toBeUndefined();
    expect(mlkem1024Plugin.encapsulate).toBeDefined();
    expect(mlkem1024Plugin.decapsulate).toBeDefined();
  });
});