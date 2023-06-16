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
    setupFilesAfterEnv: ['<rootDir>/packages/ts-newskit-bypass/jest.setup.js'],
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
      '<rootDir>/packages/ts-newskit-bypass/src/**/*.(tsx|ts)',
      '!<rootDir>/packages/ts-newskit-bypass/src/**/*.(stories|d).*',
      '!<rootDir>/packages/ts-newskit-bypass/src/index.*',
      '!<rootDir>/node_modules/'
    ],
    coverageThreshold: {
      global: {
        statements: 0,
        branches: 0,
        lines: 0,
        functions: 0
      }
    }
  };
};

module.exports = buildConfig(__dirname);
