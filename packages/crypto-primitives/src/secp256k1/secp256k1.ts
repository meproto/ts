/**
 * @license Apache-2.0
 * Copyright © 2025 by ReallyMe LLC
 * 
 * secp256k1 crypto for did:me:
 *  - Key generation
 *  - Multikey encoding
 *  - Compact signature (64-byte r||s)
 *  - Verification
 */

import { secp256k1 } from "@noble/curves/secp256k1.js";
import { randomBytes } from "@noble/hashes/utils.js";
import { sha256 } from "@noble/hashes/sha2.js";

import { bytesToMultibase58btc } from "../codec/multibase.js";
import { parseMultikey, validateVMWithMultikey } from "../codec/multikey.js";
import { MULTICODEC_TABLE } from "../codec/multicodec.js";
import { base64UrlToBytes, bytesToBase64Url } from "../utils/base64url.js";


const SECP256K1 = MULTICODEC_TABLE["secp256k1-pub"];

/**
 * Generate secp256k1 keypair (compressed SEC1 public key)
 */
export function generateSecp256k1Keypair() {
  const secretKey = randomBytes(32); // valid 32-byte private key
  const publicKey = secp256k1.getPublicKey(secretKey, true); // compressed (33 bytes)

  return {
    secretKey,
    publicKey,
    publicKeyMultibase: bytesToMultibase58btc(
      new Uint8Array([...SECP256K1.codec, ...publicKey])
    ),
  };
}

/**
 * Sign using compact r||s format, base64url encoded.
 */
export function signSecp256k1(
  secretKey: Uint8Array,
  msg: Uint8Array
): string {
  const digest = sha256(msg);

  // noble v2.x returns a raw 64-byte compact R||S signature
  const signature = secp256k1.sign(digest, secretKey);

  return bytesToBase64Url(signature);
}

/**
 * Verify a compact base64url r||s signature
 */
export function verifySecp256k1(
  vm: any,
  sigB64: string,
  msg: Uint8Array
): boolean {
  const signature = base64UrlToBytes(sigB64);

  const parsed = parseMultikey(vm.publicKeyMultibase);
  validateVMWithMultikey(vm, parsed);

  if (parsed.algorithm !== "secp256k1") {
    throw new Error(`verifySecp256k1: expected secp256k1 algorithm`);
  }

  const digest = sha256(msg);

  try {
    return secp256k1.verify(signature, digest, parsed.publicKey);
  } catch {
    return false;
  }
}

/**
 * Structural check only — does NOT verify signatures.
 */
export function verifySecp256k1VMStructure(vm: any): boolean {
  if (!vm || typeof vm.publicKeyMultibase !== "string") {
    throw new Error("VM missing publicKeyMultibase");
  }

  const parsed = parseMultikey(vm.publicKeyMultibase);
  validateVMWithMultikey(vm, parsed);

  if (parsed.algorithm !== "secp256k1") {
    throw new Error(
      `Expected secp256k1, got ${parsed.algorithm}`
    );
  }

  if (parsed.publicKey.length !== 33) {
    throw new Error(
      `Invalid secp256k1 compressed key length ${parsed.publicKey.length} (expected 33)`
    );
  }

  return true;
}