/**
 * @license Apache-2.0
 * Copyright © 2025 by ReallyMe LLC
 * 
 * P-256 (secp256r1) SEC1 encoding helpers.
 *
 * Includes:
 *   - compress():  uncompressed → compressed
 *   - decompressP256(): compressed → uncompressed using Tonelli–Shanks
 */

import { p256 as P256 } from "@noble/curves/nist.js";
import { bytesToHex, hexToBytes } from "../utils/bytes.js";

// Curve params for secp256r1 (P-256)
const P256_P = BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff");
const P256_A = BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc");
const P256_B = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");

function modPow(a: bigint, e: bigint, m: bigint): bigint {
  let r = 1n;
  while (e > 0n) {
    if (e & 1n) r = (r * a) % m;
    a = (a * a) % m;
    e >>= 1n;
  }
  return r;
}

function tonelliShanks(n: bigint, p: bigint): bigint {
  if (p % 4n === 3n) {
    return modPow(n, (p + 1n) >> 2n, p);
  }

  let q = p - 1n;
  let s = 0n;
  while ((q & 1n) === 0n) {
    q >>= 1n;
    s++;
  }

  let z = 2n;
  while (modPow(z, (p - 1n) >> 1n, p) !== p - 1n) {
    z++;
  }

  let m = s;
  let c = modPow(z, q, p);
  let t = modPow(n, q, p);
  let r = modPow(n, (q + 1n) >> 1n, p);

  while (t !== 1n) {
    let i = 1n;
    let temp = (t * t) % p;
    while (temp !== 1n) {
      temp = (temp * temp) % p;
      i++;
    }

    const exponent = 1n << (m - i - 1n);
    const b = modPow(c, exponent, p);

    m = i;
    c = (b * b) % p;
    t = (t * c) % p;
    r = (r * b) % p;
  }

  return r;
}

/**
 * Compress an uncompressed SEC1 P-256 public key.
 * Input:  65-byte SEC1 key (0x04 || X(32) || Y(32))
 * Output: 33-byte compressed SEC1 key (0x02/0x03 || X(32))
 */
export function compress(pubkeyBytes: Uint8Array): Uint8Array {
  if (pubkeyBytes.length !== 65 || pubkeyBytes[0] !== 0x04) {
    throw new Error(
      `compress: expected 65-byte uncompressed SEC1 key starting with 0x04, got length=${pubkeyBytes.length} prefix=0x${pubkeyBytes[0]?.toString(
        16
      )}`
    );
  }

  const hex = bytesToHex(pubkeyBytes);
  const point = P256.Point.fromHex(hex);
  return point.toBytes(true); // compressed SEC1
}

/**
 * Decompress a 33-byte compressed P-256 public key.
 * Returns a 65-byte uncompressed SEC1 key.
 */
export function decompressP256(compressed: Uint8Array): Uint8Array {
  if (compressed.length !== 33) {
    throw new Error(`decompressP256: expected 33-byte key, got ${compressed.length}`);
  }

  const prefix = compressed[0];
  if (prefix !== 0x02 && prefix !== 0x03) {
    throw new Error(
      `decompressP256: invalid prefix 0x${prefix.toString(16)} (expected 0x02 or 0x03)`
    );
  }

  const hexX = bytesToHex(compressed.slice(1));
  const x = BigInt("0x" + hexX);

  const y2 = (modPow(x, 3n, P256_P) + P256_A * x + P256_B) % P256_P;
  let y = tonelliShanks(y2, P256_P);

  const isOdd = (y & 1n) === 1n;
  const prefixOdd = prefix === 0x03;

  if (isOdd !== prefixOdd) {
    y = P256_P - y;
  }

  const xb = x.toString(16).padStart(64, "0");
  const yb = y.toString(16).padStart(64, "0");

  const out = new Uint8Array(65);
  out[0] = 0x04;
  out.set(hexToBytes(xb), 1);
  out.set(hexToBytes(yb), 33);

  return out;
}