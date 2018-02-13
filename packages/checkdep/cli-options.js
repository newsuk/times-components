const optimist = require("optimist");
export const argv = optimist
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
