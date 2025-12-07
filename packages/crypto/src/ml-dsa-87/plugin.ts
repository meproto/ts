/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import type { CryptoPlugin } from "../plugin-interface.js";
import {
  signMlDsa87,
  verifyMlDsa87,
  assertMlDsa87PublicKey,
} from "@meproto/crypto-primitives";
import {
  mldsa87PublicKeyToJwk,
  mldsa87PublicKeyToJwkJcs,
} from "./jwk.js";
import { encodeMultikey } from "@meproto/codec";

export const MLDSA87_MULTICODEC_PREFIX = new Uint8Array([0x92, 0x24]);

export const mldsa87Plugin: CryptoPlugin = {
  alg: "ML-DSA-87",
  curve: "ML-DSA-87",
  multikeyCodec: "mldsa-87-pub",
  multicodecPrefix: MLDSA87_MULTICODEC_PREFIX,

  compressPublicKey(pub) {
    return assertMlDsa87PublicKey(pub);
  },

  decompressPublicKey(comp) {
    return assertMlDsa87PublicKey(comp);
  },

  sign(payload, secretKey) {
    return signMlDsa87(payload, secretKey);
  },

  verify(signature, payload, publicKey) {
    return verifyMlDsa87(signature, payload, publicKey);
  },

  toJwk(publicKey) {
    return mldsa87PublicKeyToJwk(publicKey);
  },

  toJwkJcs(publicKey) {
    return mldsa87PublicKeyToJwkJcs(publicKey);
  },

  formatDidKey(publicKey) {
    return "did:me:" + encodeMultikey("mldsa-87-pub", publicKey);
  },
};