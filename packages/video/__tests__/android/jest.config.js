const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("android", __dirname, {
  coverageIgnoreGlobs: ["is-paid-subscriber.js"]
});
