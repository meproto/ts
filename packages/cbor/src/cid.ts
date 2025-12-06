/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * CID helpers for canonical DAG-CBOR core snapshots.
 */

import { CID } from "multiformats/cid";
import { sha256 } from "multiformats/hashes/sha2";
import * as dagCbor from "@ipld/dag-cbor";

/**
 * Compute CIDv1 (dag-cbor, sha2-256) for given canonical CBOR bytes.
 * Returns a lowercase base32 string.
 */
export async function computeCidDagCbor(bytes: Uint8Array): Promise<string> {
  const hash = await sha256.digest(bytes);
  const cid = CID.createV1(dagCbor.code, hash);
  return cid.toString().toLowerCase();
}

/**
 * Verify that a given CID string matches the CID of the CBOR bytes.
 */
export async function verifyDagCborCid(
  cidString: string,
  bytes: Uint8Array
): Promise<{ ok: boolean; expected: string; actual: string }> {
  const expected = await computeCidDagCbor(bytes);
  const actual = (cidString || "").toLowerCase();

  return {
    ok: expected === actual,
    expected,
    actual,
  };
}

/**
 * Check if a CID string is valid syntax.
 * Does NOT verify hash validity against bytes.
 */
export function isValidCidString(str: string): boolean {
  try {
    CID.parse(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Attempt to parse a CID. Returns CID instance or null.
 */
export function tryParseCid(str: string): CID | null {
  try {
    return CID.parse(str);
  } catch {
    return null;
  }
}