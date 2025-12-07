/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("randomBytes", () => {
  it("produces a Uint8Array of the requested length", () => {
    const out = randomBytes(32);
    expect(out).toBeInstanceOf(Uint8Array);
    expect(out.length).toBe(32);
  });

  it("produces different outputs across calls", () => {
    const a = randomBytes(32);
    const b = randomBytes(32);
    // Technically randomness *could* match, but astronomically unlikely. This is fine.
    expect(a).not.toEqual(b);
  });
});