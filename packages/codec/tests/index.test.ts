/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

/**
 * @license Apache-2.0
 * Copyright © 2025
 * ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import * as codec from "../src/index.js";

describe("public API surface", () => {
  it("exports expected functions", () => {
    // base64
    expect(typeof codec.bytesToBase64).toBe("function");
    expect(typeof codec.base64ToBytes).toBe("function");

    // base64url
    expect(typeof codec.bytesToBase64Url).toBe("function");
    expect(typeof codec.base64UrlToBytes).toBe("function");

    // base58 & multibase
    expect(typeof codec.base58btcEncode).toBe("function");
    expect(typeof codec.base58btcDecode).toBe("function");
    expect(typeof codec.multibaseToBytes).toBe("function");
    expect(typeof codec.bytesToMultibase58btc).toBe("function");
    expect(typeof codec.bytesToMultibaseBase64url).toBe("function");

    // multicodec
    expect(typeof codec.lookupCodecPrefix).toBe("function");
    expect(typeof codec.stripCodecPrefix).toBe("function");
    expect(typeof codec.MULTICODEC_TABLE).toBe("object");

    // multikey
    expect(typeof codec.parseMultikey).toBe("function");
    expect(typeof codec.validateVMWithMultikey).toBe("function");
    expect(typeof codec.vmTypeMatchesCodec).toBe("function");

    // JCS
    expect(typeof codec.canonicalizeJSON).toBe("function");

    // validators
    expect(typeof codec.isString).toBe("function");
    expect(typeof codec.isNumber).toBe("function");
    expect(typeof codec.isBoolean).toBe("function");
    expect(typeof codec.isArray).toBe("function");
    expect(typeof codec.isObject).toBe("function");

    // errors
    expect(typeof codec.err).toBe("function");
    expect(typeof codec.errField).toBe("function");
    expect(typeof codec.errExpected).toBe("function");
    expect(typeof codec.errMissing).toBe("function");
    expect(typeof codec.errInvalid).toBe("function");
    expect(typeof codec.errType).toBe("function");
    expect(typeof codec.errEnum).toBe("function");
  });
});