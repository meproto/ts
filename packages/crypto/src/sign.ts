/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { getPluginByAlg } from "./plugins.js";
import { bytesToBase64Url } from "@meproto/codec";

const encoder = new TextEncoder();

export function signJws(alg: string, secretKey: Uint8Array, payloadText: string): string {
  const plugin = getPluginByAlg(alg);
  if (!plugin || !plugin.sign) {
    throw new Error(`Algorithm ${alg} does not support signing`);
  }

  const header = JSON.stringify({ alg });
  const headerB64 = bytesToBase64Url(encoder.encode(header));

  const payloadB64 = bytesToBase64Url(encoder.encode(payloadText));
  const signingInput = encoder.encode(`${headerB64}.${payloadB64}`);

  const signature = plugin.sign(signingInput, secretKey);
  const sigB64 = bytesToBase64Url(signature);

  return `${headerB64}.${payloadB64}.${sigB64}`;
}