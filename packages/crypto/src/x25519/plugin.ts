/**
 * @license Apache-2.0 
 * Copyright © 2025 ReallyMe LLC
 */

import type { CryptoPlugin } from "../plugin-interface.js";
import {
  deriveX25519SharedSecret,
  assertX25519PublicKey,
} from "@meproto/crypto-primitives";
import {
  x25519PublicKeyToJwk,
  x25519PublicKeyToJwkJcs,
} from "./jwk.js";
import { encodeMultikey } from "@meproto/codec";

export const X25519_MULTICODEC_PREFIX = new Uint8Array([0xec, 0x01]);

export const x25519Plugin: CryptoPlugin = {
  alg: "X25519",
  curve: "X25519",
  multikeyCodec: "x25519-pub",
  multicodecPrefix: X25519_MULTICODEC_PREFIX,

  compressPublicKey(pub) {
    return assertX25519PublicKey(pub); // already uncompressed form
  },

  decompressPublicKey(comp) {
    return assertX25519PublicKey(comp);
  },

  deriveSharedSecret(secretKey, publicKey) {
    return deriveX25519SharedSecret(secretKey, publicKey);
  },

  toJwk(publicKey) {
    return x25519PublicKeyToJwk(publicKey);
  },

  toJwkJcs(publicKey) {
    return x25519PublicKeyToJwkJcs(publicKey);
  },

  formatDidKey(publicKey) {
    return "did:me:" + encodeMultikey("x25519-pub", publicKey);
  },
};