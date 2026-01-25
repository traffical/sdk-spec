/**
 * @traffical/sdk-spec (CommonJS)
 * 
 * Language-agnostic specifications for Traffical SDKs.
 * Provides JSON schemas and test vectors for validation.
 */

const path = require('path');

// Schemas
exports.configBundleSchema = require('./schemas/config-bundle.schema.json');
exports.eventsSchema = require('./schemas/events.schema.json');
exports.trafficalConfigSchema = require('./schemas/traffical-config.schema.json');

// Test vector bundles
exports.bundleBasic = require('./test-vectors/fixtures/bundle_basic.json');
exports.bundleConditions = require('./test-vectors/fixtures/bundle_conditions.json');

// Test vector expected results
exports.expectedBasic = require('./test-vectors/fixtures/expected_basic.json');
exports.expectedConditions = require('./test-vectors/fixtures/expected_conditions.json');

// Schema paths (for tools that need file paths)
exports.schemaPaths = {
  configBundle: path.join(__dirname, 'schemas/config-bundle.schema.json'),
  events: path.join(__dirname, 'schemas/events.schema.json'),
  trafficalConfig: path.join(__dirname, 'schemas/traffical-config.schema.json'),
};

// Test vector paths
exports.testVectorPaths = {
  bundleBasic: path.join(__dirname, 'test-vectors/fixtures/bundle_basic.json'),
  bundleConditions: path.join(__dirname, 'test-vectors/fixtures/bundle_conditions.json'),
  expectedBasic: path.join(__dirname, 'test-vectors/fixtures/expected_basic.json'),
  expectedConditions: path.join(__dirname, 'test-vectors/fixtures/expected_conditions.json'),
};

