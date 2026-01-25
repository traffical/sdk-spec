/**
 * @traffical/sdk-spec
 * 
 * Type definitions for Traffical SDK specifications.
 */

import type { JSONSchema7 } from 'json-schema';

// Schema types
export declare const configBundleSchema: JSONSchema7;
export declare const eventsSchema: JSONSchema7;
export declare const trafficalConfigSchema: JSONSchema7;

// Test vector bundle types
export interface TestBundle {
  orgId: string;
  projectId: string;
  env: string;
  version: number;
  hashing: {
    unitKey: string;
    bucketCount: number;
  };
  parameters: Record<string, {
    type: string;
    default: unknown;
    layers?: string[];
  }>;
  layers: Array<{
    id: string;
    priority: number;
    policies: Array<{
      id: string;
      parameters: Record<string, unknown>;
      allocations: Array<{
        name: string;
        bucketRange: [number, number];
        parameters: Record<string, unknown>;
      }>;
      conditions?: Array<{
        type: string;
        field: string;
        operator: string;
        value: unknown;
      }>;
    }>;
  }>;
}

export interface ExpectedResults {
  description: string;
  testCases: Array<{
    name: string;
    context: Record<string, unknown>;
    expectedHashing?: Record<string, {
      input: string;
      bucket: number;
    }>;
    expectedAssignments: Record<string, unknown>;
  }>;
}

export declare const bundleBasic: TestBundle;
export declare const bundleConditions: TestBundle;
export declare const expectedBasic: ExpectedResults;
export declare const expectedConditions: ExpectedResults;

// Path exports
export declare const schemaPaths: {
  configBundle: string;
  events: string;
  trafficalConfig: string;
};

export declare const testVectorPaths: {
  bundleBasic: string;
  bundleConditions: string;
  expectedBasic: string;
  expectedConditions: string;
};

