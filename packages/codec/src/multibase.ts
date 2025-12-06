/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// Base58btc Encode / Decode — RFC & multiformats compliant
// ------------------------------------------------------------

const BASE58_ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

const BASE58_MAP: Record<string, number> = Object.create(null);
for (let i = 0; i < BASE58_ALPHABET.length; i++) {
  BASE58_MAP[BASE58_ALPHABET[i]] = i;
}

export function base58btcEncode(bytes: Uint8Array): string {
  if (bytes.length === 0) return "";

  // Count leading zeros
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++;

  // Convert to base58
  const arr: number[] = [];
  for (let i = 0; i < bytes.length; i++) {
    let carry = bytes[i];
    for (let j = 0; j < arr.length; j++) {
      carry += arr[j] << 8;
      arr[j] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      arr.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }

  // Leading zeros → "1"
  let out = "1".repeat(zeros);

  // Convert indices → chars
  for (let i = arr.length - 1; i >= 0; i--) {
    out += BASE58_ALPHABET[arr[i]];
  }

  return out;
}

export function base58btcDecode(str: string): Uint8Array {
  if (str.length === 0) return new Uint8Array();

  // Count leading "1" → zeros
  let zeros = 0;
  while (zeros < str.length && str[zeros] === "1") zeros++;

  const arr: number[] = [];
  for (let i = zeros; i < str.length; i++) {
    const val = BASE58_MAP[str[i]];
    if (val === undefined)
      throw new Error(`Invalid base58btc char "${str[i]}"`);

    let carry = val;
    for (let j = 0; j < arr.length; j++) {
      carry += arr[j] * 58;
      arr[j] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      arr.push(carry & 0xff);
      carry >>= 8;
    }
  }

  const out = new Uint8Array(zeros + arr.length);
  out.set(arr.reverse(), zeros);

  return out;
}

// ------------------------------------------------------------
// Base64url (no padding) Encode / Decode
// ------------------------------------------------------------
export function base64urlEncode(bytes: Uint8Array): string {
  // Convert to binary string first
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("");

  // Node-compatible base64 encoding
  let s = typeof btoa === "function"
    ? btoa(bin)
    : Buffer.from(bin, "binary").toString("base64");

  // Convert to base64url
  return s.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64urlDecode(str: string): Uint8Array {
  // Fix padding
  const padded = str + "===".slice((str.length + 3) % 4);
  const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");

  // Browser vs Node decoding safely
  const bin = typeof atob === "function"
    ? atob(b64)
    : Buffer.from(b64, "base64").toString("binary");

  return new Uint8Array([...bin].map((c) => c.charCodeAt(0)));
}

// ------------------------------------------------------------
// Multibase dispatcher
// ------------------------------------------------------------

/**
 * Decode a multibase string to raw bytes.
 * Accepts only:
 *   - base58btc: "z..."
 *   - base64url: "u..."
 */
export function multibaseToBytes(mb: string): Uint8Array {
  if (!mb || mb.length < 2) {
    throw new Error("Invalid multibase string: too short");
  }

  const prefix = mb[0]!;
  const data = mb.slice(1);

  switch (prefix) {
    case "z":
      return base58btcDecode(data);
    case "u":
      return base64urlDecode(data);
    default:
      throw new Error(`Unsupported multibase prefix '${prefix}'`);
  }
}

/**
 * Encode bytes using multibase (base58btc).
 */
export function bytesToMultibase58btc(bytes: Uint8Array): string {
  return "z" + base58btcEncode(bytes);
}

/**
 * Encode bytes using multibase (base64url).
 */
export function bytesToMultibaseBase64url(bytes: Uint8Array): string {
  return "u" + base64urlEncode(bytes);
}