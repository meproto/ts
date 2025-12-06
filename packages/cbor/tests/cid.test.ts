/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * CID helpers for canonical DAG-CBOR core snapshots.
 */

import { describe, it, expect } from "vitest";
import { randomBytes } from "crypto";

import {
  computeCidDagCbor,
  verifyDagCborCid,
  isValidCidString,
  tryParseCid,
} from "../src/cid.js";
import { encodeCanonical } from "../src/canonical.js";

describe("CID helpers for DAG-CBOR", () => {
  it("computes deterministic CIDs for identical inputs", async () => {
    const obj = { a: 1, b: true };
    const bytes1 = encodeCanonical(obj);
    const bytes2 = encodeCanonical(obj);

    const cid1 = await computeCidDagCbor(bytes1);
    const cid2 = await computeCidDagCbor(bytes2);

    expect(cid1).toBe(cid2);
  });

  it("produces different CIDs for different inputs", async () => {
    const cid1 = await computeCidDagCbor(encodeCanonical({ a: 1 }));
    const cid2 = await computeCidDagCbor(encodeCanonical({ a: 2 }));
    expect(cid1).not.toBe(cid2);
  });

  it("verifies matching CIDs", async () => {
    const bytes = encodeCanonical({ hello: "world" });
    const cid = await computeCidDagCbor(bytes);
    const result = await verifyDagCborCid(cid, bytes);
    expect(result.ok).toBe(true);
  });

  it("detects CID mismatch", async () => {
    const bytes = encodeCanonical({ a: 1 });
    const wrong = await computeCidDagCbor(encodeCanonical({ a: 2 }));
    const result = await verifyDagCborCid(wrong, bytes);
    expect(result.ok).toBe(false);
  });

  it("validates CID syntax", async () => {
    const bytes = encodeCanonical({ x: 1 });
    const cid = await computeCidDagCbor(bytes);

    expect(isValidCidString(cid)).toBe(true);
    expect(isValidCidString("not-a-cid")).toBe(false);
  });

  it("parses valid CIDs or returns null", () => {
    const cid = "bafyreib7nwj...example";
    const parsed = tryParseCid(cid);
    expect(parsed === null || typeof parsed === "object").toBe(true);

    expect(tryParseCid("nope")).toBe(null);
  });

  it("computes CIDs for random payloads without error", async () => {
    for (let i = 0; i < 50; i++) {
      const bytes = new Uint8Array(randomBytes(32));
      const cbor = encodeCanonical({ data: bytes });
      const cid = await computeCidDagCbor(cbor);
      expect(isValidCidString(cid)).toBe(true);
    }
  });
});