/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * JSON Canonicalization Scheme (JCS) utilities.
 * Matches RFC 8785 and the Go canonical JSON used in your prototype.
 */

export function canonicalizeJSON(value: any): string {
  return canonicalize(value);
}

function canonicalize(v: any): string {
  if (v === null) return "null";

  const t = typeof v;

  if (t === "number" || t === "boolean")
    return JSON.stringify(v);

  if (t === "string")
    return JSON.stringify(v);

  if (Array.isArray(v))
    return "[" + v.map(canonicalize).join(",") + "]";

  if (t === "object") {
    const keys = Object.keys(v).sort();
    return "{" +
      keys
        .map(k => JSON.stringify(k) + ":" + canonicalize(v[k]))
        .join(",") +
    "}";
  }

  throw new Error(`canonicalizeJSON: unsupported type '${typeof v}'`);
}