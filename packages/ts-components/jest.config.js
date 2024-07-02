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
    collectCoverage: true,
    coverageReporters: ['json', 'html', 'lcov', 'text'],
    coverageDirectory: path.join(dir, 'coverage'),
    collectCoverageFrom: [
      '<rootDir>/packages/ts-components/src/**/*.(tsx|ts)',
      '!<rootDir>/packages/ts-components/src/**/*.(stories|d).*',
      '!<rootDir>/packages/ts-components/src/index.*',
      '!<rootDir>/node_modules/'
    ],
    coverageThreshold: {
      global: {
        statements: 95.9,
        branches: 83,
        lines: 96,
        functions: 96
      }
    }
  };
};

module.exports = buildConfig(__dirname);
