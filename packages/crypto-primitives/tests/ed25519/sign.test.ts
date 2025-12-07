/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateEd25519Keypair,
  signEd25519,
} from "../../src/ed25519/index.js";
import { randomBytes } from "../../src/utils/randomBytes.js";

describe("signEd25519", () => {
  it("produces a 64-byte signature", () => {
    const { secretKey } = generateEd25519Keypair();
    const msg = randomBytes(32);

    const sig = signEd25519(msg, secretKey);

    expect(sig instanceof Uint8Array).toBe(true);
    expect(sig.length).toBe(64);
  });

  it("is deterministic for the same key + message", () => {
    const { secretKey } = generateEd25519Keypair();
    const msg = randomBytes(32);

    const s1 = signEd25519(msg, secretKey);
    const s2 = signEd25519(msg, secretKey);

    // Ed25519 signatures are deterministic (RFC 8032)
    expect(Buffer.compare(s1, s2)).toBe(0);
  });
});