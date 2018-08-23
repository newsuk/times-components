/* eslint-disable no-console */

const { introspectionQuery } = require("graphql");
const fetch = require("node-fetch");
const fs = require("fs");

const fetchIntrospection = () =>
  fetch(process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: introspectionQuery
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

const writeSchemaToDist = fetchResult =>
  new Promise(res =>
    fetchResult
      .json()
      .then(schema =>
        fs.writeFile("schema.json", JSON.stringify(schema), () => res(schema))
      )
  );

const writeFragmentMatcher = schema => {
  // eslint-disable-next-line no-underscore-dangle
  const filteredTypes = schema.data.__schema.types.filter(
    ({ possibleTypes }) => possibleTypes !== null
  );

  const fm = `
  const { IntrospectionFragmentMatcher } = require("apollo-cache-inmemory");

  const introspectionQueryResultData = {
    __schema: {
      types: ${JSON.stringify(filteredTypes)}
    }
  };

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  module.exports.fragmentMatcher = fragmentMatcher;
  `;

  return new Promise(res => fs.writeFile("fragment-matcher.js", fm, res));
};

fetchIntrospection()
  .then(fetchResult => writeSchemaToDist(fetchResult))
  .then(schema => writeFragmentMatcher(schema))
  .catch(e => console.error(e));
