/* eslint-disable no-console */

const { introspectionQuery } = require("graphql");
const fetch = require("node-fetch");
const fs = require("fs");
const { promisify } = require("util");
const mkdirp = promisify(require("mkdirp"));

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

const writeSchemaToDist = res =>
  new Promise((resolve, reject) => {
    const stream = fs.createWriteStream("src/schema.json");

    stream.on("finish", resolve);
    stream.on("error", reject);

    res.body.pipe(stream);
  });

mkdirp("dist")
  .then(fetchIntrospection)
  .then(schema => writeSchemaToDist(schema))
  .catch(e => console.error(e));
