/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { base64UrlToBytes } from "@meproto/codec";

export function loadVector(name: string): any {
  const path = join(process.cwd(), "vectors", name);
  const raw = readFileSync(path, "utf8");
  return JSON.parse(raw);
}

export function b64uToBytes(s: string): Uint8Array {
  return base64UrlToBytes(s);
}