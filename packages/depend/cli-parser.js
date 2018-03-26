/* eslint-disable no-console */
import commander from "commander";
import { version } from "./package.json";
import * as strategies from "./strategies";

function validatePick(rule) {
  if (rule.split("@").length !== 2) {
    console.error(
      `"${rule}" is an invalid rule. Format: "-p {name}@{version}"`
    );
    process.exit(1);
  }
  return rule;
}

function validateStrategies(name) {
  if (!strategies[name]) {
    const options = Object.keys(strategies).join(", ");
    console.error(`"${name}" is invalid strategy. Chose one of: ${options}"`);
    process.exit(1);
  }
  return name;
}

export default commander
  .version(version)
  .usage("depend [...options]")
  .description(
    "tool to analyze, visualize and fix dependencies of a javascript monorepo"
  )
  .option(
    "-l --lerna <path>",
    "path to project root. Uses packages field to find all packages"
  )
  .option("-e --expr <glob>", "glob expression that finds package.json files")
  .option(
    "-p --pick <dependency>",
    "sets all package dependencies to {package}@{version}",
    validatePick
  )
  .option(
    "-g --graph [filter]",
    "output the dependency graph for all matching requirements"
  )
  .option(
    "-s --strategy <strategy>",
    "how to resolve conflicts. possible strategies: conservative, progressive, majority, majorityConservative, majorityProgressive",
    validateStrategies
  )
  .option("-f --fix", "fixed dependencies with wrong versions")
  .option("-sr --show-rules", "prints rules that will be applied")
  .option("-l --list", "prints all dependencies in use")
  .option("-b --bail", "returns 1 if packages need fixing")
  .option("--hint", "print fix suggestions");
