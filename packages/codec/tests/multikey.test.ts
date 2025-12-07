/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 * 
 */

import { describe, it, expect } from "vitest";

import {
  parseMultikey,
  validateVMWithMultikey,
  encodeMultikey,
} from "../src/multikey.js";

import { bytesToMultibase58btc } from "../src/multibase.js";

describe("multikey", () => {
  it("parses a valid multikey", () => {
    const pub = new Uint8Array(32).fill(1);
    const prefix = new Uint8Array([0xed, 0x01]); // ed25519 multicodec
    const full = new Uint8Array([...prefix, ...pub]);
    const encoded = bytesToMultibase58btc(full);

    const parsed = parseMultikey(encoded);

    expect(parsed.algorithm).toBe("Ed25519");
    expect(parsed.codecName).toBe("ed25519-pub");
    expect(parsed.publicKey).toEqual(pub);
  });

  it("fails on unknown codec prefix", () => {
    const encoded = bytesToMultibase58btc(new Uint8Array([0xaa, 0xbb, 0x10]));
    expect(() => parseMultikey(encoded)).toThrow();
  });

  it("validates verificationMethod compatibility", () => {
    const pub = new Uint8Array(32).fill(1);
    const prefix = new Uint8Array([0xed, 0x01]);
    const encoded = bytesToMultibase58btc(new Uint8Array([...prefix, ...pub]));
    const parsed = parseMultikey(encoded);

    const vm = { type: "Multikey", algorithm: "Ed25519" };

    expect(() => validateVMWithMultikey(vm, parsed)).not.toThrow();
  });

  it("rejects mismatched vm.type", () => {
    const pub = new Uint8Array(32).fill(1);
    const prefix = new Uint8Array([0xed, 0x01]);
    const encoded = bytesToMultibase58btc(new Uint8Array([...prefix, ...pub]));
    const parsed = parseMultikey(encoded);

    const vm = { type: "P256Key2024" };

    expect(() => validateVMWithMultikey(vm, parsed)).toThrow();
  });

  it("encodeMultikey produces a parseable multikey", () => {
    const pub = new Uint8Array(32).fill(1);

    // symmetry test: encode → parse
    const encoded = encodeMultikey("ed25519-pub", pub);
    const parsed = parseMultikey(encoded);

    expect(parsed.codecName).toBe("ed25519-pub");
    expect(parsed.publicKey).toEqual(pub);
  });
});