/**
 * @license Apache-2.0 
 * © 2025 ReallyMe LLC
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  generateP256Keypair,
  generateEd25519Keypair,
  generateSecp256k1Keypair,
  generateX25519Keypair,
  generateMlDsa87Keypair,
  generateMlKem1024Keypair,
  decompressP256,
  assertEd25519PublicKey,
  assertSecp256k1PublicKey,
  assertX25519PublicKey,
  assertMlDsa87PublicKey,
  assertMlKem1024PublicKey,
} from "@meproto/crypto-primitives";

import {
  bytesToBase64Url,
  base64UrlToBytes,
} from "@meproto/codec";

import {
  p256PublicKeyToJwk,
  ed25519PublicKeyToJwk,
  secp256k1PublicKeyToJwk,
  x25519PublicKeyToJwk,
  mldsa87PublicKeyToJwk,
  mlKem1024PublicKeyToJwk,
  p256PublicKeyToJwkJcs,
  ed25519PublicKeyToJwkJcs,
  secp256k1PublicKeyToJwkJcs,
  x25519PublicKeyToJwkJcs,
  mldsa87PublicKeyToJwkJcs,
  mlKem1024PublicKeyToJwkJcs,
  formatMultikey,
} from "@meproto/crypto";

const VECTORS_DIR = join(process.cwd(), "vectors");

function ensureDir(dir: string) {
  mkdirSync(dir, { recursive: true });
}

function writeJSON(path: string, value: unknown) {
  writeFileSync(path, JSON.stringify(value, null, 2), "utf8");
}

function toB64u(bytes: Uint8Array): string {
  return bytesToBase64Url(bytes);
}

async function main() {
  ensureDir(VECTORS_DIR);

  // ---------- P-256 ----------
  {
    const { secretKey, publicKey } = generateP256Keypair();
    const uncompressed = decompressP256(publicKey);
    const jwk = p256PublicKeyToJwk(publicKey);
    const jwkJcs = p256PublicKeyToJwkJcs(publicKey);
    const multikey = formatMultikey("ES256", publicKey);

    const vector = {
      alg: "ES256",
      curve: "P-256",
      secretKey: toB64u(secretKey),
      publicKeyCompressed: toB64u(publicKey),
      publicKeyUncompressed: toB64u(uncompressed),
      jwk,
      jwkJcs,
      multikey
    };

    writeJSON(join(VECTORS_DIR, "p256.json"), vector);
  }

  // ---------- Ed25519 ----------
  {
    const { secretKey, publicKey } = generateEd25519Keypair();
    const pk = assertEd25519PublicKey(publicKey);
    const jwk = ed25519PublicKeyToJwk(pk);
    const jwkJcs = ed25519PublicKeyToJwkJcs(pk);
    const multikey = formatMultikey("EdDSA", pk);

    const vector = {
      alg: "EdDSA",
      curve: "Ed25519",
      secretKey: toB64u(secretKey),
      publicKey: toB64u(pk),
      jwk,
      jwkJcs,
      multikey
    };

    writeJSON(join(VECTORS_DIR, "ed25519.json"), vector);
  }

  // ---------- secp256k1 ----------
  {
    const { secretKey, publicKey } = generateSecp256k1Keypair();
    const pk = assertSecp256k1PublicKey(publicKey);
    const jwk = secp256k1PublicKeyToJwk(pk);
    const jwkJcs = secp256k1PublicKeyToJwkJcs(pk);
    const multikey = formatMultikey("ES256K", pk);

    const vector = {
      alg: "ES256K",
      curve: "secp256k1",
      secretKey: toB64u(secretKey),
      publicKeyCompressed: toB64u(pk),
      jwk,
      jwkJcs,
      multikey
    };

    writeJSON(join(VECTORS_DIR, "secp256k1.json"), vector);
  }

  // ---------- X25519 ----------
  {
    const { secretKey, publicKey } = generateX25519Keypair();
    const pk = assertX25519PublicKey(publicKey);
    const jwk = x25519PublicKeyToJwk(pk);
    const jwkJcs = x25519PublicKeyToJwkJcs(pk);
    const multikey = formatMultikey("X25519", pk); // plugin alg = "X25519"

    const vector = {
      alg: "X25519",
      curve: "X25519",
      secretKey: toB64u(secretKey),
      publicKey: toB64u(pk),
      jwk,
      jwkJcs,
      multikey
    };

    writeJSON(join(VECTORS_DIR, "x25519.json"), vector);
  }

  // ---------- ML-DSA-87 ----------
  {
    const { secretKey, publicKey } = generateMlDsa87Keypair();
    const pk = assertMlDsa87PublicKey(publicKey);
    const jwk = mldsa87PublicKeyToJwk(pk);
    const jwkJcs = mldsa87PublicKeyToJwkJcs(pk);
    const multikey = formatMultikey("ML-DSA-87", pk);

    const vector = {
      alg: "ML-DSA-87",
      scheme: "ML-DSA-87",
      secretKey: toB64u(secretKey),
      publicKey: toB64u(pk),
      publicKeyLength: pk.length,
      jwk,
      jwkJcs,
      multikey
    };

    writeJSON(join(VECTORS_DIR, "mldsa87.json"), vector);
  }

  // ---------- ML-KEM-1024 ----------
  {
    const { secretKey, publicKey } = generateMlKem1024Keypair();
    const pk = assertMlKem1024PublicKey(publicKey);
    const jwk = mlKem1024PublicKeyToJwk(pk);
    const jwkJcs = mlKem1024PublicKeyToJwkJcs(pk);
    const multikey = formatMultikey("ML-KEM-1024", pk);

    const vector = {
      alg: "ML-KEM-1024",
      scheme: "ML-KEM-1024",
      secretKey: toB64u(secretKey),
      publicKey: toB64u(pk),
      publicKeyLength: pk.length,
      jwk,
      jwkJcs,
      multikey
    };

    writeJSON(join(VECTORS_DIR, "mlkem1024.json"), vector);
  }

  // Manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    vectors: [
      "p256.json",
      "ed25519.json",
      "secp256k1.json",
      "x25519.json",
      "mldsa87.json",
      "mlkem1024.json"
    ]
  };
  writeJSON(join(VECTORS_DIR, "manifest.json"), manifest);

  console.log("Generated vectors in:", VECTORS_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});