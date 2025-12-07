/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateMlKem1024Keypair,
} from "../../src/ml-kem-1024/index.js";

describe("generateMlKem1024Keypair", () => {
  it("produces public & secret keys", () => {
    const { publicKey, secretKey } = generateMlKem1024Keypair();

    expect(publicKey instanceof Uint8Array).toBe(true);
    expect(secretKey instanceof Uint8Array).toBe(true);

    // ML-KEM-1024 public key is 1568 bytes
    expect(publicKey.length).toBe(1568);

    // Secret key length varies depending on compression scheme, but must be > 0
    expect(secretKey.length).toBeGreaterThan(0);
  });

  it("produces unique keypairs", () => {
    const a = generateMlKem1024Keypair();
    const b = generateMlKem1024Keypair();

    expect(Buffer.compare(a.publicKey, b.publicKey)).not.toBe(0);
    expect(Buffer.compare(a.secretKey, b.secretKey)).not.toBe(0);
  });
});