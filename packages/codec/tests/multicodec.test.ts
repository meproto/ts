/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import {
  MULTICODEC_TABLE,
  lookupCodecPrefix,
  stripCodecPrefix,
} from "../src/multicodec.js";

describe("multicodec", () => {
  it("detects multicodec prefix", () => {
    const { codec } = MULTICODEC_TABLE["ed25519-pub"];
    const test = new Uint8Array([...codec, ...new Array(32).fill(7)]);
    const info = lookupCodecPrefix(test);
    expect(info?.name).toBe("ed25519-pub");
  });

  it("returns null if prefix not found", () => {
    expect(lookupCodecPrefix(new Uint8Array([0, 1, 2]))).toBeNull();
  });

  it("strips codec prefix", () => {
    const prefix = MULTICODEC_TABLE["x25519-pub"].codec;
    const rest = new Uint8Array([9, 9, 9]);
    const val = new Uint8Array([...prefix, ...rest]);
    expect(stripCodecPrefix(val)).toEqual(rest);
  });
  
});