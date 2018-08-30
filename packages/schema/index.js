/* eslint-disable no-console */

const fetch = require("node-fetch");
const path = require("path");
const { promisify } = require("util");
const fs = require("fs");
const chalk = require("chalk");
const fetchGql = require("./fetch-gql-schema");

const access = promisify(fs.access);

async function main() {
  try {
    await fetchGql(
      process.cwd(),
      fetch,
      process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/graphql"
    );
  } catch (e) {
    console.log(chalk.yellow(e));

    try {
      await access(path.join(process.cwd(), "schema.json"));
      console.log(chalk.yellow("Your schema may be out of date for linting"));
    } catch (err) {
      console.log(
        chalk.yellow("Without a schema you cannot perform gql linting")
      );
    }
  }

  process.exit();
}

main();
