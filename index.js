/**
 * @traffical/sdk-spec
 * 
 * Language-agnostic specifications for Traffical SDKs.
 * Provides JSON schemas and test vectors for validation.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Schemas
export const configBundleSchema = require('./schemas/config-bundle.schema.json');
export const eventsSchema = require('./schemas/events.schema.json');
export const trafficalConfigSchema = require('./schemas/traffical-config.schema.json');

// Test vector bundles
export const bundleBasic = require('./test-vectors/fixtures/bundle_basic.json');
export const bundleConditions = require('./test-vectors/fixtures/bundle_conditions.json');

// Test vector expected results
export const expectedBasic = require('./test-vectors/fixtures/expected_basic.json');
export const expectedConditions = require('./test-vectors/fixtures/expected_conditions.json');

// Schema paths (for tools that need file paths)
export const schemaPaths = {
  configBundle: new URL('./schemas/config-bundle.schema.json', import.meta.url).pathname,
  events: new URL('./schemas/events.schema.json', import.meta.url).pathname,
  trafficalConfig: new URL('./schemas/traffical-config.schema.json', import.meta.url).pathname,
};

// Test vector paths
export const testVectorPaths = {
  bundleBasic: new URL('./test-vectors/fixtures/bundle_basic.json', import.meta.url).pathname,
  bundleConditions: new URL('./test-vectors/fixtures/bundle_conditions.json', import.meta.url).pathname,
  expectedBasic: new URL('./test-vectors/fixtures/expected_basic.json', import.meta.url).pathname,
  expectedConditions: new URL('./test-vectors/fixtures/expected_conditions.json', import.meta.url).pathname,
};

