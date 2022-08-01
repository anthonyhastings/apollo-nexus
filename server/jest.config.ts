import type { InitialOptionsTsJest } from 'ts-jest';

const configuration: InitialOptionsTsJest = {
  // extensionsToTreatAsEsm: ['.ts'],
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  // moduleNameMapper: {
  //   '^(\\.{1,2}/.*)\\.mjs$': '$1',
  // },
  preset: 'ts-jest',
  // preset: 'ts-jest/presets/default-esm',
  // testEnvironment: 'node',
  // transform: {
  //   '\\.mjs$': 'ts-jest',
  //   '\\.mts$': 'ts-jest',
  // },
};

export default configuration;
