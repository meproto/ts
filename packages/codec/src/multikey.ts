/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Multikey utilities for ME Protocol:
 *   - parse multibase-encoded public keys
 *   - detect multicodec prefix
 *   - strip codec prefix
 *   - validate verificationMethod (VM) entries
 *   - encode new multikey strings (codec prefix + multibase58btc)
 */

import { multibaseToBytes, bytesToMultibase58btc } from "./multibase.js";
import {
  lookupCodecPrefix,
  MULTICODEC_TABLE,
  type CodecLookupResult,
} from "./multicodec.js";

//
// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
//

export interface ParsedMultikey {
  /** “Ed25519”, “ES256”, “ML-DSA-87”, etc */
  algorithm: string;

  /** codec name: “ed25519-pub”, “p256-pub”, “mldsa-87-pub”, etc */
  codecName: string;

  /** raw public key bytes after removing codec prefix */
  publicKey: Uint8Array;

  /** multicodec prefix bytes */
  codecPrefix: number[];

  /** expected length of the raw key bytes */
  expectedLength: number;
}

export interface VerificationMethodInput {
  type: string;
  algorithm?: string;
}

//
// ------------------------------------------------------------
// Internal error helper
// ------------------------------------------------------------
//

function fail(msg: string): never {
  throw new Error(`multikey: ${msg}`);
}

//
// ------------------------------------------------------------
// VM.type ↔ codecName compatibility
// ------------------------------------------------------------
//

export function vmTypeMatchesCodec(vmType: string, codecName: string): boolean {
  switch (vmType) {
    case "Multikey":
      return (
        codecName === "ed25519-pub" ||
        codecName === "x25519-pub" ||
        codecName === "secp256k1-pub"
      );

    case "P256Key2024":
      return codecName === "p256-pub";

    case "MLDSA87Key2024":
      return codecName === "mldsa-87-pub";

    case "MLKEM1024Key2024":
      return codecName === "mlkem-1024-pub";

    default:
      return false;
  }
}

//
// ------------------------------------------------------------
// Decode multikey → raw bytes, codec info, algorithm
// ------------------------------------------------------------
//

export function parseMultikey(multibaseKey: string): ParsedMultikey {
  if (typeof multibaseKey !== "string" || multibaseKey.length < 2) {
    fail(`invalid multibase key: "${multibaseKey}"`);
  }

  // 1. Multibase decode
  let raw: Uint8Array;
  try {
    raw = multibaseToBytes(multibaseKey);
  } catch (e: any) {
    fail(`multibase decode failed: ${e.message || e}`);
  }

  if (raw.length < 2) {
    fail(`decoded key too short: length=${raw.length}`);
  }

  // 2. Multicodec prefix detection
  const info: CodecLookupResult | null = lookupCodecPrefix(raw);
  if (!info) {
    const prefixHex = Array.from(raw.slice(0, 2))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ");
    fail(`unknown multicodec prefix: [${prefixHex}]`);
  }

  const { name: codecName, alg: algorithm, codec, keyLength } = info;
  const publicKey = raw.slice(codec.length);

  // 3. Key length validation
  if (publicKey.length !== keyLength) {
    fail(
      `keyLength mismatch for ${codecName}: expected ${keyLength}, got ${publicKey.length}`
    );
  }

  return {
    algorithm,
    codecName,
    codecPrefix: codec,
    publicKey,
    expectedLength: keyLength,
  };
}

//
// ------------------------------------------------------------
// Validate JSON verificationMethod entry
// ------------------------------------------------------------
//

export function validateVMWithMultikey(
  vm: VerificationMethodInput,
  parsed: ParsedMultikey
): void {
  if (!vmTypeMatchesCodec(vm.type, parsed.codecName)) {
    fail(
      `VM.type "${vm.type}" does not match codec "${parsed.codecName}" (alg=${parsed.algorithm})`
    );
  }

  if (vm.algorithm !== undefined) {
    if (vm.algorithm !== parsed.algorithm) {
      fail(
        `algorithm mismatch: VM.algorithm="${vm.algorithm}" but codec implies "${parsed.algorithm}"`
      );
    }
  } else {
    if (vm.type !== "Multikey") {
      fail(
        `VM.algorithm missing but VM.type="${vm.type}" requires an explicit algorithm`
      );
    }
  }
}

//
// ------------------------------------------------------------
// Encode raw public key → multicodec + multibase58btc multikey
// ------------------------------------------------------------
//

/**
 * Encode a raw public key as a multikey string.
 *
 * Example:
 *   encodeMultikey("p256-pub", Uint8Array(33 bytes))
 *   → "z" + multicodec([0x80,0x24]) + compressedPubKey
 */
export function encodeMultikey(
  codecName: keyof typeof MULTICODEC_TABLE,
  publicKey: Uint8Array,
): string {
  const mc = MULTICODEC_TABLE[codecName];
  if (!mc) {
    throw new Error(`encodeMultikey: unknown codec "${codecName}"`);
  }

  const prefixed = new Uint8Array([...mc.codec, ...publicKey]);
  return bytesToMultibase58btc(prefixed);
}