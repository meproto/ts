/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import type { CryptoPlugin } from "../plugin-interface.js";
import {
  mlKem1024Encapsulate,
  mlKem1024Decapsulate,
  assertMlKem1024PublicKey,
} from "@meproto/crypto-primitives";
import {
  mlKem1024PublicKeyToJwk,
  mlKem1024PublicKeyToJwkJcs,
} from "./jwk.js";
import { encodeMultikey } from "@meproto/codec";

export const MLKEM1024_MULTICODEC_PREFIX = new Uint8Array([0x8d, 0x24]);

export const mlkem1024Plugin: CryptoPlugin = {
  alg: "ML-KEM-1024",
  curve: "ML-KEM-1024",
  multikeyCodec: "mlkem-1024-pub",
  multicodecPrefix: MLKEM1024_MULTICODEC_PREFIX,

  compressPublicKey(pub) {
    return assertMlKem1024PublicKey(pub);
  },

  decompressPublicKey(comp) {
    return assertMlKem1024PublicKey(comp);
  },

  encapsulate(publicKey) {
    return mlKem1024Encapsulate(publicKey);
  },

  decapsulate(cipherText, secretKey) {
    return mlKem1024Decapsulate(cipherText, secretKey);
  },

  toJwk(publicKey) {
    return mlKem1024PublicKeyToJwk(publicKey);
  },

  toJwkJcs(publicKey) {
    return mlKem1024PublicKeyToJwkJcs(publicKey);
  },

  formatDidKey(publicKey) {
    return "did:me:" + encodeMultikey("mlkem-1024-pub", publicKey);
  },
};