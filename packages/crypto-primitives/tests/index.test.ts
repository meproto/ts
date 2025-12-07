/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import * as utils from "../src/utils/index.js";
import * as p256 from "../src/p256/index.js";
import * as ed25519 from "../src/ed25519/index.js";
import * as mldsa from "../src/ml-dsa-87/index.js";
import * as secp256k1 from "../src/secp256k1/index.js";
import * as x25519 from "../src/x25519/index.js";
import * as mlkem1024 from "../src/ml-kem-1024/index.js";

describe("public API surface", () => {
  it("includes expected utils exports", () => {
    expect(typeof utils.randomBytes).toBe("function");
    expect(typeof utils.concatBytes).toBe("function");
    expect(typeof utils.equalBytes).toBe("function");
    expect(typeof utils.hexToBytes).toBe("function");
    expect(typeof utils.bytesToHex).toBe("function");
    expect(typeof utils.asArrayBuffer).toBe("function");
  });

  it("includes expected p256 exports", () => {
    expect(typeof p256.signP256DerPrehash).toBe("function");
    expect(typeof p256.verifyP256DerPrehash).toBe("function");
    expect(typeof p256.generateP256Keypair).toBe("function");
    expect(typeof p256.compress).toBe("function");
    expect(typeof p256.decompressP256).toBe("function");
  });

  it("includes expected ed25519 exports", () => {
    expect(typeof ed25519.generateEd25519Keypair).toBe("function");
    expect(typeof ed25519.signEd25519).toBe("function");
    expect(typeof ed25519.verifyEd25519).toBe("function");
    expect(typeof ed25519.assertEd25519PublicKey).toBe("function");
    expect(typeof ed25519.encodeEd25519PublicKey).toBe("function");
    expect(typeof ed25519.decodeEd25519PublicKey).toBe("function");
  });

  it("includes expected ML-DSA-87 exports", () => {
    expect(typeof mldsa.generateMlDsa87Keypair).toBe("function");
    expect(typeof mldsa.signMlDsa87).toBe("function");
    expect(typeof mldsa.verifyMlDsa87).toBe("function");
    expect(typeof mldsa.assertMlDsa87PublicKey).toBe("function");
    expect(typeof mldsa.encodeMlDsa87PublicKey).toBe("function");
    expect(typeof mldsa.decodeMlDsa87PublicKey).toBe("function");
  });

  it("includes expected secp256k1 exports", () => {
    expect(typeof secp256k1.generateSecp256k1Keypair).toBe("function");
    expect(typeof secp256k1.signSecp256k1).toBe("function");
    expect(typeof secp256k1.verifySecp256k1).toBe("function");
    expect(typeof secp256k1.assertSecp256k1PublicKey).toBe("function");
    expect(typeof secp256k1.encodeSecp256k1PublicKey).toBe("function");
    expect(typeof secp256k1.decodeSecp256k1PublicKey).toBe("function");
  });

  it("includes expected X25519 exports", () => {
    expect(typeof x25519.generateX25519Keypair).toBe("function");
    expect(typeof x25519.deriveX25519SharedSecret).toBe("function");
    expect(typeof x25519.assertX25519PublicKey).toBe("function");
    expect(typeof x25519.encodeX25519PublicKey).toBe("function");
    expect(typeof x25519.decodeX25519PublicKey).toBe("function");
  });

  it("includes expected ML-KEM-1024 exports", () => {
    expect(typeof mlkem1024.generateMlKem1024Keypair).toBe("function");
    expect(typeof mlkem1024.mlKem1024Encapsulate).toBe("function");
    expect(typeof mlkem1024.mlKem1024Decapsulate).toBe("function");
    expect(typeof mlkem1024.assertMlKem1024PublicKey).toBe("function");
    expect(typeof mlkem1024.encodeMlKem1024PublicKey).toBe("function");
    expect(typeof mlkem1024.decodeMlKem1024PublicKey).toBe("function");
  });
});