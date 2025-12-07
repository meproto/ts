/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

// ------------------------------------------------------------
// Base64 (RFC 4648, standard)
// ------------------------------------------------------------
export {
  bytesToBase64,
  base64ToBytes,
} from "./base64.js";

// ------------------------------------------------------------
// Base64URL (RFC 4648 §5, URL-safe, no padding)
// ------------------------------------------------------------
export {
  bytesToBase64Url,
  base64UrlToBytes,
} from "./base64url.js";

// ------------------------------------------------------------
// Base58btc + Multibase utilities
// ------------------------------------------------------------
export {
  base58btcEncode,
  base58btcDecode,
  base64urlEncode,
  base64urlDecode,
  multibaseToBytes,
  bytesToMultibase58btc,
  bytesToMultibaseBase64url,
} from "./multibase.js";

// ------------------------------------------------------------
// Multicodec prefixes for ME Protocol keys
// ------------------------------------------------------------
export {
  MULTICODEC_TABLE,
  lookupCodecPrefix,
  stripCodecPrefix,
} from "./multicodec.js";

// ------------------------------------------------------------
// Multikey parser + VM validation
// ------------------------------------------------------------
export {
  parseMultikey,
  validateVMWithMultikey,
  vmTypeMatchesCodec,
  encodeMultikey,
  type VerificationMethodInput,
  type ParsedMultikey,
} from "./multikey.js";

// ------------------------------------------------------------
// JSON Canonicalization Scheme (RFC 8785)
// ------------------------------------------------------------
export {
  canonicalizeJSON,
} from "./jcs.js";

// ------------------------------------------------------------
// Basic type-check helpers
// ------------------------------------------------------------
export {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
} from "./type-check.js";

// ------------------------------------------------------------
// Error formatting helpers
// ------------------------------------------------------------
export {
  err,
  errField,
  errExpected,
  errMissing,
  errInvalid,
  errType,
  errEnum,
} from "./errors.js";