const jestConfigurator = require("@times-components/jest-configurator");

module.exports = Object.assign(jestConfigurator("image", "android"), {
  collectCoverageFrom: [
    "**/packages/image/**/*.js",
    "!**/packages/image/**/*.web.js",
    "!**/packages/image/**/*stories.js",
    "!**/packages/image/__tests__/**",
    "!**/packages/image/coverage/**"
  ]
});
