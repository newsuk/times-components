const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("image", "web"), {
  collectCoverageFrom: [
    "**/packages/image/**/*.js",
    "!**/packages/image/**/image.js",
    "!**/packages/image/**/*stories*",
    "!**/packages/image/__tests__/**",
    "!**/packages/image/coverage/**"
  ]
});
