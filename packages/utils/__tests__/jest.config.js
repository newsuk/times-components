const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator(null, __dirname, [
  "graphql.js",
  "fetch-gql-schema.js"
]);
