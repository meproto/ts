/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import type { CryptoPlugin } from "../plugin-interface.js";
import {
  signSecp256k1,
  verifySecp256k1,
  assertSecp256k1PublicKey,
} from "@meproto/crypto-primitives";
import {
  secp256k1PublicKeyToJwk,
  secp256k1PublicKeyToJwkJcs,
} from "./jwk.js";
import { encodeMultikey } from "@meproto/codec";

// Multicodec prefix for secp256k1-pub
export const SECP256K1_MULTICODEC_PREFIX = new Uint8Array([0xe7, 0x01]);

export const secp256k1Plugin: CryptoPlugin = {
  alg: "ES256K",
  curve: "secp256k1",
  multikeyCodec: "secp256k1-pub",
  multicodecPrefix: SECP256K1_MULTICODEC_PREFIX,

  compressPublicKey(pub) {
    return pub; // already compressed in primitives layer
  },

  decompressPublicKey(comp) {
    return assertSecp256k1PublicKey(comp);
  },

  sign(payload, secretKey) {
    return signSecp256k1(payload, secretKey);
  },

  verify(signature, payload, publicKey) {
    return verifySecp256k1(signature, payload, publicKey);
  },

  toJwk(publicKey) {
    return secp256k1PublicKeyToJwk(publicKey);
  },

  toJwkJcs(publicKey) {
    return secp256k1PublicKeyToJwkJcs(publicKey);
  },

  formatDidKey(publicKey) {
    return "did:me:" + encodeMultikey("secp256k1-pub", publicKey);
  },
};