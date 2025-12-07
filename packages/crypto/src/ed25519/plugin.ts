/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import type { CryptoPlugin } from "../plugin-interface.js";
import {
  signEd25519,
  verifyEd25519,
  assertEd25519PublicKey,
} from "@meproto/crypto-primitives";
import {
  ed25519PublicKeyToJwk,
  ed25519PublicKeyToJwkJcs,
} from "./jwk.js";
import { encodeMultikey } from "@meproto/codec";

export const ED25519_MULTICODEC_PREFIX = new Uint8Array([0xed, 0x01]);

export const ed25519Plugin: CryptoPlugin = {
  alg: "EdDSA",
  curve: "Ed25519",
  multikeyCodec: "ed25519-pub",
  multicodecPrefix: ED25519_MULTICODEC_PREFIX,

  compressPublicKey(pub) {
    return assertEd25519PublicKey(pub);
  },

  decompressPublicKey(comp) {
    return assertEd25519PublicKey(comp);
  },

  sign(payload, secretKey) {
    return signEd25519(payload, secretKey);
  },

  verify(signature, payload, publicKey) {
    return verifyEd25519(signature, payload, publicKey);
  },

  toJwk(publicKey) {
    return ed25519PublicKeyToJwk(publicKey);
  },

  toJwkJcs(publicKey) {
    return ed25519PublicKeyToJwkJcs(publicKey);
  },

  formatDidKey(publicKey) {
    return "did:me:" + encodeMultikey("ed25519-pub", publicKey);
  },
};