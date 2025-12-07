/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import { loadVector, b64uToBytes } from "./helper.js";

import {
  decompressP256,
  assertEd25519PublicKey,
  assertSecp256k1PublicKey,
  assertX25519PublicKey,
  assertMlDsa87PublicKey,
  assertMlKem1024PublicKey,
} from "@meproto/crypto-primitives";

import {
  parseMultikey,
} from "@meproto/crypto";

import {
  bytesToBase64Url,
} from "@meproto/codec";

// ---- P-256 ----

describe("P-256 vector invariants", () => {
  const v = loadVector("p256.json");

  it("has correct lengths and formats", () => {
    const sk = b64uToBytes(v.secretKey);
    const pkC = b64uToBytes(v.publicKeyCompressed);
    const pkU = b64uToBytes(v.publicKeyUncompressed);

    expect(sk.length).toBe(32);
    expect(pkC.length).toBe(33);
    expect(pkC[0] === 0x02 || pkC[0] === 0x03).toBe(true);
    expect(pkU.length).toBe(65);
    expect(pkU[0]).toBe(0x04);

    const recomputedU = decompressP256(pkC);
    expect(recomputedU).toEqual(pkU);
  });

  it("multikey and plugin parsing are consistent", () => {
    const mk = v.multikey as string;
    const pkC = b64uToBytes(v.publicKeyCompressed);

    const parsed = parseMultikey(mk);
    expect(parsed.alg).toBe("ES256");
    expect(parsed.curve).toBe("P-256");

    const recompressed = parsed.plugin.compressPublicKey(parsed.publicKey);
    expect(recompressed).toEqual(pkC);
  });
});

// ---- Ed25519 ----

describe("Ed25519 vector invariants", () => {
  const v = loadVector("ed25519.json");

  it("has correct lengths and formats", () => {
    const sk = b64uToBytes(v.secretKey);
    const pk = assertEd25519PublicKey(b64uToBytes(v.publicKey));
    expect(sk.length).toBe(32);
    expect(pk.length).toBe(32);
  });

  it("multikey and plugin parsing are consistent", () => {
    const mk = v.multikey as string;
    const pk = b64uToBytes(v.publicKey);
    const parsed = parseMultikey(mk);
    expect(parsed.alg).toBe("EdDSA");
    expect(parsed.curve).toBe("Ed25519");
    expect(parsed.publicKey).toEqual(pk);
  });
});

// ---- secp256k1 ----

describe("secp256k1 vector invariants", () => {
  const v = loadVector("secp256k1.json");

  it("has correct lengths and formats", () => {
    const sk = b64uToBytes(v.secretKey);
    const pk = assertSecp256k1PublicKey(b64uToBytes(v.publicKeyCompressed));
    expect(sk.length).toBe(32);
    expect(pk.length).toBe(33);
    expect(pk[0] === 0x02 || pk[0] === 0x03).toBe(true);
  });

  it("multikey and plugin parsing are consistent", () => {
    const mk = v.multikey as string;
    const pk = b64uToBytes(v.publicKeyCompressed);
    const parsed = parseMultikey(mk);
    expect(parsed.alg).toBe("ES256K");
    expect(parsed.curve).toBe("secp256k1");
    expect(parsed.plugin.compressPublicKey(parsed.publicKey)).toEqual(pk);
  });
});

// ---- X25519 ----

describe("X25519 vector invariants", () => {
  const v = loadVector("x25519.json");
  it("has correct lengths and formats", () => {
    const sk = b64uToBytes(v.secretKey);
    const pk = assertX25519PublicKey(b64uToBytes(v.publicKey));
    expect(sk.length).toBe(32);
    expect(pk.length).toBe(32);
  });

  it("multikey and plugin parsing are consistent", () => {
    const mk = v.multikey as string;
    const pk = b64uToBytes(v.publicKey);
    const parsed = parseMultikey(mk);
    expect(parsed.alg).toBe("X25519");
    expect(parsed.curve).toBe("X25519");
    expect(parsed.publicKey).toEqual(pk);
  });
});

// ---- ML-DSA-87 ----

describe("ML-DSA-87 vector invariants", () => {
  const v = loadVector("mldsa87.json");

  it("has correct key lengths", () => {
    const sk = b64uToBytes(v.secretKey);
    const pk = assertMlDsa87PublicKey(b64uToBytes(v.publicKey));
    expect(pk.length).toBe(v.publicKeyLength);
    expect(pk.length).toBe(2592);
    expect(sk.length).toBeGreaterThan(0);
  });

  it("multikey and plugin parsing are consistent", () => {
    const mk = v.multikey as string;
    const pk = b64uToBytes(v.publicKey);
    const parsed = parseMultikey(mk);
    expect(parsed.alg).toBe("ML-DSA-87");
    expect(parsed.curve).toBe("ML-DSA-87");
    expect(parsed.publicKey).toEqual(pk);
  });
});

// ---- ML-KEM-1024 ----

describe("ML-KEM-1024 vector invariants", () => {
  const v = loadVector("mlkem1024.json");

  it("has correct key lengths", () => {
    const sk = b64uToBytes(v.secretKey);
    const pk = assertMlKem1024PublicKey(b64uToBytes(v.publicKey));
    expect(pk.length).toBe(v.publicKeyLength);
    expect(pk.length).toBe(1568);
    expect(sk.length).toBeGreaterThan(0);
  });

  it("multikey and plugin parsing are consistent", () => {
    const mk = v.multikey as string;
    const pk = b64uToBytes(v.publicKey);
    const parsed = parseMultikey(mk);
    expect(parsed.alg).toBe("ML-KEM-1024");
    expect(parsed.curve).toBe("ML-KEM-1024");
    expect(parsed.publicKey).toEqual(pk);
  });
});