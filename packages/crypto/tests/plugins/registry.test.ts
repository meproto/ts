/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  plugins,
  getPluginByAlg,
  getPluginByPrefix,
} from "../../src/plugins.js";
import {
  p256Plugin,
  ed25519Plugin,
  secp256k1Plugin,
  x25519Plugin,
  mldsa87Plugin,
  mlkem1024Plugin,
} from "../../src/index.js";

describe("plugin registry", () => {
  it("loads all expected plugins", () => {
    expect(plugins.length).toBe(6);
  });

  it("gets plugin by algorithm", () => {
    expect(getPluginByAlg("ES256")).toBe(p256Plugin);
    expect(getPluginByAlg("EdDSA")).toBe(ed25519Plugin);
    expect(getPluginByAlg("ES256K")).toBe(secp256k1Plugin);
    expect(getPluginByAlg("X25519")).toBe(x25519Plugin);
    expect(getPluginByAlg("ML-DSA-87")).toBe(mldsa87Plugin);
    expect(getPluginByAlg("ML-KEM-1024")).toBe(mlkem1024Plugin);
  });

  it("gets plugin by multicodec prefix", () => {
    expect(getPluginByPrefix(p256Plugin.multicodecPrefix)).toBe(p256Plugin);
    expect(getPluginByPrefix(ed25519Plugin.multicodecPrefix)).toBe(ed25519Plugin);
  });
});