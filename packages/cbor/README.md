# **@meproto/cbor**

[![npm version](https://img.shields.io/npm/v/%40meproto%2Fcbor.svg?logo=npm&color=blue)](https://www.npmjs.com/package/@meproto/cbor)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](./LICENSE)
[![test-cbor](https://img.shields.io/github/actions/workflow/status/meproto/ts/test-cbor.yml?branch=main&label=test-cbor)](https://github.com/meproto/ts/actions/workflows/test-cbor.yml)
[![bundle size](https://badgen.net/bundlephobia/minzip/@meproto/cbor)](https://bundlephobia.com/package/@meproto/cbor)

Canonical DAG-CBOR encoder/decoder and CID helpers for the **ME Protocol** and `did:me`.

Implements a safe, deterministic subset of CBOR suitable for decentralized identity, verifiable credentials, content addressing, and protocol-level data structures.

- ✔ Canonical, deterministic DAG-CBOR encoding  
- ✔ Strict decoder with type constraints  
- ✔ UTF-8 ordered map keys  
- ✔ No floats, no indefinite lengths  
- ✔ CIDv1 (dag-cbor / sha2-256) computation  
- ✔ Fully typed TypeScript API  

---

## **Installation**

```sh
pnpm add @meproto/cbor
# or
npm install @meproto/cbor
# or
yarn add @meproto/cbor
```

---

## **Usage**

### **Encode canonical DAG-CBOR**

```ts
import { encodeCanonical } from "@meproto/cbor";

const bytes = encodeCanonical({
  hello: "world",
  count: 42,
});
```

### **Decode canonical DAG-CBOR**

```ts
import { decodeCanonical } from "@meproto/cbor";

const value = decodeCanonical(bytes);
// → { hello: "world", count: 42 }
```

---

## **CID helpers**

### **Compute a CIDv1 (dag-cbor, sha2-256)**

```ts
import { computeCidDagCbor } from "@meproto/cbor";

const cid = await computeCidDagCbor(bytes);
// → "bafyre..."
```

### **Verify a CID**

```ts
import { verifyDagCborCid } from "@meproto/cbor";

const result = await verifyDagCborCid(cid, bytes);
// { ok: true, expected: "...", actual: "..." }
```

### **Validate CID syntax**

```ts
import { isValidCidString } from "@meproto/cbor";

isValidCidString(cid);      // true
isValidCidString("nope");   // false
```

---

## **What is canonical DAG-CBOR?**

ME Protocol uses a deterministic subset of CBOR with:

- UTF-8 sorted map keys  
- No floats  
- No semantic tags  
- No indefinite-length items  
- Only major types 0–5 and null/true/false  

This ensures stable hashing, CID derivation, and cryptographic integrity.

---

## **License**

Apache-2.0 © 2025 ReallyMe LLC