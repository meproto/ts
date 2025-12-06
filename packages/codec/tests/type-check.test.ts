/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
} from "../src/type-check.js";

describe("type-check", () => {
  it("works for primitives", () => {
    expect(isString("x")).toBe(true);
    expect(isNumber(5)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it("works for composite types", () => {
    expect(isArray([])).toBe(true);
    expect(isObject({})).toBe(true);
  });
});