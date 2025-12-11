/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 *
 * secp256k1 encoding helpers.
 *
 * secp256k1 public keys are expected to be 33-byte compressed SEC1 format:
 *   0x02 || X (32 bytes)
 *   0x03 || X (32 bytes)
 *
 */

import { bytesToHex } from "../utils/bytes.js";
import { secp256k1 } from "@noble/curves/secp256k1.js";

/**
 * Validate that a value is a compressed 33-byte secp256k1 public key.
 * Returns the key unchanged if valid.
 */
export function assertSecp256k1PublicKey(pub: Uint8Array): Uint8Array {
  if (!(pub instanceof Uint8Array)) {
    throw new Error("assertSecp256k1PublicKey: expected Uint8Array");
  }
  if (pub.length !== 33) {
    throw new Error(
      `assertSecp256k1PublicKey: expected 33-byte compressed secp256k1 key, got length=${pub.length}`
    );
  }
  const prefix = pub[0];
  if (prefix !== 0x02 && prefix !== 0x03) {
    throw new Error(
      `assertSecp256k1PublicKey: invalid prefix 0x${prefix.toString(
        16
      )} (expected 0x02 or 0x03)`
    );
  }
  return pub;
}

/**
 * Identity encoder.
 */
export function encodeSecp256k1PublicKey(pub: Uint8Array): Uint8Array {
  return assertSecp256k1PublicKey(pub);
}

/**
 * Identity decoder.
 */
export function decodeSecp256k1PublicKey(pub: Uint8Array): Uint8Array {
  return assertSecp256k1PublicKey(pub);
}

/**
 * Decompress a 33-byte compressed secp256k1 public key.
 * Returns { x, y } as raw 32-byte coordinates.
 */
export function decompressSecp256k1PublicKey(pub: Uint8Array): {
  x: Uint8Array;
  y: Uint8Array;
} {
  const hex = bytesToHex(pub);                     
  const point = secp256k1.Point.fromHex(hex);     

  const uncompressed = point.toBytes(false);     

  return {
    x: uncompressed.slice(1, 33),
    y: uncompressed.slice(33, 65),
  };
}