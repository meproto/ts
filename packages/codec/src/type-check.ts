/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * Basic type-check helpers used across validators.
 */

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function isNumber(x: unknown): x is number {
  return typeof x === "number" && !isNaN(x);
}

export function isBoolean(x: unknown): x is boolean {
  return typeof x === "boolean";
}

export function isArray(x: unknown): x is unknown[] {
  return Array.isArray(x);
}

export function isObject(x: unknown): x is Record<string, unknown> {
  return x !== null && typeof x === "object" && !Array.isArray(x);
}
