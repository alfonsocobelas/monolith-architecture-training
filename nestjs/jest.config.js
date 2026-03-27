/* eslint-disable no-undef */
/** @type {import('jest').Config} */

const baseConfig = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  roots: ['<rootDir>/tests'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!(uuid|@faker-js)/)'],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/entrypoints/controllers/**'
  ],
  coverageDirectory: './coverage',
  coverageProvider: "v8",
  clearMocks: true,
  cacheDirectory: '.tmp/jestCache',
  preset: 'ts-jest',
  globalSetup: '<rootDir>/tests/jest.setup.global.ts',
  reporters: [
    'default',
    '<rootDir>/tests/jest.seed.reporter.js'
  ],
  testTimeout: 30000
};

let config = baseConfig;

if (process.env.JEST_ENV === 'unit') {
  config = {
    ...baseConfig,
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.unit.ts'],
    testMatch: ['<rootDir>/tests/modules/**/*.test.ts']
  }
}

module.exports = config;
