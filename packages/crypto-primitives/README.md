# **@meproto/crypto-primitives**

[![npm version](https://img.shields.io/npm/v/%40meproto%2Fcrypto-primitives.svg?logo=npm&color=blue)](https://www.npmjs.com/package/@meproto/crypto-primitives)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](./LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/meproto/ts/test-crypto-primitives.yml?branch=main&label=tests)](https://github.com/meproto/ts/actions/workflows/test-crypto-primitives.yml)
[![bundle size](https://badgen.net/bundlephobia/minzip/@meproto/crypto-primitives)](https://bundlephobia.com/package/@meproto/crypto-primitives)

Low-level **cryptographic primitives** for the Me Protocol.

This package provides **raw, byte-level cryptography** built on top of `@noble/curves`, `@noble/hashes`, and `@noble/post-quantum`.  
It exposes no multikey, JWS, JWK, DID logic, or high-level encoding — those live in `@meproto/crypto`.

This package is intended for **advanced users**, protocol implementers, and internal Me Protocol tooling.  
Most developers should use [`@meproto/crypto`](https://npmjs.com/package/@meproto/crypto) instead.

---

## **Included Primitives**

### 🔐 **Signature Algorithms**
- **P-256 (secp256r1)** — ECDSA (DER), SHA-256 prehash
- **Ed25519** — deterministic EdDSA
- **secp256k1 (ES256K)** — ECDSA (compact 64-byte R||S), SHA-256 prehash
- **ML-DSA-87** — Post-quantum signature scheme (NIST PQC finalist)

### 🔑 **Key Agreement / KEM**
- **X25519** — ECDH (Diffie–Hellman) shared secret derivation
- **ML-KEM-1024 (Kyber-1024)** — Post-quantum KEM (encapsulate/decapsulate)

### 🧩 **Encoding & Validation Helpers**
- SEC1 P-256 compression / decompression  
- Compressed secp256k1 key validation  
- Identity encoders for Ed25519, X25519, ML-DSA-87, ML-KEM-1024  
- Public key structural validation helpers

### 🔧 **Utilities**
- Secure random bytes (`crypto.getRandomValues`)
- Constant-time byte comparison  
- Hex encoding / decoding  
- TypedArray conversion helpers (`asArrayBuffer`)  
- Byte concatenation helpers  

---

## **Installation**

```sh
pnpm add @meproto/crypto-primitives
# or
npm install @meproto/crypto-primitives
# or
yarn add @meproto/crypto-primitives
```

---

## **Basic Usage**

### **Generate a P-256 keypair**

```ts
import { generateP256Keypair } from "@meproto/crypto-primitives";

const { secretKey, publicKey } = generateP256Keypair();
```

---

### **Sign & verify with Ed25519**

```ts
import { generateEd25519Keypair, signEd25519, verifyEd25519 } 
  from "@meproto/crypto-primitives";

const { secretKey, publicKey } = generateEd25519Keypair();

const msg = new TextEncoder().encode("hello");
const sig = signEd25519(msg, secretKey);

const ok = verifyEd25519(sig, msg, publicKey); // true
```

---

### **ECDH with X25519**

```ts
import { generateX25519Keypair, deriveX25519SharedSecret } 
  from "@meproto/crypto-primitives";

const alice = generateX25519Keypair();
const bob = generateX25519Keypair();

const shared1 = deriveX25519SharedSecret(alice.secretKey, bob.publicKey);
const shared2 = deriveX25519SharedSecret(bob.secretKey, alice.publicKey);

console.log(Buffer.compare(shared1, shared2) === 0); // true
```

---

### **PQC KEM: ML-KEM-1024 Encapsulation / Decapsulation**

```ts
import {
  generateMlKem1024Keypair,
  mlKem1024Encapsulate,
  mlKem1024Decapsulate
} from "@meproto/crypto-primitives";

const receiver = generateMlKem1024Keypair();

// Encrypt for receiver
const { sharedSecret, cipherText } = mlKem1024Encapsulate(receiver.publicKey);

// Receiver derives same secret
const recovered = mlKem1024Decapsulate(cipherText, receiver.secretKey);
```

---

### **secp256k1 Signing (compact 64-byte signature)**

```ts
import { generateSecp256k1Keypair, signSecp256k1, verifySecp256k1 } 
  from "@meproto/crypto-primitives";

const { secretKey, publicKey } = generateSecp256k1Keypair();

const sig = signSecp256k1(new Uint8Array([1,2,3]), secretKey);
const ok = verifySecp256k1(sig, new Uint8Array([1,2,3]), publicKey);
```

---

## **When You Should *Not* Use This Package**

Use [`@meproto/crypto`](https://npmjs.com/package/@meproto/crypto) instead if you need:

- Multikey encoding  
- JWK export  
- JWS signing & verification  
- VM structural validation  
- DID:key support  
- Higher-level cryptographic operations  
- Safe opinionated defaults  

This package is intentionally **low-level**.

---

## **License**

Apache-2.0 © 2025 ReallyMe LLC