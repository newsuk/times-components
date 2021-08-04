const path = require('path');
const fs = require('fs');

const buildConfig = dir => {
  const { name: packageName } = JSON.parse(
    fs.readFileSync(path.join(dir, 'package.json'), 'utf8')
  );
  const name = packageName.replace('@times-components/', '');
  return {
    rootDir: path.join(dir, '../..'),
    preset: 'react-native-web',
    moduleFileExtensions: ['web.js', 'js', 'ts', 'tsx', 'node', 'json'],
    transformIgnorePatterns: [],
    testEnvironment: 'jest-environment-jsdom-sixteen',
    setupFiles: [],
    testMatch: [
      `**/packages/${name}/**/__tests__/*.test.tsx`,
      `**/packages/${name}/**/__tests__/*.test.ts`
    ],
    transform: {
      '.+\\.js$': './node_modules/react-native/jest/preprocessor.js',
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
      '!<rootDir>/packages/ts-components/src/fixtures/**',
      '!<rootDir>/node_modules/'
    ],
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 75,
        functions: 85,
        lines: 80
      }
    }
  };
};

module.exports = buildConfig(__dirname);
