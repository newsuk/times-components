import optimist from "optimist";

export default optimist
  .usage('checkdep -e "packages/*/package.json" [...options]')
  .option("help", "shows this message")
  .alias("help", "h")
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
  .string("strategy")
  .describe(
    "strategy",
    "{conservative|progressive|majority|majorityConservative|majorityProgressive}"
  )
  .default({
    expr: "packages/*/package.json",
    list: false,
    fix: false,
    bail: false,
    hint: false,
    showRules: false,
    strategy: undefined
  });
