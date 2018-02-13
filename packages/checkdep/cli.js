require("babel-register");
require("babel-polyfill");
const chalk = require("chalk");
const yargs = require("optimist");
const checkdep = require("./checkdep").default;
const strategies = require("./strategies");
const { writeJson } = require('fs-extra');

const argv = yargs
  .option("expr", "glob expression that finds package.json files")
  .string("expr")
  .alias("expr", "e")
  .alias("strategy", "s")
  .option("fix", "fixed dependencies with wrong versions")
  .boolean("fix")
  .option("show-rules", "prints rules that will be applied")
  .boolean("show-rules")
  .option("list", "prints all dependencies in use")
  .boolean("list")
  .option("bail", "returns 1 if packages need fixing")
  .boolean("bail")
  .option("hint", "print fix suggestions")
  .boolean("hint")
  .option("strategy", "how to resolve conflicts")
  .boolean("string")
  .default({
    expr: "packages/*/package.json",
    list: false,
    fix: false,
    bail: false,
    info: true,
    showRules: false,
    strategy: undefined
  }).argv;

checkdep(argv.expr, argv.strategy ? strategies[argv.strategy] : null)
  .then( ({fixupMap, suggestions, fixedPackages, all}) => {

    if (argv.list) {
      Object.entries(all)
        .map( ([name, versions]) => [name, [...versions]] )
        .forEach( ([name, versions]) => {
          const color = (versions.length>1 && !fixupMap[name])
            ? chalk.red
            : (!fixupMap[name])
              ? chalk.green
              : chalk.yellow;

          console.log(name, color(versions.join(' ')));
      });
    }


    if (argv.showRules) {
      console.log(fixupMap);
    }

    if (argv.hint || argv.fix) {
      suggestions.forEach(
        ([path, suggestions]) => {

        console.log(path)
        console.log(
          suggestions.map(
            ([name, current, target]) =>
              " "+ chalk.blue(name) + ": "+ chalk.red(current) + " -> "+ chalk.green(target)
          ).join('\n'))
      });
    }

    if (argv.bail && suggestions.length) {
      process.exit(1);
    }

    if (argv.fix) {
      return Promise.all(
        fixedPackages.map(([path, json]) => writeJson(path, json))
      );
    }


  })
  .catch(e => {
    console.log(e.toString());
    process.exit(1);
  });
