# **@meproto/codec**

[![npm version](https://img.shields.io/npm/v/%40meproto%2Fcodec.svg?logo=npm&color=blue)](https://www.npmjs.com/package/@meproto/codec)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](./LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/meproto/ts/test-codec.yml?branch=main&label=tests)](https://github.com/meproto/ts/actions/workflows/test-codec.yml)
[![bundle size](https://badgen.net/bundlephobia/minzip/@meproto/codec)](https://bundlephobia.com/package/@meproto/codec)


Encoding utilities for the **Me Protocol**, including:

- **Multibase** (base58btc, base64url)
- **Multicodec** (key algorithm prefix detection)
- **Multikey** parsing and verification
- **Base64 & Base64URL** helpers
- **JSON Canonicalization Scheme (JCS)** for deterministic JSON representation
- Lightweight type-check and error helpers

These utilities support Me Protocol key encoding, DID parsing, signature preimage creation, and credential serialization.

---

## **Installation**

```sh
pnpm add @meproto/codec
# or
npm install @meproto/codec
# or
yarn add @meproto/codec
```

---

## **Usage Examples**

### **Base58btc**

```ts
import { base58btcEncode, base58btcDecode } from "@meproto/codec";

const bytes = new Uint8Array([1, 2, 3]);
const b58 = base58btcEncode(bytes);
const roundtrip = base58btcDecode(b58);
```

---

### **Base64URL**

```ts
import { bytesToBase64Url, base64UrlToBytes } from "@meproto/codec";

const encoded = bytesToBase64Url(new Uint8Array([9, 9, 9]));
const decoded = base64UrlToBytes(encoded);
```

---

### **Multibase Dispatcher**

```ts
import { bytesToMultibase58btc, multibaseToBytes } from "@meproto/codec";

const mb = bytesToMultibase58btc(new Uint8Array([7, 7, 7]));
const raw = multibaseToBytes(mb);
```

---

### **Multicodec Prefix Detection**

```ts
import { lookupCodecPrefix } from "@meproto/codec";

// Example Ed25519 multicodec prefix: 0xed 0x01
const data = new Uint8Array([0xed, 0x01, /* public key bytes... */]);

const info = lookupCodecPrefix(data);
if (info) {
  console.log(info.codecName);   // "ed25519-pub"
  console.log(info.algorithm);   // "Ed25519"
}
```

---

### **Multikey Parsing**

```ts
import { parseMultikey } from "@meproto/codec";

const mk = "z..." // a multibase-encoded multikey
const parsed = parseMultikey(mk);

console.log(parsed.algorithm);     // e.g. "Ed25519"
console.log(parsed.publicKey);     // raw key bytes
console.log(parsed.codecPrefix);   // codec prefix
```

---

### **JSON Canonicalization (JCS)**

```ts
import { canonicalizeJSON } from "@meproto/codec";

const obj = { b: 2, a: 1 };
canonicalizeJSON(obj);
// → {"a":1,"b":2}
```

Deterministic JSON is essential for signature preimages and cryptographic proofs.

---

## **License**

Apache-2.0 © 2025 ReallyMe LLC