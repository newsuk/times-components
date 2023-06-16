const path = require('path');
const fs = require('fs');

const buildConfig = dir => {
  const { name: packageName } = JSON.parse(
    fs.readFileSync(path.join(dir, 'package.json'), 'utf8')
  );
  const name = packageName.replace('@times-components/', '');
  return {
    rootDir: path.join(dir, '../..'),
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'ts', 'tsx', 'node', 'json'],
    transformIgnorePatterns: [],
    testEnvironment: 'jest-environment-jsdom-sixteen',
    setupFiles: [],
    setupFilesAfterEnv: ['<rootDir>/packages/ts-newskit/jest.setup.js'],
    testMatch: [
      `**/packages/${name}/**/__tests__/*.test.tsx`,
      `**/packages/${name}/**/__tests__/*.test.ts`
    ],
    transform: {
      '.+\\.js$': 'babel-jest',
      '.+\\.tsx?$': 'ts-jest'
    },
    globals: {
      'ts-jest': {
        tsConfig: './tsconfig.jest.json'
      }
    },
    clearMocks: true,
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcov', 'text'],
    coverageDirectory: path.join(dir, 'coverage'),
    collectCoverageFrom: [
      '<rootDir>/packages/ts-newskit/src/**/*.(tsx|ts)',
      '!<rootDir>/packages/ts-newskit/src/**/*.(stories|d).*',
      '!<rootDir>/packages/ts-newskit/src/index.*',
      '!<rootDir>/node_modules/'
    ],
    coverageThreshold: {
      global: {
        statements: 95,
        branches: 95,
        lines: 95,
        functions: 95
      }
    }
  };
};

module.exports = buildConfig(__dirname);
