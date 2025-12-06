/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Canonical DAG-CBOR codec
 *
 * - Deterministic ordering of map keys (UTF-8 sorted)
 * - No floats
 * - Only major types 0–5 and selected simple values in major type 7:
 *       false (0xf4), true (0xf5), null (0xf6)
 */

export type CborValue =
  | null
  | boolean
  | number
  | string
  | Uint8Array
  | CborValue[]
  | { [key: string]: CborValue };

const MT_UINT   = 0;
const MT_NEGINT = 1;
const MT_BYTES  = 2;
const MT_STRING = 3;
const MT_ARRAY  = 4;
const MT_MAP    = 5;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Float disallowed in DAG-CBOR
function isFloat(n: number): boolean {
  return Number.isFinite(n) && !Number.isInteger(n);
}

//
// ------------------------------------------------------------
// ENCODER
// ------------------------------------------------------------
//

export function encodeCanonical(value: CborValue): Uint8Array {
  const out: number[] = [];
  encodeValue(value, out);
  return new Uint8Array(out);
}

function encodeValue(v: CborValue, out: number[]): void {
  if (v === null) {
    out.push(0xf6);
    return;
  }

  switch (typeof v) {
    case "boolean":
      out.push(v ? 0xf5 : 0xf4);
      return;

    case "number":
      if (isFloat(v)) {
        throw new Error("CBOR: floats not allowed in canonical DAG-CBOR");
      }
      if (v >= 0) {
        writeHeader(MT_UINT, v, out);
      } else {
        writeHeader(MT_NEGINT, -1 - v, out);
      }
      return;

    case "string": {
      const utf8 = encoder.encode(v);
      writeHeader(MT_STRING, utf8.length, out);
      utf8.forEach((b) => out.push(b));
      return;
    }

    case "object": {
      if (v instanceof Uint8Array) {
        writeHeader(MT_BYTES, v.length, out);
        v.forEach((b) => out.push(b));
        return;
      }

      if (Array.isArray(v)) {
        writeHeader(MT_ARRAY, v.length, out);
        for (const item of v) encodeValue(item, out);
        return;
      }

      // Validate map keys
      for (const [rawKey] of Object.entries(v)) {
        if (typeof rawKey !== "string") {
          throw new Error("unsupported type: non-string map key");
        }
        if (/^-?\d+$/.test(rawKey)) {
          throw new Error("unsupported type: non-string map key");
        }
      }

      // Sort keys lexicographically by UTF-8 bytes
      const keys = Object.keys(v).sort((a, b) => {
        const ua = encoder.encode(a);
        const ub = encoder.encode(b);
        return compareUint8Arrays(ua, ub);
      });

      writeHeader(MT_MAP, keys.length, out);

      for (const k of keys) {
        const keyBytes = encoder.encode(k);
        writeHeader(MT_STRING, keyBytes.length, out);
        keyBytes.forEach((b) => out.push(b));
        encodeValue((v as any)[k], out);
      }

      return;
    }

    default:
      throw new Error("CBOR: unsupported type");
  }
}

function writeHeader(major: number, value: number, out: number[]) {
  if (value < 24) {
    out.push((major << 5) | value);
  } else if (value < 0x100) {
    out.push((major << 5) | 24, value);
  } else if (value < 0x10000) {
    out.push((major << 5) | 25, value >> 8, value & 0xff);
  } else if (value < 0x100000000) {
    out.push((major << 5) | 26);
    out.push((value >>> 24) & 0xff);
    out.push((value >>> 16) & 0xff);
    out.push((value >>> 8) & 0xff);
    out.push(value & 0xff);
  } else {
    throw new Error("CBOR: value too large");
  }
}

function compareUint8Arrays(a: Uint8Array, b: Uint8Array): number {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return a.length - b.length;
}

//
// ------------------------------------------------------------
// DECODER
// ------------------------------------------------------------
//

export function decodeCanonical(bytes: Uint8Array): CborValue {
  const [value, offset] = decodeValue(bytes, 0);
  if (offset !== bytes.length) {
    throw new Error("CBOR: trailing bytes after top-level object");
  }
  return value;
}

function decodeValue(bytes: Uint8Array, offset: number): [CborValue, number] {
  if (offset >= bytes.length) {
    throw new Error("CBOR: unexpected end of input");
  }

  const first = bytes[offset++];
  const major = first >> 5;
  const ai = first & 0x1f;

  const [val, offAfterArg] = readArgument(bytes, offset, ai);
  offset = offAfterArg;

  switch (major) {
    case MT_UINT:
      return [val, offset];

    case MT_NEGINT:
      return [-1 - val, offset];

    case MT_BYTES:
      return extractBytes(bytes, offset, val);

    case MT_STRING:
      return extractString(bytes, offset, val);

    case MT_ARRAY:
      return extractArray(bytes, offset, val);

    case MT_MAP:
      return extractMap(bytes, offset, val);

    case 7:
      switch (val) {
        case 20: return [false, offset]; 
        case 21: return [true, offset]; 
        case 22: return [null, offset];
        default:
          throw new Error(`CBOR: simple value ${val} not allowed in DAG-CBOR`);
      }

    default:
      throw new Error(`CBOR: major type ${major} not allowed in DAG-CBOR`);
  }
}

function readArgument(
  bytes: Uint8Array,
  offset: number,
  ai: number
): [number, number] {
  if (ai < 24) return [ai, offset];

  if (ai === 24) {
    if (offset >= bytes.length) throw new Error("CBOR: truncated uint8");
    return [bytes[offset], offset + 1];
  }

  if (ai === 25) {
    if (offset + 2 > bytes.length) throw new Error("CBOR: truncated uint16");
    return [
      (bytes[offset] << 8) | bytes[offset + 1],
      offset + 2,
    ];
  }

  if (ai === 26) {
    if (offset + 4 > bytes.length) throw new Error("CBOR: truncated uint32");
    return [
      (bytes[offset] * 0x1000000 +
        (bytes[offset + 1] << 16) +
        (bytes[offset + 2] << 8) +
        bytes[offset + 3]) >>> 0,
      offset + 4,
    ];
  }

  throw new Error("CBOR: value too large for canonical DAG-CBOR");
}

function extractBytes(
  bytes: Uint8Array,
  offset: number,
  length: number
): [Uint8Array, number] {
  if (offset + length > bytes.length) {
    throw new Error("CBOR: truncated byte string");
  }
  return [bytes.slice(offset, offset + length), offset + length];
}

function extractString(
  bytes: Uint8Array, 
  offset: number, 
  length: number
): [string, number] {
  const [u8, off] = extractBytes(bytes, offset, length);
  return [decoder.decode(u8), off];
}

function extractArray(
  bytes: Uint8Array,
  offset: number,
  length: number
): [CborValue[], number] {
  const out: CborValue[] = [];
  for (let i = 0; i < length; i++) {
    const [val, off] = decodeValue(bytes, offset);
    out.push(val);
    offset = off;
  }
  return [out, offset];
}

function extractMap(
  bytes: Uint8Array,
  offset: number,
  length: number
): [Record<string, CborValue>, number] {
  const out: Record<string, CborValue> = {};
  let lastKeyBytes: Uint8Array | null = null;

  for (let i = 0; i < length; i++) {
    const [key, offKey] = decodeValue(bytes, offset);
    offset = offKey;

    if (typeof key !== "string") {
      throw new Error("CBOR: map key must be text string");
    }

    const keyBytes = encoder.encode(key);
    if (lastKeyBytes && compareUint8Arrays(lastKeyBytes, keyBytes) >= 0) {
      throw new Error("CBOR: map keys out of canonical order");
    }
    lastKeyBytes = keyBytes;


    const [val, offVal] = decodeValue(bytes, offset);
    offset = offVal;
    out[key] = val;
  }

  return [out, offset];
}