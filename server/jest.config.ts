import type { InitialOptionsTsJest } from 'ts-jest';

const configuration: InitialOptionsTsJest = {
  extensionsToTreatAsEsm: ['.ts', '.mts'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'mts'],
  resolver: '<rootDir>/jest-mjs-resolver.ts',
  testMatch: ['**/*.spec.mts'],
  transform: {
    '^.+\\.m?tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default configuration;
