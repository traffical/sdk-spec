# Traffical SDK Test Vectors

This directory contains deterministic test fixtures for validating SDK implementations across languages.

## Purpose

All Traffical SDKs must produce identical results for the same inputs. These test vectors ensure:

1. **Hashing consistency** - FNV-1a hash produces the same bucket across all implementations
2. **Resolution correctness** - Parameter resolution follows the layered priority system
3. **Condition evaluation** - Context predicates are evaluated identically

## Fixture Structure

```
fixtures/
├── bundle_*.json        # Config bundles to test against
└── expected_*.json      # Expected outputs for each bundle
```

### Bundle Files

Each bundle file contains a complete `ConfigBundle` with:
- Hashing configuration
- Parameters with defaults
- Layers with policies and allocations

### Expected Output Files

Each expected file contains:
- Reference to the bundle file
- Array of test cases with:
  - Input context
  - Expected bucket assignments (for hashing validation)
  - Expected parameter assignments

## Running Tests

### TypeScript (Reference Implementation)

```bash
cd sdk/core-ts
bun test
```

### Other Languages

Each SDK implementation should:

1. Load the bundle JSON
2. For each test case:
   - Compute buckets and verify against `expectedHashing`
   - Resolve parameters and verify against `expectedAssignments`

## Adding New Test Cases

When adding new test vectors:

1. Create or update a bundle file with the configuration to test
2. Use the TypeScript SDK to compute expected outputs
3. Add test cases with clear comments explaining the expected behavior

## Hash Function Reference

Traffical uses FNV-1a (32-bit) for bucket computation:

```
Input: unitKeyValue + ":" + layerId
Hash: FNV-1a(input) >>> 0
Bucket: hash % bucketCount
```

Example:
- Input: `"user-abc:layer_ui"`
- FNV-1a hash: `2947556742`
- Bucket (mod 1000): `742`

