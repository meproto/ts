/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { multibaseToBytes, encodeMultikey } from "@meproto/codec";
import { getPluginByAlg, getPluginByPrefix } from "./plugins.js";

export function parseMultikey(multikey: string) {
  const bytes = multibaseToBytes(multikey);

  const plugin = getPluginByPrefix(bytes);
  if (!plugin) {
    throw new Error(`Unsupported multikey (unknown codec prefix)`);
  }

  const compressed = bytes.slice(plugin.multicodecPrefix.length);
  const rawKey = plugin.decompressPublicKey(compressed);

  return {
    plugin,
    alg: plugin.alg,
    curve: plugin.curve,
    publicKey: rawKey,
  };
}

export function formatMultikey(alg: string, rawKey: Uint8Array): string {
  const plugin = getPluginByAlg(alg);
  if (!plugin) throw new Error(`Unknown alg: ${alg}`);

  const compressed = plugin.compressPublicKey(rawKey);
  return encodeMultikey(plugin.multikeyCodec, compressed);
}