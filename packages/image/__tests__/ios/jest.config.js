const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("image", "ios"), {
  collectCoverageFrom: [
    "**/packages/image/**/*.js",
    "!**/packages/image/**/*.web.js",
    "!**/packages/image/**/*stories*",
    "!**/packages/image/**/image.android.js",
    "!**/packages/image/__tests__/**",
    "!**/packages/image/coverage/**"
  ]
});
