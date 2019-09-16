const path = require('path')
const fs = require('fs')

const buildConfig = dir => {
  const { name: packageName } = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
  const name = packageName.replace("@times-components/", '')
  return {
    rootDir: path.join(dir, '../..'),
    preset: "react-native",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transformIgnorePatterns: [],
    setupFiles: [`./packages/${name}/src/setupTests.js`],
    testMatch: [`**/packages/${name}/src/__tests__/*.test.tsx`],
    transform: {
      ".+\\.js$": "./node_modules/react-native/jest/preprocessor.js",
      ".+\\.tsx?$": "ts-jest"
    },
    globals: {
      "ts-jest": {
        tsConfigFile: "./tsconfig.jest.json"
      }
    }
  }
}

module.exports = buildConfig(__dirname)