const path = require('path')
const fs = require('fs')

const buildConfig = dir => {
  const { name: packageName } = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
  const name = packageName.replace("@times-components/", '')
  return {
    rootDir: path.join(dir, '../..'),
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    globals: {
      "ts-jest": {
        tsConfigFile: "./tsconfig.jest.json"
      }
    },
    transformIgnorePatterns: [],
    setupFiles: [],
    testMatch: [`**/packages/${name}/__tests__/*.test.ts`],
    transform: {
      ".+\\.js$": "babel-jest",
      ".+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    coverageReporters: ["json", "html", "lcov", "text"],
    coverageDirectory: path.join(dir, "coverage"),
    collectCoverageFrom: [
      "<rootDir>/packages/typeset/src/*.ts",
      "!<rootDir>/node_modules/"
    ]
  }
}

module.exports = buildConfig(__dirname)