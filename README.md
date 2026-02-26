# Traffical SDK Specification

Language-agnostic specifications for implementing Traffical SDKs.

## Overview

This repository contains:

- **JSON Schemas** - Type definitions for configuration bundles and events
- **Test Vectors** - Deterministic test fixtures for validating SDK implementations

All Traffical SDKs must implement these specifications to ensure consistent behavior across languages.

## Schemas

### `config-bundle.schema.json`

The complete configuration bundle that SDKs fetch and cache. Contains:

- Organization and project identifiers
- Hashing configuration (unit key, bucket count)
- Parameters with defaults and layer membership
- Layers with policies and allocations
- Conditions for targeting

### `events.schema.json`

Event payloads sent to the Traffical API:

- Exposure events (when a user is assigned to a variant)
- Track events (custom user actions)

### `traffical-config.schema.json`

Local project configuration file (`.traffical/config.yaml`) schema.

## Test Vectors

The `test-vectors/` directory contains deterministic test fixtures for validating SDK implementations.

### Purpose

All Traffical SDKs must produce identical results for the same inputs:

1. **Hashing consistency** - FNV-1a hash produces the same bucket across all implementations
2. **Resolution correctness** - Parameter resolution follows the layered priority system
3. **Condition evaluation** - Context predicates are evaluated identically

### Fixture Structure

```
test-vectors/
├── fixtures/
│   ├── bundle_*.json        # Config bundles to test against
│   └── expected_*.json      # Expected outputs for each bundle
└── README.md
```

### Running Tests

Each SDK implementation should:

1. Load the bundle JSON
2. For each test case:
   - Compute buckets and verify against `expectedHashing`
   - Resolve parameters and verify against `expectedAssignments`

## Hash Function Reference

Traffical uses **FNV-1a (32-bit)** for bucket computation:

```
Input: unitKeyValue + ":" + layerId
Hash: FNV-1a(input) >>> 0
Bucket: hash % bucketCount
```

### Example

- Input: `"user-abc:layer_ui"`
- FNV-1a hash: `2947556742`
- Bucket (mod 1000): `742`

### FNV-1a Algorithm

```
FNV_OFFSET_BASIS = 2166136261
FNV_PRIME = 16777619

hash = FNV_OFFSET_BASIS
for each byte in input:
    hash = hash XOR byte
    hash = hash * FNV_PRIME
return hash >>> 0  // Ensure unsigned 32-bit
```

## Contextual Model Resolution

Policies with `algorithm: "linear_contextual"` ship a trained model in the bundle via the `contextualModel` field on `BundlePolicy`. When present, the SDK uses this model to compute personalized allocation probabilities instead of the standard bucket-based assignment.

### Scoring Pipeline

1. **Linear score per allocation**: `score = intercept + SUM(coef_i * feature_i)`. For each allocation, look up its `BundleAllocationCoefficients`. If an allocation has no coefficients, use `defaultAllocationScore`.
2. **Softmax**: Convert raw scores to probabilities using temperature `gamma`. Lower gamma is more deterministic (exploitative), higher gamma is more uniform (explorative).
3. **Probability floor**: Enforce `actionProbabilityFloor` as a minimum probability for any allocation to ensure continued exploration. Clamp below-floor entries and renormalize.
4. **Deterministic selection**: Use `weightedSelection(probabilities, seed)` with seed `"ctx:" + unitKeyValue + ":" + policyId` to deterministically select an allocation via FNV-1a hashing.

### Feature Types

- **Numeric**: `score += coef * contextValue`. When the context field is missing or non-numeric, `missing` is added instead.
- **Categorical**: `score += values[contextValue]`. When the context field is missing or the value is not in the `values` map, `missing` is added instead.

### Graceful Degradation

If `contextualModel` is absent on a policy (no trained model yet), the SDK falls through to standard bucket-based resolution using the allocation bucket ranges. This means newly-created contextual policies serve uniform traffic until the first training run publishes coefficients.

### Test Vectors

See `test-vectors/fixtures/bundle_contextual.json` and `expected_contextual.json` for conformance test cases covering numeric features, categorical features, missing context fields, and unknown categorical values.

## SDK Implementations

| Language | Repository |
|----------|------------|
| JavaScript/TypeScript | [traffical/js-sdk](https://github.com/traffical/js-sdk) |
| Go | Coming soon |
| Java | Coming soon |

## License

MIT License - see [LICENSE](LICENSE) for details.

