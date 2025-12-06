/**
 * @license Apache-2.0
 * Copyright © 2025 ReallyMe LLC
 *
 * CID helpers for canonical DAG-CBOR core snapshots.
 */

import { describe, it, expect } from "vitest";
import * as cbor from "../src/index.js";

describe("public API surface", () => {
  it("exports expected functions", () => {
    expect(typeof cbor.encodeCanonical).toBe("function");
    expect(typeof cbor.decodeCanonical).toBe("function");
    expect(typeof cbor.computeCidDagCbor).toBe("function");
    expect(typeof cbor.verifyDagCborCid).toBe("function");
  });
});