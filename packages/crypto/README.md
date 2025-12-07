# **@meproto/crypto**

[![npm version](https://img.shields.io/npm/v/%40meproto%2Fcrypto.svg?logo=npm&color=blue)](https://www.npmjs.com/package/@meproto/crypto)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](./LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/meproto/ts/test-crypto.yml?branch=main&label=tests)](https://github.com/meproto/ts/actions/workflows/test-crypto.yml)
[![bundle size](https://badgen.net/bundlephobia/minzip/@meproto/crypto)](https://bundlephobia.com/package/@meproto/crypto)

High-level **cryptographic operations** for the Me Protocol.

This package builds on top of low-level primitives from  
`@meproto/crypto-primitives` and provides:

- Multikey encoding / decoding  
- JWK + JWK-JCS encoding  
- JWS signing & verification  
- Algorithm autodetection via plugin architecture  
- DID:key-style formatting for Me Protocol  
- Safe, opinionated curve handling  

Most developers should use this package.  
Cryptographers and implementers needing raw byte-level primitives should use  
[`@meproto/crypto-primitives`](https://npmjs.com/package/@meproto/crypto-primitives).

---

## **Features**

### 🔐 **Unified JWS Signing & Verification**
- **ES256 (P-256)** — DER-encoded ECDSA with SHA-256 prehash  
- **EdDSA (Ed25519)**  
- **ES256K (secp256k1)** — compact 64-byte r\|\|s format  
- **ML-DSA-87** — post-quantum signatures (NIST PQC finalist)

Automatically routed by plugin based on JWS `"alg"` header.

---

### 🪪 **Multikey Support**
This package implements the Me Protocol multikey format:

Supported curves:

| Algorithm     | Multicodec       | Encoded Form       |
|---------------|------------------|--------------------|
| P-256         | `p256-pub`       | compressed SEC1    |
| Ed25519       | `ed25519-pub`    | 32-byte raw        |
| secp256k1     | `secp256k1-pub`  | compressed SEC1    |
| X25519        | `x25519-pub`     | 32-byte raw        |
| ML-DSA-87     | `mldsa-87-pub`   | PQ public key      |
| ML-KEM-1024   | `mlkem-1024-pub` | PQ KEM public key  |

Includes:

- Multikey creation  
- Prefix autodetection  
- Compression/decompression (P-256 only)  
- Plugin-driven parsing  

---

### 🔑 **JWK Output**
Each supported curve includes helpers for producing:

- **EC JWK** (P-256, secp256k1)  
- **OKP JWK** (Ed25519, X25519, PQC keys)  
- **JCS Canonical JWK** (RFC 8785)  

Compatible with:

- WebCrypto  
- JOSE / JWT libraries  
- EUDI Wallet formatting  
- DID Documents  

---

### 🤝 **Key Agreement & PQ KEM**
Using underlying primitives, this package supports:

- **X25519** shared secret derivation  
- **ML-KEM-1024** encapsulate/decapsulate (Kyber-1024)

---

### 🧱 **Plugin Architecture**
Every algorithm is implemented as a **CryptoPlugin**, enabling:

- Unified APIs (`signJws`, `verifyJws`, `parseMultikey`, …)  
- Automatic selection via prefix or `"alg"`  
- Extendability for future curves  

---

## **Installation**

```sh
pnpm add @meproto/crypto
# or
npm install @meproto/crypto
# or
yarn add @meproto/crypto

```

## **Usage Examples**

### **Sign & verify an ES256 JWS**

~~~ts
import { generateP256Keypair, signP256Jws, verifyP256Jws } from "@meproto/crypto";

const { secretKey, publicKey } = generateP256Keypair();

const jws = signP256Jws(secretKey, "hello world");
const ok = verifyP256Jws(jws, publicKey);
~~~

---

### **Multikey Encoding & Autodetection**

~~~ts
import { generateEd25519Keypair, formatMultikey, parseMultikey } from "@meproto/crypto";

const { publicKey } = generateEd25519Keypair();

const multikey = formatMultikey("EdDSA", publicKey);
const parsed = parseMultikey(multikey);

// parsed.alg  → "EdDSA"
// parsed.curve → "Ed25519"
// parsed.publicKey → Uint8Array
~~~

---

### **Produce a JWK + JCS JWK**

~~~ts
import { ed25519PublicKeyToJwk, ed25519PublicKeyToJwkJcs } from "@meproto/crypto";

const jwk = ed25519PublicKeyToJwk(publicKey);
const jwkJcs = ed25519PublicKeyToJwkJcs(publicKey);
~~~

---

### **X25519 Shared Secret**

~~~ts
import { generateX25519MultikeyKeypair, deriveX25519SharedSecret } from "@meproto/crypto";

const alice = generateX25519MultikeyKeypair();
const bob = generateX25519MultikeyKeypair();

const secret1 = deriveX25519SharedSecret(alice.secretKey, bob.publicKey);
const secret2 = deriveX25519SharedSecret(bob.secretKey, alice.publicKey);

// secret1 === secret2
~~~

---

### **Post-Quantum: ML-KEM-1024**

~~~ts
import { 
  generateMlKem1024MultikeyKeypair,
  mlKem1024Encapsulate,
  mlKem1024Decapsulate
} from "@meproto/crypto";

const receiver = generateMlKem1024MultikeyKeypair();

const { sharedSecret, ciphertext } = mlKem1024Encapsulate(receiver.publicKey);

const recovered = mlKem1024Decapsulate(ciphertext, receiver.secretKey);
~~~

---

### **secp256k1 Signing (compact 64-byte signature)**

~~~ts
import { 
  generateSecp256k1MultikeyKeypair, 
  signSecp256k1Jws, 
  verifySecp256k1Jws 
} from "@meproto/crypto";

const { secretKey, publicKey } = generateSecp256k1MultikeyKeypair();

const jws = signSecp256k1Jws(secretKey, "hello");
const ok = verifySecp256k1Jws(jws, publicKey);
~~~

## **When NOT to Use This Package**

Use **@meproto/crypto-primitives** instead if you need:

- Raw cryptographic primitives  
- Direct curve operations  
- Hash functions and encoding helpers  
- Low-level control over key formats  
- No multikey, JWS, JWK, or plugin logic

This package is **high-level and opinionated by design**, built for DID, wallets, and protocol-level integrations.

---

## **License**

Apache-2.0 © 2025 ReallyMe LLC