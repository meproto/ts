# **@meproto/crypto-conformance**

[![License](https://img.shields.io/badge/license-Apache--2.0-green)](./LICENSE)  
[![tests](https://img.shields.io/github/actions/workflow/status/meproto/ts/test-crypto-conformance.yml?branch=main&label=tests)](https://github.com/meproto/ts/actions/workflows/test-crypto-conformance.yml)

This package contains the **external conformance and invariant test suite** for Me Protocol cryptography.

It is **not published to npm**.  
It exists solely for:

- Cryptographic auditability  
- Internal quality assurance  
- Algorithmic correctness validation  

---

## **What This Suite Validates**

For every supported algorithm:

- P-256 (ES256)  
- Ed25519 (EdDSA)  
- secp256k1 (ES256K)  
- X25519 (ECDH)  
- ML-DSA-87 (PQ signature)  
- ML-KEM-1024 (PQ KEM)

It checks:

- Correct key lengths and formats  
- SEC1 compression/decompression (P-256)  
- Multicodec prefix correctness  
- Multikey prefix autodetection  
- JWK + JCS-JWK structural consistency  
- Plugin routing correctness  
- PQC key material sizing  

This suite does **not** perform external signature verification or cross-language JWS validation.

---

## **Running the Suite**

### Generate vectors + run all conformance tests:

~~~sh
pnpm --filter @meproto/crypto-conformance test
~~~

### Watch mode:

~~~sh
pnpm --filter @meproto/crypto-conformance test:watch
~~~

Generated vector files are written to:

```
packages/crypto-conformance/vectors/`
```

These files are deterministic and auditor-friendly.

---


## **Why This Suite Exists**

This package ensures:

- Internal consistency of the multikey and plugin systems  
- Canonical correctness of all encoding formats  
- Structural validity of key material across curves  
- Deterministic, reproducible cryptographic behavior  

It provides a transparent verification layer for auditors reviewing Me Protocol cryptography.

---

## **License**

Apache-2.0 © 2025 ReallyMe LLC