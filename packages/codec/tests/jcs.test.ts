/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { canonicalizeJSON } from "../src/jcs.js";

describe("JCS canonicalization", () => {
  it("canonicalizes primitives", () => {
    expect(canonicalizeJSON(5)).toBe("5");
    expect(canonicalizeJSON(true)).toBe("true");
    expect(canonicalizeJSON("hi")).toBe("\"hi\"");
  });

  it("canonicalizes arrays", () => {
    expect(canonicalizeJSON([3, 1, 2])).toBe("[3,1,2]");
  });

  it("sorts object keys", () => {
    expect(canonicalizeJSON({ b: 2, a: 1 }))
      .toBe("{\"a\":1,\"b\":2}");
  });

  it("fails on unsupported types", () => {
    expect(() => canonicalizeJSON(() => {})).toThrow();
  });
});