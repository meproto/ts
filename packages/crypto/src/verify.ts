/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { getPluginByAlg } from "./plugins.js";
import { base64UrlToBytes } from "@meproto/codec";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function verifyJws(jws: string, publicKey: Uint8Array): boolean {
  const [hB64, pB64, sB64] = jws.split(".");
  if (!hB64 || !pB64 || !sB64) return false;

  try {
    const header = JSON.parse(decoder.decode(base64UrlToBytes(hB64)));
    const plugin = getPluginByAlg(header.alg);
    if (!plugin || !plugin.verify) return false;

    const signingInput = encoder.encode(`${hB64}.${pB64}`);
    const signature = base64UrlToBytes(sB64);

    return plugin.verify(signature, signingInput, publicKey);
  } catch {
    return false;
  }
}