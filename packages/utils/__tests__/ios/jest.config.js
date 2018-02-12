const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("ios", __dirname, [
  "graphql.js",
  "fetch-gql-schema.js"
]);
