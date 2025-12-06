/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * did:me multikey utilities:
 *   - parse multibase-encoded public keys
 *   - detect multicodec prefix
 *   - strip codec prefix
 *   - validate verificationMethod (VM) entries
 */

import { multibaseToBytes } from "./multibase.js";
import {
  lookupCodecPrefix,
  type CodecLookupResult,
} from "./multicodec.js";

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

function fail(msg: string): never {
  throw new Error(`multikey: ${msg}`);
}

/**
 * Map DID verificationMethod.type → allowed multicodec codecName.
 * Extend this table when adding new algorithms.
 */
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

/**
 * Parse a multibase-encoded public key of the form:
 *    z<base58btc...> or u<base64url...>
 * Then detect multicodec prefix, strip, validate, and return metadata.
 */
export function parseMultikey(multibaseKey: string): ParsedMultikey {
  if (typeof multibaseKey !== "string" || multibaseKey.length < 2) {
    fail(`invalid multibase key: "${multibaseKey}"`);
  }
  //
  // 1. Multibase decode
  //
  let raw: Uint8Array;
  try {
    raw = multibaseToBytes(multibaseKey);
  } catch (e: any) {
    fail(`multibase decode failed: ${e.message || e}`);
  }

  if (raw.length < 2) {
    fail(`decoded key too short: length=${raw.length}`);
  }

  //
  // 2. Multicodec prefix detection
  //
  const info: CodecLookupResult | null = lookupCodecPrefix(raw);
  if (!info) {
    const prefixHex = Array.from(raw.slice(0, 2))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ");
    fail(`unknown multicodec prefix: [${prefixHex}]`);
  }

  const { name: codecName, alg: algorithm, codec, keyLength } = info;
  const publicKey = raw.slice(codec.length);

  //
  // 3. Key length validation
  //
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

export interface VerificationMethodInput {
  type: string;
  algorithm?: string;
}

//
// Validate a JSON verificationMethod entry against parsed multikey
//
export function validateVMWithMultikey(
  vm: VerificationMethodInput,
  parsed: ParsedMultikey
): void {
  //
  // 1. VM.type must be compatible with codec prefix
  //
  if (!vmTypeMatchesCodec(vm.type, parsed.codecName)) {
    fail(
      `VM.type "${vm.type}" does not match codec "${parsed.codecName}" (alg=${parsed.algorithm})`
    );
  }
  //
  // 2. VM.algorithm (if present) must match parsed algorithm exactly
  //
  if (vm.algorithm !== undefined) {
    if (vm.algorithm !== parsed.algorithm) {
      fail(
        `algorithm mismatch: VM.algorithm="${vm.algorithm}" but codec implies "${parsed.algorithm}"`
      );
    }
  } else {
    // Missing algorithm is only allowed for generic Multikey
    if (vm.type !== "Multikey") {
      fail(
        `VM.algorithm missing but VM.type="${vm.type}" requires an explicit algorithm`
      );
    }
  }
}