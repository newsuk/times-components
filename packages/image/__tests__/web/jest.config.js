const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("image", "web"), {
  collectCoverageFrom: [
    "**/packages/image/**/*.js",
    "!**/packages/image/**/image.js",
    "!**/packages/image/**/image-with-preview.js",
    "!**/packages/image/**/image-without-preview.js",
    "!**/packages/image/**/add-missing-protocol.js",
    "!**/packages/image/**/style-native.js",
    "!**/packages/image/**/*stories*",
    "!**/packages/image/__tests__/**",
    "!**/packages/image/coverage/**"
  ]
});
