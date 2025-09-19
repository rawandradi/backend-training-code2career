/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/src/__tests__/**/*.test.ts'],

  // Transform TS with ts-jest (ESM) and JS (including node_modules/@faker-js/faker) with babel-jest
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { useESM: true, tsconfig: 'tsconfig.jest.json', diagnostics: false }
    ],
    '^.+\\.(mjs|js)$': [
      'babel-jest',
      { rootMode: 'upward' }
    ],
  },

  extensionsToTreatAsEsm: ['.ts'],

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Allow transforming faker in node_modules so Babel handles its ESM
  transformIgnorePatterns: [
    'node_modules/(?!(\\@faker-js\\/faker)/)'
  ],
};
