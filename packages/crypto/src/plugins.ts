/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import type { CryptoPlugin } from "./plugin-interface.js";

import { p256Plugin } from "./p256/plugin.js";
import { ed25519Plugin } from "./ed25519/plugin.js";
import { secp256k1Plugin } from "./secp256k1/plugin.js";
import { x25519Plugin } from "./x25519/plugin.js";
import { mldsa87Plugin } from "./ml-dsa-87/plugin.js";
import { mlkem1024Plugin } from "./ml-kem-1024/plugin.js";

export const plugins: CryptoPlugin[] = [
  p256Plugin,
  ed25519Plugin,
  secp256k1Plugin,
  x25519Plugin,
  mldsa87Plugin,
  mlkem1024Plugin,
];

/**
 * Lookup plugin by JWS alg (e.g. "ES256")
 */
export function getPluginByAlg(alg: string): CryptoPlugin | undefined {
  return plugins.find((p) => p.alg === alg);
}

/**
 * Lookup plugin by multicodec prefix.
 * (Used during multikey parsing.)
 */
export function getPluginByPrefix(bytes: Uint8Array): CryptoPlugin | undefined {
  return plugins.find((p) =>
    p.multicodecPrefix.every((b, i) => bytes[i] === b)
  );
}