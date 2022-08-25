const jestConfigurator = require("@times-components/jest-configurator-web")
  .default;
const path = require("path");

module.exports = jestConfigurator(__dirname, {
  setupFilesAfterEnv: path.join(__dirname, "./web/serializers")
});
