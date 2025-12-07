/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import { describe, it, expect } from "vitest";
import {
  generateMlKem1024Keypair,
  mlKem1024Encapsulate,
  mlKem1024Decapsulate,
} from "../../src/ml-kem-1024/index.js";

describe("ML-KEM-1024 encapsulation / decapsulation", () => {
  it("produces a shared secret and ciphertext", () => {
    const { publicKey } = generateMlKem1024Keypair();

    const { sharedSecret, cipherText } = mlKem1024Encapsulate(publicKey);

    expect(sharedSecret instanceof Uint8Array).toBe(true);
    expect(cipherText instanceof Uint8Array).toBe(true);

    expect(sharedSecret.length).toBeGreaterThan(0);
    expect(cipherText.length).toBeGreaterThan(0);
  });

  it("decapsulation reproduces the same shared secret", () => {
    const { publicKey, secretKey } = generateMlKem1024Keypair();

    const { sharedSecret: sharedA, cipherText } =
      mlKem1024Encapsulate(publicKey);

    const sharedB = mlKem1024Decapsulate(cipherText, secretKey);

    expect(Buffer.compare(sharedA, sharedB)).toBe(0);
  });
});