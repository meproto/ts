/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 */

import { describe, it, expect } from "vitest";
import {
  err,
  errField,
  errExpected,
  errMissing,
  errInvalid,
  errType,
  errEnum,
} from "../src/errors.js";

describe("errors", () => {
  it("formats simple error messages", () => {
    expect(err("x")).toBe("x");
    expect(errField("a", "b")).toBe("a: b");
    expect(errMissing("id")).toBe("id: is required");
  });

  it("formats expected/actual messages", () => {
    expect(errExpected("a", "string", 5)).toBe("a: expected string, got 5");
  });

  it("formats enum messages", () => {
    expect(errEnum("color", ["red", "blue"], "green"))
      .toBe('color: must be one of ["red","blue"], got "green"');
  });
  it("formats invalid messages", () => {
    expect(errInvalid("email")).toBe("email: is invalid");
  });

  it("formats type error messages", () => {
    expect(errType("age", "number", "5"))
      .toBe('age: must be number, got "5"');
  });
});