/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest')

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
  preset: 'ts-jest',
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/postgres-data/"],
  roots: ["<rootDir>/test", "<rootDir>/src"]
};
