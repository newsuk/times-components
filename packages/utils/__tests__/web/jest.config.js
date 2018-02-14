const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("web", __dirname, [
  "graphql.js",
  "fetch-gql-schema.js"
]);
