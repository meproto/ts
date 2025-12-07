/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import type { CryptoPlugin } from "../plugin-interface.js";
import {
  signP256DerPrehash,
  verifyP256DerPrehash,
  decompressP256,
  compress
} from "@meproto/crypto-primitives";
import {
  p256PublicKeyToJwk,
  p256PublicKeyToJwkJcs,
} from "./jwk.js";
import { encodeMultikey } from "@meproto/codec";

export const P256_MULTICODEC_PREFIX = new Uint8Array([0x80, 0x24]);

export const p256Plugin: CryptoPlugin = {
  alg: "ES256",
  curve: "P-256",
  multikeyCodec: "p256-pub",
  multicodecPrefix: P256_MULTICODEC_PREFIX,

  // PUBLIC KEYS FROM PRIMITIVES ARE ALREADY COMPRESSED (33 bytes)
  compressPublicKey(pub: Uint8Array) {
  // If already compressed (33 bytes starting with 0x02 or 0x03), return as-is
  if (pub.length === 33 && (pub[0] === 0x02 || pub[0] === 0x03)) {
    return pub;
  }

  // If uncompressed (65 bytes starting with 0x04), recompress it
  if (pub.length === 65 && pub[0] === 0x04) {
    return compress(pub);  // from @meproto/crypto-primitives
  }

  throw new Error(
    `P-256 compressPublicKey: expected compressed (33 bytes) or uncompressed (65 bytes)`
  );
},

  // Return uncompressed 65-byte SEC1 key
  decompressPublicKey(comp: Uint8Array) {
    return decompressP256(comp);
  },

  sign(payload, secretKey) {
    return signP256DerPrehash(payload, secretKey);
  },

  verify(signature, payload, publicKey) {
    return verifyP256DerPrehash(signature, payload, publicKey);
  },

  toJwk(publicKey) {
    return p256PublicKeyToJwk(publicKey);
  },

  toJwkJcs(publicKey) {
    return p256PublicKeyToJwkJcs(publicKey);
  },

  formatDidKey(publicKey) {
    return "did:me:" + encodeMultikey("p256-pub", publicKey);
  },
};