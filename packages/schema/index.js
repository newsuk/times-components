const fetch = require("node-fetch");
const fetchGql = require("./fetch-gql-schema");

fetchGql(
  process.cwd(),
  fetch,
  process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/graphql"
)
  .then(() => process.exit())
  .catch(e => {
    // eslint-disable-next-line no-console
    console.log(e);
    process.exit(1);
  });
