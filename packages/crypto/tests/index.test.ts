/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import * as crypto from "../src/index.js";

describe("crypto public API surface", () => {

  // ------------------------------------------------------------
  // Unified JWS API (plugin-based)
  // ------------------------------------------------------------
  it("exposes unified JWS API", () => {
    expect(typeof crypto.signJws).toBe("function");
    expect(typeof crypto.verifyJws).toBe("function");
  });

  // ------------------------------------------------------------
  // Unified Multikey API
  // ------------------------------------------------------------
  it("exposes unified multikey functions", () => {
    expect(typeof crypto.parseMultikey).toBe("function");
    expect(typeof crypto.formatMultikey).toBe("function");
  });

  // ------------------------------------------------------------
  // Plugin registry
  // ------------------------------------------------------------
  it("exposes plugin registry", () => {
    expect(Array.isArray(crypto.plugins)).toBe(true);
    expect(typeof crypto.getPluginByAlg).toBe("function");
    expect(typeof crypto.getPluginByPrefix).toBe("function");
  });

  // ------------------------------------------------------------
  // P-256 exports
  // ------------------------------------------------------------
  it("includes expected P-256 exports", () => {
    expect(typeof crypto.signP256Jws).toBe("function");
    expect(typeof crypto.verifyP256Jws).toBe("function");
    expect(typeof crypto.generateP256MultikeyKeypair).toBe("function");
    expect(typeof crypto.p256PublicKeyToJwk).toBe("function");
    expect(typeof crypto.p256PublicKeyToJwkJcs).toBe("function");
    expect(typeof crypto.p256Plugin).toBe("object");
  });

  // ------------------------------------------------------------
  // Ed25519 exports
  // ------------------------------------------------------------
  it("includes expected Ed25519 exports", () => {
    expect(typeof crypto.signEd25519Jws).toBe("function");
    expect(typeof crypto.verifyEd25519Jws).toBe("function");
    expect(typeof crypto.generateEd25519MultikeyKeypair).toBe("function");
    expect(typeof crypto.ed25519PublicKeyToJwk).toBe("function");
    expect(typeof crypto.ed25519PublicKeyToJwkJcs).toBe("function");
    expect(typeof crypto.ed25519Plugin).toBe("object");
  });

  // ------------------------------------------------------------
  // ML-DSA-87 exports
  // ------------------------------------------------------------
  it("includes expected ML-DSA-87 exports", () => {
    expect(typeof crypto.signMlDsa87Jws).toBe("function");
    expect(typeof crypto.verifyMlDsa87Jws).toBe("function");
    expect(typeof crypto.generateMlDsa87MultikeyKeypair).toBe("function");
    expect(typeof crypto.mldsa87PublicKeyToJwk).toBe("function");
    expect(typeof crypto.mldsa87PublicKeyToJwkJcs).toBe("function");
    expect(typeof crypto.mldsa87Plugin).toBe("object");
  });

  // ------------------------------------------------------------
  // secp256k1 (ES256K) exports
  // ------------------------------------------------------------
  it("includes expected secp256k1 exports", () => {
    expect(typeof crypto.signSecp256k1Jws).toBe("function");
    expect(typeof crypto.verifySecp256k1Jws).toBe("function");
    expect(typeof crypto.generateSecp256k1MultikeyKeypair).toBe("function");
    expect(typeof crypto.secp256k1PublicKeyToJwk).toBe("function");
    expect(typeof crypto.secp256k1PublicKeyToJwkJcs).toBe("function");
    expect(typeof crypto.secp256k1Plugin).toBe("object");
  });

  // ------------------------------------------------------------
  // X25519 (ECDH) exports
  // ------------------------------------------------------------
  it("includes expected X25519 exports", () => {
    expect(typeof crypto.generateX25519MultikeyKeypair).toBe("function");
    expect(typeof crypto.x25519PublicKeyToJwk).toBe("function");
    expect(typeof crypto.x25519PublicKeyToJwkJcs).toBe("function");
    expect(typeof crypto.verifyX25519Vm).toBe("function");
    expect(typeof crypto.x25519Plugin).toBe("object");
  });

  // ------------------------------------------------------------
  // ML-KEM-1024 (PQC KEM) exports
  // ------------------------------------------------------------
  it("includes expected ML-KEM-1024 exports", () => {
    expect(typeof crypto.generateMlKem1024MultikeyKeypair).toBe("function");
    expect(typeof crypto.mlKem1024PublicKeyToJwk).toBe("function");
    expect(typeof crypto.mlKem1024PublicKeyToJwkJcs).toBe("function");
    expect(typeof crypto.verifyMlKem1024Vm).toBe("function");
    expect(typeof crypto.mlkem1024Plugin).toBe("object");
  });
});