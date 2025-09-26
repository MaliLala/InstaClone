// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ['**/src/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ["<rootDir>/build/"],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};