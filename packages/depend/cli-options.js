import commander from "commander";
import process from "process";

export default commander
  .version("0.0.1")
  .usage("depend [...options]")
  .description(
    "tool to analyze, visualize and fix dependencies of a javascript monorepo"
  )
  .option(
    "-e --expr <glob>",
    "expr",
    "glob expression that finds package.json files"
  )
  .option(
    "-p --pick [dependency]",
    "sets all package dependencies to {package}@{version}"
  )
  .option(
    "-g --graph [relationship]",
    "output the dependency graph for all matching requirements"
  )
  .option(
    "-s --strategy [strategy]",
    "how to resolve conflicts. possible strategies: conservative, progressive, majority, majorityConservative, majorityProgressive"
  )
  .option("-f --fix", "fixed dependencies with wrong versions")
  .option("-sr --show-rules", "prints rules that will be applied")
  .option("-l --list", "prints all dependencies in use")
  .option("-b --bail", "returns 1 if packages need fixing")
  .option("--hint", "print fix suggestions")
  .parse(process.argv);
